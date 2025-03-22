import { FiUser, FiLogOut, FiHelpCircle, FiSettings } from "react-icons/fi";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../../../features/reducers/Slice";
import { useNavigate } from "react-router";
const ProfileDropdown = ({ open, setOpen }) => {
  const navigate=useNavigate();
  const dispatch = useDispatch(); // ✅ Moved inside component
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  const handleMybookings=()=>{
    navigate("/mybookings")
    setOpen(false);
  }
  const handleLogout = () => {
    console.log("Logging out...");
    setLoading(true);

    // ✅ Dispatch logout action
    dispatch(logout());

    // ✅ Clear token from storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setLoading(false);
    setOpen(false); // ✅ Close dropdown after logout
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  return (
    <motion.div ref={dropdownRef} animate={open ? "open" : "closed"} className="relative">
      <motion.ul
        initial={wrapperVariants.closed}
        variants={wrapperVariants}
        style={{ originY: "top", translateX: "-50%" }}
        className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
      >
        <Option Icon={FiUser} text="My Profile" onClick={() => setOpen(false)} />
        <Option Icon={FiSettings} text="My Bookings" onClick={handleMybookings} />
        <Option Icon={FiHelpCircle} text="Help Center" onClick={() => setOpen(false)} />
        <Option Icon={FiLogOut} text={loading ? "Logging out..." : "Logout"} onClick={handleLogout} />
      </motion.ul>
    </motion.div>
  );
};

// ✅ Updated Option Component to accept `onClick`
const Option = ({ text, Icon, onClick }) => {
  return (
    <motion.li
      variants={itemVariants}
      className="flex items-center gap-2 w-full p-2 text-sm font-medium rounded-md hover:bg-indigo-100 text-gray-700 hover:text-indigo-500 transition-colors cursor-pointer"
      onClick={onClick} 
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default ProfileDropdown;

// Variants for animation
const wrapperVariants = {
  open: { scaleY: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } },
  closed: { scaleY: 0, transition: { when: "afterChildren", staggerChildren: 0.1 } },
};

const itemVariants = {
  open: { opacity: 1, y: 0, transition: { when: "beforeChildren" } },
  closed: { opacity: 0, y: -15, transition: { when: "afterChildren" } },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
