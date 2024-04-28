import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Navigation</h1>
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

      
    </div>
  );
};

export default Sidebar;
