import { React, useContext, useEffect, useRef, useState } from 'react';
import './MainLayout.css';
// import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
// import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
// import Logo from '../../Images/Logo.png';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DownArrow from '../../Images/chevron_down_gray.svg';

import { useLocation, useNavigate } from 'react-router-dom';

import {
  ListItemIcon,
  ListItemText,
  ListItemButton,
  AppBar,
  Drawer,
  Typography,
  Avatar,
  AvatarGroup,
  Popover,
  Divider,
  FormControlLabel,
  Switch,
  Skeleton
} from '@mui/material';
import Accounts from '../../components/Sidebar/Accounts';
import Logo from '../../components/Sidebar/Logo';
import { useDispatch } from 'react-redux';
import { logout, sentNotification } from '../../Redux/Actions/AuthAction';
import PersonIcon from '@mui/icons-material/Person';
import {
  allAgencies,
  enabledAgencyUsers,
  leaveAgency,
  userAgency,
  userProfile
} from '../../Redux/Actions/AgencyAction';
import { useSelector } from 'react-redux';
import NavbarUser from '../../components/Dashboard/NavbarUser';
import ActiveUserModal from '../../components/Dashboard/Modals/ActiveUserModal';
import { userContext } from '../../context/UserContext';
import { Menus } from './Menus';
import ProfileSidebar from '../../components/Sidebar/ProfileSidebar';
import LeaveAgencyModal from '../../components/Dashboard/Modals/LeaveAgencyModal';
import RemoveProfileModal from '../../components/Dashboard/Modals/RemoveProfileModal';
import Notification from '../../components/Notifications/Notification';
import { seenStatus } from '../../Redux/Actions/CalenderAction';
import { PopupModal } from 'react-calendly';
import styled from 'styled-components';

function MainLayout(props) {
  const {
    window,
    handleDrawerWidth,
    handleDrawerToggle,
    drawerWidth,
    screenOpen,
    mobileOpen,
    setOpenCalendly,
    openCalendly,
    handleChange,
    mode
  } = props;

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const divRef = useRef();
  const defaultAgency = useSelector(
    (state) => state?.Agency?.user?.defaultAgency?.id
  );

  const status = useSelector((state) => state.Calender.statusSeen);
  const agencyName = useSelector(
    (state) => state?.Agency?.user?.defaultAgency?.name
  );
  const user = useSelector((state) => state?.Agency?.user);
  const changes = useSelector((state) => state.Agency.agencyChange);
  const usersData = useSelector((state) => state?.Agency?.enableUser);
  const [isAdmin, setIsAdmin] = useState();
  const { openuserModal, setOpenUserModal } = useContext(userContext);
  const [anchorE2, setAnchorE2] = useState(null);
  const [openAgency, setOpenAgency] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const userName = localStorage.getItem('username');
  const userId = localStorage.getItem('userid');
  const openU = Boolean(anchorEl);
  const openProfile = Boolean(anchorE2);

  // Notification popup
  const [anchorElN, setAnchorElN] = useState(null);
  const openN = Boolean(anchorElN);
  const id = openN ? 'simple-popover' : undefined;

  const [file, setFile] = useState([]);
  const agencyusers = useSelector((state) => state.Agency.agencyUser);

  useEffect(() => {
    if (agencyusers?.length > 0) {
      const isAgency =
        agencyusers && agencyusers?.filter((e) => e.id === defaultAgency);
      if (isAgency?.[0]?.roles?.[0]?.role === 'AGENCY_ADMIN') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [agencyusers]);

  const MenuList = isAdmin
    ? Menus
    : Menus.filter((data) => data?.name !== 'Team');

  const handleClick = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleCloseP = () => {
    setAnchorE2(null);
  };

  const handleOpenAgency = () => {
    setOpenAgency(true);
  };

  const handleCloseAgency = () => {
    setOpenAgency(false);
  };

  const handleOpenProfileModal = () => {
    setProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setProfileModal(false);
  };

  const handleClickN = (event) => {
    setAnchorElN(event.currentTarget);
    setOpenNotification(true);
  };

  const handleCloseN = () => {
    setAnchorElN(null);
    setOpenNotification(false);
  };

  const drawer = (
    <div
      className={`drawer ${screenOpen ? 'overflowX scrollY' : ''}`}
      style={{ backgroundColor: '#1C2536', overflowY: 'auto', height: '100vh' }}
    >
      <IconButton className="ms-4 bg-none collapse-icon bg-none">
        {!mobileOpen && screenOpen ? (
          <div
            className="bg-light mx-1 mt-5 mb-4"
            style={{ borderRadius: '50%' }}
          >
            <ChevronRightIcon
              onClick={handleDrawerWidth}
              className="text-dark d-flex fs-6 flex-column align-items-center"
            />
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-center">
            <div className="bg-light mt-3" style={{ borderRadius: '50%' }}>
              <ChevronLeftIcon
                onClick={handleDrawerWidth}
                className="fs-6 text-dark"
              />
            </div>
            {(!screenOpen || mobileOpen) && <Logo mobileOpen={mobileOpen} />}
          </div>
        )}
      </IconButton>

      <div className="d-flex flex-column">
        {(!screenOpen || mobileOpen) && <Accounts />}
        <List component="nav">
          {MenuList.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <div key={index}>
                <ListItemButton
                  className={
                    isActive
                      ? !screenOpen || mobileOpen
                        ? 'active px-4'
                        : 'bg-none px-4'
                      : 'px-4'
                  }
                  onClick={() => {
                    if (item.path === '/logout') {
                      dispatch(logout());
                    } else if (item.path === '/jointeam') {
                      navigate('/jointeam', {
                        state: { jointeam: true, pathname }
                      });
                    } else if (item.name === 'Calendly') {
                      setOpenCalendly(true);
                    } else {
                      navigate(item.path);
                    }
                  }}
                >
                  <div
                    className={`d-flex align-items-center py-1 ${
                      mobileOpen ? 'mx-0' : ''
                    }`}
                  >
                    <ListItemIcon
                      className={
                        isActive
                          ? !screenOpen || mobileOpen
                            ? 'active-icon d-flex flex-column'
                            : 'active-small d-flex flex-column align-items-center'
                          : ' text-white d-flex flex-column'
                      }
                      style={
                        screenOpen
                          ? !mobileOpen
                            ? { alignItems: 'center' }
                            : {}
                          : {}
                      }
                    >
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText
                      className={
                        mobileOpen || !screenOpen ? 'd-block' : 'd-none'
                      }
                      style={
                        isActive ? { color: '#4285F4' } : { color: '#FFFFFF' }
                      }
                      primary={item.name}
                    />
                  </div>
                </ListItemButton>
                {(!screenOpen || mobileOpen) && item.divider && (
                  <div className="d-flex align-items-center py-3">
                    <hr className="onehr" />
                    <span className="reporthead">Tools</span>
                    <hr className="secondhr" />
                  </div>
                )}
                {item.divider2 && (
                  <div>
                    <div className="d-flex align-items-center py-3">
                      <hr
                        className={
                          !screenOpen || mobileOpen ? 'onehr1' : 'onehr1-small'
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const MaterialUISwitch = styled(Switch)(() => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff'
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: mode ? '#8796A5' : '#aab4be'
        }
      }
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: mode ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
      }
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: mode ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2
    }
  }));

  const styleApp = {
    // backgroundColor: '#F6F6F6',
    boxShadow: 'none',
    color: pathname == '/pendingteam' && 'RGBA(255, 255, 255, 0.92)',
    zIndex: openuserModal ? 0 : 1100
  };

  const handleOpen = (e) => {
    setOpen(true);
    setAnchorEl(divRef.current);
  };

  useEffect(() => {
    setAnchorEl(divRef.current);
  }, [divRef]);

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (defaultAgency) {
      dispatch(enabledAgencyUsers(defaultAgency));
    }
  }, [defaultAgency, changes]);

  useEffect(() => {
    dispatch(userProfile());
    dispatch(userAgency());
    dispatch(seenStatus());
  }, [changes]);

  useEffect(() => {
    setUsers(
      usersData?.filter((e) => e?.id !== userId)
      // .sort((c, d) => (c.fullName > d.fullName ? 1 : d.fullName ? -1 : 0))
      // .sort((a, b) => (a?.onlineStatus.status === 1 ? -1 : 1))
    );
  }, [usersData]);

  const handleOpenProfile = () => {
    setProfileOpen(!profileOpen);
    setAnchorE2(null);
  };

  const deleteAgency = () => {
    dispatch(leaveAgency(defaultAgency, agencyName)).then((res) => {
      dispatch(userProfile());
      if (res?.status === 200) {
        navigate('/jointeam', { state: { jointeam: true } });
      }
    });
  };

  return (
    <Box sx={{ display: 'flex' }} className="position-relative">
      <CssBaseline />
      <AppBar
        position="fixed"
        className="appBar"
        style={styleApp}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px)` }
        }}
      >
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <div
            className="d-flex justify-content-center gap-1 ms-auto align-items-center header-text"
            style={{ paddingLeft: '24px', width: 'max-content' }}
          >
            {users.length
              ? users?.slice(0, 2).map((user, index) => {
                  return <NavbarUser user={user} key={index} index={index} />;
                })
              : new Array(2).fill(0).map((value, index) => (
                  <>
                    <Skeleton width={40} height={40} variant="circular" />
                    <div className="flex">
                      <Skeleton width={150}>
                        <Typography>.</Typography>
                      </Skeleton>
                      <Skeleton width={100}>
                        <Typography>.</Typography>
                      </Skeleton>
                    </div>
                  </>
                ))}

            <div className="d-flex gap-2" style={{ paddingLeft: '20px' }}>
              {users.length ? (
                users.slice(3, 5).map((e, index) => {
                  return (
                    <Avatar
                      key={index}
                      sx={{ width: 30, height: 30 }}
                      src={e?.profileImageUrl}
                    />
                  );
                })
              ) : (
                <></>
              )}
              {users?.length > 2 ? (
                <Avatar
                  ref={divRef}
                  onClick={(e) => handleOpen(e)}
                  className="cursor-pointer number-avtar"
                  sx={{
                    width: 30,
                    height: 30,
                    fontSize: '13px'
                  }}
                >
                  +{users?.length - 4}
                </Avatar>
              ) : (
                <></>
              )}
              {users.length === 0 &&
                new Array(3).fill(0).map((value, index) => (
                  <>
                    <Skeleton width={30} height={30} variant="circular" />
                  </>
                ))}
            </div>
          </div>
          <Typography
            hariant="h6"
            // noWrap
            className="text-black d-flex gap-4 ms-auto align-items-center justify-content-end"
            component="div"
          >
            <div className="d-flex align-items-center gap-3">
              <FormControlLabel
                onChange={() => handleChange()}
                control={<MaterialUISwitch defaultChecked={mode} />}
                sx={{ marginLeft: 0 }}
              />
              <div>
                <ModeStandbyIcon className="fs-3 header-text" />
              </div>
              <div className="position-relative">
                <NotificationsNoneIcon
                  className="fs-3 cursor-pointer header-text"
                  onClick={(event) => handleClickN(event)}
                />
                {!status?.seen && (
                  <span
                    className="position-absolute badge translate-middle p-1 bg-danger border border-light rounded-circle"
                    style={{ marginLeft: '-4px' }}
                  >
                    <span className="visually-hidden">New alerts</span>
                  </span>
                )}
              </div>
              <div>
                <IconButton sx={{ p: 0 }}>
                  <Avatar
                    src={user?.profileImageUrl}
                    sx={{ width: 30, height: 30 }}
                  />
                </IconButton>
              </div>
            </div>
          </Typography>
          <div className="nav-user">
            <div
              className="btn"
              onClick={(e) => handleClick(e)}
              style={{ width: 'max-content', display: 'flex' }}
            >
              <span className="nav-username">
                {user?.fullName ? (
                  user?.fullName
                ) : (
                  <Skeleton width={100} height={25}>
                    <Typography>.</Typography>
                  </Skeleton>
                )}
              </span>
              <img src={DownArrow} className="px-1" />
            </div>
            <Popover
              open={openProfile}
              anchorEl={anchorE2}
              onClose={handleCloseP}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
            >
              <Typography
                sx={{ p: 1, width: '150px', cursor: 'pointer' }}
                onClick={() => handleOpenProfile()}
              >
                Edit Profile
              </Typography>
              <Divider />
              <Typography
                sx={{ p: 1, width: '150px', cursor: 'pointer' }}
                onClick={() => dispatch(logout())}
              >
                Log Out
              </Typography>
            </Popover>

            {/* <ul className="dropdown-menu" style={{ textAlign: 'start' }}>
              <li>
                <a
                  className="dropdown-item cursor-pointer"
                  onClick={() => handleOpenProfile()}
                >
                  Edit User
                </a>
              </li>
              <div className="dropdown-divider mt-2 mb-1"></div>
              <li>
                <a
                  className="dropdown-item cursor-pointer"
                  onClick={() => dispatch(logout())}
                >
                  Log Out
                </a>
              </li>
            </ul> */}
          </div>
        </Toolbar>
        {profileOpen && (
          <ProfileSidebar
            setProfileOpen={setProfileOpen}
            profileOpen={profileOpen}
            defaultAgency={defaultAgency}
            agencyName={agencyName}
            handleOpenAgency={handleOpenAgency}
            file={file}
            setFile={setFile}
            handleOpenProfileModal={handleOpenProfileModal}
          />
        )}

        <LeaveAgencyModal
          openAgency={openAgency}
          handleCloseAgency={handleCloseAgency}
          deleteAgency={deleteAgency}
          name={agencyName}
        />

        <RemoveProfileModal
          profileModal={profileModal}
          handleCloseProfileModal={handleCloseProfileModal}
          setFile={setFile}
        />
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          className="draw-width"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          onClick={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box'
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              zIndex: 0
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {open && (
        <ActiveUserModal
          anchorEl={anchorEl}
          openU={openU}
          open={open}
          handleClose={handleClose}
          users={users}
        />
      )}
      {openNotification && (
        <Notification
          id={id}
          anchorEl={anchorElN}
          open={openN}
          handleClose={handleCloseN}
        />
      )}
      <PopupModal
        url="https://calendly.com/du_swayy"
        // pageSettings={this.props.pageSettings}
        // utm={this.props.utm}
        // prefill={this.props.prefill}
        onModalClose={() => setOpenCalendly(false)}
        open={openCalendly}
        styles={{
          height: '10px'
        }}
        /*
         * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
         * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
         */
        rootElement={document.getElementById('root')}
      />
    </Box>
  );
}

export default MainLayout;
