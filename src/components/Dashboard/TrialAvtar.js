import { Avatar } from '@mui/material';
import React from 'react';

const TrialAvtar = (props) => {
  const { task } = props;
  return (
    <div>
      {task?.status?.name == 'Trial' && (
        <div className="trial-ring">
          <Avatar
            alt="Remy Sharp"
            src={task?.trial?.nanny?.photo}
            sx={{ width: 45, height: 45 }}
          />
        </div>
      )}
      {task?.status?.name == 'Checks' && (
        <div className="check-ring">
          <Avatar
            alt="Remy Sharp"
            src={task?.trial?.nanny?.photo}
            sx={{ width: 45, height: 45 }}
          />
        </div>
      )}
      {task?.status?.name == 'Placed' && (
        <div className="place-ring">
          <Avatar
            alt="Remy Sharp"
            src={task?.trial?.nanny?.photo}
            sx={{ width: 45, height: 45 }}
          />
        </div>
      )}
    </div>
  );
};

export default TrialAvtar;
