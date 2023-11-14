import { Button, Modal } from '@mui/material';
import React from 'react';
import { BsExclamationDiamondFill } from 'react-icons/bs';

const DeleteModal = (props) => {
  const { title, text, open, onClose, onClick } = props;
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <div className="delete-comment-modal">
        <h5 className="p-2 fw-bold d-flex align-items-center gap-2">
          <BsExclamationDiamondFill className="fs-6 text-danger" /> {title}
        </h5>
        <div className="p-2">{text}</div>
        <div className="d-flex justify-content-end gap-2 m-2">
          <Button
            variant="contained"
            color="error"
            size="small"
            className="text-capitalize"
            onClick={onClick}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            size="small"
            className="text-capitalize bg-light text-dark"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
