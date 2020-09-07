import React from "react";
import "./styles.scss";

const Modal = ({ hideModal, toggleModal, children }) => {
  if (hideModal) return null;

  return (
    <>
      <div className="modal__overlay" onClick={() => toggleModal()} />
      <div className="modal__dialog">{children}</div>
    </>
  );
};

export default Modal;
