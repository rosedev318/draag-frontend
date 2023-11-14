import React, { useEffect, useRef, useState } from 'react';
import './createTeams.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAgency } from '../../Redux/Actions/AgencyAction';
import TzSelect from '../../components/Select/TzSelect';

function CreateTeams() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [agency, setAgency] = useState('');
  const { state } = useLocation();
  const [visible, setVisible] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef();

  const currentOffset = new Date().getTimezoneOffset() / -60;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [selectedTimezone, setSelectedTimezone] = useState({
    value: timezone,
    label: `(GMT${currentOffset >= 0 ? "+" : "-"}${Math.abs(currentOffset)}:00) ${timezone}`,
  })

  const handleSubmit = () => {
    // dispatch(createAgency({ name: agency, visible: visible }, navigate));
    // setAgency('');
    // setVisible('');
    if (agency?.length > 0) {
      dispatch(
        createAgency({
          name: agency,
          visible: visible,
          // timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          timezone: selectedTimezone?.value
        })
      ).then((resp) => {
        if (resp?.status === 200) {
          if (state?.pathname) {
            navigate(state?.pathname);
          } else {
            navigate('/');
          }
          setAgency('');
          setVisible('');
        }
      });
    }
  };

  const navigates = () => {
    if (state?.pathname) {
      navigate('/jointeam', {
        state: { jointeam: state?.jointeam, pathname: state?.pathname }
      });
    } else {
      navigate('/jointeam');
    }
  };

  const handleShow = (event) => {
    if (event.target.checked) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  return (
    <>
      <div className="main d-flex">
        <div className="join1 d-flex justify-content-center h-100vh">
          <div className="text-white join1_txt fs-3 px-5">
            Information here on why you should create your own workspace
          </div>
        </div>
        <div className="join2 d-flex flex-column align-items-center px-2 text-center h-100vh">
          <div className="d-flex align-items-center">
            <div className="ct-second-card">
              <p className="workspace-title">Select your timezone</p>
              <TzSelect timezone={selectedTimezone} handleChange={setSelectedTimezone} />
              <p className="workspace-title pt-36px">Workspace name</p>
              <input
                type="text"
                className="workspace-field"
                placeholder="Enter name"
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
              />
              <p className="work-subtitle pt-4">
                I want to remain hidden from other users
                <label className="checkbox-button mx-2">
                  <input
                    type="checkbox"
                    className="checkbox-button__input px-2"
                    defaultValue={visible}
                    name="visible"
                    id="visible"
                    onChange={handleShow}
                  />
                  <span className="checkbox-button__control"></span>
                </label>
              </p>
              <p className="work-text">
                Please note if you select this your team members will not be
                able to find you unless you send them an invite
              </p>
              <button onClick={handleSubmit} className="create-btn mt-3">
                Create workspace
              </button>
              <div
                onClick={() => navigates()}
                className="text-decoration-none cursor-pointer"
              >
                <p className="back-text pt-4">Back to join team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateTeams;
