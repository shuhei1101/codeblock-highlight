# コーディングスタイルガイド

## はじめに
- このドキュメントは、プロジェクトのコーディングスタイルガイドです。

## 変更履歴
- 2025/5/14: 初版作成(変更者: ユーザ)
- 

## 命名規則
- 命名規則は言語のコーディング規約に従う(例: Python→PEP8)

### クラス名
- クラス名は主に`ドメインオブジェクト`と`振る舞いを持つクラス`に分ける
  - `ドメインオブジェクト`は名詞系
  - `振る舞いを持つクラス`は動詞系+or(例: xx_creator, xx_builder)
    - ただし、DDDに基づいている`xx_service`や`xx_repository`は除く
- インターフェース名は`I`をつけず、実装するメソッド+able系を一般的に使用
  - 例: `find`メソッドを持つインターフェースは`Findable`とする
- コンストラクタについて
  - 基本的にコンストラクタで初期化せず、ファクトリメソッドを使用する
  - ただし、値オブジェクトはコンストラクタで初期化する
  - ファクトリメソッドの命名は、`from_`+生成する値の型名とする
    - 例: `from_dict`、`from_json`、`from_csv`など

### 関数
- 関数名は動詞系から始める

### dtoについて
- dtoは、ドメインオブジェクトを表すクラスであり、データの受け渡しを目的とする
- dtoは役割によるが、application層で使用する場合は、applicationフォルダに配置する
- dtoの命名は、`ドメインオブジェクト名+data`とする
  - 例: `User`ドメインオブジェクトに対するdtoは`UserData`とする

## 2. コーディングプラクティス
- 本手順では、コーディングプラクティスについて説明します。
- 基本的に以下の内容を遵守し、開発に取り組んでください。

### 2.1. ドメイン駆動設計について (DDD)
- 値オブジェクトとエンティティを区別
- 集約で整合性を保証
- リポジトリでデータアクセスを抽象化
- 境界付けられたコンテキストを意識

### 2.2. テスト駆動開発について (TDD)
- テストファーストで実装(実装の前にテストを書く)
- テストファイルは、ルートディレクトリ/tests/配下に実装ファイルと同じ階層で作成
  - 例: `src/domain/xxx.py`に対するテストは`tests/domain/test_xxx.py`に作成
- Red-Green-Refactorサイクル
  - これは、テストを実行して失敗させる(赤)、テストを通す(緑)、リファクタリングする(リファクタリング)のサイクル
  - 小さな単位で反復
  - テストを仕様として扱うため、継続的なリファクタリングを心がける
- テスト内の関数名は、母国語で記載する
  - 例: 
    ```python
    def test_Noneを渡したときValueErrorが返却される():
        pass
    ```
- アサートファースト：期待結果から逆算
- テストは最小限のコードで実装


