// 必要なモジュールとサービスをインポート
const authService = require('../services/authService'); // 認証サービスをインポート
const userService = require('../services/userService'); // ユーザーサービスをインポート
const { responseFormatter } = require('../utils/responseFormatter'); // レスポンスフォーマッタをインポート

// ユーザーのログインまたは新規登録処理
const loginOrRegister = async (req, res) => {
  const { email, password, name } = req.body; // リクエストボディからメール、パスワード、名前を取得

  try {
    // ユーザーがすでに登録されているか確認
    const existingUser = await userService.getUserByEmail(email); // ユーザーサービスでメールからユーザーを検索

    if (existingUser) {
      // ユーザーが存在する場合、ログイン処理
      const token = await authService.login(email, password); // 認証サービスでログイン処理を実行
      return res.status(200).json(responseFormatter(true, 'Login successful', { token })); // 成功レスポンスを返す
    } else {
      // ユーザーが存在しない場合、新規登録処理
      const newUser = await userService.addUser({ email, password, name }); // ユーザーを新規登録
      const token = await authService.login(newUser.email, password); // 新規登録後にログイン処理を実行
      return res.status(201).json(responseFormatter(true, 'User registered and logged in successfully', { token })); // 新規登録とログイン成功レスポンスを返す
    }
  } catch (error) {
    // エラー処理
    res.status(500).json(responseFormatter(false, error.message)); // エラーレスポンスを返す
  }
};

// コントローラー関数をエクスポート
module.exports = { loginOrRegister };
