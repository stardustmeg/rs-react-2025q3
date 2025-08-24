import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { mockCountries } from '@/__mocks__/mockCountries';
import { Modal } from '@/components/Modal';
import { UncontrolledForm } from '@/components/UncontrolledForm';
import countriesReducer from '@/store/slices/countriesSlice';
import formReducer from '@/store/slices/formSlice';

const mockPdfFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });
Object.defineProperty(mockPdfFile, 'size', { value: 1024 * 1024 });

const mockPngFile = new File(['test'], 'test.png', { type: 'image/png' });
Object.defineProperty(mockPngFile, 'size', { value: 1024 * 1024 });

Object.defineProperty(global, 'crypto', { value: { randomUUID: () => 'test-uuid-456' } });

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

describe('UncontrolledForm Component', () => {
  let store: ReturnType<typeof configureStore>;
  let mockOnClose: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    store = configureStore({ reducer: { countries: countriesReducer, form: formReducer } });
    mockOnClose = vi.fn();
  });

  const renderComponent = (): ReturnType<typeof render> => {
    return render(
      <Provider store={store}>
        <Modal isOpen onClose={mockOnClose} title="Uncontrolled Form">
          <UncontrolledForm onClose={mockOnClose} />
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
      expect(screen.getByLabelText('Confirm Password *')).toBeInTheDocument();
      expect(screen.getByLabelText('Gender *')).toBeInTheDocument();
      expect(screen.getByLabelText('Country *')).toBeInTheDocument();
      expect(screen.getByLabelText('Picture *')).toBeInTheDocument();
      expect(screen.getByText(/I accept the Terms and Conditions/)).toBeInTheDocument();
    });

    it('should render form with correct structure', () => {
      renderComponent();

      const form = screen.getByTestId('uncontrolled-form');
      expect(form).toBeInTheDocument();
    });

    it('should render countries datalist with options', () => {
      renderComponent();

      const datalist = screen.getByTestId('countries-list');
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

    it('should render age input with min and max attributes', () => {
      renderComponent();

      const ageInput = screen.getByLabelText('Age *');
      expect(ageInput).toHaveAttribute('min', '1');
      expect(ageInput).toHaveAttribute('max', '120');
    });
  });

  describe('Field Validation', () => {
    it('should show errors for empty required fields on submit', async () => {
      renderComponent();

      const submitButton = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Name must start with an uppercase letter')).toBeInTheDocument();
      });
      expect(screen.getByText('Age must be greater than 1')).toBeInTheDocument();
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      expect(screen.getByText('Password must contain at least one special character')).toBeInTheDocument();
      expect(screen.getByText('You must accept the terms and conditions')).toBeInTheDocument();
    });

    it('should validate name field correctly', async () => {
      renderComponent();

      const submitButton = screen.getByRole('button', { name: /submit/i });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Name must start with an uppercase letter')).toBeInTheDocument();
      });

      const nameInput = screen.getByLabelText('Name *');
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText('Name must start with an uppercase letter')).not.toBeInTheDocument();
      });
    });

    it('should validate age field correctly', async () => {
      renderComponent();

      const ageInput = screen.getByLabelText('Age *');
      const submitButton = screen.getByRole('button', { name: /submit/i });

      fireEvent.change(ageInput, { target: { value: '0' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Age must be greater than 1')).toBeInTheDocument();
      });

      fireEvent.change(ageInput, { target: { value: '25' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText('Age must be greater than 1')).not.toBeInTheDocument();
      });
    });

    it('should validate email field correctly', async () => {
      renderComponent();

      const emailInput = screen.getByLabelText('Email *');
      const submitButton = screen.getByRole('button', { name: /submit/i });

      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument();
      });
    });

    it('should validate password strength', () => {
      renderComponent();

      const passwordInput = screen.getByLabelText('Password *');

      fireEvent.change(passwordInput, { target: { value: 'weak' } });
      expect(screen.getByText('Weak password')).toBeInTheDocument();

      fireEvent.change(passwordInput, { target: { value: 'StrongP@ss123' } });
      expect(screen.getByText('Strong password')).toBeInTheDocument();
    });

    it('should validate password confirmation matching', async () => {
      renderComponent();

      const passwordInput = screen.getByLabelText('Password *');
      const confirmPasswordInput = screen.getByLabelText('Confirm Password *');
      const submitButton = screen.getByRole('button', { name: /submit/i });

      fireEvent.change(passwordInput, { target: { value: 'StrongP@ss123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'DifferentP@ss123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
      });

      fireEvent.change(confirmPasswordInput, { target: { value: 'StrongP@ss123' } });
      fireEvent.click(submitButton);

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
      const confirmPasswordInput = screen.getByLabelText('Confirm Password *');
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

      fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'Jane Doe' } });
      fireEvent.change(screen.getByLabelText('Age *'), { target: { value: '30' } });
      fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'jane@example.com' } });
      fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'StrongP@ss123' } });
      fireEvent.change(screen.getByLabelText('Confirm Password *'), { target: { value: 'StrongP@ss123' } });
      fireEvent.change(screen.getByLabelText('Gender *'), { target: { value: 'female' } });
      fireEvent.change(screen.getByLabelText('Country *'), { target: { value: 'Canada' } });
      fireEvent.click(screen.getByText(/I accept the Terms and Conditions/));

      const fileInput = screen.getByLabelText('Picture *');
      fireEvent.change(fileInput, { target: { files: [mockPngFile] } });

      const submitButton = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submitButton);
    });

    it('should handle file validation errors', async () => {
      const validateFileMock = vi.fn(() => ({ error: 'Invalid file format', isValid: false }));
      vi.mocked(await import('@/utils/fileUtils')).validateFile.mockReturnValue(validateFileMock());

      renderComponent();

      fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'Jane Doe' } });
      fireEvent.change(screen.getByLabelText('Age *'), { target: { value: '30' } });
      fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'jane@example.com' } });
      fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'StrongP@ss123' } });
      fireEvent.change(screen.getByLabelText('Confirm Password *'), { target: { value: 'StrongP@ss123' } });
      fireEvent.change(screen.getByLabelText('Gender *'), { target: { value: 'female' } });
      fireEvent.change(screen.getByLabelText('Country *'), { target: { value: 'Canada' } });
      fireEvent.click(screen.getByText(/I accept the Terms and Conditions/));

      const fileInput = screen.getByLabelText('Picture *');
      fireEvent.change(fileInput, { target: { files: [mockPdfFile] } });

      const submitButton = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid image format')).toBeInTheDocument();
      });

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should handle form validation errors', async () => {
      renderComponent();

      fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'A' } });
      fireEvent.change(screen.getByLabelText('Age *'), { target: { value: '0' } });
      fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'invalid' } });
      fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'weak' } });
      fireEvent.change(screen.getByLabelText('Confirm Password *'), { target: { value: 'weak' } });
      fireEvent.change(screen.getByLabelText('Country *'), { target: { value: 'Canada' } });
      fireEvent.click(screen.getByText(/I accept the Terms and Conditions/));

      const submitButton = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
      });
      expect(screen.getByText('Age must be greater than 1')).toBeInTheDocument();
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      expect(screen.getByText('Password must contain at least one special character')).toBeInTheDocument();

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Error Display and Clearing', () => {
    it('should display errors for invalid fields', async () => {
      renderComponent();

      const submitButton = screen.getByRole('button', { name: /submit/i });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Name must start with an uppercase letter')).toBeInTheDocument();
      });
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });

    it('should clear all errors when form is valid', async () => {
      renderComponent();

      const submitButton = screen.getByRole('button', { name: /submit/i });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Name must start with an uppercase letter')).toBeInTheDocument();
      });

      fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'Jane Doe' } });
      fireEvent.change(screen.getByLabelText('Age *'), { target: { value: '30' } });
      fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'jane@example.com' } });
      fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'StrongP@ss123' } });
      fireEvent.change(screen.getByLabelText('Confirm Password *'), { target: { value: 'StrongP@ss123' } });
      fireEvent.change(screen.getByLabelText('Gender *'), { target: { value: 'female' } });
      fireEvent.change(screen.getByLabelText('Country *'), { target: { value: 'Canada' } });
      fireEvent.click(screen.getByText(/I accept the Terms and Conditions/));
      const fileInput = screen.getByLabelText('Picture *');
      fireEvent.change(fileInput, { target: { files: [mockPngFile] } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText('Name must start with an uppercase letter')).not.toBeInTheDocument();
      });
      expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument();
    });
  });

  describe('Password Strength Updates', () => {
    it('should update password strength when password changes', () => {
      renderComponent();

      const passwordInput = screen.getByLabelText('Password *');

      expect(screen.queryByTestId('password-strength-container')).not.toBeInTheDocument();

      fireEvent.change(passwordInput, { target: { value: 'weak' } });
      expect(screen.getByText('Weak password')).toBeInTheDocument();

      fireEvent.change(passwordInput, { target: { value: 'Medium123' } });
      expect(screen.getByText('Medium strength')).toBeInTheDocument();

      fireEvent.change(passwordInput, { target: { value: 'StrongP@ss123' } });
      expect(screen.getByText('Strong password')).toBeInTheDocument();
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

  describe('Form State Management', () => {
    it('should clear errors on form submission', async () => {
      renderComponent();

      const submitButton = screen.getByRole('button', { name: /submit/i });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Name must start with an uppercase letter')).toBeInTheDocument();
      });

      fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'Jane Doe' } });
      fireEvent.change(screen.getByLabelText('Age *'), { target: { value: '30' } });
      fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'jane@example.com' } });
      fireEvent.change(screen.getByLabelText('Password *'), { target: { value: 'StrongP@ss123' } });
      fireEvent.change(screen.getByLabelText('Confirm Password *'), { target: { value: 'StrongP@ss123' } });
      fireEvent.change(screen.getByLabelText('Country *'), { target: { value: 'Canada' } });
      fireEvent.click(screen.getByText(/I accept the Terms and Conditions/));

      const fileInput = screen.getByLabelText('Picture *');
      fireEvent.change(fileInput, { target: { files: [mockPngFile] } });

      fireEvent.click(submitButton);
    });
  });
});
