import React, { useEffect, useState } from 'react';
import { Avatar, AvatarGroup, Box, Modal } from '@mui/material';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import './pendingTeam.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userAgency } from '../../Redux/Actions/AgencyAction';

const PendingTeam = () => {
  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}`
    };
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [jointeam, setJointeam] = useState('');
  const [user, setUser] = useState([]);
  const agencyuser = useSelector((state) => state?.Agency?.agencyUser);

  useEffect(() => {
    setUser(agencyuser);
  }, [agencyuser]);

  const optionChange = (e) => {
    setJointeam(e.target.value);
  };

  useEffect(() => {
    dispatch(userAgency());
  }, []);

  useEffect(() => {
    if (user) {
      for (let i = 0; i < user?.length; i++) {
        const item = user[i].roles[0];
        if (item?.enabled === true) {
          navigate('/');
          break;
        }
      }
    }
  }, [user]);

  return (
    <div className="main h-100">
      <div className="join1 d-flex justify-content-center">
        <div className="text-white join1_txt fs-3 px-5"></div>
      </div>

      <div
        className="join2 px-2 pb-3"
        style={{ overflowY: 'scroll', height: '100vh' }}
      >
        <div className="d-flex flex-column m-auto join2">
          <div className="mb-4 mt-5"></div>
          <label className="card join2_box1 first_card">
            <input
              name="radio"
              className="radio d-none"
              type="radio"
              value="solo"
              checked={jointeam === 'solo'}
              onChange={optionChange}
            />
            <div
              className="card-body d-flex align-items-center"
              onClick={() => navigate('/jointeam')}
            >
              <AvatarGroup max={3} className="img_grp">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </AvatarGroup>
              <div className="card-text-pending fs-5">I'm a solo creator</div>
            </div>
          </label>

          <div className="mt-5">
            <p className="myteam-title">My teams</p>
            <div className="row row-cols-2 m-auto team_cards w-100">
              {user?.length > 0 &&
                user?.map((e) => {
                  return (
                    <div className="card team-list mt-2">
                      <div className="card-body d-flex align-items-center">
                        <Avatar alt="Remy Sharp" {...stringAvatar(e?.name)} />
                        <div className="card_txt">
                          <h5 className="fs-6 ">{e?.name}</h5>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="next_btn mt-4 d-none">
            <button className="text-center btn1" onClick={() => handleAgency()}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingTeam;
