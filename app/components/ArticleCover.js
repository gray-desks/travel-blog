"use client"

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from '@components/Lightbox'

// 記事のカバー画像。クリックでライトボックス起動
// props: cover: string | null, images: string[] (ライトボックス用に全配列)
export default function ArticleCover({ cover, title = '', images = [] }) {
  const [open, setOpen] = useState(false)
  if (!cover) return null
  const startIndex = Math.max(0, images.findIndex((u) => u === cover))

  return (
    <>
      <div className="article-cover-wrap" role="button" aria-label="画像を拡大" onClick={() => setOpen(true)}>
        <Image src={cover} alt={title} fill sizes="(min-width: 1024px) 960px, 100vw" className="article-cover-img" />
      </div>
      {open && (
        <Lightbox images={images} startIndex={startIndex >= 0 ? startIndex : 0} onClose={() => setOpen(false)} />
      )}
    </>
  )
}

