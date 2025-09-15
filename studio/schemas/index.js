// Studio に読み込むスキーマのエントリーポイント
// - 個別スキーマを集約し、sanity.config.js から参照されます。
// 各ドキュメント/オブジェクトのスキーマ定義を集約して読み込む
import article from './article'
import blockContent from './blockContent'

// Studio に登録するスキーマの配列
// - ここに追加した型のみが Studio で利用可能になります
export const schemaTypes = [article, blockContent]
