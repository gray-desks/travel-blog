"use client"

import { useRouter } from 'next/navigation'

export default function ResetButton({ base = '/' }) {
  const router = useRouter()

  const onClick = (e) => {
    // フォームの入力値を即座にリセット
    if (e.currentTarget && e.currentTarget.form) {
      try { e.currentTarget.form.reset() } catch {}
    }
    // クエリを取り除いてトップへ（検索条件もURLからリセット）
    router.push(base)
  }

  return (
    <button type="button" className="btn btn-secondary" onClick={onClick}>
      リセット
    </button>
  )
}

