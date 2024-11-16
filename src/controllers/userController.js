// 必要なモジュールとサービスをインポート
const userService = require('../services/userService'); // ユーザーサービスをインポート
const { responseFormatter } = require('../utils/responseFormatter'); // レスポンスフォーマッタをインポート

// ユーザーリストを取得する処理
const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers(); // ユーザーサービスからデータを取得
    res.status(200).json(responseFormatter(true, 'Users retrieved', users)); // 成功レスポンスを返す
  } catch (error) {
    res.status(500).json(responseFormatter(false, error.message)); // エラーレスポンスを返す
  }
};

// ユーザーを追加する処理 (POST)
const addUser = async (req, res) => {
  const { name, email, password } = req.body;

  console.log('ポイント')

  console.log('req.body: ',req.body)

  // 必須フィールドの検証
  if (!name || !email || !password) {
    return res.status(400).json(responseFormatter(false, 'All fields are required'));
  }

  try {
    const newUser = await userService.addUser({ name, email, password });
    res.status(201).json(responseFormatter(true, 'User added successfully', newUser)); // ユーザー追加成功レスポンス
  } catch (error) {
    res.status(500).json(responseFormatter(false, error.message)); // エラーレスポンスを返す
  }
};

// ユーザー情報を更新する処理 (PUT)
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  // 必須フィールドの検証
  if (!name && !email && !password) {
    return res.status(400).json(responseFormatter(false, 'At least one field is required'));
  }

  try {
    const updatedUser = await userService.updateUser(id, { name, email, password });
    if (!updatedUser) {
      return res.status(404).json(responseFormatter(false, 'User not found'));
    }
    res.status(200).json(responseFormatter(true, 'User updated successfully', updatedUser)); // 更新成功レスポンス
  } catch (error) {
    res.status(500).json(responseFormatter(false, error.message)); // エラーレスポンスを返す
  }
};

// コントローラー関数をエクスポート
module.exports = { getUsers, addUser, updateUser }; // 他のモジュールで利用可能にする
