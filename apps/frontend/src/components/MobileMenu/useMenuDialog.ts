import { useEffect, useRef, useState } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MOBILE_QUERY } from "@/styles/breakpoints";

function lockPageScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

// The native modal dialog traps focus, closes on Escape and returns focus to the opener by itself
export function useMenuDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery(MOBILE_QUERY);

  const open = () => {
    dialogRef.current?.showModal();
    lockPageScroll(true);
    setIsOpen(true);
  };

  const close = () => {
    dialogRef.current?.close();
  };

  const handleClose = () => {
    lockPageScroll(false);
    setIsOpen(false);
  };

  // The menu is hidden by CSS on wider screens, an open modal there would leave the page inert
  useEffect(() => {
    if (isMobile === false) dialogRef.current?.close();
  }, [isMobile]);

  useEffect(() => () => {
    lockPageScroll(false);
  }, []);

  return { dialogRef, isOpen, open, close, handleClose };
}
