import AntiGravity from "./components/antigravity";

export default function Home() {
  return (
    // 画面全体を暗い背景色にする
    <main className="min-h-screen bg-gray-900 flex items-center justify-center">
      {/* PhysicsCanvasコンポーネントを表示 */}
      <AntiGravity />
    </main>
  );
}
