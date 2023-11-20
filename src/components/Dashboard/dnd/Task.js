import React, { useContext, useEffect, useState, memo } from 'react';
import styled from '@emotion/styled';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Avatar, AvatarGroup } from '@mui/material';
import { GrStar } from 'react-icons/gr';
import { GoComment } from 'react-icons/go';
import { GoBookmark } from 'react-icons/go';
import { IoMdTime } from 'react-icons/io';
import moment from 'moment';
import StatusLabel from '../StatusLabel';
import UserModal from '../UserModal';
import { useNavigate } from 'react-router-dom';
import AssignModal from '../Modals/AssignModal';
import CandidatesModal from '../Modals/CandidatesModal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getJob, getJobRating } from '../../../Redux/Actions/CategoryAction';
import CardProgress from '../CardProgress';
import TrialAvtar from '../TrialAvtar';
import { userContext } from '../../../context/UserContext';

const Container = styled('div')`
  width: 300px;
  height: 150px;
  border: none;
  box-shadow: 0px 3px 3px 0px RGBA(0, 0, 0, 0.1);
  margin-bottom: 8px;
  border-radius: 4px;
`;

const Box = styled('div')`
  padding: 5px 8px;
`;

const isValidImage = (url) => {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => resolve(defaultAvatarURL);
    img.src = url;
  });
};

const Task = ({
  task,
  index,
  setJobId,
  hover,
  jobId,
  ratings,
  category,
  statusap,
  selectcard,
  handleCheck
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openuserModal, setOpenUserModal, openUser, setOpenUser } =
    useContext(userContext);
  const [open, setOpen] = useState(false);
  const [openCandidate, setOpenCandidate] = useState(false);
  const [rate, setRate] = useState('');
  const [status, setStatus] = useState('');

  const handleOpen = () => {
    setOpen(true)
    // setOpenUser(true);
    setOpenUserModal(true);
  };
  
  const [assigned, setAssigned] = useState(
    task.assignments
      .sort((c, d) => (c.nanny.name > d.nanny.name ? 1 : d.nanny.name ? -1 : 0))
      .sort((a, b) => (a.messageSent && !b.messageSent ? 1 : -1))
  );
  const handleClose = () => {
    setOpen(false);
    setOpenUserModal(false);
  };

  const messageSent = task.assignments.filter((e) => e.messageSent);

  const totalAssign = task.assignments.length;

  let percentageData = Number(messageSent.length / totalAssign) * 100 + '%';

  const percentage = parseFloat(percentageData).toFixed(0);

  const handleOpenCandidate = () => {
    setOpenCandidate(true);
  };

  const handleCloseCandidate = () => {
    setOpenCandidate(false);
  };

  const star = Object.values(ratings).filter((e) => e?.code === task.rating);

  const rating = Object.values(ratings).filter((e) => e?.code === rate);

  const statusData = statusap?.filter((data) => data?.code === status);

  useEffect(() => {
    if (task.assignments) {
      setAssigned(
        task.assignments
          .sort((c, d) =>
            c.nanny.name > d.nanny.name ? 1 : d.nanny.name ? -1 : 0
          )
          .sort((a, b) => (a.messageSent && !b.messageSent ? 1 : -1))
      );
    }
  }, [task.assignments]);
  return (
    <React.Fragment>
      <Draggable draggableId={task.id} key={index} index={index} type="task">
        {(provided, snapshot) => (
          <>
            <Container
              className="job-card-main"
              // className={`${task.id == jobId ? 'job-card-main' : ''}`}
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              isDragging={snapshot.isDragging}
              onMouseOver={() => {
                setJobId(task.id);
              }}
              onMouseLeave={() => setJobId()}
            >
              <div
                className={`d-flex ${
                  selectcard ? 'justify-content-between' : 'justify-content-end'
                }  align-items-center cursor-pointer`}
              >
                {selectcard && (
                  <div className="card-checkbox">
                    <input
                      className="form-check-input cursor-pointer"
                      type="checkbox"
                      // checked={note.done}
                      value={task.id}
                      onChange={(e) => handleCheck(e, task.id)}
                      id="flexCheckDefault"
                    />
                  </div>
                )}
                {task.status && <StatusLabel status={task.status} />}
              </div>

              <Box>
                <div>
                  <div
                    className="d-flex position-relative"
                    onClick={() => handleOpen()}
                  >
                    <div className="d-flex gap-2">
                      <div>
                        <Avatar src={task?.photo} />
                      </div>
                      <div>
                        <div
                          className="d-flex flex-column"
                          style={{ width: 'max-content' }}
                        >
                          <span className="user-name">{task.name}</span>
                          <span className="living-text">
                            {task.area ? task.area : 'N/A'}
                          </span>
                          <span className="living-text">
                            {task.livings.slice(0, 1).map((e) => {
                              return e.name;
                            })}
                            ,
                            {task.necessaryPositions.slice(0, 1).map((e) => {
                              return e.name;
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <div
                      className="pt-1"
                      style={{
                        width: 'max-content',
                        fontSize: '13px',
                        position: 'absolute',
                        right: 0
                      }}
                    >
                      {rating.length > 0 ? (
                        <>
                          {rating?.map((e) => {
                            return (
                              e?.displayText.split(' ')[0] +
                              ' ' +
                              '(' +
                              e?.displayText.split(' ').slice(1).join(' ') +
                              ')'
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {star?.map((e) => {
                            return (
                              e?.displayText.split(' ')[0] +
                              ' ' +
                              '(' +
                              e?.displayText.split(' ').slice(1).join(' ') +
                              ')'
                            );
                          })}
                        </>
                      )}
                    </div> */}
                  </div>

                  {task?.status?.name == 'Trial' ||
                  task?.status?.name == 'Checks' ||
                  task?.status?.name == 'Placed' ? (
                    <>
                      <div className="d-flex gap-1">
                        <div className="d-flex flex-column w-100">
                          <CardProgress
                            statusName={task?.status?.name}
                            percentageData={percentageData}
                          />
                          <div className="d-flex gap-5 position-relative">
                            <div className="px-1">
                              <AvatarGroup max={4}>
                                {assigned.slice(0, 3).map((e) => {
                                  return e?.nanny?.photo ? (
                                    <Avatar
                                      onClick={() =>
                                        navigate('/profile', {
                                          state: {
                                            id: e.nanny.id,
                                            assign: true
                                          }
                                        })
                                      }
                                      sx={{ width: 30, height: 30 }}
                                      className={`cursor-pointer ${
                                        e.messageSent ? 'fade-out' : ''
                                      }`}
                                      src={e?.nanny?.photo}
                                    />
                                  ) : (
                                    <></>
                                  );
                                })}
                                {assigned?.length > 3 && (
                                  <Avatar
                                    onClick={() => handleOpenCandidate()}
                                    className=" cursor-pointer"
                                    sx={{
                                      width: 30,
                                      height: 30,
                                      fontSize: '13px',
                                      backgroundColor: 'white',
                                      color: 'lightgray',
                                      border: '1px solid lightgray !important'
                                    }}
                                  >
                                    +{assigned?.length - 3}
                                  </Avatar>
                                )}
                              </AvatarGroup>
                            </div>
                            <div>
                              <img
                                style={{
                                  height: '30px',
                                  position: 'absolute',
                                  right: '45px'
                                }}
                                src={require('../../../Images/graytrial.png')}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <TrialAvtar task={task} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex align-items-center">
                        <div
                          className="progress bar m-2"
                          style={{ width: '100%' }}
                        >
                          <div
                            className={`${
                              task?.status?.name == 'Interviews'
                                ? 'progressColor-interview'
                                : 'progress-bar-green'
                            }`}
                            style={{
                              height: '4px',
                              width: percentageData
                            }}
                            role="progressbar"
                            aria-valuenow="75"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <div className="living-text">
                          {percentage === 'NaN' ? 0 : percentage}%
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-start px-1 gap-2">
                        {assigned.slice(0, 4).map((e) => {
                          return e?.nanny?.photo ? (
                            <Avatar
                              onClick={() =>
                                navigate('/profile', {
                                  state: { id: e.nanny.id, assign: true }
                                })
                              }
                              sx={{ width: 35, height: 35 }}
                              className={`cursor-pointer ${
                                e.messageSent ? 'fade-out' : ''
                              }`}
                              src={e?.nanny?.photo}
                            />
                          ) : (
                            <></>
                          );
                        })}
                        {assigned?.length > 4 && (
                          <Avatar
                            onClick={() => handleOpenCandidate()}
                            className="plus-assign cursor-pointer"
                            sx={{ width: 35, height: 35 }}
                          >
                            +{assigned.length - 4}
                          </Avatar>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center pt-2 d-none">
                  <div className="d-flex align-items-center gap-2 fw-bold card-color">
                    <div>
                      <GoComment /> <small>0</small>
                    </div>
                    <div>
                      <GoBookmark /> <small>follow</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-1 card-color">
                    <div>
                      <IoMdTime className="fs-6" />
                    </div>
                    <div>
                      <span className="card-time">
                        {moment(task.created).format('DD MMM YYYY')}
                      </span>
                    </div>
                  </div>
                </div>
              </Box>
            </Container>
          </>
        )}
      </Draggable>
      <UserModal
        open={open}
        task={task}
        handleClose={handleClose}
        category={category}
        setOpen={setOpen}
        handleOpen={handleOpen}
        setRate={setRate}
        rating={rating}
        statusData={statusData}
        setStatus={setStatus}
        assigned={assigned}
        setAssigned={setAssigned}
        index={index}
        setOpenUserModal={setOpenUserModal}
      />
      {/* <CandidatesModal
        job={task}
        assigned={assigned}
        setAssigned={setAssigned}
        openCandidate={openCandidate}
        handleCloseCandidate={handleCloseCandidate}
      /> */}
    </React.Fragment>
  );
};

export default memo(Task);
