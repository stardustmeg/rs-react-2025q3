import { type JSX, type ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from '@/styles/Modal.module.css';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function Modal({ children, isOpen, onClose, title }: ModalProps): JSX.Element | null {
  const modalReference = useRef<HTMLDivElement>(null);
  const previousFocusReference = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusReference.current = document.activeElement as HTMLElement;

      modalReference.current?.focus();

      document.body.style.overflow = 'hidden';

      const handleEscape = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);

      return (): void => {
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'unset';

      if (previousFocusReference.current) {
        previousFocusReference.current.focus();
      }
    }
  }, [isOpen, onClose]);

  const handleBackdropClick = (event: React.MouseEvent): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div className={styles.modalBackdrop} onClick={handleBackdropClick} role="presentation">
      <div
        aria-labelledby="modal-title"
        aria-modal="true"
        className={styles.modal}
        ref={modalReference}
        role="dialog"
        tabIndex={-1}
      >
        <div className={styles.modalHeader}>
          <h2 id="modal-title">{title}</h2>
          <button aria-label="Close modal" className={styles.modalCloseButton} onClick={onClose} type="button">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className={styles.modalContent}>{children}</div>
        <div className={styles.modalFooter}></div>
      </div>
    </div>,
    modalRoot,
  );
}
