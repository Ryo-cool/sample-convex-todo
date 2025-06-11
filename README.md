# 🌟 Liquid Glass ToDo App

**Convex サンプルアプリケーション**

Next.js + Convex で構築された、リアルタイムコラボレーション機能を持つプレミアムToDo アプリケーション

> このプロジェクトは、Convex の機能を実演するために作成されたサンプルアプリケーションです。リアルタイムデータベース、リアクティブクエリ、プレゼンス管理など、Convex の主要機能を実装例として紹介しています。
![タイトルなし](https://github.com/user-attachments/assets/17730bfd-2864-44c1-b9f1-2408895da9bd)

## 🚀 Convex とは？

**Convex** は、モダンなWebアプリケーション開発のための次世代のバックエンドプラットフォームです。

### 🌟 Convex の主要な特徴

- **🔄 リアルタイム同期** - データの変更が即座に全クライアントに反映
- **📊 リアクティブクエリ** - データベースの変更を監視して自動的にUIを更新
- **⚡ サーバーレス関数** - TypeScript で書けるサーバーサイド関数
- **🛡️ 型安全性** - エンドツーエンドの TypeScript サポート
- **🌐 プレゼンス管理** - ユーザーのオンライン状態やリアルタイムコラボレーション
- **📈 スケーラビリティ** - 自動スケーリングとパフォーマンス最適化
- **🔍 インデックス** - 高速クエリのための自動インデックス作成

### 🎯 なぜ Convex を選ぶのか？

従来のバックエンド開発では、リアルタイム同期やデータベース管理、API設計などを個別に構築する必要がありました。Convex はこれらを統合的に提供し、開発者がフロントエンドの開発に集中できるようにします。

- **開発速度の向上** - ボイラープレートコードの削減
- **リアルタイム機能の簡単実装** - WebSocket や状態管理の複雑さを隠蔽
- **型安全なAPI** - フロントエンドとバックエンドの型同期
- **運用の簡素化** - インフラ管理不要

**📚 Convex について詳しく：** [公式ドキュメント](https://docs.convex.dev/) | [公式サイト](https://www.convex.dev/)

## ✨ 主な機能

### 🎨 Liquid Glass UI
- **グラスモーフィズム デザイン** - 美しい透明感とボケ効果
- **流体グラデーション背景** - 動的なアニメーション背景
- **プレミアム エフェクト** - ホバー時の光沢効果とスケールアニメーション
- **レスポンシブ対応** - モバイルからデスクトップまで完璧な表示

### 📝 高機能 ToDo 管理
- **CRUD 操作** - タスクの作成、読み取り、更新、削除
- **リアルタイム同期** - Convex による即座のデータ同期
- **タスク完了状態** - チェックボックスによる直感的な操作
- **作成日時表示** - 日本語フォーマットでの時刻表示

### 🔍 高度な検索・フィルター機能
- **全文検索** - リアルタイムテキスト検索（大文字小文字無視）
- **スマートフィルター** - 未完了/完了済み/すべて の切り替え
- **柔軟なソート** - 新しい順/古い順/アルファベット順
- **検索統計** - 検索結果数とフィルター状態の表示
- **検索空状態** - 検索結果がない場合の専用UI

### 🤝 リアルタイムコラボレーション
- **アクティブユーザー表示** - 右上にオンラインユーザー一覧
- **編集中インジケーター** - 他のユーザーがタスクを編集中の表示
- **自動プレゼンス管理** - タブ切り替えや閉じる時の自動離脱
- **カラーコード付きアバター** - ユーザー識別のための色分け

### 📊 統計ダッシュボード
- **完了率表示** - 視覚的なプログレス表示
- **タスク数統計** - 総数、完了数、未完了数
- **フィルター統計** - 検索結果に対応した統計情報

## 🚀 技術スタック

### フロントエンド
- **Next.js 15** - React フレームワーク（App Router）
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファーストCSS
- **React Hooks** - モダンなReact開発

### バックエンド（Convex活用）
- **Convex Database** - NoSQL ドキュメントデータベース（todos, presence テーブル）
- **Convex Functions** - TypeScript サーバー関数（Query / Mutation）
- **リアルタイム同期** - リアクティブクエリによる自動UI更新
- **プレゼンス管理** - マルチユーザーのオンライン状態管理
- **自動型生成** - Convex スキーマからの TypeScript 型自動生成

#### 📋 このアプリで実装された Convex 機能
- `useQuery(api.todos.getTodos)` - リアクティブなタスク一覧取得
- `useMutation(api.todos.createTodo)` - 楽観的更新でのタスク作成
- `useQuery(api.presence.getActiveUsers)` - リアルタイムユーザープレゼンス
- 自動クリーンアップ機能付きプレゼンス管理
- クライアントサイド検索とフィルタリング

### 開発ツール
- **ESLint** - コード品質管理
- **Prettier** - コードフォーマット
- **TypeScript Strict Mode** - 厳格な型チェック

## 📦 インストール

### 前提条件
- Node.js 18+ 
- npm または yarn
- Convex アカウント

### セットアップ手順

1. **リポジトリのクローン**
```bash
git clone <repository-url>
cd sample-convex-todo
```

2. **依存関係のインストール**
```bash
npm install
```

3. **Convex の設定**
```bash
npx convex dev
```

4. **環境変数の設定**
`.env.local` ファイルを作成し、Convex の設定を追加
```env
CONVEX_DEPLOYMENT=<your-convex-deployment>
NEXT_PUBLIC_CONVEX_URL=<your-convex-url>
```

5. **開発サーバーの起動**
```bash
npm run dev
```

アプリケーションが http://localhost:3000 で起動します。

## 🎯 使い方

### 基本操作
1. **タスク追加** - 入力フォームにテキストを入力し「追加」ボタンをクリック
2. **タスク完了** - チェックボックスをクリックして完了状態を切り替え
3. **タスク削除** - 削除ボタン（ゴミ箱アイコン）をクリック

### 検索・フィルター
1. **テキスト検索** - 検索バーにキーワードを入力
2. **フィルター** - 「すべて」「未完了」「完了済み」ボタンで絞り込み
3. **ソート** - 「フィルター」を展開してソート順を選択
4. **リセット** - 「リセット」ボタンで全条件をクリア

### コラボレーション
1. **マルチタブ** - 複数のタブでアプリを開くと他のユーザーとして表示
2. **リアルタイム同期** - 一方でタスクを追加/編集すると即座に他方に反映
3. **編集状態** - タスクを編集中の場合、他のユーザーに編集中表示

## 🏗️ プロジェクト構造

```
sample-convex-todo/
├── app/                          # Next.js App Router
│   ├── components/              # React コンポーネント
│   │   ├── Header.tsx          # ヘッダーコンポーネント
│   │   ├── TodoForm.tsx        # タスク追加フォーム
│   │   ├── TodoItem.tsx        # 個別タスクアイテム
│   │   ├── TodoList.tsx        # メインのリストコンポーネント
│   │   ├── SearchAndFilter.tsx # 検索・フィルターUI
│   │   ├── ActiveUsers.tsx     # アクティブユーザー表示
│   │   ├── StatsPanel.tsx      # 統計ダッシュボード
│   │   └── EmptyState.tsx      # 空状態表示
│   ├── hooks/                   # カスタムフック
│   │   └── usePresence.ts      # プレゼンス管理フック
│   ├── globals.css             # グローバルスタイル
│   ├── layout.tsx              # ルートレイアウト
│   └── page.tsx                # ホームページ
├── convex/                      # Convex バックエンド
│   ├── _generated/             # Convex 生成ファイル
│   ├── schema.ts               # データベーススキーマ
│   ├── todos.ts                # ToDo 関連の関数
│   └── presence.ts             # プレゼンス管理関数
├── public/                      # 静的ファイル
├── .eslintrc.json              # ESLint 設定
├── .prettierrc                 # Prettier 設定
├── convex.json                 # Convex 設定
├── next.config.js              # Next.js 設定
├── package.json                # npm 設定
├── tailwind.config.ts          # Tailwind CSS 設定
└── tsconfig.json               # TypeScript 設定
```

## 🎨 Convex の学習リソース

このサンプルアプリを参考に、Convex の機能を学習できます：

### 📖 実装例から学べること

1. **データベース設計** - `convex/schema.ts`
   - NoSQL ドキュメント設計
   - リレーション無しのシンプルな構造

2. **サーバー関数** - `convex/todos.ts`, `convex/presence.ts`
   - Query と Mutation の書き方
   - データ検証とバリデーション
   - 楽観的更新の実装

3. **リアルタイム機能** - `app/hooks/usePresence.ts`
   - プレゼンス管理の実装
   - 自動クリーンアップ機能
   - ブラウザイベントとの連携

4. **フロントエンド統合** - React コンポーネント群
   - `useQuery` と `useMutation` の使い方
   - TypeScript 型安全性の活用
   - リアクティブUI の構築

### 🚀 次のステップ

- [Convex クイックスタート](https://docs.convex.dev/quickstart)
- [Convex University](https://www.convex.dev/university) - 無料学習コース
- [Convex Discord](https://www.convex.dev/community) - コミュニティサポート

## 🤝 コントリビューション

### 開発セットアップ
1. フォークして clone
2. `npm install` で依存関係をインストール
3. `npm run dev` で開発サーバー起動
4. 変更を実装
5. `npm run lint` でコード品質チェック
6. `npm run build` でビルドテスト
7. Pull Request を作成

### コーディング規約
- **ESLint** - `npm run lint` でチェック
- **Prettier** - `npm run format` で自動フォーマット
- **TypeScript** - 厳格な型チェック必須
- **コミットメッセージ** - Conventional Commits 形式

## 📋 TODO（今後の実装予定）

- [x] ✅ 基本的なToDo機能（CRUD）
- [x] ✅ Liquid Glass UI デザイン
- [x] ✅ リアルタイムコラボレーション
- [x] ✅ 全文検索とスマートフィルター
- [ ] 🔄 Convex スケジューリング機能（リマインダー、定期タスク）
- [ ] 🔄 ファイルアップロード機能（画像、添付ファイル）
- [ ] 🔄 リアルタイムダッシュボード（統計、グラフ）
- [ ] 🔄 オフライン対応とオプティミスティックアップデート

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照

## 👥 チーム

- **開発者** - Anthropic Claude (AI Assistant)
- **プロジェクト管理** - Todo List driven development

## 🙏 謝辞

- **[Convex チーム](https://www.convex.dev/)** - 革新的なリアルタイムバックエンドプラットフォームの開発
- **Next.js チーム** - 優れた React フレームワーク
- **Tailwind CSS** - 美しいデザインシステム
- **オープンソースコミュニティ** - 素晴らしいライブラリとツールの提供

---

**🌟 Convex を使ったリアルタイムアプリ開発に興味がある方は、ぜひこのリポジトリをスターしてください！**

**📞 Convex について質問がある場合は：**
- [Convex Discord](https://www.convex.dev/community) でコミュニティに質問
- [Convex ドキュメント](https://docs.convex.dev/) で詳細な情報を確認
- [Convex ブログ](https://blog.convex.dev/) で最新情報をチェック
