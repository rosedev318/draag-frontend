import { Button, Modal } from '@mui/material';
import React from 'react';
import { BsExclamationDiamondFill } from 'react-icons/bs';

const LeavePendingAgency = (props) => {
  const { openpAgency, handleClosepAgency, deleteAgency, name } = props;
  return (
    <div>
      <Modal
        open={openpAgency}
        onClose={handleClosepAgency}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="delete-comment-modal">
          <h5 className="p-2 fw-bold d-flex align-items-center gap-2">
            <BsExclamationDiamondFill className="fs-6 text-danger" /> Leave
            Pending Agency?
          </h5>
          <div className="p-2">Are you sure want to leave {name}?</div>
          <div className="d-flex justify-content-end gap-2 m-2">
            <Button
              variant="contained"
              size="small"
              className="text-capitalize bg-light text-dark"
              onClick={handleClosepAgency}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              className="text-capitalize"
              onClick={() => deleteAgency()}
            >
              Leave
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LeavePendingAgency;
