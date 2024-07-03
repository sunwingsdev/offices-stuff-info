import { Modal } from "react-bootstrap";

const SimpleModal = ({ show, handleClose, size, children }) => {
  return (
    <Modal onClose={handleClose} size={size} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        {/* <Modal.Title className="text-center">{modalTitle}</Modal.Title> */}
        <p className="btn-modal-close" onClick={() => handleClose()}>
          <i className="fa fa-times text-danger"></i>
        </p>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default SimpleModal;
