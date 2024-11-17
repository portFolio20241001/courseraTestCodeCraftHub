// エラーハンドリングミドルウェアを定義します。
// このミドルウェアは、アプリケーション内で発生したエラーをキャッチし、適切なエラーレスポンスをクライアントに返します。
// Express.jsのエラーハンドリングにおいて、エラーが発生した場合に最後に呼ばれるミドルウェアとして使用されます。

/**
 * エラーハンドリングミドルウェア
 * 
 * 使用例:
 * ```javascript
 * // Expressのアプリケーションでエラーハンドリングミドルウェアを使う
 * const express = require('express');
 * const app = express();
 * const errorHandler = require('./errorHandler');
 * 
 * app.use(errorHandler);  // このミドルウェアは、全てのルートの後に呼ばれます。
 * ```
 * 
 * @param {Object} err - 発生したエラーオブジェクト
 * @param {Object} req - HTTPリクエストオブジェクト
 * @param {Object} res - HTTPレスポンスオブジェクト
 * @param {Function} next - 次のミドルウェアを呼び出す関数
 */
const errorHandler = (err, req, res, next) => {
  // ステータスコードを設定します。
  // レスポンスが200（成功）の場合、500（サーバーエラー）に変更します。
  // それ以外の場合、既存のステータスコードを使用します。
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // エラーレスポンスを送信します。
  // レスポンスには、エラーの成功フラグ、エラーメッセージが含まれます。
  res.status(statusCode).json({
    success: false, // 成功フラグ（falseでエラーを示す）
    message: err.message || 'Internal Server Error', // エラーメッセージ（提供されていない場合はデフォルトメッセージを使用）
  });

  next(); // 次のミドルウェアまたは処理に進む（エラーハンドリングが終了したことを示す）
};

// このエラーハンドリングミドルウェアをエクスポートします。
// 他のモジュールで使用できるようにして、アプリケーションのエラーハンドリングを一元化します。
module.exports = errorHandler; // 他のモジュールで利用可能にする
