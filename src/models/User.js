// 必要なモジュールをインポート
const mongoose = require('mongoose'); // MongoDBのMongooseライブラリをインポート
const bcrypt = require('bcryptjs'); // パスワードのハッシュ化ライブラリをインポート

/**
 * ユーザースキーマの定義
 * ユーザー情報を管理するためのMongooseスキーマを作成します。
 * 
 * - name: ユーザーの名前（必須フィールド）
 * - email: ユーザーのメールアドレス（必須、一意）
 * - password: ユーザーのパスワード（必須、ハッシュ化される）
 *
 * 使用例:
 * ```javascript
 * const newUser = new User({
 *   name: 'Taro Yamada',
 *   email: 'taro.yamada@example.com',
 *   password: 'securepassword123',
 * });
 * await newUser.save();
 * ```
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String, // データ型は文字列
      required: true, // このフィールドは必須
    },
    email: {
      type: String, // データ型は文字列
      required: true, // このフィールドは必須
      unique: true, // 他のユーザーと同じ値を許容しない
    },
    password: {
      type: String, // データ型は文字列
      required: true, // このフィールドは必須
    },
  },
  {
    collection: 'custom_users', // このスキーマで作成されるコレクション名を指定
  }
);

/**
 * 保存前のパスワードをハッシュ化するミドルウェア
 * 
 * このミドルウェアは、`save`イベントが発生する前に実行されます。
 * パスワードが新規作成または変更されている場合にのみ実行されます。
 * 
 * 使用例:
 * ```javascript
 * const user = new User({
 *   name: 'John Doe',
 *   email: 'john.doe@example.com',
 *   password: 'mypassword',
 * });
 * await user.save(); // パスワードが自動でハッシュ化されて保存される
 * ```
 */
userSchema.pre('save', async function (next) {
  // パスワードが変更されていない場合は何もしない
  if (!this.isModified('password')) {
    return next(); // 次の処理に進む
  }

  // パスワードをハッシュ化（bcryptを使用）
  this.password = await bcrypt.hash(this.password, 10); // ソルト値10を指定してハッシュ化
  next(); // 次のミドルウェアまたは保存処理に進む
});

/**
 * ユーザーモデルの作成
 * 
 * `User`は、ユーザー情報を操作するためのMongooseモデルです。
 * このモデルを使用して、データベースにCRUD操作を実行できます。
 * 
 * 使用例:
 * ```javascript
 * const users = await User.find(); // 全ユーザーを取得
 * const user = await User.findOne({ email: 'example@example.com' }); // 特定のユーザーを検索
 * ```
 */
const User = mongoose.model('User', userSchema); // Mongooseスキーマをモデルに変換

/**
 * モデルのエクスポート
 * 
 * 他のモジュールで`User`モデルを使用できるようにします。
 * 
 * 使用例:
 * ```javascript
 * const User = require('./models/User');
 * const user = await User.findOne({ email: 'test@example.com' });
 * ```
 */
module.exports = User; // モジュールとしてエクスポート
