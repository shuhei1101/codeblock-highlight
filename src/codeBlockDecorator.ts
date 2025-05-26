import * as vscode from 'vscode';
import { ConfigManager } from './configManager';
import { MarkdownParser } from './markdownParser';
import { CodeBlock } from './types';

export class CodeBlockDecorator {
    private decorationTypes: Map<string, vscode.TextEditorDecorationType> = new Map();
    private activeEditor: vscode.TextEditor | undefined;
    private configManager: ConfigManager;
    private markdownParser: MarkdownParser;

    constructor(configManager: ConfigManager) {
        this.configManager = configManager;
        this.markdownParser = new MarkdownParser();
    }

    /**
     * 装飾機能を初期化する
     */
    public initialize(): void {
        // エディタが変更されたときのイベントハンドラ
        vscode.window.onDidChangeActiveTextEditor(editor => {
            this.activeEditor = editor;
            if (editor && this.isMarkdownFile(editor.document)) {
                this.updateDecorations();
            }
        });

        // テキストが変更されたときのイベントハンドラ
        vscode.workspace.onDidChangeTextDocument(event => {
            if (this.activeEditor && event.document === this.activeEditor.document
                && this.isMarkdownFile(event.document)) {
                this.updateDecorations();
            }
        });

        // 初期化時に既に開かれているエディタがあれば適用
        this.activeEditor = vscode.window.activeTextEditor;
        if (this.activeEditor && this.isMarkdownFile(this.activeEditor.document)) {
            this.updateDecorations();
        }
    }

    /**
     * 現在のエディタに装飾を適用する
     */
    public updateDecorations(): void {
        if (!this.activeEditor) {
            return;
        }

        // 以前の装飾タイプをクリア
        this.disposeDecorationTypes();
        this.createDecorationTypes();

        const document = this.activeEditor.document;
        const text = document.getText();
        const codeBlocks = this.markdownParser.parseMarkdown(text);

        // 装飾を適用
        const languageDecorations: Map<string, vscode.Range[]> = new Map();

        for (const block of codeBlocks) {
            // ドキュメントの位置に変換
            const startPos = document.positionAt(document.offsetAt(new vscode.Position(block.range.start.line, 0)));
            const endPos = document.positionAt(document.offsetAt(new vscode.Position(block.range.end.line, block.range.end.character)));
            const range = new vscode.Range(startPos, endPos);

            // 言語ごとにレンジをグループ化
            const language = block.language || 'default';
            if (!languageDecorations.has(language)) {
                languageDecorations.set(language, []);
            }
            languageDecorations.get(language)!.push(range);
        }

        // 言語ごとに装飾を適用
        for (const [language, ranges] of languageDecorations.entries()) {
            const decorationType = this.getDecorationTypeForLanguage(language);
            if (decorationType) {
                this.activeEditor.setDecorations(decorationType, ranges);
            }
        }
    }

    /**
     * リソースを解放する
     */
    public dispose(): void {
        this.disposeDecorationTypes();
    }

    /**
     * 各言語の装飾タイプを作成する
     */
    private createDecorationTypes(): void {
        this.configManager.loadConfiguration(); // 最新の設定を読み込む
        // ここでは具体的な装飾タイプは作成せず、getDecorationTypeForLanguageで必要に応じて作成する
    }

    /**
     * 指定された言語の装飾タイプを取得または作成する
     * @param language 言語識別子
     * @returns 装飾タイプ、もしくはundefined
     */
    private getDecorationTypeForLanguage(language: string): vscode.TextEditorDecorationType | undefined {
        if (this.decorationTypes.has(language)) {
            return this.decorationTypes.get(language);
        }

        const backgroundColor = this.configManager.getColorForLanguage(language);
        if (!backgroundColor) {
            return undefined;
        }

        // 新しい装飾タイプを作成
        const decorationType = vscode.window.createTextEditorDecorationType({
            backgroundColor: backgroundColor,
            isWholeLine: true
        });

        this.decorationTypes.set(language, decorationType);
        return decorationType;
    }

    /**
     * すべての装飾タイプを破棄する
     */
    private disposeDecorationTypes(): void {
        this.decorationTypes.forEach(decorationType => {
            decorationType.dispose();
        });
        this.decorationTypes.clear();
    }

    /**
     * ファイルがMarkdownであるかをチェック
     * @param document 対象ドキュメント
     * @returns Markdownファイルならtrue
     */
    private isMarkdownFile(document: vscode.TextDocument): boolean {
        return document.languageId === 'markdown';
    }
}
