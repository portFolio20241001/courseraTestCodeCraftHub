// mongooseライブラリをインポート
const mongoose = require("mongoose");
// 環境変数を使用するためのdotenvをインポート
require("dotenv").config();

// MongoDBへの接続設定を行う非同期関数
const connectDB = async () => {
  try {

    console.log(process.env)

    // MongoDBに接続する
    // process.env.MONGODB_URIで環境変数からMongoDBの接続URLを取得して接続する
    await mongoose.connect(process.env.MONGODB_URI, {
      // useNewUrlParserとuseUnifiedTopologyは最新のmongooseでは不要になったため削除
    });
    // 接続成功時にコンソールにメッセージを表示
    console.log("MongoDBに接続しました！");
  } catch (error) {
    // 接続エラーが発生した場合、エラーメッセージを表示
    console.error("MongoDB接続エラー:", error);
    // エラーが発生したらプロセスを終了させる
    process.exit(1);
  }
};

// 他のファイルでもこの関数を使用できるように、connectDB関数をエクスポート
module.exports = connectDB;
