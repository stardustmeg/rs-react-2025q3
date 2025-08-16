'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

import { stopPropagation } from '@/utils/index';

interface DrawerProps {
  children?: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ children }) => {
  const dialogReference = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const dialog = dialogReference.current;
    if (!dialog) {
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }
  }, []);

  const handleClose = (): void => {
    dialogReference.current?.close();

    if (document.referrer.includes(window.location.origin)) {
      router.back();
    } else {
      const pathSegments = pathname.split('/');
      const basePathSegments = pathSegments.slice(0, -1);
      const basePath = basePathSegments.join('/');

      const queryString = searchParams.toString();
      const newUrl = queryString ? `${basePath}?${queryString}` : basePath;

      router.replace(newUrl);
    }
  };

  return (
    <dialog
      className="fixed inset-0 z-50 m-0 overflow-hidden bg-transparent p-0 backdrop:bg-black/30"
      data-testid="drawer-panel"
      onClick={handleClose}
      ref={dialogReference}
    >
      <div
        className="fixed right-0 top-0 h-full w-3/4 bg-white shadow-lg transition-transform duration-300 dark:bg-dark-card sm:w-1/2 md:w-1/3"
        onClick={stopPropagation}
      >
        <button
          aria-label="Close drawer"
          className="absolute right-4 top-4 z-50 text-2xl text-gray-500 hover:cursor-pointer hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:text-gray-200"
          onClick={handleClose}
        >
          &times;
        </button>
        <div className="h-full overflow-y-auto p-6 contain-layout">{children}</div>
      </div>
    </dialog>
  );
};

export default Drawer;
