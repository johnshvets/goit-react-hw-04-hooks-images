import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.css";
import { useEffect } from "react";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleKeyDown({ code }) {
    if (code === "Escape") {
      onClose();
    }
  }

  function handleBackdropClick({ currentTarget, target }) {
    if (currentTarget === target) {
      onClose();
    }
  }

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
