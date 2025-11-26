import styles from './Hero.module.css'

// トップページ上部のヒーロー領域
// - タイトル/サブコピーを表示
// - 検索フォームなどの子要素（children）を内側に差し込むコンテナ
export default function Hero({ children }) {
  return (
    <section className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.copy}>
            <p className={styles.kicker}>Personal Travel Journal</p>
            <h1 className={styles.title}>気ままに綴る、旅の記録</h1>
            <p className={styles.sub}>
              週末の小旅行から、心に残る絶景まで。<br />
              訪れた場所の空気感や美味しい思い出を、<br />
              写真とともにマイペースに残しています。
            </p>
          </div>
        </div>
      </div>
      <div className={styles.floatingForm}>
        {children}
      </div>
    </section>
  )
}
