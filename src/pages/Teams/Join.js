import React, { useEffect, useState } from 'react';
import './join.css';
import { Avatar, AvatarGroup, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  leaveAgency,
  selectAgency,
  userAgency
} from '../../Redux/Actions/AgencyAction';
import { useSelector } from 'react-redux';
import LeaveAgencyModal from '../../components/Dashboard/Modals/LeaveAgencyModal';

function Join() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [jointeams, setJointeams] = useState('solo');
  const [openAgency, setOpenAgency] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const agencies = useSelector((state) => state.Agency.agencyUser);

  function stringAvatar(name) {
    return {
      children: `${name != '' ? name?.split(' ')[0][0]?.toUpperCase() : ''}`
    };
  }

  const handleOpenAgency = (agencyId, agencyname) => {
    setId(agencyId);
    setName(agencyname);
    setOpenAgency(true);
  };
  const handleCloseAgency = () => {
    setOpenAgency(false);
  };

  const optionChange = (e) => {
    setJointeams(e.target.value);
  };

  const handleJoin = () => {
    if (jointeams === 'solo') {
      navigate('/createteam', {
        state: { jointeam: state?.jointeam, pathname: state?.pathname }
      });
    } else if (jointeams === 'team') {
      navigate('/teams', {
        state: { jointeam: state?.jointeam, pathname: state?.pathname }
      });
    }
  };

  useEffect(() => {
    dispatch(userAgency());
  }, []);

  const deleteAgency = () => {
    dispatch(leaveAgency(id, name));
    handleCloseAgency();
  };

  const handleAgency = (id) => {
    dispatch(selectAgency(id));
    navigate('/');
  };

  return (
    <>
      <div className="main">
        <div className="join1 d-flex justify-content-center align-iteams-center">
          <div className="text-white join1_txt fs-3 px-5">
            Join your team members or create your own
          </div>
        </div>
        <div
          className="join2 px-2 pb-3"
          style={{ overflowY: 'scroll', height: '100vh' }}
        >
          <div className="d-flex flex-column m-auto join2">
            <div className="join_text mb-4">
              <div className=""> Are you part of a team or solo?</div>
            </div>
            <label className="card join2_box1 first_card">
              <input
                name="solo"
                className="radio"
                type="radio"
                value="solo"
                checked={jointeams === 'solo'}
                onChange={optionChange}
              />
              <div className="card-body d-flex align-items-center">
                <AvatarGroup max={3} className="img_grp">
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </AvatarGroup>
                <div className="card-text fs-5">I'm a solo creator</div>
              </div>
            </label>
            <label className="card join2_box2 mt-2 second_card">
              <input
                name="team"
                className="radio"
                type="radio"
                value="team"
                checked={jointeams === 'team'}
                onChange={optionChange}
              />
              <div className="card-body d-flex  align-items-center ">
                <AvatarGroup max={3} className="img_grp">
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </AvatarGroup>
                <div className="card-text fs-5">I'm a part of a team</div>
              </div>
            </label>
            <div className="d-flex justify-content-between align-items-center">
              <div className="next_btn mt-4">
                <button onClick={handleJoin} className="text-center btn1">
                  Next Step
                </button>
              </div>
              {state?.jointeam && (
                <Link
                  to={state?.pathname}
                  className="text-decoration-none back-text-link"
                >
                  Back
                </Link>
              )}
            </div>
            {state?.jointeam && (
              <div>
                <div className="myteam-title pt-4 pb-2">My teams</div>
                <div className="row row-cols-2 m-auto team_cards w-100">
                  {agencies?.length > 0 &&
                    agencies
                      ?.filter((e) => e.roles[0].enabled)
                      .map((data, index) => {
                        return (
                          <div
                            className="card team-list mt-2 cursor-pointer"
                            key={index}
                          >
                            <div className="card-body d-flex align-items-center position-relative">
                              <div
                                className="d-flex align-items-center gap-0"
                                onClick={() => handleAgency(data?.id)}
                              >
                                <Avatar
                                  alt="Remy Sharp"
                                  {...stringAvatar(data?.name)}
                                />
                                <div className="card_txt">
                                  <h5 className="fs-6">{data?.name}</h5>
                                </div>
                              </div>
                              <div>
                                <Button
                                  style={{
                                    height: '27px',
                                    padding: '0px',
                                    position: 'absolute',
                                    right: 0,
                                    top: 15
                                  }}
                                  variant="contained"
                                  color="error"
                                  className="text-capitalize"
                                  onClick={() =>
                                    handleOpenAgency(data?.id, data?.name)
                                  }
                                >
                                  Leave
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                </div>
              </div>
            )}
          </div>
        </div>
        <LeaveAgencyModal
          name={name}
          deleteAgency={deleteAgency}
          openAgency={openAgency}
          handleCloseAgency={handleCloseAgency}
        />
      </div>
    </>
  );
}

export default Join;
