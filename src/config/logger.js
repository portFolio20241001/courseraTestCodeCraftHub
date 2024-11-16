// ログ出力用のモジュールをインポート
const { createLogger, format, transports } = require('winston'); // winstonライブラリをインポート

// ロガーの設定を定義
const logger = createLogger({
  level: 'info', // ログレベルを設定
  format: format.combine(
    format.timestamp(), // タイムスタンプを追加
    format.json() // JSON形式でログを出力
  ),
  transports: [
    new transports.Console(), // コンソールに出力
    new transports.File({ filename: 'logs/app.log' }), // ファイルに出力
  ],
});

// ロガーをエクスポート
module.exports = logger; // 他のモジュールで利用可能にする
