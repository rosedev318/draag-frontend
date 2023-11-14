import { Box, Button, Modal } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteComments,
  deleteJobs
} from '../../../Redux/Actions/CategoryAction';
import { BsExclamationDiamondFill } from 'react-icons/bs';

const DeleteComment = (props) => {
  const { openComment, handleCloseComment, job, commentId } = props;
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

  const removeComment = () => {
    dispatch(deleteComments(job.id, commentId));
    handleCloseComment();
  };

  return (
    <div>
      <Modal
        open={openComment}
        onClose={handleCloseComment}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="delete-comment-modal">
          <h5 className="p-2 fw-bold d-flex align-items-center gap-2">
            <BsExclamationDiamondFill className="fs-6 text-danger" /> Delete
            this comment?
          </h5>
          <div className="p-2">Once you delete, it's gone for good.</div>
          <div className="d-flex justify-content-end gap-2 m-2">
            <Button
              variant="contained"
              color="error"
              size="small"
              className="text-capitalize"
              onClick={() => removeComment()}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              size="small"
              className="text-capitalize bg-light text-dark"
              onClick={handleCloseComment}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteComment;
