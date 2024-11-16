// 必要なモジュールをインポート
const express = require('express'); // Expressライブラリ
const bodyParser = require('body-parser'); // リクエストボディを解析
const errorHandler = require('./utils/errorHandler'); // エラーハンドリング
const authRoutes = require('./routes/authRoutes'); // 認証ルート
const userRoutes = require('./routes/userRoutes'); // ユーザールート

// アプリケーションを初期化
const app = express();

// ミドルウェアを設定
app.use(bodyParser.json()); // JSONリクエストを解析
app.use('/api/auth', authRoutes); // 認証ルートを設定
app.use('/api/users', userRoutes); // ユーザールートを設定
app.use(errorHandler); // エラーハンドリングミドルウェアを使用

// アプリケーションをエクスポート
module.exports = app; // 他のモジュールで利用可能にする
