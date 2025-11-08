# Physics Problems

## プロジェクト概要
- Matter.js を用いたブラウザ物理シミュレーションを、Next.js 16 + React 19 の App Router 上でギャラリー化したデモサイトです。
- 「気になる現象だけをすぐ試す」ことをテーマに、各ラボが独立したページとして存在し、重力・摩擦・密度などをワンタップで切り替えて直感的に挙動を観測できます。
- UI はダークトーンとシアン/パープルのグラデーションで統一し、物理量をイメージしやすいアクセントを与えています。

## 公開中のラボ
| コード | タイトル | 体験内容 |
| --- | --- | --- |
| EX-01 | 斜面ダイナミクス研究所 | 円盤が斜面を転がるシーンで、重力・摩擦・密度を 3 段階から選択。速度やエネルギーの遷移を Matter.js エンジンでリアルタイム確認。 |
| EX-02 | アンチグラビティ・ボウリング | 斜面上の箱とボウリングピンをセットにし、重力方向や摩擦係数を反転。直感に反する挙動を観察しつつ、摩擦の符号が与える影響を比較できます。 |

## 技術スタック
- Next.js 16 / React 19 / TypeScript 5.9
- Matter.js での 2D 剛体シミュレーション（`lib/useMatterCanvas.ts` で共通化）
- Tailwind CSS v4 + 独自 UI コンポーネント (`components/ui`, `components/physics`)
- Biome による lint / format

## ディレクトリ構成メモ
- `app/page.tsx` : Hero + 実験一覧のトップページ。
- `app/*/lab.config.ts` : ラボのメタ情報。`lib/labs.ts` が読み込み、トップで一覧表示。
- `app/rolling-material` / `app/bowling` : 各ラボページとシミュレーションロジック。
- `components/physics` : キャンバスの枠やパラメータボタンなど共通 UI。
- `lib/useMatterCanvas.ts` : Matter.Engine と canvas を初期化するカスタムフック。

## セットアップと実行
1. 依存関係をインストール: `npm install`
2. 開発サーバーを起動: `npm run dev` (既定で http://localhost:3000)
3. Lint / format: `npm run lint`, `npm run lint:fix`, `npm run format`

Node.js 18.18 以降の環境を想定しています。Matter.js のパラメータを変更した際はホットリロードで即座に挙動を確認できます。

## 新しいラボを追加したい場合
1. `app/` 配下に新しいディレクトリを作成し、`page.tsx` と `lab.config.ts` を用意します。
2. シミュレーション専用のコンポーネントを `components/physics` や `lib/` 内のユーティリティを活用して実装します。
3. `lab.config.ts` に slug / code / title / description / tags / accent / status / order を設定するとトップページに自動で反映されます。

直感的な操作で物理の“驚き”を共有するデジタル実験室としてご活用ください。
