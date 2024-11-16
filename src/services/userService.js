// 必要なモジュールをインポート
const User = require('../models/User'); // ユーザーモデルをインポート
const bcrypt = require('bcryptjs');

// ユーザーリストを取得する関数
const getUsers = async () => {
  // データベースからすべてのユーザーを取得
  return await User.find(); // すべてのユーザーを取得して返す
};

// ユーザーをメールアドレスで検索する関数
const getUserByEmail = async (email) => {
  // メールアドレスでユーザーを検索
  return await User.findOne({ email });
};

// ユーザーを新規追加する関数
const addUser = async ({ email, password, name }) => {
  // 新しいユーザーを作成
  const newUser = new User({ email, password, name });
  
  // ユーザーをデータベースに保存
  await newUser.save(); // ユーザー保存処理

  return newUser; // 保存したユーザーを返す
};

// ユーザー情報を更新する関数
const updateUser = async (id, { name, email, password }) => {

  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);

  // ユーザーをIDで検索し、更新する
  const user = await User.findByIdAndUpdate(id, { name, email, password: hashedPassword }, { new: true });
  return user; // 更新されたユーザーを返す
};

// コントローラ関数をエクスポート
module.exports = { getUsers, getUserByEmail, addUser, updateUser };
