// 必要なモジュールをインポートします。
// Expressライブラリは、Node.js用のウェブアプリケーションフレームワークです。
// これを使って、APIのルーティングやリクエスト・レスポンスの処理を簡単に行うことができます。
const express = require('express');

// ExpressのRouterを使用して、個別のルート（エンドポイント）を定義します。
// ルーターは、アプリケーションのリクエスト処理をモジュール化するために使用します。
const router = express.Router();

// ユーザーに関する処理をまとめたコントローラーをインポートします。
// `userController`は、ユーザーの情報取得、追加、更新を処理する機能を持っています。
const userController = require('../controllers/userController');

// 認証に関する処理をまとめたミドルウェアをインポートします。
// `authMiddleware`は、リクエストが認証されているかどうかをチェックします。
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * ユーザーリストを取得するルートを定義します。
 * このエンドポイントは、認証されたユーザーが他のユーザーのリストを取得するために使用されます。
 * 
 * 使用例:
 * ```javascript
 * GET /users
 *  - 認証されたユーザーのみが、リスト形式でユーザー情報を取得できます。
 * ```
 */
router.get('/', authMiddleware, userController.getUsers); 
// `GET`リクエストを`/`のパスにマッピングします。
// `authMiddleware`を通過後、`userController.getUsers`関数がリクエストを処理します。
// このエンドポイントでは、認証されたユーザーのみがユーザーリストを取得できます。

/**
 * 新規ユーザーを追加するルートを定義します。
 * このエンドポイントは、認証されたユーザーが新しいユーザーを追加するために使用されます。
 * 
 * 使用例:
 * ```javascript
 * POST /users
 *  - リクエストボディに新規ユーザーの情報（名前、メールアドレスなど）を送信します。
 * ```
 */
router.post('/', authMiddleware, userController.addUser); 
// `POST`リクエストを`/`のパスにマッピングします。
// `authMiddleware`を通過後、`userController.addUser`関数がリクエストを処理します。
// このエンドポイントでは、新規ユーザーの情報をサーバーに送信して追加します。

/**
 * ユーザー情報を更新するルートを定義します。
 * このエンドポイントは、認証されたユーザーが特定のユーザー情報を更新するために使用されます。
 * 
 * 使用例:
 * ```javascript
 * PUT /users/:id
 *  - `id`には更新するユーザーのIDを指定します。
 *  - リクエストボディに更新したいユーザーの情報を送信します。
 * ```
 */
router.put('/:id', authMiddleware, userController.updateUser); 
// `PUT`リクエストを`/users/:id`のパスにマッピングします。
// `authMiddleware`を通過後、`userController.updateUser`関数がリクエストを処理します。
// このエンドポイントでは、指定した`id`のユーザー情報を更新します。

// ルーターをエクスポートします。
// 他のモジュール（例えば、アプリケーションのメインファイル）で、このルーターを利用できるようにします。
// これにより、ルートを他のモジュールで簡単にインポートして使えるようになります。
module.exports = router;
