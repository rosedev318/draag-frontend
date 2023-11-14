import { Avatar } from '@mui/material';
import React from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PersonIcon from '@mui/icons-material/Person';
import moment from 'moment/moment';

const NavbarUser = (props) => {
  const { user, index } = props;

  return (
    <div key={index}>
      <div
        className="d-flex align-items-center"
        style={{ gap: '14px', marginRight: '10px' }}
      >
        <div>
          <Avatar src={user?.profileImageUrl} sx={{ height: 40, width: 40 }} />
        </div>
        <div
          className="d-flex gap-2 align-items-center"
          style={{ width: 'max-content' }}
        >
          <div className="d-flex flex-column" style={{ fontSize: '12px' }}>
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
          <span>
            <span style={{ fontSize: '12px' }}>
              {user?.jobCount}
              <PersonIcon />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavbarUser;
