import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { ConfigManager } from '../configManager';
import { MarkdownParser } from '../markdownParser';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

  // ConfigManager のテスト
  suite('ConfigManager', () => {
    test('languageにマッチする色を返却できること', () => {
      // ConfigManagerをモック設定で初期化
      const configManager = new ConfigManager();
      // @ts-ignore - private プロパティにアクセスするためのハック
      configManager.config = [
        {
          languages: "py|python|Python",
          backgroundColor: "#fdf6e3"
        },
        {
          languages: "js|javascript|JavaScript",
          backgroundColor: "#f0fff4"
        },
        {
          languages: "default",
          backgroundColor: "#f8f8f8"
        }
      ];

      // 各言語の色をテスト
      assert.strictEqual(configManager.getColorForLanguage('py'), "#fdf6e3");
      assert.strictEqual(configManager.getColorForLanguage('python'), "#fdf6e3");
      assert.strictEqual(configManager.getColorForLanguage('Python'), "#fdf6e3");
      assert.strictEqual(configManager.getColorForLanguage('js'), "#f0fff4");
      assert.strictEqual(configManager.getColorForLanguage('javascript'), "#f0fff4");
      assert.strictEqual(configManager.getColorForLanguage('JavaScript'), "#f0fff4");
    });

    test('マッチする言語がない場合はdefault設定の色を返却すること', () => {
      const configManager = new ConfigManager();
      // @ts-ignore - private プロパティにアクセスするためのハック
      configManager.config = [
        {
          languages: "py|python|Python",
          backgroundColor: "#fdf6e3"
        },
        {
          languages: "default",
          backgroundColor: "#f8f8f8"
        }
      ];

      assert.strictEqual(configManager.getColorForLanguage('ruby'), "#f8f8f8");
    });

    test('default設定もない場合は空文字を返却すること', () => {
      const configManager = new ConfigManager();
      // @ts-ignore - private プロパティにアクセスするためのハック
      configManager.config = [
        {
          languages: "py|python|Python",
          backgroundColor: "#fdf6e3"
        }
      ];

      assert.strictEqual(configManager.getColorForLanguage('ruby'), "");
    });
  });

  // MarkdownParser のテスト
  suite('MarkdownParser', () => {
    test('コードブロックを検出して言語と範囲を返却できること', () => {
      const parser = new MarkdownParser();
      const markdownText = `
# Header

\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`

Some text

\`\`\`javascript
console.log("Hello");
\`\`\`
`;
      
      const blocks = parser.parseMarkdown(markdownText);
      
      assert.strictEqual(blocks.length, 2);
      assert.strictEqual(blocks[0].language, 'python');
      assert.strictEqual(blocks[1].language, 'javascript');

      // 範囲のチェック（簡易的に開始行と終了行だけ）
      assert.strictEqual(blocks[0].range.start.line, 3);
      assert.strictEqual(blocks[0].range.end.line, 6);  // 修正：終了行は6
      assert.strictEqual(blocks[1].range.start.line, 10);  // 修正：開始行は10
      assert.strictEqual(blocks[1].range.end.line, 12);  // 修正：終了行は12
    });

    test('言語指定のないコードブロックは空文字列を返すこと', () => {
      const parser = new MarkdownParser();
      const markdownText = `
# Header

\`\`\`
def hello():
    print("Hello, World!")
\`\`\`
`;
      
      const blocks = parser.parseMarkdown(markdownText);
      
      assert.strictEqual(blocks.length, 1);
      assert.strictEqual(blocks[0].language, '');
    });
  });
});
