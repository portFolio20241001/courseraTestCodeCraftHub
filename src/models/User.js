// 必要なモジュールをインポート
const mongoose = require('mongoose'); // MongoDBのMongooseライブラリをインポート
const bcrypt = require('bcryptjs'); // パスワードのハッシュ化ライブラリをインポート

// ユーザースキーマを定義
const userSchema = new mongoose.Schema({
  name: {
    type: String, // データ型は文字列
    required: true, // 必須フィールド
  },
  email: {
    type: String, // データ型は文字列
    required: true, // 必須フィールド
    unique: true, // 一意でなければならない
  },
  password: {
    type: String, // データ型は文字列
    required: true, // 必須フィールド
  },
},
{ 
  collection: 'custom_users' 
}
);

// パスワードをハッシュ化するミドルウェアを定義
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // パスワードが変更されていない場合はスキップ
  }
  this.password = await bcrypt.hash(this.password, 10); // パスワードをハッシュ化
  next(); // 次のミドルウェアに進む
});

// スキーマからモデルを作成
const User = mongoose.model('User', userSchema);

// モデルをエクスポート
module.exports = User; // 他のモジュールで利用可能にする
