# 1. ベースとなるNode.jsのイメージを指定
FROM node:20-alpine

# 2. コンテナ内の作業ディレクトリを設定
WORKDIR /usr/src/app

# 3. パッケージ情報をコピーしてライブラリをインストール
COPY package*.json ./
RUN npm install

# 4. 残りのソースコードをコピー
COPY . .

# 5. アプリが起動するポートを指定
EXPOSE 3000

# 6. コンテナ起動時に実行するコマンド
CMD ["npm", "start"]
