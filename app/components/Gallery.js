"use client"

import { useState } from 'react'
import ImageWithSpinner from '@components/ImageWithSpinner'
import Lightbox from '@components/Lightbox'

// シンプルなギャラリー（左右矢印 + サムネイル + 枚数カウンタ）
// props: images: string[]
export default function Gallery({ images = [] }) {
  const valid = Array.isArray(images) ? images.filter(Boolean) : []
  const [idx, setIdx] = useState(0)
  const [open, setOpen] = useState(false)
  const total = valid.length
  const current = Math.min(idx, Math.max(0, total - 1))

  if (total === 0) return null

  const go = (n) => {
    setIdx((i) => {
      const next = i + n
      if (next < 0) return total - 1
      if (next >= total) return 0
      return next
    })
  }

  return (
    <div className="gallery" aria-label="ギャラリー">
      <div className="gallery-view">
        <div className="gallery-main" role="button" aria-label="画像を拡大" onClick={() => setOpen(true)}>
          <ImageWithSpinner src={valid[current]} alt="" fill className="gallery-img" sizes="(min-width: 1024px) 960px, 100vw" />
        </div>
        <div className="gallery-nav" aria-hidden>
          <button className="gallery-btn" onClick={() => go(-1)} aria-label="前の画像">‹</button>
          <button className="gallery-btn" onClick={() => go(1)} aria-label="次の画像">›</button>
        </div>
        <div className="gallery-counter" aria-live="polite">{current + 1}/{total}</div>
      </div>
      <div className="gallery-thumbs" role="list" aria-label="サムネイル">
        {valid.map((url, i) => (
          <button
            key={url + i}
            onClick={() => setIdx(i)}
            className={`gallery-thumb ${i === current ? 'is-current' : ''}`}
            aria-label={`画像 ${i + 1}`}
          >
            <ImageWithSpinner src={url} alt="" width={72} height={72} style={{ objectFit: 'cover' }} />
          </button>
        ))}
      </div>
      {open && (
        <Lightbox images={valid} startIndex={current} onClose={() => setOpen(false)} />
      )}
    </div>
  )
}
