import { Box, Button, Modal } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteJobs } from '../../../Redux/Actions/CategoryAction';
import { userContext } from '../../../context/UserContext';

const ArchiveModal = (props) => {
  const { openArchive, handleCloseArchive, jobId } = props;
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '6px',
    px: 4,
    outline: 'none'
  };
  const dispatch = useDispatch();
  const { starter, setStarter } = useContext(userContext);
  const removeJob = () => {
    const remove = Object.keys(starter.jobs).reduce((acc, key) => {
      if (key !== jobId) {
        acc[key] = starter.jobs[key];
      }
      return acc;
    }, {});
    console.log('remove', remove, jobId);
    setStarter({ ...starter, jobs: remove });
  };

  // dispatch(deleteJobs(jobId));
  // handleCloseArchive();
  return (
    <div>
      <Modal
        open={openArchive}
        onClose={handleCloseArchive}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div style={style} className="delete-comment-modal">
          <p className="p-2">Are you sure want to archive job?</p>
          <div className="d-flex justify-content-end gap-2 m-2">
            <Button
              variant="contained"
              size="small"
              onClick={() => removeJob()}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleCloseArchive}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ArchiveModal;
