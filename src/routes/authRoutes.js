// 必要なモジュールをインポートします。
// Expressライブラリは、Node.js用のウェブアプリケーションフレームワークです。
// これを使って、APIのルーティングやリクエスト・レスポンスの処理を簡単に行うことができます。
const express = require('express');

// ExpressのRouterを使用して、個別のルート（エンドポイント）を定義します。
// ルーターは、アプリケーションのリクエスト処理をモジュール化するために使用します。
const router = express.Router();

// 認証に関する処理をまとめたコントローラーをインポートします。
// `authController`は、ユーザーのログインや登録を処理する機能を持っています。
const authController = require('../controllers/authController');

/**
 * ログインルートを定義します。
 * このエンドポイントは、ユーザーがログインまたは新規登録をするために使用されます。
 * 
 * 使用例:
 * ```javascript
 * POST /loginOrRegister
 *  - リクエストボディにメールアドレス、パスワード、ユーザー名などを送信します。
 * ```
 */
router.post('/loginOrRegister', authController.loginOrRegister); 
// `POST`リクエストを`/loginOrRegister`のパスにマッピングします。
// `authController.loginOrRegister`関数がリクエストを処理します。
// このエンドポイントでは、ユーザーのログインまたは新規登録を処理します。

// ルーターをエクスポートします。
// 他のモジュール（例えば、アプリケーションのメインファイル）で、このルーターを利用できるようにします。
// これにより、ルートを他のモジュールで簡単にインポートして使えるようになります。
module.exports = router;
