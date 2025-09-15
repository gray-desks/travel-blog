export function renderPortableTextLite(body) {
  if (!Array.isArray(body)) return '';

  return body
    .map((block) => {
      if (!block) return '';

      // Handle text blocks
      if (block._type === 'block') {
        const text = (block.children || []).map((span) => {
          if (!span?.text) return '';

          let content = escapeHtml(span.text);

          // Handle basic marks
          if (span.marks && Array.isArray(span.marks)) {
            if (span.marks.includes('strong')) content = `<strong>${content}</strong>`;
            if (span.marks.includes('em')) content = `<em>${content}</em>`;
          }

          return content;
        }).join('');

        // Handle different block styles
        const style = block.style || 'normal';
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

      // Handle image blocks
      if (block._type === 'image' && block.asset) {
        const imageUrl = block.asset.url || (block.asset._ref && `https://cdn.sanity.io/images/${getProjectId()}/${getDataset()}/${block.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`);
        if (imageUrl) {
          return `<img src="${imageUrl}" alt="" style="width: 100%; border-radius: 6px; margin: 16px 0;" />`;
        }
      }

      // Handle affiliate blocks (simple link)
      if (block._type === 'affiliate' && block.url) {
        const title = block.title || `${block.service} で見る`;
        return `<div style="margin: 20px 0; padding: 16px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #007bff;">
          <a href="${escapeHtml(block.url)}" target="_blank" rel="noopener noreferrer" style="color: #007bff; text-decoration: underline; font-weight: 600;">
            ${escapeHtml(title)}
          </a>
          ${block.description ? `<p style="margin: 8px 0 0 0; color: #666; font-size: 14px;">${escapeHtml(block.description)}</p>` : ''}
        </div>`;
      }

      return '';
    })
    .filter(Boolean)
    .join('\n');
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Helper functions for image URL construction (fallback)
function getProjectId() {
  return process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
}

function getDataset() {
  return 'production';
}