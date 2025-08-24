import type { JSX } from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TogglePasswordVisibilityButton } from '@/components/form/password/TogglePasswordVisibilityButton';

describe('TogglePasswordVisibilityButton Component', () => {
  describe('Component Rendering', () => {
    it('should render button element', () => {
      const mockToggle = vi.fn();
      render(<TogglePasswordVisibilityButton showPassword={false} togglePasswordVisibility={mockToggle} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should render with correct type', () => {
      const mockToggle = vi.fn();
      render(<TogglePasswordVisibilityButton showPassword={false} togglePasswordVisibility={mockToggle} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('Icon Display', () => {
    it('should show hide password icon when password is visible', () => {
      const mockToggle = vi.fn();
      render(<TogglePasswordVisibilityButton showPassword={true} togglePasswordVisibility={mockToggle} />);

      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('🙈');
    });

    it('should show show password icon when password is hidden', () => {
      const mockToggle = vi.fn();
      render(<TogglePasswordVisibilityButton showPassword={false} togglePasswordVisibility={mockToggle} />);

      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('👁️');
    });

    it('should update icon when showPassword prop changes', () => {
      const mockToggle = vi.fn();
      const { rerender } = render(
        <TogglePasswordVisibilityButton showPassword={false} togglePasswordVisibility={mockToggle} />,
      );

      let button = screen.getByRole('button');
      expect(button).toHaveTextContent('👁️');

      rerender(<TogglePasswordVisibilityButton showPassword={true} togglePasswordVisibility={mockToggle} />);
      button = screen.getByRole('button');
      expect(button).toHaveTextContent('🙈');
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-label for hide password', () => {
      const mockToggle = vi.fn();
      render(<TogglePasswordVisibilityButton showPassword={true} togglePasswordVisibility={mockToggle} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Hide password');
    });

    it('should have proper aria-label for show password', () => {
      const mockToggle = vi.fn();
      render(<TogglePasswordVisibilityButton showPassword={false} togglePasswordVisibility={mockToggle} />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Show password');
    });

    it('should update aria-label when showPassword prop changes', () => {
      const mockToggle = vi.fn();
      const { rerender } = render(
        <TogglePasswordVisibilityButton showPassword={false} togglePasswordVisibility={mockToggle} />,
      );

      let button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Show password');

      rerender(<TogglePasswordVisibilityButton showPassword={true} togglePasswordVisibility={mockToggle} />);
      button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Hide password');
    });

    it('should have proper role and be focusable', () => {
      const mockToggle = vi.fn();
      render(<TogglePasswordVisibilityButton showPassword={false} togglePasswordVisibility={mockToggle} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toBeEnabled();
    });
  });

  describe('Button Interactions', () => {
    it('should call togglePasswordVisibility when clicked', () => {
      const mockToggle = vi.fn();
      render(<TogglePasswordVisibilityButton showPassword={false} togglePasswordVisibility={mockToggle} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockToggle).toHaveBeenCalledTimes(1);
    });

    it('should call togglePasswordVisibility multiple times when clicked multiple times', () => {
      const mockToggle = vi.fn();
      render(<TogglePasswordVisibilityButton showPassword={false} togglePasswordVisibility={mockToggle} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(mockToggle).toHaveBeenCalledTimes(3);
    });

    it('should call togglePasswordVisibility with correct parameters', () => {
      const mockToggle = vi.fn();
      render(<TogglePasswordVisibilityButton showPassword={true} togglePasswordVisibility={mockToggle} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockToggle).toHaveBeenCalledTimes(1);
      expect(mockToggle).toHaveBeenCalledWith();
    });
  });

  describe('Component Behavior', () => {
    it('should not call togglePasswordVisibility on render', () => {
      const mockToggle = vi.fn();
      render(<TogglePasswordVisibilityButton showPassword={false} togglePasswordVisibility={mockToggle} />);

      expect(mockToggle).not.toHaveBeenCalled();
    });

    it('should handle rapid clicks correctly', () => {
      const mockToggle = vi.fn();
      render(<TogglePasswordVisibilityButton showPassword={false} togglePasswordVisibility={mockToggle} />);

      const button = screen.getByRole('button');

      for (let index = 0; index < 5; index++) {
        fireEvent.click(button);
      }

      expect(mockToggle).toHaveBeenCalledTimes(5);
    });

    it('should maintain functionality after prop changes', () => {
      const mockToggle = vi.fn();
      const { rerender } = render(
        <TogglePasswordVisibilityButton showPassword={false} togglePasswordVisibility={mockToggle} />,
      );

      let button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockToggle).toHaveBeenCalledTimes(1);

      rerender(<TogglePasswordVisibilityButton showPassword={true} togglePasswordVisibility={mockToggle} />);
      button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockToggle).toHaveBeenCalledTimes(2);
    });
  });

  describe('Visual States', () => {
    it('should have consistent appearance across states', () => {
      const mockToggle = vi.fn();

      const { rerender } = render(
        <TogglePasswordVisibilityButton showPassword={false} togglePasswordVisibility={mockToggle} />,
      );

      let button = screen.getByRole('button');
      expect(button).toHaveTextContent('👁️');
      expect(button).toHaveAttribute('aria-label', 'Show password');

      rerender(<TogglePasswordVisibilityButton showPassword={true} togglePasswordVisibility={mockToggle} />);
      button = screen.getByRole('button');
      expect(button).toHaveTextContent('🙈');
      expect(button).toHaveAttribute('aria-label', 'Hide password');
    });

    it('should maintain visual consistency', () => {
      const mockToggle = vi.fn();

      const { rerender } = render(
        <TogglePasswordVisibilityButton showPassword={false} togglePasswordVisibility={mockToggle} />,
      );
      let button = screen.getByRole('button');
      expect(button).toHaveTextContent(/^👁️$/);

      rerender(<TogglePasswordVisibilityButton showPassword={true} togglePasswordVisibility={mockToggle} />);
      button = screen.getByRole('button');
      expect(button).toHaveTextContent(/^🙈$/);
    });
  });

  describe('Integration Scenarios', () => {
    it('should work as part of password input workflow', () => {
      const mockToggle = vi.fn();
      let showPassword = false;

      const TestWrapper = (): JSX.Element => (
        <div>
          <input data-testid="password-input" type={showPassword ? 'text' : 'password'} />
          <TogglePasswordVisibilityButton
            showPassword={showPassword}
            togglePasswordVisibility={() => {
              showPassword = !showPassword;
              mockToggle();
            }}
          />
        </div>
      );

      const { rerender } = render(<TestWrapper />);

      let input = screen.getByTestId('password-input');
      let button = screen.getByRole('button');

      expect(input).toHaveAttribute('type', 'password');
      expect(button).toHaveTextContent('👁️');

      fireEvent.click(button);
      expect(mockToggle).toHaveBeenCalledTimes(1);

      showPassword = true;
      rerender(<TestWrapper />);
      input = screen.getByTestId('password-input');
      button = screen.getByRole('button');

      expect(input).toHaveAttribute('type', 'text');
      expect(button).toHaveTextContent('🙈');
    });

    it('should handle different parent component scenarios', () => {
      const scenarios = [
        { expectedIcon: '👁️', expectedLabel: 'Show password', showPassword: false },
        { expectedIcon: '🙈', expectedLabel: 'Hide password', showPassword: true },
      ];

      for (const { expectedIcon, expectedLabel, showPassword } of scenarios) {
        const mockToggle = vi.fn();
        const { unmount } = render(
          <TogglePasswordVisibilityButton showPassword={showPassword} togglePasswordVisibility={mockToggle} />,
        );

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent(expectedIcon);
        expect(button).toHaveAttribute('aria-label', expectedLabel);

        unmount();
      }
    });
  });

  describe('Performance and Re-renders', () => {
    it('should handle frequent prop changes without issues', () => {
      const mockToggle = vi.fn();
      const { rerender } = render(
        <TogglePasswordVisibilityButton showPassword={false} togglePasswordVisibility={mockToggle} />,
      );

      for (let index = 0; index < 10; index++) {
        rerender(
          <TogglePasswordVisibilityButton showPassword={index % 2 === 0} togglePasswordVisibility={mockToggle} />,
        );
      }

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label');
    });

    it('should maintain functionality with different callback functions', () => {
      let callCount = 0;
      const mockToggle = vi.fn(() => {
        callCount++;
      });

      render(<TogglePasswordVisibilityButton showPassword={false} togglePasswordVisibility={mockToggle} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockToggle).toHaveBeenCalledTimes(1);
      expect(callCount).toBe(1);
    });
  });
});
