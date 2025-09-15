/*
  Sanity Portable Text を最小限で HTML に変換する軽量レンダラー
  - 対応ブロック: テキスト（段落/h2/h3/h4）と画像（asset.url のみ）
  - 対応マーク: strong（太字）, em（斜体）
  - 安全性: テキストは escapeHtml でエスケープして XSS を防止
  - 非対応: カスタムマーク/注釈（リンク等）、脚注、表、コードブロックなど
    → 必要になったら分岐を追加し、許容するタグだけを厳格に生成してください。
*/
export function renderPortableTextLite(body) {
  // 入力が配列でない場合は描画対象なしとして空文字を返す
  if (!Array.isArray(body)) return '';

  return body
    .map((block) => {
      if (!block) return '';

      // テキストブロック（_type === 'block'）の処理
      if (block._type === 'block') {
        const text = (block.children || [])
          .map((span) => {
            if (!span?.text) return '';
            // テキストは必ずエスケープしてからマーク（装飾）を適用
            let content = escapeHtml(span.text);
            if (Array.isArray(span.marks)) {
              // 太字（strong）、斜体（em）に対応
              if (span.marks.includes('strong')) content = `<strong>${content}</strong>`;
              if (span.marks.includes('em')) content = `<em>${content}</em>`;
            }
            return content;
          })
          .join('');

        const style = block.style || 'normal';
        // ブロックスタイルに応じて見出し/段落のタグを切り替える
        switch (style) {
          case 'h2':
            return `<h2 style="font-size: 24px; font-weight: 700; margin: 24px 0 12px 0;">${text}</h2>`;
          case 'h3':
            return `<h3 style="font-size: 20px; font-weight: 600; margin: 20px 0 10px 0;">${text}</h3>`;
          case 'h4':
            return `<h4 style="font-size: 18px; font-weight: 600; margin: 16px 0 8px 0;">${text}</h4>`;
          default:
            return `<p style="margin: 12px 0; line-height: 1.7;">${text}</p>`;
        }
      }

      // 画像ブロック（asset.url を想定）。装飾用途のため alt は空
      if (block._type === 'image' && block.asset?.url) {
        return `<img src="${block.asset.url}" alt="" style="width: 100%; border-radius: 6px; margin: 16px 0;" />`;
      }

      return '';
    })
    // 空要素を除外し、改行で連結して読みやすさを確保
    .filter(Boolean)
    .join('\n');
}

// HTML 特殊文字のエスケープを行うユーティリティ
// 文字列を <, >, & の3種について置換し、意図しない HTML 解釈を防ぐ
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
