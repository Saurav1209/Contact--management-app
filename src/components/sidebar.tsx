import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white w-64 ${isOpen ? 'block' : 'hidden'} md:block`}>
        <div className="p-4">
          {/* <h1 className="text-2xl font-bold ml-1 sm:ml-5">Sidebar</h1> */}
        </div>
        <nav className="p-4">
          <ul>
            <li>
              <Link to="/" className="block py-2">Contacts</Link>
            </li>
            <li>
              <Link to="/dashboard" className="block py-2">Chart and Graphs</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-0 left-0 p-2 bg-gray-800 text-white rounded-full my-3 ms-1"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>

    </div>
  );
};

export default Sidebar;
