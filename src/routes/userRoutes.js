// 必要なモジュールをインポート
const express = require('express'); // Expressライブラリをインポート
const router = express.Router(); // ルーターを作成
const userController = require('../controllers/userController'); // ユーザーコントローラーをインポート
const authMiddleware = require('../middlewares/authMiddleware'); // 認証ミドルウェアをインポート

// ユーザーリスト取得ルートを定義
router.get('/', authMiddleware, userController.getUsers); // GETリクエストを`/`にマッピング

// ユーザー追加ルートを定義 (POSTリクエスト)
router.post('/', authMiddleware, userController.addUser); // 新規ユーザーの追加

// ユーザー更新ルートを定義 (PUTリクエスト)
router.put('/:id', authMiddleware, userController.updateUser); // ユーザー情報の更新

// ルーターをエクスポート
module.exports = router; // 他のモジュールで利用可能にする
