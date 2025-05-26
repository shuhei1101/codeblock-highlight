# GitHub Copilotの指示書

## 1. はじめに
- 本ドキュメントでは、GitHub Copilotとユーザで、依頼内容に基づく要件定義から実装までの流れを説明します。
- 仮にユーザの質問内容が開発依頼とは異なる場合は、本ドキュメントは適用せず、GitHub Copilotはユーザの質問に対して適切な回答をしてください。
- 本手順で不明な点がある場合は、本書のセクション`QA`に不明点を記載し、作業を中断してください。
間違えても勝手に作業を進めないでください。

## 2. 定数一覧
- 本書で使用する定数を記載します。
- このセクションはユーザが最初に登録します。登録がない場合は、適宜ユーザに問い合わせてください。
  -  `{requirements-docs}`: 
    - "docs/requirement.md"
  - `{notion-database-id}`: 
    - "1b08fe3c-9ed2-80da-b2f3-c53738b9cdc8"
  - `{notion-db-tag}`: ""
  - `{notion-db-type}`: ""

- 本書で定数は以下形式で記載します。
  - `{定数名}`
  - 定数名は、必ず`{}`で囲んでください。
  - 例: `{requirements-docs}`

## 3. 最初に読むべきドキュメント
- 定数`requirements-docs`に記載されているドキュメントを最初に読んでください。
- 

## 4. 作業手順
- 本ドキュメントでは、GitHub Copilotとユーザで、依頼内容に基づく要件定義から実装までの流れを説明します。
- 次節以降で具体的な手順を説明します。

## 5. 作業手順: 依頼内容の説明(作業者: ユーザ)
- ユーザがGitHub Copilotに以下内容を伝えます。
  - issue番号
  - 依頼内容

## 6. 作業手順: Git Commitの方法(作業者: GitHub Copilot)

### 6.3. 作業のコミット方法
- 本手順では、作業完了時のcommit方法を説明します。
- 各セクションの作業が完了したら、以下のようにメッセージを記載してcommitしてください。
  ```plaintext:commitメッセージ
  git commit -m "<作業者>: <作業内容>"
  例: git commit -m "GitHub Copilot: 依頼内容の説明"
  ```
- なお、作業内容の説明はできる限り簡潔に短く記載してください。
- 現在のブランチが`main`の場合は、ユーザに確認を求めてください。

## 7. 作業手順: Issueフォルダの作成(作業者: GitHub Copilot)
### 7.1. 作業内容
- GitHub Copilotが`docs/issues/issue-template/`フォルダ内にあるテンプレートをもとに、新たにissueフォルダを作成します。
  - 仮に`issue-template`が存在しない場合は、一度ユーザに作成を依頼してください。(ここで勝手に作業を進めないでください)
- また、既にissueフォルダが存在する場合は、ユーザが事前に作成しているため、こちらをもとに編集してください。

### 7.2. (補足)Issueフォルダとは？
- このフォルダは、依頼内容をもとに必要な機能や要件を整理していくものです。
- 依頼対応を行う際は、このフォルダの内容をもとに実装を行います。
  - フォルダ内のファイルは、以下構成となっています。
    - `docs/issues/issue-xxx/xxx-requirement.md`
    - `docs/issues/issue-xxx/xxx-qa.md`
- 格納場所: `docs/issues/`
- Issueフォルダ名: `issue-xxx` (xxxは本issueの番号)
  - `xxx`は本issueの番号
- フォルダ内に、以下のファイルを作成します。
  - `xxx-requirement.md`: 
    - 仕様書ファイル。依頼内容の要件を整理するためのファイル
  - `xxx-qa.md`

- 今後、issueフォルダ配下のファイルは増える可能性があります。増えた場合は、適宜確認してください。

## 8. 作業手順: Notionにタスクの連携(作業者: GitHub Copilot)
### 8.1. 作業内容
#### Notion内のタスク状況の確認
- Notion内に既に`xxx-requirement.md`の`タスク`セクションの内容が登録されているかを確認してください。

#### `xxx-requirement.md`の`タスク`セクションの内容を元に、Notionにタスクを登録

- 使用するMCP:
  - `#API-post-page`: Notionのデータベースにアイテムを登録するためのMCP
  - `#API-patch-block-children`: Notionのアイテムにブロックを登録するためのMCP
  - `#API-post-database-query`: Notionのデータベースを検索するためのMCP
- データベースID: `{notion-database-id}`
- 変更するプロパティ:
  - `種別`: `{notion-db-type}`を指定
  - `予定フラグ`: Trueにする
  - `タグ`: `{notion-db-tag}`を指定
  - `人時(予)`: 工数を人時(数値)で入力
  - `メインタスク名`: そのまま登録
  - `サブタスク`: メインタスクのサブアイテムとして追加
- 既にタスクが登録されている場合は、新規で作成しないでください。
  - ただ、タスクの内容や人時が変更されている場合は、変更を行ってください。
  - 変更を行う場合は、ユーザに確認を求めてください。
  - 確認時のフィルター
    - `データベースID`: `{notion-database-id}`
    - `予定フラグ`: "True"
    - `種別`: `{notion-db-type}`
    - `タグ`: `{notion-db-tag}`
  - 検索時のタスク名の注意: 
    - Notion側ではタスク名の前後に[]で囲まれたタグが自動で付与される。
    - 検索対象のタスク名をタイトルに含む場合、一致するとみなす。
    - 例: 
      - タスク名: "ユーザーインターフェースの実装"
      - 検索対象のタスク名: "ユーザーインターフェースの実装"
      - 検索結果: "[989] パッケージング・リリース準備 [⏱️0/2]"
      - 結果: 一致する

### 8.2. 実行例
#### 定数
- `{notion-database-id}`: "1b08fe3c-9ed2-80da-b2f3-c53738b9cdc8"
- `{notion-db-type}`: "家"
- `{notion-db-tag}`: "UnitTest Toggler"

#### issue-requirementのタスク内容
```markdown:issue-requirement
- [ ] ユーザーインターフェースの実装 (2h)
  - [ ] コマンドパレットへの登録 (0.5h)
    - コマンド表示名の設定
```

#### Notionのデータベース内のタスク状況確認
```markdown:API-post-database-query
{
  "database_id": "1b08fe3c-9ed2-80da-b2f3-c53738b9cdc8",
  "filter": {
    "and": [
      {
        "property": "予定フラグ",
        "checkbox": {
          "equals": true
        }
      },
      {
        "property": "種別",
        "select": {
          "equals": "家"
        }
      },
      {
        "property": "タグ",
        "multi_select": {
          "contains": "UnitTest Toggler"
        }
      }
    ]
  }
}
```

#### メインタスクの登録

```json:#API-post-page
{
  "parent": {
    "database_id": "1b08fe3c-9ed2-80da-b2f3-c53738b9cdc8"
  },
  "properties": {
    "名前": {
      "title": [
        {
          "text": {
            "content": "ユーザーインターフェースの実装"
          }
        }
      ]
    },
    "種別": {
      "select": {
        "name": "家"
      }
    },
    "予定フラグ": {
      "checkbox": true
    },
    "タグ": {
      "multi_select": [
        {
          "name": "UnitTest Toggler"
        }
      ]
    },
    "人時(予)": {
      "number": 2
    }
  }
}
```

#### サブタスクの登録
```json:#API-post-page
{
  "parent": {
    "database_id": "1b08fe3c-9ed2-80da-b2f3-c53738b9cdc8"
  },
  "properties": {
    "タグ": {
      "multi_select": [
        {
          "name": "UnitTest Toggler"
        }
      ]
    },
    "予定フラグ": {
      "checkbox": true
    },
    "人時(予)": {
      "number": 0.5
    },
    "名前": {
      "title": [
        {
          "text": {
            "content": "コマンドパレットへの登録"
          }
        }
      ]
    },
    "種別": {
      "select": {
        "name": "家"
      }
    },
    "親アイテム": {
      "relation": [
        {
          "id": "1f58fe3c-9ed2-8159-a5db-fcacaaf03ebb"
        }
      ]
    }
  }
}
```
#### サブタスク内のブロック登録
```json:#API-patch-block-children
{
  "block_id": "1f58fe3c-9ed2-813b-a640-caddc7e259da",
  "children": [
    {
      "type": "bulleted_list_item",
      "bulleted_list_item": {
        "rich_text": [
          {
            "type": "text",
            "text": {
              "content": "コマンド表示名の設定"
            }
          }
        ]
      }
    },
  ]
}
```

## 9. 作業手順: 仕様書(xxx-requirement.md)の編集(作業者: GitHub Copilot)
### 9.1. 作業内容
- 本issueの仕様書を開きます。(例: `docs/issues/issue-xxx/xxx-requirement.md`)
- 依頼内容をもとに、仕様書に必要な機能や要件を整理してください。
- 作業が完了したら、すぐに実装に取り掛かるのではなく、ユーザに確認を求めてください。
- なお、記載時に不明点があれば、以下QA表に記載してください。
  - `docs/issues/issue-xxx/xxx-qa.md`に記載
- 初版以降の作成時は変更履歴を記載してください。

## 10. 作業手順: 仕様書の確認(作業者: ユーザ)
### 10.1. 作業内容
- GitHub Copilotが作成した仕様書を確認します。
- ユーザが仕様書を確認したら、GitHub CopilotにOKの返事をします。
- ユーザが仕様書を確認した結果、修正が必要な場合は、GitHub Copilotに修正を依頼します。
- ユーザが修正を依頼した場合は、GitHub Copilotは修正を行い、再度ユーザに確認を求めてください。
- ユーザがOKの返事をしたら、GitHub Copilotは実装に取り掛かってください。

## 11. 作業手順: テストコードの作成(作業者: GitHub Copilot)
### 11.1. テストコードの作成
- GitHub Copilotは4章に記載されているコーディングプラクティスに従って、テストコードを作成してください。
- テストコードの作成を行う際は、以下の点に注意してください。
  - 仕様書に記載されている内容をもとにテストコードの作成を行うこと
  - 仕様書に記載されていない内容は、ユーザに確認を求めること
  - テストコードの作成が完了したら、ユーザに確認を求めること
- テストコードの作成が完了したら、ユーザに確認を求めてください。

## 12. 作業手順: 実装
- GitHub Copilotは、ユーザがOKの返事をした仕様書をもとに実装を行います。
- 実装を行う際は、以下の点に注意してください。
  - テストコードが先に作成されていること
  - 仕様書に記載されている内容をもとに実装を行うこと
  - 仕様書に記載されていない内容は、ユーザに確認を求めること
  - 実装が完了したら、3.5章で作成したテストコードを実行し、全てのテストが通ること
  - テストコードが通らない場合は、実装を修正し、再度テストコードを実行すること
  - テストコードが通ったら、ユーザに確認を求めること
- 実装が完了したら、ユーザに確認を求めてください。

## 13. QA
- Q1: xxxx
  - A1: xxxx



