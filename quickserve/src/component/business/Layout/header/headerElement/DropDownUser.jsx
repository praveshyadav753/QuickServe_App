import { useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../../../../../component/clickoutside';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClickOutside={() => setDropdownOpen(false)}>
      <div className="relative inline-flex">
        <Link
          onClick={(e) => {
            e.preventDefault();
            setDropdownOpen(prev => !prev);
          }}
          className="flex items-center gap-4"
          to="#"
        >
          <img
            className="w-8 h-8 rounded-full"
            src="/path-to-user-image.jpg"
            width="32"
            height="32"
            alt="User"
          />
          <span className="hidden md:block font-medium text-sm text-gray-600">Username</span>
        </Link>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
            <ul>
              <li>
                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </ClickOutside>
  );
};

export default DropdownUser;
