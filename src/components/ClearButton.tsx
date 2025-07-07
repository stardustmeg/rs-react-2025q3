import React, { type JSX } from 'react';

interface ClearButtonProps {
  onClick: () => void;
  visible: boolean;
}

const ClearButton = ({ onClick, visible }: ClearButtonProps): JSX.Element | null => {
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

export default React.memo(ClearButton);
