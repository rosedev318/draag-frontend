import { Avatar, CircularProgress, Modal, Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { getMatches } from '../../../Redux/Actions/CategoryAction';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MatchesModal = (props) => {
  const { openMatches, handleCloseMatches, job } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const match = useSelector((state) => state.Category.matches);
  const loading = useSelector((state) => state.Category.loading);

  const style = {
    padding: '48px !important',
    minWidth: '400px'
  };

  useEffect(() => {
    if (openMatches) {
      dispatch(getMatches(job.id));
    }
  }, [openMatches]);

  return (
    <div>
      <Drawer anchor={'right'} open={openMatches} onClose={handleCloseMatches}>
        <div style={style}>
          <div>
            <div className="d-flex justify-content-between p-2">
              <div>Matches</div>
              <CloseIcon
                className="cursor-pointer"
                onClick={() => handleCloseMatches()}
              />
            </div>
            <div>
              {loading ? (
                <>
                  <div className="d-flex justify-content-center pt-5">
                    <CircularProgress />
                  </div>
                </>
              ) : (
                <>
                  {match?.length > 0 ? (
                    match.map((e, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() =>
                            navigate('/profile', {
                              state: {
                                id: e?.id,
                                type: 'member'
                              }
                            })
                          }
                          className="d-flex gap-2 px-2 pt-2 cursor-pointer"
                        >
                          <Avatar
                            src={e.photo}
                            sx={{ width: 24, height: 24 }}
                          />
                          <div className="member-name">{e.firstName}</div>
                        </div>
                      );
                    })
                  ) : (
                    <>
                      <h6 className="d-flex justify-content-center align-items-center pt-5">
                        No Matches Found
                      </h6>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MatchesModal;
