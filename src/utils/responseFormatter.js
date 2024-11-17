// レスポンスをフォーマットするユーティリティ関数
const responseFormatter = (success, message, data = null) => {
  return {
    success, // 成功フラグ（true: 成功, false: 失敗）
    message, // APIからのレスポンスメッセージ
    data,    // 任意のデータ（オプション, デフォルト値はnull）
  };
};

// エクスポート
module.exports = { responseFormatter }; // 他のモジュールで利用可能にする
