"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/', label: '記事一覧' },
  { href: '/about', label: 'このサイトについて' },
  { href: '/contact', label: 'お問い合わせ' },
  { href: '/privacy', label: 'プライバシーポリシー' },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const firstLinkRef = useRef(null)
  const lastLinkRef = useRef(null)

  // ルート遷移でモバイルメニューを閉じる
  useEffect(() => { setOpen(false) }, [pathname])

  // Body スクロールロック + Escape で閉じる + フォーカストラップ
  useEffect(() => {
    if (open) {
      document.body.classList.add('no-scroll')
      // 初期フォーカス
      setTimeout(() => { firstLinkRef.current?.focus() }, 0)
    } else {
      document.body.classList.remove('no-scroll')
    }

    const onKeyDown = (e) => {
      if (!open) return
      if (e.key === 'Escape') {
        e.preventDefault(); setOpen(false)
      }
      if (e.key === 'Tab') {
        const first = firstLinkRef.current
        const last = lastLinkRef.current
        if (!first || !last) return
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname?.startsWith(href)
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="/" className="brand">
          <span className="brand-logo" aria-hidden="true">旅</span>
          <span className="brand-name">旅ログ</span>
        </a>

        {/* デスクトップ・ナビ */}
        <nav aria-label="グローバルナビ" className="header-nav header-nav--desktop">
          <ul className="header-nav-list">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link href={link.href} aria-current={isActive(link.href) ? 'page' : undefined} className={isActive(link.href) ? 'active' : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* モバイル用トグル（アニメーションするハンバーガー） */}
        <button
          className={`header-toggle ${open ? 'active' : ''}`}
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={open}
          aria-controls="global-nav"
          onClick={() => setOpen(o => !o)}
        >
          <span className="bar" aria-hidden="true" />
          <span className="bar" aria-hidden="true" />
          <span className="bar" aria-hidden="true" />
        </button>
      </div>

      {/* オーバーレイ */}
      {open && <button className="header-overlay" aria-label="メニューを閉じる" onClick={() => setOpen(false)} />}

      {/* モバイル・パネル */}
      <div
        ref={panelRef}
        className={`header-panel ${open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="global-nav-title"
      >
        <nav aria-label="グローバルナビ" id="global-nav">
          <h2 id="global-nav-title" className="sr-only">グローバルナビ</h2>
          <ul className="header-nav-list">
            {NAV_LINKS.map((link, idx) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={isActive(link.href) ? 'active' : undefined}
                  ref={idx === 0 ? firstLinkRef : (idx === NAV_LINKS.length - 1 ? lastLinkRef : undefined)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
