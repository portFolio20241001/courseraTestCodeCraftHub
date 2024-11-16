// 必要なモジュールをインポート
const jwt = require('jsonwebtoken'); // JWTトークンのライブラリをインポート
const { jwtSecret } = require('../config/config'); // JWTシークレットを設定からインポート

// 認証ミドルウェアを定義
const authenticate = (req, res, next) => {
  // リクエストヘッダーからトークンを取得
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    // トークンが存在しない場合、認証エラーを返す
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    // トークンを検証し、ペイロードを取得
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // デコードされたユーザー情報をリクエストに追加
    next(); // 次のミドルウェアまたはルートハンドラーに進む
  } catch (error) {
    // トークン検証エラーの場合
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// ミドルウェアをエクスポート
module.exports = authenticate; // 他のモジュールで利用可能にする
