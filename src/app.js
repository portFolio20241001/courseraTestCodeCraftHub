// 必要なモジュールをインポートします。
// ExpressはWebアプリケーションのフレームワークで、サーバーやルートの管理を簡単にします。
// body-parserは、HTTPリクエストのボディ部分（データ）を解析するためのライブラリです。
// errorHandlerは、カスタムエラーハンドリング用のミドルウェアで、エラー発生時に適切なレスポンスを返します。
// authRoutesは、認証関連のルート（例：ユーザーログイン）を管理するモジュールです。
// userRoutesは、ユーザー関連のルート（例：ユーザー情報の取得）を管理するモジュールです。

const express = require('express'); // Expressライブラリをインポート（Webアプリケーション構築用）
const bodyParser = require('body-parser'); // HTTPリクエストのボディを解析するためのライブラリ
const errorHandler = require('./utils/errorHandler'); // カスタムエラーハンドリングミドルウェア
const authRoutes = require('./routes/authRoutes'); // 認証関連のルートを定義したモジュール
const userRoutes = require('./routes/userRoutes'); // ユーザー関連のルートを定義したモジュール



// アプリケーションを初期化します。
// express()でアプリケーションインスタンスを作成します。
// このインスタンスを使ってルート設定やミドルウェアを定義していきます。

const app = express(); // Expressアプリケーションを作成



// ミドルウェアを設定します。
// ミドルウェアは、リクエストを処理する前に実行されるコードです。
// 各ミドルウェアの役割を順番に設定していきます。

/**
 * リクエストボディがJSON形式の場合、その内容を解析するミドルウェアを追加します。
 * body-parserは、リクエストのボディ（JSONデータ）を自動的にパースして、
 * `req.body`にデータを格納するため、後続の処理で簡単にアクセスできるようになります。
 * 
 * 使用例:
 * クライアントが次のようにPOSTリクエストを送信すると：
 * ```json
 * {
 *   "email": "user@example.com",
 *   "password": "password123"
 * }
 * ```
 * サーバー側で`req.body.email`や`req.body.password`を利用できます。
 */
app.use(bodyParser.json()); // リクエストボディがJSON形式の場合に解析するミドルウェアを追加



// "/api/auth"に関連するルートを設定します。
// ここでは、認証に関連するAPI（例：ログイン、サインアップなど）を処理するルートを設定します。
// authRoutesモジュールを使って、認証に関するリクエストを処理します。
// このルートを使うと、認証機能（例：ログイン処理など）を簡単に扱うことができます。

app.use('/api/auth', authRoutes); // "/api/auth"に関連するルートを設定（例: ユーザーログイン）



// "/api/users"に関連するルートを設定します。
// ここでは、ユーザーに関する情報を扱うAPI（例：ユーザー情報の取得、更新など）を処理するルートを設定します。
// userRoutesモジュールを使って、ユーザーに関するリクエストを処理します。
// このルートを使うと、ユーザー管理機能（例：ユーザー情報取得など）を簡単に実装できます。

app.use('/api/users', userRoutes); // "/api/users"に関連するルートを設定（例: ユーザー情報の取得）



// エラーハンドリング用のミドルウェアを設定します。
// エラーが発生した場合、このミドルウェアが呼び出され、エラーメッセージをクライアントに返します。
// 他のルートやミドルウェアで発生したエラーは、このエラーハンドリングミドルウェアが捕まえ、処理します。

app.use(errorHandler); // エラーハンドリング用のミドルウェアを設定



// アプリケーションをエクスポートします。
// このアプリケーション設定を他のモジュールで使えるようにエクスポートします。
// 他のファイルでインポートして使用することができます。

module.exports = app; // 他のモジュールから利用できるようにエクスポート
