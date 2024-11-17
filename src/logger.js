// ログ出力用のモジュールをインポートします。
// winstonは、ログ管理のための強力なライブラリで、様々な出力先やフォーマットをサポートしています。
// ここでは、`createLogger`, `format`, `transports`という3つの機能をインポートしています。
// - `createLogger`: ロガーを作成するための関数。
// - `format`: ログの出力形式を指定するためのオブジェクト。
// - `transports`: ログをどこに出力するか（コンソールやファイルなど）を設定するためのオブジェクト。

const { createLogger, format, transports } = require('winston'); // winstonライブラリをインポート

// ロガーの設定を定義します。
// `createLogger`を使用して、ログの出力方法やレベルを設定します。
// ログレベルには、'info', 'warn', 'error' などがあり、ここでは'info'以上のログを記録します。
// - `level: 'info'`: 'info'レベル以上のログを記録します。`'info'`, `'warn'`, `'error'` などのログレベルに対応します。
// - `format`: ログのフォーマットを設定します。`format.combine()`を使って複数のフォーマットを組み合わせています。
// - `timestamp()`: ログにタイムスタンプを追加します。ログが出力された日時を記録します。
// - `json()`: ログをJSON形式で出力します。これにより、後で簡単に解析や検索が可能になります。
// - `transports`: ログの出力先を指定します。ここではコンソールとファイルにログを出力しています。

const logger = createLogger({
  level: 'info', // ログレベルを設定（'info'以上のレベルを記録）
  format: format.combine(
    format.timestamp(), // ログにタイムスタンプを追加（例: "2024-11-17T10:00:00.000Z"）
    format.json() // JSON形式でログを出力（例: { "level": "info", "message": "Server started", "timestamp": "2024-11-17T10:00:00.000Z" }）
  ),
  transports: [
    new transports.Console(), // コンソールにログを出力
    new transports.File({ filename: 'logs/app.log' }), // 指定されたファイル（logs/app.log）にログを記録
  ],
});

// ロガーをエクスポートします。
// 他のモジュールでこのロガーを使用できるように、`logger`をエクスポートします。
// 例えば、他のモジュールで`require('./logger')`とすると、このロガーを使ってログを記録できます。

module.exports = logger; // 他のモジュールから利用可能にするためにエクスポート
