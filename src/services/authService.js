// 必要なモジュールをインポート
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // ユーザーモデルをインポート
const { jwtSecret } = require('../config/config'); // JWTシークレットをインポート

// ユーザー登録処理
const register = async (name, email, password) => {
  // すでに同じメールアドレスのユーザーが存在するか確認
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('このメールアドレスはすでに使われています');
  }

  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);

  // 新規ユーザーを作成
  const newUser = new User({
    name,
    email,
    password: hashedPassword, // ハッシュ化したパスワードを保存
  });

  // ユーザーをデータベースに保存
  await newUser.save(); // ユーザー保存処理

  return newUser; // 保存したユーザーを返す
};

// ログイン処理
const login = async (email, password) => {
  // メールアドレスでユーザーを検索
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('ユーザーが見つかりません');
  }

  // パスワードが正しいか確認
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('パスワードが間違っています');
  }

  // JWTトークンを生成して返す
  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
  return token; // トークンを返す
};

// エクスポート
module.exports = { register, login };
