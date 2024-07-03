import { Button } from "react-bootstrap";

const ConfirmationModal = ({ handleDelete, handleClose }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h3>Do you want to delete it?</h3>
      <div className="d-flex justify-content-center align-items-center gap-5 py-3">
        <Button onClick={handleClose} variant="primary fs-4">
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="danger fs-4">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
