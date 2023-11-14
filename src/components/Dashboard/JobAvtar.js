import { Avatar } from '@mui/material';
import React from 'react';
import { statusColor } from '../../constants/statusColor';

const JobAvtar = (props) => {
  const { user, status } = props;
  return (
    <div>
      {(status?.name === 'Available' || status === null) && (
        <div
          className="ring-status"
          style={{ borderColor: statusColor.availableColor }}
        >
          <Avatar src={user.photo} sx={{ width: 92, height: 92 }} />
        </div>
      )}
      {status?.name === 'Placed' && (
        <div
          className="ring-status"
          style={{ borderColor: statusColor.placeColor }}
        >
          <Avatar src={user.photo} sx={{ width: 92, height: 92 }} />
        </div>
      )}
      {status?.name === 'On hold' && (
        <div
          className="ring-status"
          style={{ borderColor: statusColor.holdColor }}
        >
          <Avatar src={user.photo} sx={{ width: 92, height: 92 }} />
        </div>
      )}
      {status?.name === 'Refund' && (
        <div
          className="ring-status"
          style={{ borderColor: statusColor.refundColor }}
        >
          <Avatar src={user.photo} sx={{ width: 92, height: 92 }} />
        </div>
      )}
      {status?.name === 'Trial' && (
        <div
          className="ring-status"
          style={{ borderColor: statusColor.trialColor }}
        >
          <Avatar src={user.photo} sx={{ width: 92, height: 92 }} />
        </div>
      )}
      {status?.name === 'Checks' && (
        <div
          className="ring-status"
          style={{ borderColor: statusColor.checkColor }}
        >
          <Avatar src={user.photo} sx={{ width: 92, height: 92 }} />
        </div>
      )}
      {status?.name === 'Replacements' && (
        <div
          className="ring-status"
          style={{ borderColor: statusColor.replaceColor }}
        >
          <Avatar src={user.photo} sx={{ width: 92, height: 92 }} />
        </div>
      )}
      {status?.name === 'Screening' && (
        <div
          className="ring-status"
          style={{ borderColor: statusColor.screenColor }}
        >
          <Avatar src={user.photo} sx={{ width: 92, height: 92 }} />
        </div>
      )}
      {status?.name === 'Black listed' && (
        <div
          className="ring-status"
          style={{ borderColor: statusColor.blacklistColor }}
        >
          <Avatar src={user.photo} sx={{ width: 92, height: 92 }} />
        </div>
      )}
      {status?.name === 'Interviews' && (
        <div
          className="ring-status"
          style={{ borderColor: statusColor.interviewColor }}
        >
          <Avatar src={user.photo} sx={{ width: 92, height: 92 }} />
        </div>
      )}
    </div>
  );
};

export default JobAvtar;
