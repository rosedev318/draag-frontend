import { Button, Modal } from '@mui/material';
import React from 'react';
import { updateUser } from '../../../Redux/Actions/AuthAction';
import { userProfile } from '../../../Redux/Actions/AgencyAction';
import { BsExclamationDiamondFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';

const RemoveProfileModal = (props) => {
  const { profileModal, handleCloseProfileModal, setFile } = props;
  const dispatch = useDispatch();

  const handleDelete = () => {
    const form = new FormData();
    setFile([]);
    handleCloseProfileModal();
    form.append('deletePhoto', true);
    dispatch(updateUser(form)).then((res) => {
      if (res?.status === 200) {
        dispatch(userProfile());
      }
    });
  };

  return (
    <div>
      <Modal
        open={profileModal}
        onClose={handleCloseProfileModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="delete-comment-modal">
          <h5 className="p-2 fw-bold d-flex align-items-center gap-2">
            <BsExclamationDiamondFill className="fs-6 text-danger" /> Remove
            Photo?
          </h5>
          <div className="p-2">
            Are you sure want to remove profile picture?
          </div>
          <div className="d-flex justify-content-end gap-2 m-2">
            <Button
              variant="contained"
              size="small"
              className="text-capitalize bg-light text-dark"
              onClick={handleCloseProfileModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              className="text-capitalize"
              onClick={() => handleDelete()}
            >
              Remove
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RemoveProfileModal;
