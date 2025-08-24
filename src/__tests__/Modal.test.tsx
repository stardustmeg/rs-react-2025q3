import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Modal } from '@/components/Modal';

describe('Modal Component', () => {
  let onCloseMock: ReturnType<typeof vi.fn>;
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    onCloseMock = vi.fn();
    user = userEvent.setup();

    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');

    document.body.append(modalRoot);

    Object.defineProperty(HTMLElement.prototype, 'focus', {
      value: vi.fn(),
      writable: true,
    });
  });

  afterEach(() => {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      modalRoot.remove();
    }
    vi.clearAllMocks();
  });

  describe('Modal Opening/Closing', () => {
    it('renders modal when isOpen is true', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('does not render modal when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={onCloseMock} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      const closeButton = screen.getByLabelText('Close modal');
      await user.click(closeButton);

      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Keyboard Accessibility', () => {
    it('closes modal when ESC key is pressed', async () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      await user.keyboard('{Escape}');

      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('focuses modal when opened', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();
      expect(modal).toHaveAttribute('tabIndex', '-1');
    });

    it('restores focus to previous element when closed', () => {
      const focusButton = document.createElement('button');
      focusButton.textContent = 'Focus Target';
      document.body.append(focusButton);

      const focusSpy = vi.spyOn(focusButton, 'focus');

      Object.defineProperty(document, 'activeElement', {
        value: focusButton,
        writable: true,
      });

      const { rerender } = render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      rerender(
        <Modal isOpen={false} onClose={onCloseMock} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      expect(focusSpy).toHaveBeenCalled();

      focusButton.remove();
    });
  });

  describe('Click Outside Behavior', () => {
    it('closes modal when clicking on backdrop', async () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      const backdrop = screen.getByRole('presentation');
      await user.click(backdrop);

      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('does not close modal when clicking inside modal content', async () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <button>Inside Modal</button>
        </Modal>,
      );

      const insideButton = screen.getByText('Inside Modal');
      await user.click(insideButton);

      expect(onCloseMock).not.toHaveBeenCalled();
    });
  });

  describe('Portal Rendering', () => {
    it('renders modal in portal (modal-root)', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      const modalRoot = document.getElementById('modal-root');
      expect(modalRoot).toBeInTheDocument();

      const modal = screen.getByRole('dialog');
      expect(modalRoot?.contains(modal)).toBe(true);
    });

    it('does not render when modal-root is missing', () => {
      const modalRoot = document.getElementById('modal-root');
      if (modalRoot) {
        modalRoot.remove();
      }

      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      const newModalRoot = document.createElement('div');
      newModalRoot.setAttribute('id', 'modal-root');
      document.body.append(newModalRoot);
    });
  });

  describe('Body Scroll Behavior', () => {
    it('blocks body scroll when modal is open', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      expect(document.body).toHaveStyle({ overflow: 'hidden' });
    });

    it('restores body scroll when modal is closed', () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      expect(document.body).toHaveStyle({ overflow: 'hidden' });

      rerender(
        <Modal isOpen={false} onClose={onCloseMock} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      expect(document.body).toHaveStyle({ overflow: '' });
    });
  });

  describe('Accessibility Features', () => {
    it('has correct ARIA attributes', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('tabIndex', '-1');
    });

    it('has accessible close button', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      const closeButton = screen.getByLabelText('Close modal');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveAttribute('type', 'button');
    });

    it('has correct heading structure', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
          <p>Modal content</p>
        </Modal>,
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Test Modal');
      expect(heading).toHaveAttribute('id', 'modal-title');
    });
  });
});
