"use client"

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import NextImage from 'next/image'

export default function Lightbox({ images = [], startIndex = 0, captions = [], onClose }) {
  const valid = Array.isArray(images) ? images.filter(Boolean) : []
  const [index, setIndex] = useState(Math.min(startIndex, Math.max(0, valid.length - 1)))
  const [scale, setScale] = useState(1)
  const [tx, setTx] = useState(0)
  const [ty, setTy] = useState(0)
  const [chrome, setChrome] = useState(true)
  const startRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, active: false })
  const openerRef = useRef(null)

  // スクロールロック & フォーカス制御
  useEffect(() => {
    openerRef.current = document.activeElement
    document.body.classList.add('no-scroll')
    return () => {
      document.body.classList.remove('no-scroll')
      if (openerRef.current && openerRef.current.focus) {
        try { openerRef.current.focus() } catch {}
      }
    }
  }, [])

  // 隣接画像のプリロード
  useEffect(() => {
    const preload = (i) => {
      const url = valid[i]
      if (!url) return
      const img = new window.Image()
      img.src = url
    }
    preload((index + 1) % valid.length)
    preload((index - 1 + valid.length) % valid.length)
  }, [index, valid])

  const close = () => onClose?.()
  const next = () => setIndex((i) => (i + 1) % valid.length)
  const prev = () => setIndex((i) => (i - 1 + valid.length) % valid.length)

  // キーボード操作
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close() }
      if (e.key === 'ArrowRight') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // ズーム切替
  const toggleZoom = () => {
    if (scale > 1) {
      setScale(1); setTx(0); setTy(0)
    } else {
      setScale(1.8)
    }
  }

  // ドラッグでパン
  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return
    // 背景（余白）クリックはドラッグ開始しない
    if (e.currentTarget === e.target) return
    startRef.current = { x: e.clientX, y: e.clientY, tx, ty, active: true }
  }
  const onPointerMove = (e) => {
    if (!startRef.current.active || scale === 1) return
    const dx = e.clientX - startRef.current.x
    const dy = e.clientY - startRef.current.y
    setTx(startRef.current.tx + dx)
    setTy(startRef.current.ty + dy)
  }
  const onPointerUp = () => { startRef.current.active = false }

  // スワイプ（スケール1のときのみ）
  const touch = useRef({ x: 0, y: 0 })
  const onTouchStart = (e) => { if (e.touches[0]) touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }
  const onTouchEnd = (e) => {
    if (scale !== 1) return
    const x = e.changedTouches?.[0]?.clientX ?? 0
    const dx = x - touch.current.x
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev() }
  }

  // クリックでUIの表示/非表示（ズーム時はトグルズーム優先）
  const handleMainClick = (e) => {
    // 余白部分（背景）をクリックしたら閉じる
    if (e.currentTarget === e.target) { close(); return }
    if (scale === 1) setChrome((v) => !v)
    else toggleZoom()
  }
  const handleMainDoubleClick = (e) => {
    if (e.currentTarget === e.target) return
    toggleZoom()
  }

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="画像ビューア">
      <button className="lightbox-backdrop" aria-label="閉じる" onClick={close} />
      <div className="lightbox-inner" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div
          className="lightbox-main"
          onDoubleClick={handleMainDoubleClick}
          onClick={handleMainClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{ cursor: scale === 1 ? 'zoom-in' : 'grab' }}
        >
          <NextImage
            src={valid[index]}
            alt={captions[index] || ''}
            fill
            sizes="100vw"
            className="lightbox-img"
            style={{ transform: `translate(${tx}px, ${ty}px) scale(${scale})` }}
            priority
            unoptimized
          />
        </div>

        {chrome && (
          <>
            <div className="lightbox-top">
              <button className="lightbox-close" onClick={close} aria-label="閉じる">×</button>
            </div>
            <div className="lightbox-nav">
              <button className="lightbox-btn" onClick={prev} aria-label="前の画像">‹</button>
              <div className="lightbox-counter">{index + 1}/{valid.length}</div>
              <button className="lightbox-btn" onClick={next} aria-label="次の画像">›</button>
            </div>
            {captions[index] && <div className="lightbox-caption">{captions[index]}</div>}
          </>
        )}
      </div>
    </div>,
    document.body
  )
}
