import { Avatar, CircularProgress, debounce } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { datas } from './datas';
import CloseIcon from '@mui/icons-material/Close';
import { LuTags } from 'react-icons/lu';
import { MdOutlineGroups2 } from 'react-icons/md';
import { TbFileExport } from 'react-icons/tb';
import { PiDotOutlineFill } from 'react-icons/pi';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import {
  agencyUsers,
  enabledAgencyUsers,
  userProfile
} from '../../../Redux/Actions/AgencyAction';
import { useSelector } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
  nanniesHightlight,
  searchNanniesHightlight
} from '../../../Redux/Actions/CategoryAction';
import { Task } from '@mui/icons-material';
import { FiUsers } from 'react-icons/fi';
import GroupsIcon from '@mui/icons-material/Groups';
import Input from '../../input/Input';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useNavigate } from 'react-router-dom';
import MemberModal from '../Modals/MemberModal';

const SideBar = (props) => {
  const { openSidebar, setOpenSidebar, jobId } = props;
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [memberId, setMemberId] = useState('');
  const [highlightUser, setHighlightUser] = useState([]);
  const changes = useSelector((state) => state.Agency.agencyChange);
  const highlightUserData = useSelector(
    (state) => state?.Category?.highlightNanny
  );
  const loading = useSelector((state) => state.Category.loading);
  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    setOpen(true);
    setMemberId(id);
  };

  useEffect(() => {
    setHighlightUser(highlightUserData);
  }, [highlightUserData]);

  useEffect(() => {
    if (openSidebar) {
      dispatch(nanniesHightlight(search));
    }
  }, [changes, openSidebar]);

  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleSearch = debounce((event) => {
    if (event?.length > 0) {
      dispatch(nanniesHightlight(event));
    } else {
      dispatch(nanniesHightlight(''));
    }
  }, 300);

  return (
    <>
      <div
        style={{ cursor: 'pointer' }}
        className="bottom-button"
        onClick={() => handleSidebar()}
      >
        <GroupsIcon />
      </div>
      {openSidebar && (
        <>
          <div className="main-sidebar">
            <div className="d-flex justify-content-between align-items-center p-2 mt-3">
              <div className="fw-bold">Members</div>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenSidebar(false)}
              >
                <CloseIcon />
              </div>
            </div>
            <hr style={{ color: 'gray' }} />
            <div className="d-none">
              <h6 className="fw-bold">Jan 22</h6>
              <div className="border-box">
                <div className="box border-left">
                  <div className="d-flex align-items-center gap-1">
                    <img
                      height="10%"
                      width="10%"
                      src={require('../../../Images/slack-icon.png')}
                    />{' '}
                    <div className="fw-light" style={{ fontSize: '12px' }}>
                      Message sent
                    </div>
                  </div>
                </div>
                <div className="box border-left fs-5 fw-bold">426</div>
              </div>
              <div className="d-flex align-items-center justify-content-start gap-1 pt-3">
                <div className="bg-buttons">
                  <LuTags /> Assign tags
                </div>
                <div className="bg-buttons">
                  <MdOutlineGroups2 /> Create group
                </div>
                <div className="bg-buttons">
                  <TbFileExport /> export
                </div>
              </div>
            </div>
            <hr style={{ color: 'gray', display: 'none' }} />
            <div className="p-2">
              <input
                type="text"
                className="profile-input w-100 mb-4"
                placeholder="Search Members..."
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ paddingLeft: '10px' }}
              >
                {/* <div className="member-text">Member</div> */}
                <div className="member-text">
                  {/* <div>
                  <PiDotOutlineFill
                    style={{ color: '#7F43FF', fontSize: '30px' }}
                  />
                  message sent
                </div> */}
                </div>
              </div>
              {loading ? (
                <div className="d-flex justify-content-center">
                  <CircularProgress />
                </div>
              ) : (
                highlightUser?.length > 0 &&
                highlightUser?.map((item, index) => (
                  <Droppable
                    key={index}
                    type="nanny"
                    droppableId={item.id}
                    direction="horizontal"
                    isdragging="true"
                    isDropDisabled={true}
                  >
                    {(provided, snapshot) => (
                      <div
                        isdraggingover={
                          snapshot.isDraggingOver
                            ? snapshot.isDraggingOver
                            : undefined
                        }
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div className="pt-3" style={{ paddingLeft: '10px' }}>
                          <div className="d-flex gap-2">
                            <Draggable
                              draggableId={item.id}
                              index={index}
                              type="task"
                              isdragging="true"
                              key={index}
                              draggable="true"
                              shouldRespectForcePress
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className={`d-flex gap-2 align-items-center bg-white flex-1`}
                                    onClick={() => handleOpen(item?.id)}
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                    isdragging={snapshot.isDragging ? 'true' : 'false'}
                                  >
                                    <Avatar
                                      src={item?.photo}
                                      sx={{ width: 24, height: 24 }}
                                    />
                                    <div
                                      className="member-name"
                                      style={{ cursor: 'grab' }}
                                    >
                                      {item.firstName}
                                    </div>
                                    {snapshot.isDragging &&
                                      <div
                                        className="d-flex justify-content-end"
                                        style={{
                                          position: 'absolute',
                                          right: '20px'
                                        }}
                                      >
                                        <RemoveRedEyeOutlinedIcon
                                          style={{ color: 'lightgrey' }}
                                          className="fs-4 cursor-pointer"
                                          onClick={() => handleOpen(item?.id)}
                                        />
                                      </div>
                                    }
                                  </div>
                                )
                              }}
                            </Draggable>
                          </div>
                        </div>
                      </div>
                    )}
                  </Droppable>
                ))
              )}
            </div>
          </div>
        </>
      )}
      {open && (
        <MemberModal memberId={memberId} open={open} setOpen={setOpen} />
      )}
    </>
  );
};

export default SideBar;
