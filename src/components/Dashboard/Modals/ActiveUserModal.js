import { Avatar, Modal, Popover } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PersonIcon from '@mui/icons-material/Person';
import moment from 'moment/moment';

const ActiveUserModal = (props) => {
  const { open, users, handleClose, anchorEl, openU } = props;
  const userId = localStorage.getItem('userid');
  const style = {
    width: 600
  };
  return (
    <div>
      <Popover
        style={style}
        anchorEl={anchorEl}
        open={open}
        openU={openU}
        onClose={handleClose}
      >
        <div>
          <div
            style={{
              overflowY: 'auto',
              height: '600px',
              width: '300px'
              // padding: '15px'
            }}
            className="scroll-modal main-users"
          >
            <div className="d-flex justify-content-between ">
              <div style={{ fontSize: '13px' }}>Last Seen online</div>
              <CloseIcon
                className="cursor-pointer mx-3"
                onClick={() => handleClose()}
              />
            </div>
            <div className="">
              {users
                ?.filter((e) => e?.id !== userId)
                .map((user, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex gap-2 align-items-center pt-3 pb-1"
                    >
                      <div>
                        <Avatar
                          src={user?.profileImageUrl}
                          sx={{ height: 40, width: 40 }}
                        />
                      </div>
                      <div>
                        <div
                          className="d-flex flex-column"
                          style={{
                            width: 'max-content',
                            fontSize: '13px',
                            position: 'relative'
                          }}
                        >
                          <span>{user?.fullName}</span>
                          <span>
                            {user?.onlineStatus?.status === -1 && (
                              <span>
                                <FiberManualRecordIcon
                                  fontSize="inherit"
                                  style={{ color: '#bfbfbf' }}
                                  className="mb-1"
                                />{' '}
                                Last seen at{' '}
                                {moment(
                                  user?.onlineStatus?.time,
                                  'YYYY-MM-DD HH:mm:ss'
                                ).format('hh:mm A')}
                                ,{' '}
                                {moment(
                                  user?.onlineStatus?.lastActivityAt,
                                  'YYYY-MM-DD HH:mm:ss'
                                ).format('MMM D')}
                              </span>
                            )}
                            {user?.onlineStatus?.status === 1 && (
                              <span>
                                <FiberManualRecordIcon
                                  fontSize="inherit"
                                  style={{ color: '#4bd28f' }}
                                  className="mb-1"
                                />{' '}
                                Busy since at{' '}
                                {moment(
                                  user?.onlineStatus?.time,
                                  'YYYY-MM-DD HH:mm:ss'
                                ).format('hh:mm A')}
                                ,{' '}
                                {moment(
                                  user?.onlineStatus?.lastActivityAt,
                                  'YYYY-MM-DD HH:mm:ss'
                                ).format('MMM D')}
                              </span>
                            )}
                            {user?.onlineStatus?.status === 0 && (
                              <span>
                                <FiberManualRecordIcon
                                  fontSize="inherit"
                                  style={{ color: '#ffaa00' }}
                                  className="mb-1"
                                />{' '}
                                Idle since{' '}
                                {moment(
                                  user?.onlineStatus?.time,
                                  'YYYY-MM-DD HH:mm:ss'
                                ).format('hh:mm A')}
                                ,{' '}
                                {moment(
                                  user?.onlineStatus?.lastActivityAt,
                                  'YYYY-MM-DD HH:mm:ss'
                                ).format('MMM D')}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default ActiveUserModal;
