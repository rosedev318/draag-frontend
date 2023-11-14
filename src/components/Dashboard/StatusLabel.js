import React from 'react';

const StatusLabel = (props) => {
  const { status } = props;
  return (
    <div>
      {status.name == 'On hold' && (
        <div className="d-flex justify-content-end">
          <div className="hold-label">{status.name}</div>
        </div>
      )}
      {status.name == 'Placed' && (
        <div className="d-flex justify-content-end">
          <div className="place-label">{status.name}</div>
        </div>
      )}
      {status.name == 'Refund' && (
        <div className="d-flex justify-content-end">
          <div className="refund-label">{status.name}</div>
        </div>
      )}
      {status.name == 'Available' && (
        <div className="d-flex justify-content-end">
          <div className="green-label">{status.name}</div>
        </div>
      )}
      {status.name == 'Unavailable' && (
        <div className="d-flex justify-content-end">
          <div className="green-label">{status.name}</div>
        </div>
      )}
      {status.name == 'Trial' && (
        <div className="d-flex justify-content-end">
          <div className="trial-label">{status.name}</div>
        </div>
      )}
      {status.name == 'Checks' && (
        <div className="d-flex justify-content-end">
          <div className="check-label">{status.name}</div>
        </div>
      )}
      {status.name == 'Replacements' && (
        <div className="d-flex justify-content-end">
          <div className="replace-label">{status.name}</div>
        </div>
      )}
      {status.name == 'Interviews' && (
        <div className="d-flex justify-content-end">
          <div className="interview-label">{status.name}</div>
        </div>
      )}
    </div>
  );
};

export default StatusLabel;
