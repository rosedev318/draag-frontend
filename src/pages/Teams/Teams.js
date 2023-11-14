import { Avatar, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  allAgency,
  joinAgency,
  leavePendingAgency,
  searchAgency,
  userAgency
} from '../../Redux/Actions/AgencyAction';
import './Teams.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LeavePendingAgency from '../../components/Dashboard/Modals/LeavePendingAgency';

const Teams = () => {
  function stringAvatar(name) {
    return {
      children: `${name != '' ? name?.split(' ')[0][0]?.toUpperCase() : ''}`
    };
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState();
  const [selectAgency, setSelectAgency] = useState('');
  const { state } = useLocation();
  const agency = useSelector((state) => state.Agency.agency);
  const agencyuser = useSelector((state) => state?.Agency?.agencyUser);
  const [openpAgency, setOpenpAgency] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [newuser, setNewuser] = useState(false);

  useEffect(() => {
    dispatch(allAgency());
    dispatch(userAgency());
  }, []);

  const handleSearch = (value) => {
    dispatch(searchAgency(value));
    if (value?.length === 0) {
      dispatch(allAgency());
    }
  };

  // const location = useLocation();
  // const { userId } = location.state || {};
  // console.log('userId', userId);

  const active = { border: '2px solid #112A3F' };
  const inactive = {};

  const handleClick = (divNum, name) => () => {
    setSelected(divNum);
    setSelectAgency(name);
  };

  const handleOpenpAgency = (agencyId, agencyName, newuser) => {
    setId(agencyId);
    setName(agencyName);
    setNewuser(newuser);
    setOpenpAgency(true);
  };
  const handleClosepAgency = () => {
    setOpenpAgency(false);
  };
  // const userId = useSelector((state) => state?.Auth?.user?.user?.id);

  const handleJoin = () => {
    if (selected?.length > 0) {
      dispatch(joinAgency(selected));
      if (state?.pathname) {
        navigate(state?.pathname);
      } else {
        navigate('/pendingteam');
      }
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

  const pendingJoinTeam = agency
    .map((e) => e?.pending)
    .find((es) => es === true);

  const deleteAgency = () => {
    dispatch(leavePendingAgency(id, name, newuser));
    handleClosepAgency();
  };

  return (
    <>
      <div className="team_main">
        <div className="team1 d-flex justify-content-center align-iteams-center">
          <div className="text-white team1_txt fs-3 px-5">Join your team</div>
        </div>
        <div className="team2">
          <div className="">
            <div className="second-card">
              <div className="m-auto searchbar">
                <p className="search-team">Search for existing teams to join</p>
                <div className="input-con">
                  <input
                    type="text"
                    placeholder="Search teams..."
                    className="input-search p-4 px-5"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <SearchIcon className="searchi fs-4" />
                  {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                </div>

                {agency?.length === 0 ? (
                  <div className="d-flex justify-content-center align-items-center pt-5">
                    No Agencies Available
                  </div>
                ) : (
                  <>
                    {state?.jointeam ? (
                      <>
                        {pendingJoinTeam && (
                          <div className="d-flex align-items-center pt-3">
                            <div className="inv-status-text">
                              Invitation Status:{' '}
                              <span
                                style={{ color: '#2083C8', fontWeight: 'bold' }}
                              >
                                Pending
                              </span>
                            </div>
                            <div
                              className="mx-1 mt-1 loader"
                              style={{ height: '20px', width: '20px' }}
                            ></div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {agencyuser?.length > 0 && (
                          <div className="d-flex align-items-center pt-3">
                            <div className="inv-status-text">
                              Invitation Status:{' '}
                              <span
                                style={{ color: '#2083C8', fontWeight: 'bold' }}
                              >
                                Pending
                              </span>
                            </div>
                            <div
                              className="mx-1 mt-1 loader"
                              style={{ height: '20px', width: '20px' }}
                            ></div>
                          </div>
                        )}
                      </>
                    )}
                    {/* <p className="list-text pt-2">Or choose from this list:</p> */}
                    <div className="row row-cols-2 m-auto team_cards w-100">
                      {state?.jointeam ? (
                        <>
                          {agency?.length > 0 &&
                            agency
                              .filter((e) => e.pending && !e.joined)
                              .map((data, index) => {
                                return (
                                  <div
                                    className="card team-list mt-2 cursor-pointer"
                                    key={index}
                                  >
                                    <div className="card-body d-flex align-items-center">
                                      <div className="d-flex align-items-center gap-0">
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
                                            right: 2,
                                            top: 15
                                          }}
                                          variant="contained"
                                          color="error"
                                          className="text-capitalize"
                                          onClick={() =>
                                            handleOpenpAgency(
                                              data?.id,
                                              data?.name
                                            )
                                          }
                                        >
                                          Leave
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                        </>
                      ) : (
                        <>
                          {agencyuser?.length > 0 &&
                            agencyuser?.map((e) => {
                              return (
                                <div className="card team-list mt-2">
                                  <div className="card-body d-flex align-items-center position-relative">
                                    <div
                                      className="d-flex align-items-center gap-0"
                                      // onClick={() => handleAgency(data?.id)}
                                    >
                                      <Avatar
                                        alt="Remy Sharp"
                                        {...stringAvatar(e?.name)}
                                      />
                                      <div className="card_txt">
                                        <h5 className="fs-6">{e?.name}</h5>
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
                                          handleOpenpAgency(
                                            e?.id,
                                            e?.name,
                                            true
                                          )
                                        }
                                      >
                                        Leave
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </>
                      )}
                    </div>
                    {agency.filter((e) => !e.joined && !e.pending)?.length >
                      0 && (
                      <>
                        <p className="list-text pt-3">
                          Or choose from this list:
                        </p>
                        <div className="row row-cols-2 m-auto team_cards w-100">
                          {agency?.length > 0 &&
                            agency
                              .filter((e) => !e.joined && !e.pending)
                              .map((data, index) => {
                                return (
                                  <div
                                    style={
                                      selected === data.id ? active : inactive
                                    }
                                    onClick={handleClick(data.id, data.name)}
                                    className="card team-list mt-2 cursor-pointer"
                                    key={index}
                                  >
                                    <div className="card-body d-flex align-items-center">
                                      <Avatar
                                        alt="Remy Sharp"
                                        {...stringAvatar(data?.name)}
                                      />
                                      <div className="card_txt">
                                        <h5 className="fs-6 ">{data?.name}</h5>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                        </div>
                      </>
                    )}
                  </>
                )}
                <div>
                  <button onClick={handleJoin} className="w-100 p-2 req-btn">
                    Request to join
                  </button>
                </div>
                <div onClick={() => navigates()}>
                  <button className="w-100 p-2 back-btn cursor-pointer">
                    Back
                  </button>
                </div>
                {state?.jointeam && (
                  <Link to="/">
                    <button className="w-100 p-2 back-btn">Back to Home</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <LeavePendingAgency
          name={name}
          deleteAgency={deleteAgency}
          openpAgency={openpAgency}
          handleClosepAgency={handleClosepAgency}
        />
      </div>
    </>
  );
};

export default Teams;
