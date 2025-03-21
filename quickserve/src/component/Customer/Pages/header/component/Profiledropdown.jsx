import {
    FiUser,
    FiLogOut,
    FiHelpCircle,
    FiSettings,
  } from "react-icons/fi";
  import { motion } from "framer-motion";
  import { useEffect, useRef } from "react";
  
  const ProfileDropdown = ({ open, setOpen }) => {
    const dropdownRef = useRef(null);
  
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
      <motion.div
        ref={dropdownRef}
        animate={open ? "open" : "closed"}
        className="relative"
      >
        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
        >
          <Option Icon={FiUser} text="My Profile" />
          <Option Icon={FiSettings} text="My Bookings" />
          <Option Icon={FiHelpCircle} text="Help Center" />
          <Option Icon={FiLogOut} text="Logout" />
        </motion.ul>
      </motion.div>
    );
  };
  
  const Option = ({ text, Icon }) => {
    return (
      <motion.li
        variants={itemVariants}
        className="flex items-center gap-2 w-full p-2 text-sm font-medium rounded-md hover:bg-indigo-100 text-gray-700 hover:text-indigo-500 transition-colors cursor-pointer"
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
  