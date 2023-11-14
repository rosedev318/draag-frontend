import React, { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  getJobsLivings,
  getJobsPositions,
  getJobsStatus
} from '../../../Redux/Actions/JobsAction';
import { useSelector } from 'react-redux';
import {
  enabledAgencyUsers,
  userProfile
} from '../../../Redux/Actions/AgencyAction';
import FilterStatus from '../../status/FilterStatus';
import { filterHighlightJob } from '../../../Redux/Actions/CategoryAction';
import passport from '../../../constants/passport';
import { IoFilter } from 'react-icons/io5';

const FilterSidebar = (props) => {
  const { openFilter, setOpenFilter, handleFilter, formValuesFil } = props;

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.Jobs.positions);
  const livings = useSelector((state) => state.Jobs.livings);
  const statuses = useSelector((state) => state.Jobs.statuses);
  const defaultAgency = useSelector(
    (state) => state?.Agency?.user?.defaultAgency?.id
  );
  const users = useSelector((state) => state?.Agency?.enableUser);

  const userId = localStorage.getItem('userid');

  const handleDropdown = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(getJobsPositions());
    dispatch(getJobsLivings());
    dispatch(userProfile());
    dispatch(getJobsStatus());
  }, []);

  useEffect(() => {
    if (defaultAgency) {
      dispatch(enabledAgencyUsers(defaultAgency));
    }
  }, [defaultAgency]);

  return (
    <>
      {openFilter && (
        <div className="main-filterSidebar pt-2 ">
          <div className="d-flex justify-content-center position-relative">
            <div className="d-flex justify-content-center">Filter</div>
            <div className="position-absolute" style={{ right: 5 }}>
              <ClearIcon
                style={{
                  color: 'black',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
                onClick={() => setOpenFilter(false)}
              />
            </div>
          </div>
          <div className="p-2 pt-3">
            <div className="userform-check">
              <label className="container">
                <div className="d-flex gap-2 pb-1">
                  <div>
                    <input
                      name="me"
                      value={userId}
                      checked={formValuesFil?.me}
                      type="checkbox"
                      onChange={(e) => handleFilter(e)}
                    />
                    <span className="checkmark"></span>
                  </div>
                  <div className="d-flex gap-2 mx-2">
                    <Avatar sx={{ width: 24, height: 24 }} />
                    <div className="filter-text">Cards assigned to me</div>
                  </div>
                </div>
              </label>
            </div>
            <div className="userform-check">
              <label className="container">
                <div className="d-flex gap-2 pb-1">
                  <div>
                    <input
                      name=""
                      //   value={data.id}
                      //   checked={formValuesFil?.users?.includes(data?.id)}
                      type="checkbox"
                      //   onChange={(e) => handleChange(e, data.id)}
                    />
                    <span className="checkmark"></span>
                  </div>
                  <div className="d-flex gap-2 mx-2">
                    <div
                      className={open ? 'is-active' : 'checkbox-dropdown'}
                      onClick={() => handleDropdown()}
                    >
                      Select members
                      <ul className="checkbox-dropdown-list">
                        <li className="">
                          <div className="userform-check">
                            <div className="container">
                              {users.map((data, index) => {
                                return (
                                  <label key={index} className="container">
                                    <div className="d-flex gap-2 align-items-center">
                                      <div>
                                        <input
                                          name="user"
                                          value={data.id}
                                          checked={formValuesFil?.user?.includes(
                                            data?.id
                                          )}
                                          type="checkbox"
                                          onChange={(e) => handleFilter(e)}
                                        />
                                        <span className="checkmark"></span>
                                      </div>
                                      <div className="mx-1">
                                        {data.fullName}
                                      </div>
                                    </div>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </label>
            </div>
            <div className="filter-title-text">Status</div>
            {passport.map((data, index) => {
              return (
                <div key={index} className="userform-check pt-2">
                  <label className="container">
                    <div className="d-flex gap-2 pb-1">
                      <div>
                        <input
                          name="passport"
                          value={data}
                          checked={formValuesFil?.passport?.includes(data)}
                          type="checkbox"
                          onChange={(e) => handleFilter(e)}
                        />
                        <span className="checkmark"></span>
                      </div>
                      <div className="d-flex gap-2 mx-2">
                        <div className="filter-text">{data}</div>
                      </div>
                    </div>
                  </label>
                </div>
              );
            })}

            <div className="filter-title-text pt-3">Living type</div>
            {livings.map((data, index) => {
              return (
                <div key={index} className="userform-check pt-2">
                  <label className="container">
                    <div className="d-flex gap-2 pb-1">
                      <div>
                        <input
                          name="living"
                          value={data.code}
                          checked={formValuesFil?.living?.includes(data?.code)}
                          type="checkbox"
                          onChange={(e) => handleFilter(e)}
                        />
                        <span className="checkmark"></span>
                      </div>
                      <div className="d-flex gap-2 mx-2">
                        <div className="filter-text">{data?.name}</div>
                      </div>
                    </div>
                  </label>
                </div>
              );
            })}

            <div className="pt-5 fw-bold" style={{ fontSize: '12px' }}>
              Labels
            </div>
            <div className="userform-check pt-2">
              <label className="container">
                <div className="d-flex gap-2 pb-1">
                  <div>
                    <input
                      // name="status"
                      // value={data.code}
                      //   checked={formValuesFil?.users?.includes(data?.id)}
                      type="checkbox"
                      // onChange={(e) => handleFilter(e)}
                    />
                    <span className="checkmark"></span>
                  </div>
                  <div className="d-flex gap-2 mx-2">
                    <div className="filter-text">No Labels</div>
                  </div>
                </div>
              </label>
            </div>
            {statuses.map((data, index) => {
              return (
                <div key={index} className="userform-check pt-2">
                  <label className="container">
                    <div className="d-flex gap-2 pb-1">
                      <div>
                        <input
                          name="status"
                          checked={formValuesFil?.status?.includes(data?.code)}
                          value={data.code}
                          type="checkbox"
                          onChange={(e) => handleFilter(e)}
                        />
                        <span className="checkmark"></span>
                      </div>
                      <FilterStatus name={data.name} />
                    </div>
                  </label>
                </div>
              );
            })}

            <div className="filter-title-text pt-2">Position</div>
            {positions.map((data, index) => {
              return (
                <div key={index} className="userform-check pt-2">
                  <label className="container">
                    <div className="d-flex gap-2 pb-1">
                      <div>
                        <input
                          name="position"
                          value={data.code}
                          checked={formValuesFil?.position?.includes(
                            data?.code
                          )}
                          type="checkbox"
                          onChange={(e) => handleFilter(e)}
                        />
                        <span className="checkmark"></span>
                      </div>
                      <div className="d-flex gap-2 mx-2">
                        <div className="filter-text">{data?.name}</div>
                      </div>
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
