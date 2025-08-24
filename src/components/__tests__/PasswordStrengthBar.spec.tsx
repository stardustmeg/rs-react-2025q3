import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { PasswordStrength } from '@/utils/checkPasswordStrength';

import { PasswordStrengthBar } from '@/components/form/password/PasswordStrengthBar';

describe('PasswordStrengthBar Component', () => {
  describe('Component Rendering', () => {
    it('should render with default props', () => {
      render(<PasswordStrengthBar score={0} strength="" />);

      const strengthContainer = screen.getByTestId('password-strength-container');
      expect(strengthContainer).toBeInTheDocument();

      const strengthBar = screen.getByTestId('password-strength-bar');
      expect(strengthBar).toBeInTheDocument();

      const strengthText = screen.getByTestId('password-strength-text');
      expect(strengthText).toBeInTheDocument();
    });

    it('should render all required elements', () => {
      render(<PasswordStrengthBar score={2} strength="Medium" />);

      expect(screen.getByTestId('password-strength-container')).toBeInTheDocument();
      expect(screen.getByTestId('password-strength-bar')).toBeInTheDocument();
      expect(screen.getByTestId('password-strength-fill')).toBeInTheDocument();
      expect(screen.getByTestId('password-strength-text')).toBeInTheDocument();
    });
  });

  describe('Strength Bar Styling', () => {
    it('should apply correct color for weak password', () => {
      render(<PasswordStrengthBar score={1} strength="Weak" />);

      const strengthFill = screen.getByTestId('password-strength-fill');
      expect(strengthFill).toHaveStyle('background-color: #dc2626');
    });

    it('should apply correct color for medium password', () => {
      render(<PasswordStrengthBar score={2} strength="Medium" />);

      const strengthFill = screen.getByTestId('password-strength-fill');
      expect(strengthFill).toHaveStyle('background-color: #d97706');
    });

    it('should apply correct color for strong password', () => {
      render(<PasswordStrengthBar score={4} strength="Strong" />);

      const strengthFill = screen.getByTestId('password-strength-fill');
      expect(strengthFill).toHaveStyle('background-color: #16a34a');
    });

    it('should apply default color for empty strength', () => {
      render(<PasswordStrengthBar score={0} strength="" />);

      const strengthFill = screen.getByTestId('password-strength-fill');
      expect(strengthFill).toHaveStyle('background-color: #d1d5db');
    });
  });

  describe('Strength Bar Width', () => {
    it('should set correct width for score 0', () => {
      render(<PasswordStrengthBar score={0} strength="" />);

      const strengthFill = screen.getByTestId('password-strength-fill');
      expect(strengthFill).toHaveStyle('width: 0%');
    });

    it('should set correct width for score 1', () => {
      render(<PasswordStrengthBar score={1} strength="Weak" />);

      const strengthFill = screen.getByTestId('password-strength-fill');
      expect(strengthFill).toHaveStyle('width: 25%');
    });

    it('should set correct width for score 2', () => {
      render(<PasswordStrengthBar score={2} strength="Medium" />);

      const strengthFill = screen.getByTestId('password-strength-fill');
      expect(strengthFill).toHaveStyle('width: 50%');
    });

    it('should set correct width for score 3', () => {
      render(<PasswordStrengthBar score={3} strength="Medium" />);

      const strengthFill = screen.getByTestId('password-strength-fill');
      expect(strengthFill).toHaveStyle('width: 75%');
    });

    it('should set correct width for score 4', () => {
      render(<PasswordStrengthBar score={4} strength="Strong" />);

      const strengthFill = screen.getByTestId('password-strength-fill');
      expect(strengthFill).toHaveStyle('width: 100%');
    });

    it('should handle decimal scores correctly', () => {
      render(<PasswordStrengthBar score={2.5} strength="Medium" />);

      const strengthFill = screen.getByTestId('password-strength-fill');
      expect(strengthFill).toHaveStyle('width: 62.5%');
    });
  });

  describe('Strength Text Display', () => {
    const strengthTestCases: { expectedText: string; strength: PasswordStrength }[] = [
      { expectedText: 'Enter password', strength: '' },
      { expectedText: 'Weak password', strength: 'Weak' },
      { expectedText: 'Medium strength', strength: 'Medium' },
      { expectedText: 'Strong password', strength: 'Strong' },
    ];

    for (const { expectedText, strength } of strengthTestCases) {
      it(`should display "${expectedText}" for strength "${strength}"`, () => {
        render(<PasswordStrengthBar score={2} strength={strength} />);

        const strengthText = screen.getByTestId('password-strength-text');
        expect(strengthText).toHaveTextContent(expectedText);
      });
    }
  });

  describe('Component Integration', () => {
    it('should handle all password strength combinations', () => {
      const testCases = [
        { color: '#d1d5db', score: 0, strength: '' as PasswordStrength, text: 'Enter password', width: '0%' },
        { color: '#dc2626', score: 1, strength: 'Weak' as PasswordStrength, text: 'Weak password', width: '25%' },
        { color: '#d97706', score: 2, strength: 'Medium' as PasswordStrength, text: 'Medium strength', width: '50%' },
        { color: '#d97706', score: 3, strength: 'Medium' as PasswordStrength, text: 'Medium strength', width: '75%' },
        { color: '#16a34a', score: 4, strength: 'Strong' as PasswordStrength, text: 'Strong password', width: '100%' },
      ];

      for (const { color, score, strength, text, width } of testCases) {
        const { rerender, unmount } = render(<PasswordStrengthBar score={score} strength={strength} />);

        const strengthText = screen.getByTestId('password-strength-text');
        const strengthFill = screen.getByTestId('password-strength-fill');

        expect(strengthFill).toHaveStyle(`width: ${width}`);
        expect(strengthFill).toHaveStyle(`background-color: ${color}`);
        expect(strengthText).toHaveTextContent(text);

        rerender(<PasswordStrengthBar score={score + 1} strength="Strong" />);

        unmount();
      }
    });

    it('should update correctly when props change', () => {
      const { rerender } = render(<PasswordStrengthBar score={1} strength="Weak" />);

      let strengthFill = screen.getByTestId('password-strength-fill');
      let strengthText = screen.getByTestId('password-strength-text');

      expect(strengthFill).toHaveStyle('width: 25%');
      expect(strengthFill).toHaveStyle('background-color: #dc2626');
      expect(strengthText).toHaveTextContent('Weak password');

      rerender(<PasswordStrengthBar score={4} strength="Strong" />);

      strengthFill = screen.getByTestId('password-strength-fill');
      strengthText = screen.getByTestId('password-strength-text');

      expect(strengthFill).toHaveStyle('width: 100%');
      expect(strengthFill).toHaveStyle('background-color: #16a34a');
      expect(strengthText).toHaveTextContent('Strong password');
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      render(<PasswordStrengthBar score={3} strength="Medium" />);

      const container = screen.getByTestId('password-strength-container');
      const bar = screen.getByTestId('password-strength-bar');
      const fill = screen.getByTestId('password-strength-fill');
      const text = screen.getByTestId('password-strength-text');

      expect(container).toContainElement(bar);
      expect(bar).toContainElement(fill);
      expect(container).toContainElement(text);
    });

    it('should render consistently with different scores', () => {
      for (const score of [0, 1, 2, 3, 4]) {
        const { unmount } = render(<PasswordStrengthBar score={score} strength="Medium" />);

        expect(screen.getByTestId('password-strength-container')).toBeInTheDocument();
        expect(screen.getByTestId('password-strength-bar')).toBeInTheDocument();
        expect(screen.getByTestId('password-strength-fill')).toBeInTheDocument();
        expect(screen.getByTestId('password-strength-text')).toBeInTheDocument();

        unmount();
      }
    });
  });
});
