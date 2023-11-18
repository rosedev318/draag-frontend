import { Avatar, Button, CircularProgress, Input, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useRef, useState } from 'react';
import './UserModal.css';
import { FaRegCreditCard } from 'react-icons/fa';
import moment from 'moment';
import User from '../../Images/user.svg';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { RxActivityLog } from 'react-icons/rx';
import { TiTag } from 'react-icons/ti';
import { LiaCopySolid } from 'react-icons/lia';
import { BiTimeFive } from 'react-icons/bi';
import { GrAttachment } from 'react-icons/gr';
import { MdOutlineCreditCard } from 'react-icons/md';
import { LiaArchiveSolid } from 'react-icons/lia';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {
  createComments,
  deleteComments,
  getAssigneeUsers,
  getAttachment,
  getComments,
  getJob,
  getJobRating,
  jobsActivities,
  updateComments,
  updateJob,
  updateJobRating
} from '../../Redux/Actions/CategoryAction';
import { useSelector } from 'react-redux';
import { Category } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveModal from './Modals/ArchiveModal';
import MatchesModal from './Modals/MatchesModal';
import CoverModal from './Modals/CoverModal';
import LabelModal from './Modals/LabelModal';
import AssignModal from './Modals/AssignModal';
import DeleteComment from './Modals/DeleteComment';
import CandidatesModal from './Modals/CandidatesModal';
import Comments from './Comments';
import History from './History';
import UserModalProfile from './UserModalProfile';
import AssignedModal from './Modals/AssignedModal';
import * as actionTypes from '../../Redux/Actions/ActionTypes';
import { useNavigate } from 'react-router-dom';
import Confetti from '../Confetti/Confetti';
import ConfettiExplosion from 'react-confetti-explosion';
import AttachModal from './Modals/AttachModal';
import DeleteAttachModal from './Modals/DeleteAttachModal';
import AttachImageModal from './Modals/AttachImageModal';
import { userProfile } from '../../Redux/Actions/AgencyAction';
import MemberModal from './Modals/MemberModal';

const bigExplodeProps = {
  force: 0.8,
  duration: 3000,
  particleCount: 250,
  width: 1600
};

const source = {
  position: 'absolute',
  right: '50%',
  left: '50%',
  width: '500px',
  zindex: 2000
};

const UserModal = (props) => {
  const {
    index,
    open,
    task,
    category,
    setOpen,
    handleOpen,
    setRate,
    rating,
    setStatus,
    assigned,
    setAssigned,
    statusData,
    setOpenUserModal
  } = props;
  const dispatch = useDispatch();
  const [comment, setComment] = useState();
  const [editComment, setEditComment] = useState();
  const [commentId, setCommentId] = useState();
  const [update, setUpdate] = useState(false);
  const [notes, setNotes] = useState();
  const [file, setFile] = useState('');
  const [attachmentId, setAttachmentid] = useState('');
  const textareaRef = useRef();
  const [activity, setActivity] = useState('history');
  const commentsData = useSelector((state) => state.Category.comments);
  const activityData = useSelector((state) => state.Category.jobsActivity);
  const ratings = useSelector((state) => state.Category.jobRatings);
  const assigneeUserData = useSelector(
    (state) => state?.Category?.assigneeUsers
  );
  const profile = useSelector((state) => state?.Agency?.user);

  const [openArchive, setOpenArchive] = useState(false);
  const [openMatches, setOpenMatches] = useState(false);
  const [openCover, setOpenCover] = useState(false);
  const [openLabel, setOpenLabel] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [openCandidate, setOpenCandidate] = useState(false);
  const [openAssigned, setOpenAssigned] = useState(false);
  const [deleteAttach, setDeleteAttach] = useState(false);

  const userData = useSelector((state) => state.Category.job);
  const attachment = useSelector((state) => state.Category.attachments);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [anchorElAttach, setAnchorElAttach] = useState(null);

  const [sortAssign, setSortAssign] = useState([]);
  const [assigneeUser, setAssigneeUser] = useState([]);
  const [placeConfetti, setPlaceConfetti] = useState(false);
  const [openAttach, setOpenAttach] = useState(false);
  const [placementAttach, setPlacementAttach] = useState();
  const [editAttachment, setEditAttachment] = useState(false);
  const [openEditNote, setOpenEditNote] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [image, setImage] = useState('');
  const [memberId, setMemberId] = useState('');
  const [memberOpen, setMemberOpen] = useState(false);
  const attachRef = useRef(null);
  const modalRef = useRef(null);

  const star = Object.values(ratings).filter((e) => e?.code === user.rating);

  let days = task.days.map(function (item) {
    return item['name'];
  });

  let livings = task.livings.map(function (item) {
    return item['name'];
  });

  let positions = task.necessaryPositions.map(function (item) {
    return item['name'];
  });

  const day = days.toString();

  const allDays = day?.replaceAll(',', ', ');

  const livingsData = livings.toString().replaceAll(',', ', ');

  useEffect(() => {
    if (open) {
      dispatch(getComments(task.id));
      dispatch(getAssigneeUsers(task.id));
      dispatch(jobsActivities(task.id));
      dispatch(getJob(task.id));
      dispatch(getJobRating());
      dispatch(getAttachment(task.id));
      heightofModal();
      dispatch(userProfile());
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setUser(userData);
    }
  }, [userData, open]);

  useEffect(() => {
    setNotes(task.notes);
  }, [open]);

  const edit = (data) => {
    setUpdate(true);
    setEditComment(data.content);
    setCommentId(data.id);
  };

  const addComment = () => {
    if (comment?.length > 0) {
      dispatch(createComments(task.id, { content: comment }));
      setComment('');
    }
  };

  const handleActivity = (value) => {
    setActivity(value);
  };

  const handleOpenArchive = () => {
    setOpenArchive(true);
  };
  const handleCloseArchive = () => {
    setOpenArchive(false);
  };

  const handleOpenMatches = () => {
    setOpenMatches(true);
  };

  const handleCloseMatches = () => {
    setOpenMatches(false);
  };

  const handleOpenCover = () => {
    setOpenCover(true);
  };

  const handleCloseCover = () => {
    setOpenCover(false);
    setFile('');
  };

  const handleOpenMember = (id) => {
    setMemberOpen(true);
    setMemberId(id);
  };

  const handleOpenLabel = () => {
    setOpenLabel(true);
  };

  const handleCloseLabel = () => {
    setOpenLabel(false);
  };

  const handleOpenAssign = () => {
    setOpenAssign(true);
  };

  const handleCloseAssign = () => {
    setOpenAssign(false);
  };

  const handleOpenComment = (id) => {
    setOpenComment(true);
    setCommentId(id);
  };

  const handleCloseComment = () => {
    setOpenComment(false);
  };

  const handleOpenCandidate = () => {
    setOpenCandidate(true);
  };

  const handleCloseCandidate = () => {
    setOpenCandidate(false);
  };

  const handleOpenAssigend = () => {
    setOpenAssigned(true);
  };

  const handleCloseAssigend = () => {
    setOpenAssigned(false);
  };

  const handleDeleteAttach = (attachid) => {
    setDeleteAttach(true);
    setAttachmentid(attachid);
  };

  const handleCloseAttachDelete = () => {
    setDeleteAttach(false);
  };

  const handleOpenImage = (image) => {
    setOpenImage(true);
    setImage(image);
  };

  const handleCloseImage = () => {
    setOpenImage(false);
  };

  const handleCloseAttach = () => {
    setOpenAttach(false);
    dispatch({
      type: actionTypes.SINGLE_ATTACHMENT_SUCCESS,
      payload: {}
    });
  };

  const handleNotes = () => {
    const form = new FormData();
    form.append('notes', notes);
    form.append('name', task.name);
    dispatch(updateJob(task.id, form));
    setOpenEditNote(false);
  };

  const handleEditComment = (id) => {
    dispatch(updateComments(task.id, id, { content: editComment }));
    setUpdate(false);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenUserModal(false);
    setPlaceConfetti(false);
    setUser({});
    setOpenAttach(false);
    setEditAttachment(false);
    handleCloseNotes();
    setSortAssign([]);
    setAssigneeUser([]);
    dispatch({
      type: actionTypes.JOB_SUCCESS,
      payload: {}
    });
    dispatch({
      type: actionTypes.JOBS_ACTIVITIES_SUCCESS,
      payload: {}
    });
  };

  const handleRating = (value) => {
    if (open) {
      setRate(value);
      dispatch(updateJobRating(task.id, value));
    }
  };

  useEffect(() => {
    if (open) {
      setAssigneeUser(assigneeUserData);
    }
  }, [assigneeUserData, open]);

  const sortAssignData = assigneeUser
    .filter((e) => e.assignedToJob)
    .sort((a, b) =>
      a.user.profileImageUrl && !b.user.profileImageUrl ? -1 : 1
    );

  useEffect(() => {
    if (open) {
      setSortAssign(sortAssignData);
    }
  }, [sortAssignData, open]);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      return setLoading(true);
    } else if (assigneeUser?.length === 0) {
      return setLoading(true);
    } else {
      return setLoading(false);
    }
  }, [user, assigneeUser]);

  const handleClick = () => {
    setOpenAttach(true);
    setEditAttachment(false);
  };

  const openA = Boolean(anchorElAttach);

  const editAttach = (attachId) => {
    setOpenAttach(true);
    setEditAttachment(true);
    setAttachmentid(attachId);
  };

  const OpenNotes = () => {
    adjustTextareaHeight();
    setOpenEditNote(true);
  };

  const handleCloseNotes = () => {
    setOpenEditNote(false);
    setNotes(task.notes);
  };

  useEffect(() => {
    if (openEditNote) {
      adjustTextareaHeight();
    }
  }, [openEditNote]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      // textareaRef.current.style.height = '10px';
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 20
      }px`;
    }
  };

  useEffect(() => {
    heightofModal();
  }, []);

  const heightofModal = () => {
    if (modalRef.current) {
      // modalRef.current.style.height = `${modalRef.current.scrollHeight}px`;
      console.log('first', modalRef.current.style.height);
    }
  };

  return (
    <>
      <Modal
        open={open}
        sx={{
          zIndex: 0,
          overflowY: 'scroll',
          paddingBottom: '100px'
        }}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div ref={modalRef} className="main-modal position-relative">
          {loading ? (
            <div
              className="d-flex justify-content-center h-100"
              style={{ paddingBottom: '50%' }}
            >
              <CircularProgress />
            </div>
          ) : (
            <>
              {placeConfetti && (
                <>
                  <div style={source}>
                    <ConfettiExplosion open={open} {...bigExplodeProps} />
                  </div>
                </>
              )}
              <div className="column-flex-main d-flex gap-4">
                <div className="small-display-icon d-flex justify-content-end">
                  <CloseIcon onClick={handleClose} className="cursor-pointer" />
                </div>
                <UserModalProfile
                  data={task}
                  ratings={ratings}
                  allDays={allDays}
                  livingsData={livingsData}
                  positions={positions}
                  setOpen={setOpen}
                  user={user}
                  star={star}
                  handleRating={handleRating}
                  rating={rating}
                />

                <div className="detail-area">
                  <div>
                    <div className="large-display-icon d-flex justify-content-end">
                      <CloseIcon
                        onClick={handleClose}
                        className="cursor-pointer"
                      />
                    </div>
                    <div className="main-top-section d-flex justify-content-between align-items-center">
                      <div>
                        <div className="d-flex justify-content-baseline gap-3">
                          <div className="mt-2">
                            <FaRegCreditCard />
                          </div>
                          <div>
                            <div className="user-name-modal">Assigned to</div>
                            <div>
                              In list{' '}
                              <span className="text-decoration-underline">
                                {category}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div>
                              <div className="d-flex gap-2">
                                {sortAssign.slice(0, 3).map((e, index) => {
                                  return (
                                    <Avatar
                                      key={index}
                                      sx={{
                                        width: 45,
                                        height: 45,
                                        fontSize: '13px'
                                      }}
                                      src={e?.user?.profileImageUrl}
                                      // {...stringAvatar(e?.user?.fullName)}
                                    />
                                  );
                                })}
                                {sortAssign.length > 3 && (
                                  <Avatar
                                    onClick={() => handleOpenAssigend()}
                                    className="plus-assign cursor-pointer"
                                    sx={{ width: 45, height: 45 }}
                                  >
                                    +{sortAssign.length - 3}
                                  </Avatar>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div className="address-main">
                          <div className="d-flex justify-content-between">
                            <div
                              className="pb-4 pt-4"
                              style={{
                                fontSize: '20px',
                                letterSpacing: '1px',
                                fontWeight: 900
                              }}
                            >
                              Nanny Housekeeper in Barons Court
                            </div>
                            <div>
                              <EditIcon
                                className="fs-5 cursor-pointer"
                                onClick={() =>
                                  navigate('/jobdetail', {
                                    state: {
                                      id: task?.id,
                                      edit: true,
                                      savecard: true
                                    }
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="d-flex" style={{ gap: '70px' }}>
                            <div
                              className="detail-width"
                              style={{ width: '200px' }}
                            >
                              <div className="address-title text-wrap">
                                Address:{' '}
                                <span className="address-detail">
                                  {task.address}
                                </span>
                              </div>
                              <div className="address-title">
                                PostCode:{' '}
                                <span className="address-detail">
                                  {task.postcode}
                                </span>
                              </div>
                              <div className="address-title">
                                WorkDays:{''}
                                <span
                                  className="address-detail"
                                  style={{
                                    wordWrap: 'break-word'
                                  }}
                                >
                                  {' '}
                                  {allDays}
                                </span>
                              </div>
                              <div className="address-title">
                                Time:{' '}
                                <span className="address-detail">
                                  <>
                                    {task?.startTime && (
                                      <>
                                        {moment(
                                          task?.startTime,
                                          'HH:mm:ss'
                                        ).format('hh:mm')}{' '}
                                        -{' '}
                                      </>
                                    )}
                                    {task?.finishTime && (
                                      <>
                                        {moment(
                                          task?.finishTime,
                                          'HH:mm:ss'
                                        ).format('hh:mm')}
                                      </>
                                    )}
                                  </>
                                </span>
                              </div>
                            </div>
                            <div className="">
                              <div className="address-title">
                                Children:{' '}
                                <span className="address-detail">
                                  {task.numberOfChildren}
                                </span>
                              </div>
                              <div className="address-title">
                                Ages:{' '}
                                <span className="address-detail">
                                  {task.ageOfChildren.toString()}
                                </span>
                              </div>
                              <div className="address-title">
                                Salary:{' '}
                                <span className="address-detail">
                                  {task.salary}
                                </span>
                              </div>
                              <div className="address-title">
                                Living:{' '}
                                <span className="address-detail">
                                  {livingsData}
                                </span>
                              </div>
                              <div className="address-title">
                                Position:{' '}
                                <span className="address-detail">
                                  {positions.toString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex justify-content-end pt-3">
                        <div
                          onClick={() => handleOpenAssign()}
                          style={{
                            paddingRight: '5px'
                          }}
                          className="mx-5 d-flex justify-content-start align-items-center card-menus tab-text cursor-pointer"
                        >
                          <img src={User} className="px-2" />
                          Assign team
                        </div>
                      </div>

                      <CSSTransition
                        in={openAssign}
                        timeout={200}
                        classNames="rtl-animation-container"
                        unmountOnExit
                      >
                        <div
                          style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            left: 0,
                            backgroundColor: '#00000080',
                            zIndex: 1,
                            overflow: 'hidden'
                          }}
                        >
                          <AssignModal
                            job={task}
                            openAssign={openAssign}
                            handleCloseAssign={handleCloseAssign}
                          />
                        </div>
                      </CSSTransition>
                      {/* {openAssign && (
                        <div
                          style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            left: 0
                          }}
                        >
                          <AssignModal
                            job={task}
                            openAssign={openAssign}
                            handleCloseAssign={handleCloseAssign}
                          />
                        </div>
                      )} */}
                      <div className="pt-5">
                        <div>
                          <div className="d-flex column-flex-main gap-0">
                            <div style={{ width: '-webkit-fill-available' }}>
                              <div className="d-flex align-items-baseline justify-content-between gap-3 pt-3">
                                <div className="d-flex align-items-center gap-3">
                                  <div>
                                    <HiOutlineMenuAlt2 />
                                  </div>
                                  <div className="comment-title">
                                    Description
                                  </div>
                                </div>
                                {!openEditNote && (
                                  <button
                                    className="addattach-btn"
                                    onClick={() => OpenNotes()}
                                  >
                                    Edit
                                  </button>
                                )}
                              </div>

                              <div
                                className="pt-3"
                                style={{
                                  paddingLeft: '30px'
                                }}
                              >
                                {openEditNote ? (
                                  <>
                                    <textarea
                                      ref={textareaRef}
                                      value={notes}
                                      onChange={(e) => {
                                        setNotes(e.target.value);
                                        adjustTextareaHeight();
                                      }}
                                      style={{
                                        resize: 'none',
                                        overflow: 'hidden',
                                        width: '100%'
                                      }}
                                      type="text"
                                      className="desc-input"
                                      placeholder="Add a more detailed description..."
                                    />
                                    <div className="d-flex gap-2">
                                      <small
                                        onClick={() => handleNotes()}
                                        className="text-decoration-underline text-muted cursor-pointer"
                                      >
                                        Save
                                      </small>
                                      <small
                                        onClick={() => handleCloseNotes()}
                                        className="text-decoration-underline text-muted cursor-pointer"
                                      >
                                        Cancel
                                      </small>
                                    </div>
                                  </>
                                ) : (
                                  <div
                                    className="cursor-pointer text-justify desc-padding"
                                    onClick={() => OpenNotes()}
                                    style={{
                                      // width: '90%',
                                      textAlign: 'justify',
                                      background: '#E3E6E8'
                                    }}
                                  >
                                    {notes}
                                  </div>
                                )}
                              </div>

                              <div className="d-flex align-items-baseline justify-content-between gap-3 pt-4">
                                <div
                                  className="d-flex align-items-center gap-3"
                                  ref={attachRef}
                                >
                                  <div>
                                    <GrAttachment
                                      style={{ fontSize: '14px' }}
                                    />
                                  </div>
                                  <div className="comment-title">
                                    Attachment
                                  </div>
                                </div>
                                <button
                                  className="addattach-btn"
                                  onClick={() => handleClick()}
                                >
                                  Add
                                </button>
                              </div>

                              <div
                                style={{ paddingLeft: '30px' }}
                                className="pt-2"
                              >
                                {attachment?.length > 0 &&
                                  attachment?.map((data) => {
                                    var ext = data?.url.substring(
                                      data?.url.lastIndexOf('.') + 1
                                    );
                                    return (
                                      <div className="d-flex align-items-start gap-4 pt-2">
                                        <div>
                                          {ext == 'pdf' ? (
                                            <div
                                              src={data?.url}
                                              style={{
                                                height: '110px',
                                                width: '110px',
                                                background: '#E4E6E9',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                              }}
                                              className="cursor-pointer"
                                              onClick={() =>
                                                handleOpenImage(data?.url)
                                              }
                                            >
                                              pdf
                                            </div>
                                          ) : (
                                            <div className="img-main">
                                              <img
                                                onClick={() =>
                                                  handleOpenImage(data?.url)
                                                }
                                                className="attach-img cursor-pointer"
                                                src={data?.url}
                                              />
                                            </div>
                                          )}
                                        </div>
                                        <div className="d-flex flex-column flex-start gap-1">
                                          <span>{data?.title}</span>
                                          <small className="text-muted">
                                            {data?.createdAt !== null &&
                                              'Added' +
                                                ' ' +
                                                moment
                                                  .parseZone(data?.createdAt)
                                                  .startOf('minute')
                                                  .fromNow()}
                                          </small>
                                          <div className="d-flex gap-2">
                                            <small
                                              onClick={() =>
                                                editAttach(data?.id)
                                              }
                                              className="text-decoration-underline text-muted cursor-pointer"
                                            >
                                              Edit
                                            </small>
                                            <small
                                              onClick={() =>
                                                handleDeleteAttach(data?.id)
                                              }
                                              className="text-decoration-underline text-muted cursor-pointer"
                                            >
                                              Delete
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                              <div className="pb-4">
                                <div className="pt-5 d-flex align-items-baseline gap-3">
                                  <div>
                                    <RxActivityLog />
                                  </div>
                                  <div className="comment-title">Activity</div>
                                </div>
                                <div className="d-flex align-items-center gap-2 px-3 pt-2">
                                  <div className="px-3">Show:</div>
                                  <div
                                    className={`cursor-pointer ${
                                      activity == 'comments'
                                        ? 'show-active-tab'
                                        : 'show-unactive-tab'
                                    }`}
                                    onClick={() => handleActivity('comments')}
                                  >
                                    Comments
                                  </div>
                                  <div
                                    className={`cursor-pointer ${
                                      activity == 'history'
                                        ? 'show-active-tab'
                                        : 'show-unactive-tab'
                                    }`}
                                    onClick={() => handleActivity('history')}
                                  >
                                    History
                                  </div>
                                </div>
                                {activity == 'comments' && (
                                  <Comments
                                    comment={comment}
                                    setComment={setComment}
                                    addComment={addComment}
                                    commentsData={commentsData}
                                    update={update}
                                    commentId={commentId}
                                    editComment={editComment}
                                    setEditComment={setEditComment}
                                    handleEditComment={handleEditComment}
                                    edit={edit}
                                    handleOpenComment={handleOpenComment}
                                    profile={profile}
                                  />
                                )}
                                {activity == 'history' && (
                                  <History activityData={activityData} />
                                )}
                              </div>
                            </div>
                            <div className="margin-top-modal">
                              <div
                                className="d-flex justify-content-start tab-text mb-1"
                                style={{ paddingLeft: '18px' }}
                              >
                                Add to card
                              </div>
                              <CSSTransition
                                in={openAttach}
                                timeout={200}
                                classNames="rtl-animation-container"
                                unmountOnExit
                              >
                                <div
                                  style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    backgroundColor: '#00000080',
                                    zIndex: 1,
                                    overflow: 'hidden'
                                  }}
                                >
                                  <AttachModal
                                    handleCloseAttach={handleCloseAttach}
                                    openAttach={openAttach}
                                    jobId={task.id}
                                    editAttachment={editAttachment}
                                    attachmentId={attachmentId}
                                    anchorElAttach={anchorElAttach}
                                    placementAttach={placementAttach}
                                    setOpenAttach={setOpenAttach}
                                  />
                                </div>
                              </CSSTransition>
                              <div className="position-relative">
                                <div
                                  onClick={(event) => handleClick(event)}
                                  className="mb-2 mx-5 d-flex justify-content-start align-items-center card-menus tab-text cursor-pointer "
                                >
                                  <GrAttachment
                                    className="mx-2"
                                    style={{ fontSize: '14px' }}
                                  />
                                  Attachment
                                </div>
                              </div>

                              <div className="position-relative">
                                <div
                                  onClick={() => handleOpenCandidate()}
                                  className="mx-5 d-flex justify-content-start align-items-center card-menus tab-text cursor-pointer"
                                >
                                  <img src={User} className="px-2" />
                                  Candidates
                                </div>
                              </div>
                              <CSSTransition
                                in={openCandidate}
                                timeout={200}
                                classNames="rtl-animation-container"
                                unmountOnExit
                              >
                                <div
                                  style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    backgroundColor: '#00000080',
                                    zIndex: 1,
                                    overflow: 'hidden'
                                  }}
                                >
                                  <CandidatesModal
                                    job={task}
                                    assigned={assigned}
                                    setAssigned={setAssigned}
                                    openCandidate={openCandidate}
                                    handleCloseCandidate={handleCloseCandidate}
                                    handleOpenMember={handleOpenMember}
                                  />
                                </div>
                              </CSSTransition>
                              <div className="position-relative">
                                <div
                                  style={{
                                    position: 'fixed',
                                    right: -10,
                                    zIndex: 1
                                    // top: '30rem'
                                  }}
                                >
                                  {openLabel && (
                                    <div>
                                      <LabelModal
                                        index={index}
                                        job={task}
                                        openLabel={openLabel}
                                        handleCloseLabel={handleCloseLabel}
                                        statusData={statusData}
                                        setStatus={setStatus}
                                        setPlaceConfetti={setPlaceConfetti}
                                        placeConfetti={placeConfetti}
                                      />
                                    </div>
                                  )}
                                </div>
                                <div
                                  onClick={() => handleOpenLabel()}
                                  className="mt-2 mx-5 d-flex justify-content-start align-items-center card-menus tab-text cursor-pointer"
                                >
                                  <TiTag className="mx-2 fs-6" />
                                  Labels
                                </div>
                              </div>
                              <CSSTransition
                                in={openCover}
                                timeout={200}
                                classNames="rtl-animation-container"
                                unmountOnExit
                              >
                                <div
                                  style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    backgroundColor: '#00000080',
                                    zIndex: 1,
                                    overflow: 'hidden'
                                  }}
                                >
                                  <CoverModal
                                    job={task}
                                    file={file}
                                    setFile={setFile}
                                    openCover={openCover}
                                    handleCloseCover={handleCloseCover}
                                  />
                                </div>
                              </CSSTransition>
                              <div className="">
                                <div
                                  onClick={() => handleOpenCover()}
                                  className="mt-2 mx-5 d-flex justify-content-start align-items-center card-menus tab-text cursor-pointer"
                                >
                                  <MdOutlineCreditCard className="mx-2 fs-6" />
                                  Cover
                                </div>
                              </div>
                              <div
                                onClick={() => handleOpenArchive()}
                                className="mt-2 mx-5 d-flex justify-content-start align-items-center card-menus tab-text cursor-pointer"
                              >
                                <LiaArchiveSolid className="mx-2 fs-6" />
                                Archive
                              </div>
                              <div
                                onClick={() => handleOpenMatches()}
                                className="mt-2 mx-5 d-flex justify-content-start align-items-center card-menus tab-text cursor-pointer"
                              >
                                <img src={User} className="px-2" />
                                Show Matches
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <ArchiveModal
            jobId={task.id}
            openArchive={openArchive}
            handleCloseArchive={handleCloseArchive}
          />
          <MatchesModal
            job={task}
            openMatches={openMatches}
            handleCloseMatches={handleCloseMatches}
          />

          <DeleteComment
            job={task}
            openComment={openComment}
            commentId={commentId}
            handleCloseComment={handleCloseComment}
          />
          <DeleteAttachModal
            deleteAttach={deleteAttach}
            jobId={task.id}
            attachmentId={attachmentId}
            handleCloseAttachDelete={handleCloseAttachDelete}
          />

          <AssignedModal
            assignedMember={sortAssign}
            openAssigned={openAssigned}
            handleCloseAssigend={handleCloseAssigend}
          />
          <AttachImageModal
            openImage={openImage}
            handleCloseImage={handleCloseImage}
            image={image}
          />
        </div>
      </Modal>
      {memberOpen && (
        <MemberModal
          memberId={memberId}
          open={memberOpen}
          setOpen={setMemberOpen}
        />
      )}
    </>
  );
};

export default UserModal;
