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

## 📊 リモート開発・システム構成図

```mermaid
graph TD
    %% 手元の開発環境
    subgraph LocalClient["🪟 手元のPC (Windows等)"]
        VSCode["💻 VS Code / ターミナル<br>(SSHクライアント)"]
        Browser["🌐 ブラウザ<br>(http://localhost:3000)"]
    end

    %% リモートサーバー（Ubuntu）
    subgraph HostOS["💻 リモートサーバー (Ubuntu 24.04)"]
        SSH["🔑 SSH サーバー<br>(ポート転送 / Port Forwarding)"]
        LocalCode["📁 プロジェクトフォルダ<br>(test-app/)"]
        LocalDBData["📁 DBデータ保存先<br>(db/data/)"]
        
        %% Docker環境
        subgraph DockerEnv["🐳 Docker 仮想環境"]
            
            %% アプリコンテナ
            subgraph AppContainer["📦 test-app-app-1<br>(Node.js)"]
                Express["🚀 Express サーバー<br>(Port: 3000)"]
            end

            %% DBコンテナ
            subgraph DBContainer["📦 test-app-db-1<br>(PostgreSQL)"]
                PostgreSQL[("🗄 PostgreSQL<br>(Port: 5432)")]
            end
            
        end
    end

    %% 接続・連携の矢印
    VSCode -->|① SSH接続 / コード編集| SSH
    SSH -->|コード変更を反映| LocalCode
    
    Browser -->|② ポート転送経由でアクセス| SSH
    SSH -->|3000番ポートへ転送| Express
    
    Express -->|③ データベース通信| PostgreSQL
    
    %% ボリュームマウント（同期）の矢印
    LocalCode <.->|ソースコード同期| AppContainer
    LocalDBData <.->|データの永続化| PostgreSQL

    %% スタイルの調整
    style LocalClient fill:#eceff1,stroke:#607d8b,stroke-width:2px;
    style HostOS fill:#f9f9f9,stroke:#333,stroke-width:2px;
    style DockerEnv fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    style AppContainer fill:#fff,stroke:#4caf50,stroke-width:2px;
    style DBContainer fill:#fff,stroke:#ff9800,stroke-width:2px;
```