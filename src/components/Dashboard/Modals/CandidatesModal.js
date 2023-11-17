import { Avatar, Button, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import {
  deleteAssignment,
  toggleMessage
} from '../../../Redux/Actions/CategoryAction';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import './CandidatesModal.css';

const CandidatesModal = (props) => {
  const {
    openCandidate,
    handleCloseCandidate,
    job,
    assigned,
    setAssigned,
    handleOpenMember
  } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '6px',
    overflow: 'hidden',
    outline: 'none',
    paddingBottom: '10px'
  };

  const removeCandidate = (assignId) => {
    dispatch(deleteAssignment(job.id, assignId));
  };

  const toggleSent = (assignId, index, message) => {
    let messageValue = JSON.parse(JSON.stringify(assigned));
    if (message) {
      messageValue[index].messageSent = false;
    } else {
      messageValue[index].messageSent = true;
    }
    setAssigned(messageValue);
    dispatch(toggleMessage(job.id, assignId));
  };

  return (
    <div className="candidate-job-modal">
      <div>
        <div className="d-flex justify-content-between assign-team-title pt-3">
          Candidates assigned to this post
          <CloseIcon
            sx={{
              width: 16,
              height: 16,
              color: '#2E3847',
              cursor: 'pointer'
            }}
            onClick={() => handleCloseCandidate()}
          />
        </div>
        <div className="pt-5">
          {assigned?.map((e, index) => {
            return (
              <div
                key={index}
                className="d-flex justify-content-between pt-2 position-relative"
              >
                <div
                  className={`d-flex align-items-center gap-2   ${
                    e.messageSent ? 'fade-out' : ''
                  }`}
                >
                  <Avatar
                    src={e?.nanny?.photo}
                    sx={{ width: 24, height: 24 }}
                  />
                  <div className="member-name">{e?.nanny?.name}</div>
                </div>
                <div
                  className="d-flex gap-3"
                  style={{ position: 'absolute', right: 18 }}
                >
                  <div
                    className="text-capitalize cursor-pointer"
                    style={{
                      width: 'max-content',
                      fontSize: '14px'
                    }}
                    onClick={() => handleOpenMember(e?.nanny?.id)}
                  >
                    <button className="assign-btn">View</button>
                    {/* <RemoveRedEyeOutlinedIcon
                      style={{ color: 'lightgrey' }}
                      className="fs-4 cursor-pointer"
                    /> */}
                  </div>
                  <div
                    className="text-capitalize cursor-pointer"
                    style={{
                      width: 'max-content',
                      fontSize: '14px'
                    }}
                    onClick={() => removeCandidate(e.nanny.id)}
                  >
                    <button className="remove-btn">Remove</button>
                  </div>
                  <div
                    className="text-capitalize cursor-pointer"
                    style={{ width: 'max-content', fontSize: '14px' }}
                    onClick={() =>
                      toggleSent(e.nanny.id, index, e?.messageSent)
                    }
                  >
                    {e.messageSent ? (
                      <button className="sent-btn">Sent</button>
                    ) : (
                      <button className="assign-btn">Send</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CandidatesModal;
