import { Children, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onCloseHandler, className='' }) {
  const dialogRef = useRef();

  useEffect(() => {
    const modal = dialogRef.current;
    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} onClose={onCloseHandler} className={`modal ${className}`}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}
