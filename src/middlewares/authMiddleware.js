// 必要なモジュールをインポート
const jwt = require('jsonwebtoken'); // JWTトークンのライブラリをインポート
const { jwtSecret } = require('../config/config'); // JWTシークレットを設定からインポート
const logger = require('../logger'); // ログ用モジュールをインポート

/**
 * 認証ミドルウェアを定義
 * 
 * このミドルウェアは、リクエストヘッダーに含まれるJWTトークンを検証し、
 * 有効なトークンが存在すればリクエストオブジェクトにデコードされたユーザー情報を追加します。
 * トークンが無効または存在しない場合は、認証エラーを返します。
 * 
 * 使用例:
 * ```javascript
 * app.use('/protected-route', authenticate, (req, res) => {
 *   res.json({ success: true, message: 'You are authenticated!' });
 * });
 * ```
 */
const authenticate = (req, res, next) => {
  // リクエストヘッダーからトークンを取得
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>" の形式でトークンを取得

  // トークンが存在しない場合
  if (!token) {
    // トークンが提供されていない場合、認証エラーを返す
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    // トークンを検証し、ペイロード（ユーザー情報）を取得
    const decoded = jwt.verify(token, jwtSecret); // JWTトークンをシークレットで検証

    // ログにトークンとデコードされた情報を記録
    logger.info(`token: ${token}`);
    logger.info(`decoded: ${JSON.stringify(decoded, null, 2)}`);

    // デコードされたユーザー情報をリクエストオブジェクトに追加
    req.user = decoded;

    // 次のミドルウェアまたはルートハンドラーに進む
    next();
  } catch (error) {
    // トークンが無効な場合（例：署名が一致しない、期限切れなど）
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// ミドルウェアをエクスポート
module.exports = authenticate; // 他のモジュールで利用可能にする
