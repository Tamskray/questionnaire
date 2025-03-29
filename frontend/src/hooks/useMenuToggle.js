import { useState, useEffect, useRef } from "react";

export const useMenuToggle = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const openMenu = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (anchorRef.current && !anchorRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return {
    anchorRef,
    open,
    openMenu,
    closeMenu,
  };
};
