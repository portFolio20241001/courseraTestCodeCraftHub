// 必要なモジュールをインポート
const dotenv = require('dotenv'); // 環境変数管理
dotenv.config(); // .envファイルを読み込む
const app = require('./app'); // アプリケーション
const connectDB = require('./config/db'); // データベース接続
const { port } = require('./config/config'); // 設定からポート番号を取得

// サーバーを開始する非同期関数
const startServer = async () => {
  try {
    await connectDB(); // データベース接続を確立
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`); // サーバー起動メッセージを表示
    });
  } catch (error) {
    console.error('Error starting server:', error.message); // エラーメッセージを表示
    process.exit(1); // プロセスを終了
  }
};

// サーバーを起動
startServer(); // サーバー開始
