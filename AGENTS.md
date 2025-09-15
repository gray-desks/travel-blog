# Repository Guidelines
<!--
  このドキュメントはリポジトリの運用・実装方針をまとめたものです。
  各セクションの目的を日本語で簡潔に補足しています（内容自体は英語のまま）。
-->

## Project Structure & Module Organization
<!-- ディレクトリ構成の概要と役割の一覧です。どこに何を書くかの指針になります。 -->
- `app/` — Next.js App Router pages and layouts (e.g., `app/articles/[slug]/page.js`).
- `lib/` — Sanity client, GROQ queries, and lightweight Portable Text renderer.
- `studio/` — Sanity Studio (content authoring). Independent `package.json` and scripts.
- `.next/` — Build output (do not edit). Root `next.config.js` configures Next.

## Build, Test, and Development Commands
<!-- アプリと Studio の起動/ビルド方法、簡易チェック方法（スモークテストは削除済み）を示します。 -->
- App (root):
  - `npm run dev` — Start Next.js in dev mode.
  - `npm run build` — Production build.
  - `npm start` — Run built app.
- Studio (`cd studio`):
  - `npm run dev` — Start Sanity Studio locally.
  - `npm run build` — Static build of Studio.
  - `npm run deploy` — Deploy Studio to Sanity.

## Coding Style & Naming Conventions
<!-- コーディング規約（Node バージョン、インデント、命名、ルーティング規則など）です。 -->
- JavaScript (Node >= 18), 2‑space indentation, single quotes preferred.
- Keep semicolon style consistent within a file.
- React server components by default; client components only when needed.
- Next.js routing uses `page.js`, dynamic segments like `[slug]`.
- Modules in `lib/` use camelCase filenames (e.g., `sanityClient.js`).

## Testing Guidelines
<!-- 現時点では正式なテストランナーはなし。手動確認の観点と、追加する場合の方針を示します。 -->
- No formal test runner yet. Use manual checks:
  - Ensure `.env.local` has `NEXT_PUBLIC_SANITY_PROJECT_ID`.
  - Run the app and verify article list/detail pages render.
- If adding tests, place them under `__tests__/` and prefer Jest for units and Playwright for E2E.

## Commit & Pull Request Guidelines
<!-- コミットメッセージ規約（Conventional Commits）と PR に含めるべき情報です。 -->
- Follow Conventional Commits (seen in history): `feat:`, `fix:`, etc.
- Commits should be small and scoped (app, lib, studio).
- PRs must include: clear summary, before/after notes, screenshots for UI, and linked issues.

## Security & Configuration Tips
<!-- セキュリティと設定の注意点（公開読取、環境変数、CORS、外部リンクのバリデーション等）です。 -->
- Public read only: dataset is `production`; do not embed secrets.
- App uses a single env var: `NEXT_PUBLIC_SANITY_PROJECT_ID`.
- For Studio, `projectId`/`dataset` are fixed; manage CORS in Sanity.
- Validate external links and sanitize any added renderers.
