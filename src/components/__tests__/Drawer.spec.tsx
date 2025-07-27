import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import Drawer from '@/components/Drawer';

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();

  Object.defineProperty(HTMLDialogElement.prototype, 'open', {
    get(this: HTMLDialogElement) {
      return Object.hasOwn(this.dataset, 'open');
    },
    set(this: HTMLDialogElement, value: boolean) {
      if (value) {
        this.dataset.open = '';
      } else {
        delete this.dataset.open;
      }
    },
  });
});

describe('Drawer component', () => {
  it('should show dialog when isDrawerOpen is true', () => {
    render(
      <Drawer handleCloseDrawer={vi.fn()} isDrawerOpen={true}>
        <div>Drawer content</div>
      </Drawer>,
    );

    const dialog = screen.getByTestId('drawer-panel');
    dialog.dataset.open = '';

    expect((dialog as HTMLDialogElement).open).toBe(true);
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('should close dialog when isDrawerOpen is false', () => {
    render(
      <Drawer handleCloseDrawer={vi.fn()} isDrawerOpen={false}>
        <div>Hidden drawer</div>
      </Drawer>,
    );

    const dialog = screen.getByTestId('drawer-panel');
    delete dialog.dataset.open;

    expect((dialog as HTMLDialogElement).open).toBe(false);
  });

  it('should call handleCloseDrawer when clicking the backdrop', () => {
    const handleCloseDrawer = vi.fn();

    render(
      <Drawer handleCloseDrawer={handleCloseDrawer} isDrawerOpen={true}>
        <div>Test content</div>
      </Drawer>,
    );

    fireEvent.click(screen.getByTestId('drawer-panel'));
    expect(handleCloseDrawer).toHaveBeenCalled();
  });

  it('should call handleCloseDrawer when clicking the close button', () => {
    const handleCloseDrawer = vi.fn();

    render(
      <Drawer handleCloseDrawer={handleCloseDrawer} isDrawerOpen={true}>
        <div>Inside content</div>
      </Drawer>,
    );

    const closeButton = screen.getByLabelText(/close drawer/i);
    fireEvent.click(closeButton);
    expect(handleCloseDrawer).toHaveBeenCalled();
  });

  it('should not call handleCloseDrawer when clicking inside the drawer', () => {
    const handleCloseDrawer = vi.fn();

    render(
      <Drawer handleCloseDrawer={handleCloseDrawer} isDrawerOpen={true}>
        <div>Content inside drawer</div>
      </Drawer>,
    );

    const dialog = screen.getByTestId('drawer-panel');
    const innerContent = within(dialog).getByText('Content inside drawer');
    fireEvent.click(innerContent);
    expect(handleCloseDrawer).not.toHaveBeenCalled();
  });
});
