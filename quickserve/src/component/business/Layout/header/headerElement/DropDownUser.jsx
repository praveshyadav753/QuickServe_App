import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClickOutside from "../../../../../component/clickoutside";
import { useDispatch } from "react-redux";
import { logout } from "../../../../../features/reducers/Slice";

const DropdownUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    console.log("Logging out...");
    setLoading(true);

    // ✅ Clear stored token and user data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(logout()); // ✅ Dispatch logout action

    setLoading(false); // ✅ Reset loading state
    setDropdownOpen(false); // ✅ Close dropdown after logout

    navigate("/login"); // ✅ Redirect to login page
  };

  return (
    <ClickOutside onClickOutside={() => setDropdownOpen(false)}>
      <div className="relative inline-flex">
        <Link
          onClick={(e) => {
            e.preventDefault();
            setDropdownOpen((prev) => !prev);
          }}
          className="flex items-center gap-4"
          to="#"
        >
          <img className="w-8 h-8 rounded-full" src="/path-to-user-image.jpg" alt="User" />
          <span className="hidden md:block font-medium text-sm text-gray-600">Username</span>
        </Link>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
            <ul>
              <li onClick={() => setDropdownOpen(false)}>
                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
              </li>
              <li onClick={() => setDropdownOpen(false)}>
                <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
              </li>
              <li onClick={handleLogout}>
                <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  {loading ? "Logging out..." : "Logout"}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </ClickOutside>
  );
};

export default DropdownUser;
