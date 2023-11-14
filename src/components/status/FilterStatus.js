import React from 'react';
import { statusColor } from '../../constants/statusColor';

const FilterStatus = (props) => {
  const { name } = props;
  return (
    <div>
      <div className="d-flex gap-2 mx-2">
        {name == 'Available' && (
          <div
            className="filter-text label-card"
            style={{ background: statusColor.availableColor }}
          >
            {name}
          </div>
        )}
        {name == 'Trial' && (
          <div
            className="filter-text label-card"
            style={{ background: statusColor.trialColor }}
          >
            {name}
          </div>
        )}
        {name == 'Placed' && (
          <div
            className="filter-text label-card"
            style={{ background: statusColor.placeColor }}
          >
            {name}
          </div>
        )}
        {name == 'On hold' && (
          <div
            className="filter-text label-card"
            style={{ background: statusColor.holdColor }}
          >
            {name}
          </div>
        )}
        {name == 'Refund' && (
          <div
            className="filter-text label-card"
            style={{ background: statusColor.refundColor }}
          >
            {name}
          </div>
        )}
        {/* {name == 'Blacklist' && (
          <div
            className="filter-text label-card"
            style={{ background: '#1F1F21' }}
          >
            {name}
          </div>
        )}
         */}
        {name == 'Checks' && (
          <div
            className="filter-text label-card"
            style={{ background: statusColor.checkColor }}
          >
            {name}
          </div>
        )}
        {name == 'Replacements' && (
          <div
            className="filter-text label-card"
            style={{ background: statusColor.replaceColor, color: 'white' }}
          >
            {name}
          </div>
        )}
        {name == 'Interviews' && (
          <div
            className="filter-text label-card"
            style={{ background: statusColor.interviewColor, color: 'white' }}
          >
            {name}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterStatus;
