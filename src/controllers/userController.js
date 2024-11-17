// 必要なモジュールとサービスをインポート
const userService = require('../services/userService'); // ユーザーサービスをインポート
const { responseFormatter } = require('../utils/responseFormatter'); // レスポンスフォーマッタをインポート

/**
 * ユーザーリストを取得する処理
 * 
 * この関数は、ユーザーサービスから全ユーザーのリストを取得し、成功した場合はそのデータを返します。
 * エラーが発生した場合は、エラーメッセージとともに500エラーを返します。
 * 
 * 使用例:
 * ```javascript
 * app.get('/users', getUsers);
 * ```
 */
const getUsers = async (req, res) => {
  try {
    // ユーザーサービスからデータを取得
    const users = await userService.getUsers();
    // 成功レスポンスを返す
    res.status(200).json(responseFormatter(true, 'Users retrieved', users));
  } catch (error) {
    // エラーレスポンスを返す
    res.status(500).json(responseFormatter(false, error.message));
  }
};

/**
 * ユーザーを追加する処理 (POST)
 * 
 * この関数は、新しいユーザーをリクエストボディから取得して追加します。
 * もし必須フィールドが欠けている場合は400エラーを返し、すべてが正しく入力されていればユーザーを追加します。
 * エラーが発生した場合は、エラーメッセージとともに500エラーを返します。
 * 
 * 使用例:
 * ```javascript
 * app.post('/users', addUser);
 * ```
 */
const addUser = async (req, res) => {
  // リクエストボディからユーザー情報を取得
  const { name, email, password } = req.body;

  // 必須フィールドの検証
  if (!name || !email || !password) {
    // 欠けている情報がある場合は400エラーを返す
    return res.status(400).json(responseFormatter(false, 'All fields are required'));
  }

  try {
    // ユーザーを追加
    const newUser = await userService.addUser({ name, email, password });
    // ユーザー追加成功レスポンスを返す
    res.status(201).json(responseFormatter(true, 'User added successfully', newUser));
  } catch (error) {
    // エラーレスポンスを返す
    res.status(500).json(responseFormatter(false, error.message));
  }
};

/**
 * ユーザー情報を更新する処理 (PUT)
 * 
 * この関数は、指定されたユーザーIDに対応するユーザー情報を更新します。
 * 更新するフィールド（name、email、password）のいずれかがリクエストに含まれているかを検証し、
 * それに基づいて更新を行います。ユーザーが見つからない場合は404エラーを返し、成功すれば更新されたユーザー情報を返します。
 * 
 * 使用例:
 * ```javascript
 * app.put('/users/:id', updateUser);
 * ```
 */
const updateUser = async (req, res) => {
  // リクエストパラメータからユーザーIDを取得
  const { id } = req.params;
  // リクエストボディから更新するユーザー情報を取得
  const { name, email, password } = req.body;

  // 必須フィールドの検証（少なくとも1つのフィールドが提供されているか）
  if (!name && !email && !password) {
    // 更新する情報が何もない場合は400エラーを返す
    return res.status(400).json(responseFormatter(false, 'At least one field is required'));
  }

  try {
    // ユーザー情報を更新
    const updatedUser = await userService.updateUser(id, { name, email, password });
    // ユーザーが見つからなかった場合は404エラーを返す
    if (!updatedUser) {
      return res.status(404).json(responseFormatter(false, 'User not found'));
    }
    // 更新成功レスポンスを返す
    res.status(200).json(responseFormatter(true, 'User updated successfully', updatedUser));
  } catch (error) {
    // エラーレスポンスを返す
    res.status(500).json(responseFormatter(false, error.message));
  }
};

// コントローラー関数をエクスポート
module.exports = { getUsers, addUser, updateUser }; // 他のモジュールで利用可能にする
