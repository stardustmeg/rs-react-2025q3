import React from 'react';

interface ClearButtonProps {
  onClick: () => void;
  visible: boolean;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClick, visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <button
      aria-label="Clear search"
      className="absolute top-1/2 right-2 -translate-y-1/2 button text-custom-coal hover:text-custom-pink focus:text-custom-pink"
      onClick={onClick}
      type="button"
    >
      ✕
    </button>
  );
};

export default ClearButton;
