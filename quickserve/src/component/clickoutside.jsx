import { useRef, useEffect } from "react";

const ClickOutside = ({ children, exceptionRef, onClick, className }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickListener = (event) => {
      if (!wrapperRef.current) return; // Ensure wrapper exists
      if (typeof onClick !== "function") return; // Ensure onClick is callable

      let clickedInside =
        wrapperRef.current.contains(event.target) ||
        (exceptionRef?.current && exceptionRef.current.contains(event.target));

      if (!clickedInside) onClick();
    };

    document.addEventListener("mousedown", handleClickListener);
    return () => document.removeEventListener("mousedown", handleClickListener);
  }, [exceptionRef, onClick]);

  return (
    <div ref={wrapperRef} className={className || ""}>
      {children}
    </div>
  );
};

export default ClickOutside;
