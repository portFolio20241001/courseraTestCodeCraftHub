// 必要なモジュールをインポートします。
// `User`は、ユーザーモデルで、MongoDBのデータベースからユーザー情報を取得、追加、更新するために使用します。
// `bcryptjs`は、パスワードをハッシュ化して安全に保存するためのライブラリです。
// `logger`は、ログを記録するためのモジュールです。
const User = require('../models/User'); // ユーザーモデルをインポート
const bcrypt = require('bcryptjs'); // パスワードのハッシュ化に使用するモジュール
const logger = require('../logger');

// ユーザーリストを取得する関数
/**
 * データベースからすべてのユーザー情報を取得する関数です。
 * 
 * 使用例:
 * ```javascript
 * const users = await getUsers();
 * console.log(users); // すべてのユーザー情報が配列で返されます
 * ```
 * 
 * @returns {Array} ユーザーのリスト
 */
const getUsers = async () => {
  // データベースからすべてのユーザーを取得
  return await User.find(); // すべてのユーザーを取得して返す
};

// ユーザーをメールアドレスで検索する関数
/**
 * メールアドレスを使ってユーザー情報を検索します。
 * 
 * 使用例:
 * ```javascript
 * const user = await getUserByEmail('user@example.com');
 * console.log(user); // 指定したメールアドレスを持つユーザーが返されます
 * ```
 * 
 * @param {string} email - 検索するメールアドレス
 * @returns {Object|null} メールアドレスに一致するユーザー情報、または存在しない場合はnull
 */
const getUserByEmail = async (email) => {
  // メールアドレスでユーザーを検索
  return await User.findOne({ email }); // 指定されたメールアドレスを持つユーザーを返す
};

// ユーザーを新規追加する関数
/**
 * 新しいユーザーをデータベースに追加します。
 * ユーザーのメールアドレス、名前、パスワードを指定して、新しいユーザーを作成します。
 * 
 * 使用例:
 * ```javascript
 * const newUser = await addUser({ email: 'newuser@example.com', password: 'password123', name: 'New User' });
 * console.log(newUser); // 新規作成されたユーザー情報が返されます
 * ```
 * 
 * @param {Object} userData - 新規ユーザーのデータ（メールアドレス、名前、パスワード）
 * @returns {Object} 作成された新しいユーザーの情報
 */
const addUser = async ({ email, password, name }) => {
  // 新しいユーザーを作成
  const newUser = new User({ email, password, name }); // ユーザーオブジェクトを作成

  logger.info(`addUser_newUser1: ${newUser}`); // ここではハッシュ化されていない

  // ユーザーをデータベースに保存
  await newUser.save(); // ユーザー保存処理

  logger.info(`addUser_newUser2: ${newUser}`); // ここではパスワードがハッシュ化されている

  return newUser; // 保存したユーザーを返す
};

// ユーザー情報を更新する関数
/**
 * ユーザー情報（名前、メールアドレス、パスワード）を更新します。
 * パスワードは、セキュリティのためにハッシュ化されます。
 * 
 * 使用例:
 * ```javascript
 * const updatedUser = await updateUser(userId, { name: 'Updated User', email: 'updated@example.com', password: 'newpassword123' });
 * console.log(updatedUser); // 更新されたユーザー情報が返されます
 * ```
 * 
 * @param {string} id - 更新するユーザーのID
 * @param {Object} userData - 更新するユーザーの情報（名前、メールアドレス、パスワード）
 * @returns {Object} 更新されたユーザー情報
 */
const updateUser = async (id, { name, email, password }) => {
  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10); // パスワードを安全に保存するためハッシュ化

  // ユーザーをIDで検索し、更新する
  const user = await User.findByIdAndUpdate(
    id, 
    { name, email, password: hashedPassword }, 
    { new: true } // 更新後のデータを返すよう指定
  );
  return user; // 更新されたユーザーを返す
};

// コントローラ関数をエクスポートします。
// このモジュール内で定義されたすべての関数（getUsers、getUserByEmail、addUser、updateUser）を他のモジュールで使用できるようにエクスポートします。
module.exports = { getUsers, getUserByEmail, addUser, updateUser };
