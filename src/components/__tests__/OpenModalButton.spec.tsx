import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { OpenModalButton } from '@/components/OpenModalButton';

describe('OpenModalButton Component', () => {
  let openModalMock: ReturnType<typeof vi.fn>;
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    openModalMock = vi.fn();
    user = userEvent.setup();
  });

  it('renders button with correct label', () => {
    const testLabel = 'Open Test Modal';
    render(<OpenModalButton label={testLabel} openModal={openModalMock} />);

    const button = screen.getByRole('button', { name: testLabel });
    expect(button).toBeInTheDocument();
  });

  it('has correct button attributes', () => {
    const testLabel = 'Open Test Modal';
    render(<OpenModalButton label={testLabel} openModal={openModalMock} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('calls openModal when clicked', async () => {
    const testLabel = 'Open Test Modal';
    render(<OpenModalButton label={testLabel} openModal={openModalMock} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(openModalMock).toHaveBeenCalledTimes(1);
  });

  it('does not call openModal on other interactions', () => {
    const testLabel = 'Open Test Modal';
    render(<OpenModalButton label={testLabel} openModal={openModalMock} />);

    expect(openModalMock).not.toHaveBeenCalled();
  });
});
