import React, { type JSX, useState } from 'react';

interface DrawerProps {
  children?: React.ReactNode;
}

const Drawer = ({ children }: DrawerProps): JSX.Element => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(!!children);

  return (
    <>
      <div
        className={`fixed inset-0 z-10 bg-black transition-opacity duration-300 ease-in-out ${
          isDrawerOpen ? 'pointer-events-auto opacity-30' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => {
          setIsDrawerOpen(false);
        }}
      />

      <div
        className={`fixed top-0 right-0 h-full w-3/4 !bg-white shadow-lg sm:w-1/2 md:w-1/3 ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        } z-20 transition-transform duration-300 ease-in-out`}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          aria-label="Close drawer"
          className="absolute top-22 right-4 text-2xl text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => {
            setIsDrawerOpen(false);
          }}
        >
          &times;
        </button>
        <div className="h-full overflow-y-auto p-6">{children}</div>
      </div>
    </>
  );
};

export default React.memo(Drawer);
