import * as vscode from 'vscode';
import { CodeBlock } from './types';

export class MarkdownParser {
    /**
     * Markdownテキストからコードブロックを抽出する
     * @param text Markdownテキスト
     * @returns コードブロックの配列（範囲と言語情報を含む）
     */
    public parseMarkdown(text: string): CodeBlock[] {
        const lines = text.split('\n');
        const blocks: CodeBlock[] = [];
        
        // コードブロック検出用の正規表現（インデントを許容）
        const fenceRegex = /^[ \t]*```\s*([a-zA-Z0-9_+-]*)$/;
        
        let inCodeBlock = false;
        let startLine = -1;
        let startIndent = '';  // インデントを記録
        let language = '';
        
        // 各行を処理
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const match = line.match(fenceRegex);
            
            if (match) {
                if (!inCodeBlock) {
                    // コードブロック開始
                    inCodeBlock = true;
                    startLine = i;
                    // インデントを抽出して保存
                    startIndent = line.match(/^[ \t]*/)?.[0] || '';
                    language = this.identifyCodeBlockLanguage(match[1]);
                } else {
                    // コードブロック終了（開始時と同じインデントレベルかどうかを確認）
                    const currentIndent = line.match(/^[ \t]*/)?.[0] || '';
                    
                    // 開始と終了のインデントが同じ場合のみブロック終了とみなす
                    if (currentIndent === startIndent) {
                        inCodeBlock = false;
                        blocks.push({
                            range: {
                                start: { line: startLine, character: 0 },
                                end: { line: i, character: line.length }
                            },
                            language: language
                        });
                    }
                }
            }
        }
        
        return blocks;
    }
    
    /**
     * コードブロックの言語識別子を抽出する
     * @param codeFence コードフェンスの言語指定部分
     * @returns 言語識別子（指定がなければ空文字列）
     */
    private identifyCodeBlockLanguage(codeFence: string): string {
        return codeFence.trim();
    }
}
