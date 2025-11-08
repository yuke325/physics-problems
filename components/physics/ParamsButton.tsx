export const ParamsButton: React.FC<{
  label: string;
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
}> = ({ label, isSelected, onClick, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded font-bold transition-colors ${
        isSelected
          ? "bg-purple-600 text-white"
          : "bg-gray-600 text-gray-300 hover:bg-gray-500"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {label}
    </button>
  );
};
