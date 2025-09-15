export function renderPortableTextLite(body) {
  if (!Array.isArray(body)) return '';
  return body
    .filter((block) => block && block._type === 'block')
    .map((block) => {
      const text = (block.children || []).map((span) => span?.text || '').join('');
      return `<p>${escapeHtml(text)}</p>`;
    })
    .join('\n');
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}