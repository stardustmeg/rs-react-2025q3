import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { mockCountries } from '@/__mocks__/mockCountries';
import { Modal } from '@/components/Modal';
import { ReactHookForm } from '@/components/ReactHookForm';
import countriesReducer from '@/store/slices/countriesSlice';
import formReducer from '@/store/slices/formSlice';

const mockPngFile = new File(['test'], 'test.png', { type: 'image/png' });
const mockPdfFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });

Object.defineProperty(mockPngFile, 'size', { value: 1024 * 1024 });
Object.defineProperty(mockPdfFile, 'size', { value: 1024 * 1024 });

Object.defineProperty(global, 'crypto', { value: { randomUUID: () => 'test-uuid-123' } });

beforeAll(() => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.append(modalRoot);
});

afterAll(() => {
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) {
    modalRoot.remove();
  }
});

vi.mock('@/utils/fileUtils', () => ({
  fileToBase64: vi.fn(() =>
    Promise.resolve(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    ),
  ),
  validateFile: vi.fn(() => ({ isValid: true })),
}));

describe('ReactHookForm Component', () => {
  let store: ReturnType<typeof configureStore>;
  let mockOnClose: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    store = configureStore({ reducer: { countries: countriesReducer, form: formReducer } });
    mockOnClose = vi.fn();
  });

  const renderComponent = (): ReturnType<typeof render> => {
    return render(
      <Provider store={store}>
        <Modal isOpen onClose={mockOnClose} title="Test Modal">
          <ReactHookForm onClose={mockOnClose} />
        </Modal>
      </Provider>,
    );
  };

  describe('Form Rendering', () => {
    it('should render all required form fields', () => {
      renderComponent();

      expect(screen.getByLabelText('Name *')).toBeInTheDocument();
      expect(screen.getByLabelText('Age *')).toBeInTheDocument();
      expect(screen.getByLabelText('Email *')).toBeInTheDocument();
      expect(screen.getByLabelText('Password *')).toBeInTheDocument();
      expect(screen.getByTestId('rhf-confirm-password')).toBeInTheDocument();
      expect(screen.getByLabelText('Gender *')).toBeInTheDocument();
      expect(screen.getByLabelText('Country *')).toBeInTheDocument();
      expect(screen.getByLabelText('Picture *')).toBeInTheDocument();
      expect(screen.getByText(/I accept the Terms and Conditions/)).toBeInTheDocument();
    });

    it('should render form with correct structure', () => {
      renderComponent();

      const form = screen.getByTestId('rhf-form');
      expect(form).toBeInTheDocument();
    });

    it('should render countries datalist with options', () => {
      renderComponent();

      const datalist = screen.getByTestId('rhf-countries-list');
      expect(datalist).toBeInTheDocument();

      const options = datalist.querySelectorAll('option');
      expect(options[0]).toHaveValue(mockCountries[0].name);
      expect(options[1]).toHaveValue(mockCountries[1].name);
      expect(options[2]).toHaveValue(mockCountries[2].name);
    });

    it('should render gender select with all options', () => {
      renderComponent();

      const genderSelect = screen.getByLabelText('Gender *');
      expect(genderSelect).toBeInTheDocument();

      const genderOptions = screen.getAllByRole('option');
      expect(genderOptions.length).toBeGreaterThan(0);
    });
  });

  describe('Field Validation', () => {
    it('should validate name field correctly', async () => {
      renderComponent();

      const nameInput = screen.getByLabelText('Name *');

      fireEvent.change(nameInput, { target: { value: 'A' } });
      fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
      });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(screen.queryByText('Name must be at least 2 characters')).not.toBeInTheDocument();
      });
    });

    it('should validate age field correctly', async () => {
      renderComponent();

      const ageInput = screen.getByLabelText('Age *');

      fireEvent.change(ageInput, { target: { value: '0' } });
      fireEvent.blur(ageInput);

      await waitFor(() => {
        expect(screen.getByText('Age must be greater than 1')).toBeInTheDocument();
      });

      fireEvent.change(ageInput, { target: { value: '25' } });
      fireEvent.blur(ageInput);

      await waitFor(() => {
        expect(screen.queryByText('Age must be greater than 1')).not.toBeInTheDocument();
      });
    });

    it('should validate email field correctly', async () => {
      renderComponent();

      const emailInput = screen.getByLabelText('Email *');

      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument();
      });
    });

    it('should validate password strength', async () => {
      renderComponent();

      const passwordInput = screen.getByLabelText('Password *');

      fireEvent.change(passwordInput, { target: { value: 'weak' } });

      await waitFor(() => {
        expect(screen.getByText('Weak password')).toBeInTheDocument();
      });

      fireEvent.change(passwordInput, { target: { value: 'StrongP@ss123' } });

      await waitFor(() => {
        expect(screen.getByText('Strong password')).toBeInTheDocument();
      });
    });

    it('should validate password confirmation matching', async () => {
      renderComponent();

      fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText('Age *'), { target: { value: '25' } });
      fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText('Gender *'), { target: { value: 'male' } });
      fireEvent.change(screen.getByLabelText('Country *'), { target: { value: 'United States' } });
      fireEvent.click(screen.getByText(/I accept the Terms and Conditions/));

      const passwordInput = screen.getByLabelText('Password *');
      const confirmPasswordInput = screen.getByTestId('rhf-confirm-password');

      fireEvent.change(passwordInput, { target: { value: 'StrongP@ss123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'DifferentP@ss123' } });
      fireEvent.blur(confirmPasswordInput);

      await waitFor(() => {
        expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
      });

      fireEvent.change(confirmPasswordInput, { target: { value: 'StrongP@ss123' } });
      fireEvent.blur(confirmPasswordInput);

      await waitFor(() => {
        expect(screen.queryByText("Passwords don't match")).not.toBeInTheDocument();
      });
    });
  });

  describe('Password Visibility Toggle', () => {
    it('should toggle password visibility', () => {
      renderComponent();

      const passwordInput = screen.getByLabelText('Password *');
      const toggleButton = screen.getAllByRole('button', { name: /show password|hide password/i })[0];

      expect(passwordInput).toHaveAttribute('type', 'password');

      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'text');

      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('should toggle confirm password visibility independently', () => {
      renderComponent();

      const passwordInput = screen.getByLabelText('Password *');
      const confirmPasswordInput = screen.getByTestId('rhf-confirm-password');
      const toggleButtons = screen.getAllByRole('button', { name: /show password|hide password/i });

      fireEvent.click(toggleButtons[0]);
      expect(passwordInput).toHaveAttribute('type', 'text');
      expect(confirmPasswordInput).toHaveAttribute('type', 'password');

      fireEvent.click(toggleButtons[1]);
      expect(passwordInput).toHaveAttribute('type', 'text');
      expect(confirmPasswordInput).toHaveAttribute('type', 'text');
    });
  });

  describe('Form Submission', () => {
    it('should submit valid form data', async () => {
      renderComponent();

      fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText('Age *'), { target: { value: '25' } });
      fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'StrongP@ss123' } });
      fireEvent.change(screen.getByTestId('rhf-confirm-password'), { target: { value: 'StrongP@ss123' } });
      fireEvent.change(screen.getByLabelText('Gender *'), { target: { value: 'male' } });
      fireEvent.change(screen.getByLabelText('Country *'), { target: { value: 'United States' } });
      fireEvent.click(screen.getByText(/I accept the Terms and Conditions/));

      const fileInput = screen.getByLabelText('Picture *');
      fireEvent.change(fileInput, { target: { files: [mockPngFile] } });

      const submitButton = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submitButton);
    });

    it('should disable submit button when form is invalid', () => {
      renderComponent();

      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).toBeDisabled();
    });

    it('should handle file validation errors', async () => {
      const validateFileMock = vi.fn(() => ({ error: 'File too large', isValid: false }));
      vi.mocked(await import('@/utils/fileUtils')).validateFile.mockReturnValue(validateFileMock());

      renderComponent();

      fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText('Age *'), { target: { value: '25' } });
      fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'StrongP@ss123' } });
      fireEvent.change(screen.getByTestId('rhf-confirm-password'), { target: { value: 'StrongP@ss123' } });
      fireEvent.change(screen.getByLabelText('Gender *'), { target: { value: 'male' } });
      fireEvent.change(screen.getByLabelText('Country *'), { target: { value: 'United States' } });
      fireEvent.click(screen.getByText(/I accept the Terms and Conditions/));

      const fileInput = screen.getByLabelText('Picture *');
      fireEvent.change(fileInput, { target: { files: [mockPngFile] } });

      await waitFor(() => {
        expect(screen.getByText('File too large')).toBeInTheDocument();
      });
    });
  });

  describe('Error Clearing', () => {
    it('should clear field errors when user starts typing', async () => {
      renderComponent();

      const nameInput = screen.getByLabelText('Name *');

      fireEvent.change(nameInput, { target: { value: 'A' } });
      fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
      });

      fireEvent.change(nameInput, { target: { value: 'John' } });

      await waitFor(() => {
        expect(screen.queryByText('Name must be at least 2 characters')).not.toBeInTheDocument();
      });
    });
  });

  describe('Cancel Functionality', () => {
    it('should call onClose when cancel button is clicked', () => {
      renderComponent();

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
