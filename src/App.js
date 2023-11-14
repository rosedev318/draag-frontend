import './App.css';
import Signup from './pages/SignUp/Signup';
import ForgetPassword from './pages/SignUp/ForgetPassword';
import PasswordSend from './pages/SignUp/PasswordSend';
import Login from './pages/Login/Login';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
// import Analytics from './pages/Analytics';
import Integration from './pages/Integration';
import LoginwithEmail from './pages/Login/LoginwithEmail';
import SignupConfirm from './pages/SignUp/SignupConfirm';
import useScrollTop from './useScrollTop';
import MainLayout from './pages/Layout/MainLayout';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PasswordReset from './pages/SignUp/PasswordReset';
import SignupSuccess from './pages/SignUp/SignupSuccess';
import CreateTeams from './pages/Teams/CreateTeams';
import Join from './pages/Teams/Join';
import Teams from './pages/Teams/Teams';
import Userform from './pages/Profile/Userform';
import Bio from './pages/Profile/Bio';
import Document from './pages/Profile/Document';
import UserPermission from './pages/Profile/UserPermission';
import Candidates from './pages/Profile/Candidates';
import Clients from './pages/Profile/Clients';
import PendingTeam from './pages/Teams/PendingTeam';
import Profile from './pages/Profile/Profile';
import Analytics from './pages/Analytics';
import Card from './components/Analytics/Card';
import { userAgency } from './Redux/Actions/AgencyAction';
import Jobform from './pages/Profile/Jobform';
import OneSignal from 'react-onesignal';
import runOneSignal from './constants/OneSignal';
import axios from 'axios';
import Help from './pages/Help';

function App() {
  useScrollTop();

  const [token, setToken] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [screenOpen, setScreenOpen] = useState(true);
  const [drawerWidth, setDrawerWidth] = useState(90);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const tokenVal = localStorage.getItem('authtoken');
  const userId = localStorage.getItem('userid');
  const [openCalendly, setOpenCalendly] = useState(false);
  const currentToken = useSelector((state) => state?.Auth?.user?.token);
  const isSignIn = useSelector((state) => state.Auth.regiserSuccess);
  const theme = document.querySelector('html');
  const [mode, setMode] = useState(
    localStorage.getItem('mode') === 'light' ? false : true
  );

  const handleDrawerWidth = () => {
    setScreenOpen(!screenOpen);
    setDrawerWidth(screenOpen ? 270 : 90);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    let mode = localStorage.getItem('mode');

    if (!mode) {
      theme.setAttribute('data-theme', 'light');
      localStorage.setItem('mode', 'light');
      setMode(false);
    } else if (mode === 'light') {
      theme.setAttribute('data-theme', 'light');
      localStorage.setItem('mode', 'light');
      setMode(false);
    } else if (mode === 'dark') {
      theme.setAttribute('data-theme', 'dark');
      localStorage.setItem('mode', 'dark');
      setMode(true);
    }
  }, []);

  const handleChange = () => {
    let mode = localStorage.getItem('mode');

    if (mode === 'light') {
      theme.setAttribute('data-theme', 'dark');
      localStorage.setItem('mode', 'dark');
      setMode(true);
    } else {
      theme.setAttribute('data-theme', 'light');
      localStorage.setItem('mode', 'light');
      setMode(false);
    }
  };

  useEffect(() => {
    if (tokenVal) {
      window.notify(userId);
    }
  }, [tokenVal]);

  useEffect(() => {
    if (currentToken) {
      setToken(currentToken);
    }
  }, [currentToken]);

  useEffect(() => {
    window.addEventListener('storage', () => {
      const tokenvalue = localStorage.getItem('authtoken');
      setToken(tokenvalue);
    });
    const tokenvalue = localStorage.getItem('authtoken');
    setToken(tokenvalue);
  }, []);

  useEffect(() => {
    if (isSignIn) {
      navigate('/signupconfirm');
    }
  }, [token, isSignIn]);

  const agencyuser = useSelector((state) => state?.Agency?.agencyUser);

  useEffect(() => {
    if (tokenVal) {
      dispatch(userAgency());
    }
  }, [tokenVal]);

  useEffect(() => {
    if (tokenVal && agencyuser) {
      const redirectToJoinTeam = agencyuser
        .map((e) => e.roles)
        .flat()
        .find((e) => e.enabled);

      if (!redirectToJoinTeam) {
        if (pathname == '/pendingteam') {
          navigate('/pendingteam');
        } else if (pathname == '/teams') {
          navigate('/teams');
        } else {
          navigate('/jointeam');
        }
      }
      // else if (agencyuser?.length === 0) {
      //   if (pathname == '/pendingteam') {
      //     navigate('/pendingteam');
      //   } else {
      //     navigate('/jointeam');
      //   }
      // }
    }
  }, [agencyuser]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     if (agencyuser) {
  //       if (agencyuser?.length === 0) {
  //         navigate('/jointeam');
  //       } else {
  //         if (pathname === '/jointeam') {
  //           navigate('/');
  //         } else {
  //           navigate(`${pathname}`);
  //         }
  //       }
  //     }
  //   }
  // }, [agencyuser]);

  const hideMainLayout = [
    '/teams',
    '/createteam',
    '/jointeam',
    '/pendingteam'
  ].includes(pathname);

  return tokenVal ? (
    <>
      <Box sx={{ display: 'flex' }} className="MainBox">
        <ToastContainer />
        {hideMainLayout ? null : (
          <MainLayout
            handleDrawerWidth={handleDrawerWidth}
            handleDrawerToggle={handleDrawerToggle}
            screenOpen={screenOpen}
            mobileOpen={mobileOpen}
            drawerWidth={drawerWidth}
            setOpenCalendly={setOpenCalendly}
            openCalendly={openCalendly}
            handleChange={handleChange}
            mode={mode}
          />
        )}
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Dashboard setOpenCalendly={setOpenCalendly} mode={mode} />
            }
          />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/card" element={<Card />} />
          <Route
            path="/integration"
            element={<Integration drawerWidth={drawerWidth} />}
          />
          <Route
            path="/userdetail"
            element={<Userform screenOpen={screenOpen} />}
          />
          <Route path="/bio" element={<Bio screenOpen={screenOpen} />} />
          <Route path="/docs" element={<Document screenOpen={screenOpen} />} />
          <Route path="/permission" element={<UserPermission />} />
          <Route
            path="/candidate"
            element={<Candidates screenOpen={screenOpen} />}
          />
          <Route path="/jobdetail" element={<Jobform />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </Box>
      <Routes>
        <Route path="/jointeam" element={<Join />} />
        <Route path="/createteam" element={<CreateTeams />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/pendingteam" element={<PendingTeam />} />
      </Routes>
    </>
  ) : (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/passwordsend" element={<PasswordSend />} />
        <Route
          path="/users/forgotPassword/confirm/:code"
          element={<PasswordReset />}
        />
        <Route path="/loginwithemail" element={<LoginwithEmail />} />
        <Route path="/signupconfirm" element={<SignupConfirm />} />
        {/* <Route path="/signupsuccess" element={<SignupSuccess />} /> */}
        <Route
          path="/users/register/confirm/:token"
          element={<SignupSuccess />}
        />
      </Routes>
    </>
  );
}

export default App;

// {
//   "username": "db.prodevinfo@gmail.com",
//   "password": "12345678"
// }
// {
//   "username": "hardikbhimani.software@gmail.com",
//   "password": "Qwerty123@"
// }

// AGENCY_ADMIN: agency owner
// AGENCY_USER: Recruiter
// EARNING_VIEWER: Accounts
