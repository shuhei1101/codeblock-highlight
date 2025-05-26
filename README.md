# CodeBlock Highlight

この拡張機能は、Markdownファイル内のコードブロックの背景色を言語ごとにカスタマイズできるようにします。

## 機能

- Markdownファイル内のコードブロックの背景色を言語ごとに変更
- 複数の言語識別子を一つの設定にマッピング可能（例: py, python, Python）
- 言語が指定されていないコードブロックに対するデフォルト色の設定

## 要件

この拡張機能には特別な要件はありません。

## 拡張機能の設定

この拡張機能は以下の設定項目を提供します:

* `codeblockHighlight.highlightColors`: コードブロックの言語ごとの背景色を指定します。

設定例:

```json
"codeblockHighlight.highlightColors": [
  {
    "languages": "py|python|Python",
    "backgroundColor": "#fdf6e3"
  },
  {
    "languages": "js|javascript|JavaScript",
    "backgroundColor": "#f0fff4"
  },
  {
    "languages": "default",
    "backgroundColor": "#f8f8f8"
  }
]
```

各プロパティの説明:

- `languages`: 対象の言語識別子。パイプ(`|`)区切りで複数指定可能です。大文字/小文字は区別されます。
- `backgroundColor`: コードブロックの背景に適用する色（16進数カラーコードなど）
- `default`: 特別な言語識別子で、言語が指定されていないコードブロックに使用されます。

## 既知の問題

現在のところ既知の問題はありません。

## リリースノート

### 0.0.1

- 初期リリース
- Markdownファイルのコードブロックに言語別に背景色を設定する機能を追加

---

## 拡張機能のガイドライン

拡張機能を作成する際のベストプラクティスについては、以下のガイドラインを参照してください。

* [拡張機能のガイドライン](https://code.visualstudio.com/api/references/extension-guidelines)

## Markdownの操作

VS Codeを使用してREADMEを作成できます。以下は役立つエディタのキーボードショートカットです：

* エディタの分割（macOSでは`Cmd+\`、WindowsとLinuxでは`Ctrl+\`）
* プレビューの切り替え（macOSでは`Shift+Cmd+V`、WindowsとLinuxでは`Shift+Ctrl+V`）
* `Ctrl+Space`（Windows、Linux、macOS）を押すとMarkdownスニペットのリストが表示されます

## 詳細情報

* [Visual Studio CodeのMarkdownサポート](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown構文リファレンス](https://help.github.com/articles/markdown-basics/)

**お楽しみください！**
