// このコンポーネントはブラウザ側で動作するため、明示的にクライアントコンポーネント化
"use client"

// App Router のクライアントサイドナビゲーション用フック
import { useRouter } from 'next/navigation'

// フィルタ等をリセットし、指定のベースパスに戻るボタン
// props: base — リセット後に遷移するパス（デフォルトはトップ）
export default function ResetButton({ base = '/' }) {
  // ルーターインスタンスを取得（push で履歴を積む遷移を行う）
  const router = useRouter()

  // クリック時の処理
  const onClick = (e) => {
    // ボタンがフォーム内にある場合、ネイティブの form.reset() で入力値を初期化
    if (e.currentTarget && e.currentTarget.form) {
      try { e.currentTarget.form.reset() } catch {}
    }
    // 入力をクリアした後、ベースパスへ遷移して状態をリセット
    router.push(base)
  }

  return (
    // type="button" にしてフォーム送信を防止
    <button type="button" className="btn btn-secondary" onClick={onClick}>
      リセット
    </button>
  )
}
