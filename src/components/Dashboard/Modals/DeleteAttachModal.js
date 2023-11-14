import { Box, Button, Modal } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteAttachment,
  deleteComments,
  deleteJobs,
  getAttachment
} from '../../../Redux/Actions/CategoryAction';
import { BsExclamationDiamondFill } from 'react-icons/bs';

const DeleteAttachModal = (props) => {
  const { deleteAttach, handleCloseAttachDelete, attachmentId, jobId } = props;
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '6px',
    // boxShadow: 24,
    px: 4,
    outline: 'none'
  };

  const dispatch = useDispatch();
  const removeAttachment = () => {
    handleCloseAttachDelete();
    dispatch(deleteAttachment(jobId, attachmentId)).then(() => {
      dispatch(getAttachment(jobId));
    });
  };

  return (
    <div>
      <Modal
        open={deleteAttach}
        onClose={handleCloseAttachDelete}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="delete-comment-modal">
          <h5 className="p-2 fw-bold d-flex align-items-center gap-2">
            <BsExclamationDiamondFill className="fs-6 text-danger" />
            Delete attachment?
          </h5>
          <div className="p-2">
            Deleting an attachment is permanent. There is no undo.
          </div>
          <div className="d-flex justify-content-end gap-2 m-2">
            <Button
              variant="contained"
              size="small"
              className="text-capitalize bg-light text-dark"
              onClick={handleCloseAttachDelete}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              className="text-capitalize"
              onClick={() => removeAttachment()}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteAttachModal;
