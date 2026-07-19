# Docker TODO App

Docker (Node.js + PostgreSQL) で動作する、シンプルなTODO管理アプリケーションです。
タスクの追加と、チェックボックスによる完了・未完了の状態更新が可能です。

## 🛠 技術スタック
- **Frontend**: HTML5, Vanilla JavaScript, CSS3
- **Backend**: Node.js (Express)
- **Database**: PostgreSQL 16

---

## 🚀 起動方法

Linux環境（Ubuntu等）では、Dockerコマンドの実行やデータの権限管理のために `sudo` が必要になる場合があります。

### 1. アプリケーションの起動
プロジェクトのルートディレクトリで以下のコマンドを実行します。

```bash
sudo docker compose up --build
```

起動後、ブラウザで http://localhost:3000 にアクセスするとアプリが利用できます。


## 📊 システム構成図

```mermaid
graph TD
    %% ホストOS（Ubuntu）の定義
    subgraph HostOS["💻 ホストOS (Ubuntu 24.04)"]
        Browser["🌐 ブラウザ<br>(http://localhost:3000)"]
        LocalCode["📁 プロジェクトフォルダ<br>(test-app/)"]
        LocalDBData["📁 DBデータ保存先<br>(db/data/)"]
    end

    %% Dockerネットワーク・コンテナの定義
    subgraph DockerEnv["🐳 Docker 仮想環境"]
        
        %% アプリコンテナ
        subgraph AppContainer["📦 test-app-app-1<br>(Node.js:20-alpine)"]
            Express["🚀 Express サーバー<br>(Port: 3000)"]
            HTMLJS["📄 画面/API処理<br>(index.js / index.html)"]
        end

        %% DBコンテナ
        subgraph DBContainer["📦 test-app-db-1<br>(PostgreSQL:16-alpine)"]
            PostgreSQL[("🗄 PostgreSQL<br>(Port: 5432)")]
        end
        
    end

    %% 接続・連携の矢印
    Browser -->|① 画面アクセス/タスク追加| Express
    Express -->|② API経由でSQL実行| PostgreSQL
    
    %% ボリュームマウント（同期）の矢印
    LocalCode <.->|ソースコード同期| AppContainer
    LocalDBData <.->|データの永続化| PostgreSQL

    %% スタイルの調整
    style HostOS fill:#f9f9f9,stroke:#333,stroke-width:2px;
    style DockerEnv fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    style AppContainer fill:#fff,stroke:#4caf50,stroke-width:2px;
    style DBContainer fill:#fff,stroke:#ff9800,stroke-width:2px;