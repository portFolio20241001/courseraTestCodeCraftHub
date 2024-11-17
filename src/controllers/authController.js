// 必要なモジュールとサービスをインポート
const authService = require('../services/authService'); // 認証サービスをインポート
const userService = require('../services/userService'); // ユーザーサービスをインポート
const { responseFormatter } = require('../utils/responseFormatter'); // レスポンスフォーマッタをインポート
const logger = require('../logger'); // ロギング機能をインポート

/**
 * ユーザーのログインまたは新規登録処理
 * 
 * この関数は、ユーザーがすでに登録されているかどうかを確認し、
 * 登録されている場合はログインを行い、登録されていない場合は新規登録を行います。
 * 新規登録後に自動的にログイン処理が実行され、トークンが発行されます。
 * 
 * 使用例:
 * ```javascript
 * app.post('/login-or-register', loginOrRegister);
 * ```
 */
const loginOrRegister = async (req, res) => {

  logger.info('loginOrRegister accessed'); // アクセスをログに記録

  // リクエストボディから必要なデータ（email, password, name）を取得
  const { email, password, name } = req.body;

  try {
    //
    // ユーザーがすでに登録されているか確認
    //
    const existingUser = await userService.getUserByEmail(email); // メールアドレスでユーザーを検索

    if (existingUser) {
      // ユーザーが存在する場合、ログイン処理
      const token = await authService.login(email, password); // ログイン処理を実行

      // ログイン成功時のレスポンスを返す
      const response = res.status(200).json(responseFormatter(true, 'Login successful', { token }));
      
      // ログイン成功をログに記録
      logger.info('Login successful', response);

      return response; // レスポンスを返す
    } else {
      //
      // ユーザーが存在しない場合、新規登録処理
      //
      const newUser = await userService.addUser({ email, password, name }); // 新規ユーザーを追加
      const token = await authService.login(newUser.email, password); // 新規登録後にログイン処理を実行

      // 新規登録とログイン成功のレスポンスを返す
      return res.status(201).json(responseFormatter(true, 'User registered and logged in successfully', { token }));
    }
  } catch (error) {
    // エラーが発生した場合、500エラーを返す
    res.status(500).json(responseFormatter(false, error.message)); // エラーレスポンスを返す
  }
};

// コントローラー関数をエクスポート
module.exports = { loginOrRegister };
