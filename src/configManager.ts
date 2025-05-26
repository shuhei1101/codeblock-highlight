import * as vscode from 'vscode';
import { HighlightConfig } from './types';

export class ConfigManager {
    private config: HighlightConfig[] = [];
    private readonly configSection = 'codeblockHighlight';

    constructor() {
        this.loadConfiguration();
    }

    /**
     * 設定から構成を読み込む
     */
    public loadConfiguration(): void {
        const config = vscode.workspace.getConfiguration(this.configSection);
        this.config = config.get<HighlightConfig[]>('highlightColors', []);
    }

    /**
     * 指定された言語に一致する背景色を取得する
     * @param language 言語識別子
     * @returns 一致する背景色、なければデフォルト色または空文字列
     */
    public getColorForLanguage(language: string): string {
        // 指定された言語に一致する設定を探す
        for (const item of this.config) {
            const languages = item.languages.split('|');
            if (languages.includes(language)) {
                return item.backgroundColor;
            }
        }

        // デフォルト設定を探す
        const defaultConfig = this.config.find(item => item.languages === 'default');
        return defaultConfig ? defaultConfig.backgroundColor : '';
    }

    /**
     * 関連する設定が変更されたかどうかを確認
     * @param event 設定変更イベント
     * @returns 関連する設定が変更された場合はtrue
     */
    public hasConfigChanged(event: vscode.ConfigurationChangeEvent): boolean {
        return event.affectsConfiguration(this.configSection);
    }
}
