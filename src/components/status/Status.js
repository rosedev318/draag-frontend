import React from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { color, statusColor } from '../../constants/statusColor';

const Status = (props) => {
  const { status } = props;

  return (
    <div>
      <div className="status-card">
        <div className="d-flex justify-content-between">
          <span className="status-text">Status</span>
          <p>
            {(status?.name === 'Available' || status === null) && (
              <FiberManualRecordIcon
                className="status-icon mx-1"
                style={{ color: statusColor.availableColor }}
              />
            )}
            {status?.name === 'Placed' && (
              <FiberManualRecordIcon
                className="status-icon mx-1"
                style={{ color: statusColor.placeColor }}
              />
            )}
            {status?.name === 'On hold' && (
              <FiberManualRecordIcon
                className="status-icon mx-1"
                style={{ color: statusColor.holdColor }}
              />
            )}
            {status?.name === 'Refund' && (
              <FiberManualRecordIcon
                className="status-icon mx-1"
                style={{ color: statusColor.refundColor }}
              />
            )}
            {status?.name === 'Trial' && (
              <FiberManualRecordIcon
                className="status-icon mx-1"
                style={{ color: statusColor.trialColor }}
              />
            )}
            {status?.name === 'Checks' && (
              <FiberManualRecordIcon
                className="status-icon mx-1"
                style={{ color: statusColor.checkColor }}
              />
            )}
            {status?.name === 'Replacements' && (
              <FiberManualRecordIcon
                className="status-icon mx-1"
                style={{ color: statusColor.replaceColor }}
              />
            )}
            {status?.name === 'Screening' && (
              <FiberManualRecordIcon
                className="status-icon mx-1"
                style={{ color: statusColor.screenColor }}
              />
            )}
            {status?.name === 'Black listed' && (
              <FiberManualRecordIcon
                className="status-icon mx-1"
                style={{ color: statusColor.blacklistColor }}
              />
            )}
            {status?.name === 'Interviews' && (
              <FiberManualRecordIcon
                className="status-icon mx-1"
                style={{ color: statusColor.interviewColor }}
              />
            )}
            <span className="applied-text">
              {status?.name ? status?.name : 'Available'}
            </span>
          </p>
        </div>
        {(status?.name === 'Available' || status === null) && (
          <div className="d-flex justify-content-center">
            <span className="statusbtn-active text-center text-white">1</span>
            <span className="statusbtn text-center">2</span>
            <span className="statusbtn text-center">3</span>
            <span className="statusbtn text-center">4</span>
            <span className="statusbtn-last text-center">5</span>
          </div>
        )}
        {status?.name === 'Placed' && (
          <div className="d-flex justify-content-center">
            <span className="first-btn-status statusbtn-active-pl text-center text-white">
              1
            </span>
            <span className="statusbtn-active-pl text-center">2</span>
            <span className="statusbtn-active-pl text-center">3</span>
            <span className="statusbtn-active-pl text-center">4</span>
            <span className="statusbtn-active-pl last-btn-status text-center">
              5
            </span>
          </div>
        )}
        {status?.name === 'On hold' && (
          <div className="d-flex justify-content-center">
            <span className="first-btn-status statusbtn-active-h text-center text-white">
              1
            </span>
            <span className="statusbtn-active-h text-center">2</span>
            <span className="statusbtn-active-h text-center">3</span>
            <span className="statusbtn-active-h text-center">4</span>
            <span className="statusbtn-active-h last-btn-status text-center">
              5
            </span>
          </div>
        )}
        {status?.name === 'Refund' && (
          <div className="d-flex justify-content-center">
            <span className="first-btn-status statusbtn-active-rf text-center text-white">
              1
            </span>
            <span className="statusbtn-active-rf text-center">2</span>
            <span className="statusbtn-active-rf text-center">3</span>
            <span className="statusbtn-active-rf text-center">4</span>
            <span className="statusbtn-active-rf last-btn-status text-center">
              5
            </span>
          </div>
        )}
        {status?.name === 'Trial' && (
          <div className="d-flex justify-content-center">
            <span className="first-btn-status statusbtn-active-tr text-center text-white">
              1
            </span>
            <span className="statusbtn-active-tr text-center">2</span>
            <span className="statusbtn-active-tr text-center">3</span>
            <span className="statusbtn text-center">4</span>
            <span className="statusbtn last-btn-status text-center">5</span>
          </div>
        )}
        {status?.name === 'Checks' && (
          <div className="d-flex justify-content-center">
            <span className="first-btn-status statusbtn-active-ch text-center text-white">
              1
            </span>
            <span className="statusbtn-active-ch text-center">2</span>
            <span className="statusbtn-active-ch text-center">3</span>
            <span className="statusbtn-active-ch text-center">4</span>
            <span className="statusbtn last-btn-status text-center">5</span>
          </div>
        )}
        {status?.name === 'Screening' && (
          <div className="d-flex justify-content-center">
            <span className="first-btn-status statusbtn-active-sr text-center text-white">
              1
            </span>
            <span className="statusbtn-active-sr text-center">2</span>
            <span className="statusbtn text-center">3</span>
            <span className="statusbtn text-center">4</span>
            <span className="statusbtn last-btn-status text-center">5</span>
          </div>
        )}
        {status?.name === 'Replacements' && (
          <div className="d-flex justify-content-center">
            <span className="first-btn-status statusbtn-active-rep text-center text-white">
              1
            </span>
            <span className="statusbtn-active-rep text-center">2</span>
            <span className="statusbtn-active-rep text-center">3</span>
            <span className="statusbtn-active-rep text-center">4</span>
            <span className="statusbtn-active-rep last-btn-status text-center">
              5
            </span>
          </div>
        )}
        {status?.name === 'Black listed' && (
          <div className="d-flex justify-content-center">
            <span className="first-btn-status statusbtn-active-bl text-center text-white">
              1
            </span>
            <span className="statusbtn-active-bl text-center">2</span>
            <span className="statusbtn-active-bl text-center">3</span>
            <span className="statusbtn-active-bl text-center">4</span>
            <span className="statusbtn-active-bl last-btn-status text-center">
              5
            </span>
          </div>
        )}
        {status?.name === 'Interviews' && (
          <div className="d-flex justify-content-center">
            <span className="first-btn-status statusbtn-active-interview text-center text-white">
              1
            </span>
            <span className="statusbtn-active-interview text-center">2</span>
            <span className="statusbtn-active-interview text-center">3</span>
            <span className="statusbtn-active-interview text-center">4</span>
            <span className="statusbtn-active-interview last-btn-status text-center">
              5
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Status;
