import React, { useEffect, useRef } from 'react';

import { stopPropagation } from '@/utils';

interface DrawerProps {
  children?: React.ReactNode;
  handleCloseDrawer: () => void;
  isDrawerOpen: boolean;
}

const Drawer: React.FC<DrawerProps> = ({ children, handleCloseDrawer, isDrawerOpen }) => {
  const dialogReference = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogReference.current;
    if (!dialog) {
      return;
    }

    if (isDrawerOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isDrawerOpen]);

  return (
    <dialog
      className="fixed inset-0 z-50 m-0 overflow-hidden bg-transparent p-0 backdrop:bg-black/30"
      data-testid="drawer-panel"
      onClick={handleCloseDrawer}
      ref={dialogReference}
    >
      <div
        className="fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg transition-transform duration-300 sm:w-1/2 md:w-1/3"
        onClick={stopPropagation}
      >
        <button
          aria-label="Close drawer"
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:cursor-pointer hover:text-gray-700 focus:outline-none"
          onClick={handleCloseDrawer}
        >
          &times;
        </button>
        <div className="h-full overflow-y-auto p-6">{children}</div>
      </div>
    </dialog>
  );
};

export default Drawer;
