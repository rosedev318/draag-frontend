import { Avatar, Modal } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const AssignedModal = (props) => {
  const { assignedMember, openAssigned, handleCloseAssigend } = props;
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '6px',
    px: 4,
    overflow: 'hidden',
    outline: 'none'
  };
  return (
    <div>
      <Modal
        open={openAssigned}
        onClose={handleCloseAssigend}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div style={style} className="delete-comment-modal">
          <div style={{ overflowY: 'auto', height: '250px' }}>
            <div className="d-flex justify-content-between p-2">
              <div>Assigned Members</div>
              <CloseIcon
                className="cursor-pointer"
                onClick={() => handleCloseAssigend()}
              />
            </div>
            <div>
              {assignedMember
                .sort((a, b) =>
                  a.user.profileImageUrl && !b.user.profileImageUrl ? -1 : 1
                )
                .map((e, index) => {
                  return (
                    <div key={index} className="d-flex gap-2 px-2 pt-2">
                      <Avatar
                        src={e.user.profileImageUrl}
                        sx={{ width: 24, height: 24 }}
                      />
                      <div className="member-name">{e.user.fullName}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AssignedModal;
