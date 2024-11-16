// エラーハンドリングミドルウェアを定義
const errorHandler = (err, req, res, next) => {
    // ステータスコードを設定（存在しない場合は500）
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
    // エラーレスポンスを送信
    res.status(statusCode).json({
      success: false, // 成功フラグ
      message: err.message || 'Internal Server Error', // エラーメッセージ
    });
  
    next(); // 次のミドルウェアに進む
  };
  
  // ハンドラをエクスポート
  module.exports = errorHandler; // 他のモジュールで利用可能にする
  