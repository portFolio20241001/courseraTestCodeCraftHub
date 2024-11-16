// アプリケーションの設定を定義
module.exports = {
    port: process.env.PORT || 5000, // ポート番号を取得、デフォルトは5000
    jwtSecret: process.env.JWT_SECRET, // JWTトークン用の秘密鍵
    jwtExpiresIn: '1h', // JWTトークンの有効期限
  };
  