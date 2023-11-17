import React, { useEffect, useRef, useState } from 'react';
import './Notification.css';
import {
  CircularProgress,
  Divider,
  Menu,
  MenuItem,
  Popover,
  TablePagination,
  Typography
} from '@mui/material';
import Check from '../../Images/circle_check_blue.svg';
import Flag from '../../Images/Flag.svg';
import More from '../../Images/more_vertical.svg';
import UserVoice from '../../Images/user_voice.svg';
import FlagFill from '../../Images/Flag_fill.svg';
import UserPlus from '../../Images/user_plus_blue.svg';
import DoneAll from '../../Images/done_all.svg';
import { useDispatch } from 'react-redux';
import {
  deleteNotification,
  getNotification,
  markAllNotification,
  markNotification
} from '../../Redux/Actions/NotificationAction';
import { useSelector } from 'react-redux';
import moment from 'moment';
import DeleteModal from '../Dashboard/Modals/DeleteModal';
import NotificationIcon from './NotificationIcon';
import dayjs from 'dayjs';

const Notification = (props) => {
  const { id, anchorEl, open, handleClose } = props;
  const dispatch = useDispatch();
  const [anchorE2, setAnchorE2] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDeleteAll, setOpenDeleteAll] = useState(false);
  const openA = Boolean(anchorE2);
  const [notificationId, setNotificationId] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [object, setObject] = useState({});
  const [uniqueDate, setUniqueDate] = useState([]);
  const scrollRef = useRef(null);

  const [notification, setNotification] = useState([]);
  const NotificationData = useSelector(
    (state) => state?.Notification?.notifications?.content
  );
  const totalPages = useSelector(
    (state) => state?.Notification?.notifications?.totalPages
  );
  const loading = useSelector((state) => state?.Notification?.loading);

  useEffect(() => {
    if (open) {
      dispatch(getNotification(rowsPerPage, page));
    }
  }, [open, page]);

  useEffect(() => {
    if (NotificationData) {
      setNotification(NotificationData);
    }
  }, [NotificationData]);

  const handleClickAction = (event, id) => {
    setNotificationId(id);
    setAnchorE2(event.currentTarget);
  };

  const handleCloseAction = () => {
    setAnchorE2(null);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
    setAnchorE2(null);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenDeleteAll = () => {
    setOpenDeleteAll(true);
  };

  const handleCloseDeleteAll = () => {
    setOpenDeleteAll(false);
  };

  const handleMark = (id, status, index) => {
    let dataValue = JSON.parse(JSON.stringify(notification));
    if (status === 'SENT') {
      dataValue[index].status = 'SEEN';
      setNotification(dataValue);
      dispatch(markNotification(id));
    }
  };

  const removeNotification = () => {
    setOpenDelete(false);
    dispatch(deleteNotification(notificationId)).then(() => {
      dispatch(getNotification(rowsPerPage, page));
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    scrollRef.current.scrollTop = 0;
  };

  const markallNotification = () => {
    const newData = notification.map((obj, i) => ({
      ...obj,
      status: 'SEEN'
    }));
    setNotification(newData);
    dispatch(markAllNotification());
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    let obj = {};
    for (let i = 0; i < uniqueDate?.length; i++) {
      const date = uniqueDate[i];

      let element = notification.filter(
        (d) => dayjs(d?.createdAt).format('DD-MM-YYYY') === date
      );
      obj[date] = element;
      setObject(obj);
    }
  }, [uniqueDate, page, notification]);

  useEffect(() => {
    const data = [];
    notification?.map((e) => {
      if (!data?.includes(dayjs(e?.createdAt).format('DD-MM-YYYY'))) {
        data.push(dayjs(e?.createdAt).format('DD-MM-YYYY'));
      }
    });
    setUniqueDate(data);
  }, [notification]);
  return (
    <div className="notification-main">
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right'
        }}
        className="mt-3 notification-main"
        sx={{ overflow: 'hidden' }}
      >
        <div className="main-notification" ref={scrollRef}>
          <div className="notification-head">
            <div className="d-flex justify-content-between">
              <div className="main-title-n">Notifications</div>
              <div className="d-flex gap-2 align-items-center">
                <div
                  className="option-text"
                  onClick={() => markallNotification()}
                >
                  Mark all as read
                </div>
                <div className="hr-notification"></div>
                <div
                  className="option-text"
                  onClick={() => handleOpenDeleteAll()}
                >
                  Delete all
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="d-flex justify-content-center mt-5 h-100">
              <CircularProgress />
            </div>
          ) : (
            <>
              {uniqueDate.map((data, index) => (
                <>
                  <div className="time-label d-flex justify-content-center">
                    {data}
                  </div>
                  {object?.[data]?.map((message) => {
                    const ida = openA ? 'simple-popover' : undefined;
                    return (
                      <div
                        key={index}
                        onClick={() =>
                          handleMark(message?.id, message?.status, index)
                        }
                        className={`notification-list cursor-pointer ${
                          message?.status === 'SEEN'
                            ? 'seen-notification'
                            : 'unseen-notification'
                        }`}
                      >
                        <div className="d-flex notification-content align-items-center gap-4">
                          <NotificationIcon
                            notificationType={message?.notificationType}
                          />
                          <div className="d-flex flex-column flex-wrap">
                            <div className="notification-text">
                              {message.shortText
                                .split(' ')
                                .map((word, index) => {
                                  if (word.startsWith('@')) {
                                    return (
                                      <span
                                        key={index}
                                        className="highlight-notification"
                                      >
                                        {word + ' '}
                                      </span>
                                    );
                                  } else {
                                    return (
                                      <span key={index}>{word + ' '}</span>
                                    );
                                  }
                                })}
                            </div>
                            {/* <span className="notification-time">
                              {moment(data).startOf('month').fromNow()}
                            </span> */}
                            <span className="notification-time">
                              {moment
                                .utc(
                                  message?.createdAt,
                                  'YYYY-MM-DDTHH:mm:ss.SSSSZ'
                                )
                                .startOf('hour')
                                .fromNow()}
                            </span>
                          </div>
                          <div className="d-flex icon-content gap-3">
                            <div>
                              {message?.status === 'SEEN' ? (
                                <img
                                  src={Flag}
                                  onClick={() =>
                                    handleMark(
                                      message?.id,
                                      message?.status,
                                      index
                                    )
                                  }
                                  className="cursor-pointer"
                                />
                              ) : (
                                <img
                                  src={FlagFill}
                                  onClick={() =>
                                    handleMark(
                                      message?.id,
                                      message?.status,
                                      index
                                    )
                                  }
                                  className="cursor-pointer"
                                />
                              )}
                            </div>
                            <div
                              onClick={(e) => handleClickAction(e, message?.id)}
                            >
                              <img src={More} className="cursor-pointer" />
                            </div>
                            <div className="notification-option delete-option">
                              <Popover
                                className="notification-option"
                                id={ida}
                                open={openA}
                                anchorEl={anchorE2}
                                onClose={handleCloseAction}
                                sx={{ boxShadow: 0 }}
                                style={{ boxShadow: 0, right: 0 }}
                              >
                                <Typography
                                  sx={{
                                    boxShadow: 'none',
                                    cursor: 'pointer'
                                  }}
                                  onClick={handleOpenDelete}
                                >
                                  Delete
                                </Typography>
                              </Popover>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ))}
            </>
          )}
          <div className="d-flex justify-content-end">
            <TablePagination
              count={totalPages}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[]}
              sx={{ borderBottom: 'none' }}
            />
          </div>
        </div>
      </Popover>
      <DeleteModal
        title="Delete Notification?"
        text="Are you sure want to delete notification?"
        open={openDelete}
        onClose={handleCloseDelete}
        onClick={removeNotification}
      />
      <DeleteModal
        title="Delete All Notification?"
        text="Are you sure want to delete all notifications?"
        open={openDeleteAll}
        onClose={handleCloseDeleteAll}
        // onClick={removeNotification}
      />
    </div>
  );
};

export default Notification;
