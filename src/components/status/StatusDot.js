import React from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { statusColor } from '../../constants/statusColor';

const StatusDot = ({ status }) => {
  return (
    <div>
      {status === 'Available' && (
        <FiberManualRecordIcon
          fontSize="inherit"
          style={{ color: statusColor.availableColor }}
          className="mx-1"
        />
      )}
      {status === 'Placed' && (
        <FiberManualRecordIcon
          fontSize="inherit"
          className="mx-1"
          style={{ color: statusColor.placeColor }}
        />
      )}
      {status === 'Trial' && (
        <FiberManualRecordIcon
          fontSize="inherit"
          style={{ color: statusColor.trialColor }}
          className="mx-1"
        />
      )}
      {status === 'Checks' && (
        <FiberManualRecordIcon
          fontSize="inherit"
          style={{ color: statusColor.checkColor }}
          className="mx-1"
        />
      )}
      {status === 'Refund' && (
        <FiberManualRecordIcon
          fontSize="inherit"
          style={{ color: statusColor.refundColor }}
          className="mx-1"
        />
      )}
      {status === 'Replacements' && (
        <FiberManualRecordIcon
          fontSize="inherit"
          style={{ color: statusColor.replaceColor }}
          className="mx-1"
        />
      )}
      {status === 'Unavailable' && (
        <FiberManualRecordIcon fontSize="inherit" className="mx-1" />
      )}
      {status === 'On hold' && (
        <FiberManualRecordIcon
          fontSize="inherit"
          className="mx-1"
          style={{ color: statusColor.holdColor }}
        />
      )}
      {status === 'Interviews' && (
        <FiberManualRecordIcon
          fontSize="inherit"
          className="mx-1"
          style={{ color: statusColor.interviewColor }}
        />
      )}
    </div>
  );
};

export default StatusDot;
