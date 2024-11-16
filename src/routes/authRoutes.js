// 必要なモジュールをインポート
const express = require('express'); // Expressライブラリをインポート
const router = express.Router(); // ルーターを作成
const authController = require('../controllers/authController'); // 認証コントローラーをインポート

// ログインルートを定義
router.post('/loginOrRegister', authController.loginOrRegister); // POSTリクエストを`/login`にマッピング

// ルーターをエクスポート
module.exports = router; // 他のモジュールで利用可能にする
