// レスポンスをフォーマットするユーティリティ関数
const responseFormatter = (success, message, data = null) => {
  return {
    success, // 成功フラグ
    message, // メッセージ
    data,    // データ（オプション）
  };
};

// エクスポート
module.exports = { responseFormatter };
