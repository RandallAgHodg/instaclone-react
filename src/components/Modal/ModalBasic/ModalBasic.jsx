import React from "react";
import { Modal } from "semantic-ui-react";
import "./ModalBasic.scss";

function ModalBasic({ show, setShow, title, children }) {
  const onClose = () => {
    setShow(false);
  };

  return (
    <Modal size="tiny" open={show} onClose={onClose} className="modal-basic">
      {title && <Modal.Header>{title}</Modal.Header>}
      {children}
    </Modal>
  );
}

export default ModalBasic;
