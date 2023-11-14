import { Avatar, Button, Modal } from '@mui/material';
import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import {
  addAssignee,
  createAssignment,
  deleteAssignee,
  getAssigneeUsers,
  nanniesHightlight
} from '../../../Redux/Actions/CategoryAction';
import { useSelector } from 'react-redux';
import {
  enabledAgencyUsers,
  userProfile
} from '../../../Redux/Actions/AgencyAction';
import './AssignModal.css';

const AssignModal = (props) => {
  const { openAssign, handleCloseAssign, job } = props;
  const dispatch = useDispatch();
  const assigneeUser = useSelector((state) => state?.Category?.assigneeUsers);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '6px',
    px: 4,
    width: 350,
    overflow: 'hidden',
    outline: 'none'
  };

  useEffect(() => {
    dispatch(nanniesHightlight());
    dispatch(userProfile());
  }, []);

  const handleAssign = (assignId) => {
    dispatch(addAssignee(job.id, assignId));
  };

  const handleRemove = (assignId) => {
    dispatch(deleteAssignee(job.id, assignId));
  };

  useEffect(() => {
    if (openAssign) {
      dispatch(getAssigneeUsers(job.id));
    }
  }, [openAssign]);

  return (
    <div className="assign-team-modal px-2">
      <div style={{ overflowY: 'auto', height: '412px' }}>
        <div className="d-flex justify-content-between assign-team-title pt-3 px-3">
          <div className="assign-team-title">
            Assign Team members to this post
          </div>
          <CloseIcon
            sx={{
              width: 16,
              height: 16,
              color: '#2E3847',
              cursor: 'pointer'
            }}
            onClick={() => handleCloseAssign()}
          />
        </div>
        <div className="pt-5">
          {assigneeUser?.length > 0 &&
            assigneeUser.map((e, index) => {
              return (
                <div
                  key={index}
                  className="d-flex align-items-center position-relative"
                  style={{ paddingBottom: '13px' }}
                >
                  <div className="d-flex gap-2 px-2">
                    <Avatar
                      src={e.user.profileImageUrl}
                      sx={{ width: 24, height: 24 }}
                    />
                    <div className="member-name">{e.user.fullName}</div>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      right: 0
                    }}
                  >
                    {e.assignedToJob ? (
                      <button
                        className="assigned-btn mx-2 text-capitalize"
                        onClick={() => handleRemove(e.user.id)}
                      >
                        Assigned
                      </button>
                    ) : (
                      <button
                        className="assign-btn mx-2 text-capitalize"
                        onClick={() => handleAssign(e.user.id)}
                      >
                        Assign
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AssignModal;
