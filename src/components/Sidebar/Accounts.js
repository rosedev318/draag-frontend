import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAgency,
  userAgency,
  userProfile
} from '../../Redux/Actions/AgencyAction';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Accounts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const defaultAgency = useSelector(
    (state) => state?.Agency?.user?.defaultAgency?.name
  );
  const agencies = useSelector((state) => state.Agency.agencyUser);

  useEffect(() => {
    dispatch(userProfile());
    dispatch(userAgency());
  }, []);

  const handleChange = (id) => {
    dispatch(selectAgency(id, {}));
  };

  return (
    <div className="d-flex justify-content-center px-4">
      <div
        className="selectcard d-flex justify-content-evenly align-items-center"
        style={{ height: '35px', width: '180' }}
      >
        <div>
          <select
            onChange={(e) => handleChange(e.target.value)}
            style={{
              backgroundImage: `url(${require('../../Images/newarrow.jpg')})`,
              width: '100%'
            }}
          >
            {agencies?.length > 0 &&
              agencies
                ?.filter((e) => e.roles[0].enabled && e?.visible)
                .map((data, index) => {
                  return (
                    <option
                      key={index}
                      selected={data.name == defaultAgency}
                      value={data.id}
                    >
                      {data.name}
                    </option>
                  );
                })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
