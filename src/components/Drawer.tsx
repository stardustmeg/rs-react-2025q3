import React from 'react';

interface DrawerProps {
  children?: React.ReactNode;
  handleCloseDrawer: () => void;
  isDrawerOpen: boolean;
}

const Drawer: React.FC<DrawerProps> = ({ children, handleCloseDrawer, isDrawerOpen }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-10 bg-black ${
          isDrawerOpen ? 'pointer-events-auto opacity-30' : 'pointer-events-none opacity-0'
        }`}
        onClick={handleCloseDrawer}
      />

      <div
        className={`fixed top-0 right-0 z-20 h-full w-3/4 bg-white shadow-lg sm:w-1/2 md:w-1/3 ${
          isDrawerOpen ? 'translate-x-0 transform' : 'translate-x-full transform'
        }`}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          aria-label="Close drawer"
          className="absolute top-22 right-4 text-2xl text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={handleCloseDrawer}
        >
          &times;
        </button>
        <div className="h-full overflow-y-auto p-6">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
