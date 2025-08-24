import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FormFooter } from '@/components/form/FormFooter';

describe('FormFooter Component', () => {
  describe('Component Rendering', () => {
    it('should render both cancel and submit buttons', () => {
      const mockOnCancel = vi.fn();
      render(<FormFooter isSubmitting={false} onCancel={mockOnCancel} />);

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });

      expect(cancelButton).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    it('should render with correct button classes', () => {
      const mockOnCancel = vi.fn();
      render(<FormFooter isSubmitting={false} onCancel={mockOnCancel} />);

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });

      expect(cancelButton).toHaveClass('buttonSecondary');
      expect(submitButton).toHaveClass('buttonPrimary');
    });
  });

  describe('Button States', () => {
    it('should enable submit button when not submitting and form is valid', () => {
      const mockOnCancel = vi.fn();
      render(<FormFooter isSubmitting={false} isValid={true} onCancel={mockOnCancel} />);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeEnabled();
    });

    it('should disable submit button when form is invalid', () => {
      const mockOnCancel = vi.fn();
      render(<FormFooter isSubmitting={false} isValid={false} onCancel={mockOnCancel} />);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeDisabled();
    });

    it('should disable submit button when submitting', () => {
      const mockOnCancel = vi.fn();
      render(<FormFooter isSubmitting={true} isValid={true} onCancel={mockOnCancel} />);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeDisabled();
    });

    it('should disable submit button when both submitting and invalid', () => {
      const mockOnCancel = vi.fn();
      render(<FormFooter isSubmitting={true} isValid={false} onCancel={mockOnCancel} />);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeDisabled();
    });

    it('should always enable cancel button', () => {
      const mockOnCancel = vi.fn();

      const testCases = [
        { isSubmitting: false, isValid: true },
        { isSubmitting: false, isValid: false },
        { isSubmitting: true, isValid: true },
        { isSubmitting: true, isValid: false },
        { isSubmitting: false },
        { isSubmitting: true },
      ];

      for (const { isSubmitting, isValid } of testCases) {
        const { unmount } = render(
          <FormFooter isSubmitting={isSubmitting} isValid={isValid} onCancel={mockOnCancel} />,
        );

        const cancelButton = screen.getByRole('button', { name: /cancel/i });
        expect(cancelButton).toBeEnabled();

        unmount();
      }
    });
  });

  describe('Button Interactions', () => {
    it('should call onCancel when cancel button is clicked', () => {
      const mockOnCancel = vi.fn();
      render(<FormFooter isSubmitting={false} onCancel={mockOnCancel} />);

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('should call onCancel when cancel button is clicked multiple times', () => {
      const mockOnCancel = vi.fn();
      render(<FormFooter isSubmitting={false} onCancel={mockOnCancel} />);

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);
      fireEvent.click(cancelButton);
      fireEvent.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalledTimes(3);
    });

    it('should not call onCancel when submit button is clicked', () => {
      const mockOnCancel = vi.fn();
      render(<FormFooter isSubmitting={false} isValid={true} onCancel={mockOnCancel} />);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submitButton);

      expect(mockOnCancel).not.toHaveBeenCalled();
    });
  });

  describe('Button Types', () => {
    it('should have correct button types', () => {
      const mockOnCancel = vi.fn();
      render(<FormFooter isSubmitting={false} onCancel={mockOnCancel} />);

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });

      expect(cancelButton).toHaveAttribute('type', 'button');
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });

  describe('Props Handling', () => {
    it('should handle undefined isValid prop', () => {
      const mockOnCancel = vi.fn();
      render(<FormFooter isSubmitting={true} isValid={undefined} onCancel={mockOnCancel} />);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeDisabled();
    });

    it('should handle isValid prop as false', () => {
      const mockOnCancel = vi.fn();
      render(<FormFooter isSubmitting={false} isValid={false} onCancel={mockOnCancel} />);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeDisabled();
    });

    it('should handle isValid prop as true', () => {
      const mockOnCancel = vi.fn();
      render(<FormFooter isSubmitting={false} isValid={true} onCancel={mockOnCancel} />);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeEnabled();
    });

    it('should handle isSubmitting prop changes', () => {
      const mockOnCancel = vi.fn();
      const { rerender } = render(<FormFooter isSubmitting={false} isValid={true} onCancel={mockOnCancel} />);

      let submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeEnabled();

      rerender(<FormFooter isSubmitting={true} isValid={true} onCancel={mockOnCancel} />);

      submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Component Behavior', () => {
    it('should not prevent cancel when submitting', () => {
      const mockOnCancel = vi.fn();
      render(<FormFooter isSubmitting={true} isValid={false} onCancel={mockOnCancel} />);

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('should maintain button states during re-renders', () => {
      const mockOnCancel = vi.fn();
      const { rerender } = render(<FormFooter isSubmitting={false} isValid={true} onCancel={mockOnCancel} />);

      let submitButton = screen.getByRole('button', { name: /submit/i });
      let cancelButton = screen.getByRole('button', { name: /cancel/i });

      expect(submitButton).toBeEnabled();
      expect(cancelButton).toBeEnabled();

      rerender(<FormFooter isSubmitting={false} isValid={true} onCancel={mockOnCancel} />);

      submitButton = screen.getByRole('button', { name: /submit/i });
      cancelButton = screen.getByRole('button', { name: /cancel/i });

      expect(submitButton).toBeEnabled();
      expect(cancelButton).toBeEnabled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper button roles and names', () => {
      const mockOnCancel = vi.fn();
      render(<FormFooter isSubmitting={false} onCancel={mockOnCancel} />);

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });

      expect(cancelButton).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    it('should maintain accessibility when disabled', () => {
      const mockOnCancel = vi.fn();
      render(<FormFooter isSubmitting={true} isValid={false} onCancel={mockOnCancel} />);

      const submitButton = screen.getByRole('button', { name: /submit/i });
      const cancelButton = screen.getByRole('button', { name: /cancel/i });

      expect(submitButton).toBeDisabled();
      expect(cancelButton).toBeEnabled();
    });
  });

  describe('Integration Scenarios', () => {
    it('should handle typical form submission flow', () => {
      const mockOnCancel = vi.fn();
      const { rerender } = render(<FormFooter isSubmitting={false} isValid={false} onCancel={mockOnCancel} />);

      let submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeDisabled();

      rerender(<FormFooter isSubmitting={false} isValid={true} onCancel={mockOnCancel} />);
      submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeEnabled();

      rerender(<FormFooter isSubmitting={true} isValid={true} onCancel={mockOnCancel} />);
      submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeDisabled();

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });
});
