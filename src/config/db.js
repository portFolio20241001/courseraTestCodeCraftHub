// mongooseライブラリをインポートします。
// mongooseはMongoDBとNode.jsの間のデータ操作を簡便に行えるORMです。
const mongoose = require("mongoose");

// 環境変数を使用するためのdotenvをインポートします。
// .envファイルに保存された環境変数をアプリケーション内で利用できるようにします。
require("dotenv").config();

/**
 * MongoDBへの接続設定を行う非同期関数
 * 
 * この関数はMongoDBに接続するための処理を行い、接続が成功したかどうかを確認します。
 * 
 * 使用例:
 * ```javascript
 * connectDB();
 * ```
 */
const connectDB = async () => {
  try {
    // process.envオブジェクトを利用して環境変数を取得
    // 環境変数MONGODB_URIにはMongoDBの接続URLが保存されています。
    // process.env.MONGODB_URIでこのURLを取得します。
    console.log(process.env);  // 現在の環境変数をコンソールに表示

    // MongoDBに接続する処理
    // mongoose.connect()を使用してMongoDBに接続します。
    // 接続URLは環境変数から取得したものを利用します。
    await mongoose.connect(process.env.MONGODB_URI, {
      // useNewUrlParserとuseUnifiedTopologyは最新のmongooseでは不要になったため削除されています。
      // 以前はこれらを設定して接続を確立していましたが、mongooseの新しいバージョンでは不要です。
    });

    // 接続成功時にコンソールにメッセージを表示
    console.log("MongoDBに接続しました！");

  } catch (error) {
    // 接続エラーが発生した場合、エラーメッセージを表示
    console.error("MongoDB接続エラー:", error);

    // エラーが発生した場合、プロセスを終了させます。
    // process.exit(1)はエラーが発生した時にNode.jsのプロセスを強制終了させます。
    process.exit(1);
  }
};

// 他のファイルでもこの関数を利用できるように、connectDB関数をエクスポート
// 他のモジュール（例えば、サーバー起動時に接続を行いたい場合など）からこの関数を呼び出すことができます。
module.exports = connectDB;
