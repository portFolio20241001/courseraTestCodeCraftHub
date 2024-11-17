// 必要なモジュールをインポートします。
// `bcryptjs`は、パスワードのハッシュ化および検証を行うライブラリです。
// `jsonwebtoken`は、JWT（JSON Web Token）の生成および検証を行うライブラリです。
// `User`はユーザーモデルで、データベースからユーザー情報を取得するために使用します。
// `jwtSecret`はJWTトークンを署名するために使用するシークレットキーです。
// `logger`は、ログを記録するためのロガーです。
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // ユーザーモデルをインポート
const { jwtSecret } = require('../config/config'); // JWTシークレットをインポート
const logger = require('../logger');

/**
 * ユーザーのログイン処理を行います。
 * メールアドレスとパスワードを元にユーザーを認証し、成功した場合にはJWTトークンを返します。
 * 
 * 使用例:
 * ```javascript
 * const token = await login('user@example.com', 'password123');
 * console.log(token); // 有効なJWTトークンが返されます
 * ```
 * 
 * @param {string} email - ユーザーのメールアドレス
 * @param {string} password - ユーザーのパスワード
 * @returns {string} JWTトークン
 * @throws {Error} ユーザーが見つからない場合やパスワードが間違っている場合にエラーを投げます
 */
const login = async (email, password) => {
  // メールアドレスでユーザーを検索します。
  // `User.findOne`はデータベースからメールアドレスに一致するユーザーを取得します。
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('ユーザーが見つかりません'); // ユーザーが見つからない場合はエラーをスロー
  }

  // パスワードが正しいか確認します。
  // `bcrypt.compare`は、リクエストされたパスワードと保存されているハッシュ化されたパスワードを比較します。
  logger.info(`login_password: ${password}、user.password: ${user.password}`);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('パスワードが間違っています'); // パスワードが一致しない場合はエラーをスロー
  }

  // JWTトークンを生成して返します。
  // `jwt.sign`は、指定したペイロード（ここではユーザーID）を使ってトークンを生成します。
  // `expiresIn: '1h'`は、トークンの有効期限を1時間に設定します。
  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
  return token; // 生成したトークンを返します。
};

// エクスポートします。
// `login`関数を他のモジュールで使用できるようにエクスポートします。
module.exports = { login };
