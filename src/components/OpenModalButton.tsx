import type { JSX } from 'react';

interface OpenModalButtonProps {
  label: string;
  openModal: () => void;
}

export function OpenModalButton({ label, openModal }: OpenModalButtonProps): JSX.Element {
  return (
    <button className="buttonPrimary buttonLarge" onClick={openModal} type="button">
      {label}
    </button>
  );
}
