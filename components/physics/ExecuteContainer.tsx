export const ExecuteContainer: React.FC<{
  onTry: () => void;
  onReset: () => void;
  isFalling: boolean;
}> = ({ onTry, onReset, isFalling }) => {
  return (
    <div className="mt-4 flex gap-4">
      <button
        type="button"
        onClick={onTry}
        disabled={isFalling}
        className="px-8 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors text-lg"
      >
        Try！
      </button>
      <button
        type="button"
        onClick={onReset}
        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors text-lg"
      >
        リセット
      </button>
    </div>
  );
};
