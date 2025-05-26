# CodeBlock Highlight

This extension allows you to customize the background color of code blocks in Markdown files for each language.
(この拡張機能は、Markdownファイル内のコードブロックの背景色を言語ごとにカスタマイズできるようにします。)

## function
- <img src='https://raw.githubusercontent.com/shuhei1101/codeblock-highlight/main/images/20250527062129.png' width='50%'>
- Change the background color of code blocks in Markdown files by language
- Multiple language identifiers can be mapped to one setting (e.g. py, python, Python)
- Setting the default color for code blocks with no language specified

## setting

* `codeblockHighlight.highlightColors`: Specifies the background color for each language of the code block.
Example configuration:

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
- `languages`: The target language identifier. Multiple pipes can be specified with a separator (`|`). It is case sensitive.
- `backgroundColor`: Colors to apply to the background of code blocks (such as hex color codes)
- `default`: A special language identifier used for code blocks that do not specify a language.



---

**Enjoy!**
