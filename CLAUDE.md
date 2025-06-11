# Convex Todo アプリプロジェクト

## 概要

Next.js と Convex を使用したリアルタイム ToDo アプリケーションです。Convex のリアクティブデータベース機能により、複数のクライアント間で即座に同期されます。

## 技術スタック

- **フロントエンド**: Next.js 14 (App Router 使用)
- **データベース**: Convex (リアルタイム・リアクティブデータベース)
- **スタイリング**: Tailwind CSS
- **言語**: TypeScript

## 主な機能

- 複数ユーザー間でのリアルタイム同期
- ToDo の追加、完了切り替え、削除
- 手動更新不要の即時反映
- 型安全なデータベースクエリとミューテーション

## プロジェクト構成

```
sample-convex-todo/
├── app/
│   ├── components/
│   │   └── TodoList.tsx    # メインToDoコンポーネント
│   ├── providers.tsx        # Convexプロバイダー設定
│   ├── layout.tsx          # プロバイダー付きルートレイアウト
│   └── page.tsx            # ホームページ
├── convex/
│   ├── schema.ts           # データベーススキーマ定義
│   └── todos.ts            # サーバー関数（クエリ/ミューテーション）
└── .env.local              # Convex URL（自動生成）
```

## 開発コマンド

```bash
# Convex開発サーバーの起動（開発時必須）
npx convex dev

# Next.js開発サーバーの起動
npm run dev

# 本番環境へのデプロイ
npx convex deploy
```

## Convex ドキュメント

Convex の詳細: https://docs.convex.dev/home
不明点が出てきたら必ず参照すること

## 実装メモ

- Convex が WebSocket 接続を自動的に処理
- すべてのデータベース操作がデフォルトでリアクティブ
- スキーマ検証が実行時に適用される
- サーバー関数は Convex のクラウド環境で実行される

## 開発における重要事項

### 必須事項

- 開発中は常に`npx convex dev`を実行しておく
- 不明点は必ず https://docs.convex.dev/home を参照
- CLAUDE.mdは開発の進捗に応じて必ず更新する

### 実装予定機能（Convex特化）

1. リアルタイムコラボレーション（プレゼンス機能）
2. スケジューリング機能（cron、リマインダー）
3. ファイルアップロード機能
4. 全文検索
5. リアルタイムダッシュボード
6. オプティミスティックアップデート

## 実装済み機能

### Phase 1: 基本機能（完了）

- ✅ Next.js + TypeScript + Tailwind CSSのセットアップ
- ✅ Convexインストールと基本設定
- ✅ ToDoスキーマ定義（todos: text, isCompleted, createdAt）
- ✅ CRUD操作の実装（getTodos, createTodo, toggleTodo, deleteTodo）
- ✅ リアルタイム同期の確認

### Phase 2: Liquid Glass UI（完了）

- ✅ グラスモーフィズム効果（backdrop-filter: blur）
- ✅ 流体的なグラデーションアニメーション
- ✅ 半透明のガラス効果とソフトな影
- ✅ ホバーエフェクトとトランジション
- ✅ フェードインアニメーション
- ✅ 統計情報ダッシュボード（完了数、達成率など）
- ✅ レスポンシブデザイン
- ✅ UI/UXの改善（コントラスト向上、視認性強化）
- ✅ インタラクティブな空状態デザイン
- ✅ アクセシビリティ対応のフォームバリデーション

### Phase 3: レイアウト最適化（完了）

- ✅ 状態別レイアウト戦略（空状態は中央配置、有データ状態は縦流レイアウト）
- ✅ 大幅なスペーシング改善（セクション間 32px、アイテム間 16px）
- ✅ コンテナ幅の最適化（max-w-4xl → 896px）
- ✅ フォントサイズの調整と統一
- ✅ セマンティックセクション構造
- ✅ レスポンシブ対応の強化
- ✅ 視覚的階層の明確化

### Phase 4: UI細調整（完了）

- ✅ フォントサイズの適正化（ヘッダー: text-4xl~5xl、テキスト: text-base~lg）
- ✅ パディングとマージンの最適化（p-4, p-6, p-8での段階的設計）
- ✅ ボタンサイズの改善（whitespace-nowrap追加、文字切れ防止）
- ✅ 入力フォームの視認性向上（適切なフォントサイズとパディング）
- ✅ 空状態メッセージの適正サイズ化
- ✅ 統計情報の読みやすさ向上
- ✅ 全体的なバランス調整

### Phase 5: Tailwind Master完全書き換え（完了）

- ✅ 全コンポーネントの完全Tailwind化
- ✅ 最先端のマイクロインタラクション実装
- ✅ グループホバー（group/btn, group/check, group/del）活用
- ✅ 高度なアニメーション（shimmer, zoom-in, fadeInUp）
- ✅ プレミアムガラスエフェクト（backdrop-blur-2xl, shadow-2xl）
- ✅ レスポンシブデザイン完全対応（sm:, lg:プレフィックス）
- ✅ アクセシビリティ対応（prefers-reduced-motion）
- ✅ パフォーマンス最適化（will-change, cubic-bezier）
- ✅ 空状態とタスクありの完璧なレイアウト分離
- ✅ 視覚的階層の明確化（font-black, tracking-tight）
- ✅ カスタムユーティリティクラス（scale-102, animate-in）
- ✅ グラデーション効果とシャドウの高品質化

### Phase 6: コンポーネント分割・UX改善（完了）

- ✅ 機能別コンポーネント分割（Header, TodoForm, EmptyState, TodoItem, StatsPanel）
- ✅ 三段階レイアウト構造（ヘッダー → フォーム → 結果エリア）
- ✅ 視覚的階層の明確化（mb-16, mb-20で段階的スペーシング）
- ✅ フォームvariant対応（hero/compact）で状態別最適化
- ✅ 空状態の控えめなデザイン（bg-white/8, 上向き矢印で視線誘導）
- ✅ コンテナサイズの最適化（フォーム: max-w-xl, 結果: max-w-lg）
- ✅ 期待感演出（「上のフォームから」テキスト + bounce矢印）
- ✅ レスポンシブ対応強化（sm:hidden改行制御）

### 次のステップ

1. `npx convex dev`を実行してConvexプロジェクトを初期化
2. `.env.local`に`NEXT_PUBLIC_CONVEX_URL`が自動生成される
3. `npm run dev`でアプリを起動して動作確認
