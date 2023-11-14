import React from 'react';

const CardProgress = (props) => {
  const { statusName, percentageData } = props;
  return (
    <div>
      {statusName == 'Trial' && (
        <div className="progress bar m-2" style={{ width: '90%' }}>
          <div
            className="trial-progress"
            style={{
              height: '5px',
              width: percentageData
            }}
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      )}
      {statusName == 'Placed' && (
        <div className="progress bar m-2" style={{ width: '90%' }}>
          <div
            className="placed-progress"
            style={{
              height: '5px',
              width: '100%'
            }}
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      )}
      {statusName == 'Checks' && (
        <div className="progress bar m-2" style={{ width: '90%' }}>
          <div
            className="check-progress"
            style={{
              height: '5px',
              width: percentageData
            }}
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      )}
    </div>
  );
};

export default CardProgress;
