// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ConfigManager } from './configManager';
import { CodeBlockDecorator } from './codeBlockDecorator';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "codeblock-highlight" is now active!');

	// 設定マネージャーを初期化
	const configManager = new ConfigManager();
	
	// コードブロック装飾管理クラスを初期化
	const decorator = new CodeBlockDecorator(configManager);
	decorator.initialize();

	// 設定変更イベントを監視
	vscode.workspace.onDidChangeConfiguration(event => {
		if (configManager.hasConfigChanged(event)) {
			decorator.updateDecorations();
		}
	});

	// リソース解放処理を登録
	context.subscriptions.push({
		dispose: () => {
			decorator.dispose();
		}
	});
}

// This method is called when your extension is deactivated
export function deactivate() {}
