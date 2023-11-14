import React from 'react';
import { BiAddToQueue, BiBarChart, BiIdCard } from 'react-icons/bi';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { RiHome2Fill, RiLogoutBoxRLine } from 'react-icons/ri';
import { userProfile } from '../../Redux/Actions/AgencyAction';
import { useSelector } from 'react-redux';
import Calendly from '../../Images/Notification/calendar_plus_light.svg';

export const Menus = [
  {
    name: 'Home',
    icon: <RiHome2Fill className="fs-5" />,
    path: '/'
  },
  {
    name: 'Analytics',
    icon: <BarChartIcon className="fs-5" />,
    path: '/analytics',
    divider: true
  },
  // {
  //   name: 'Real-Time',
  //   icon: <VisibilityOutlinedIcon className="fs-5" />,
  //   path: '/realtime'
  // },
  {
    name: 'Candidates',
    icon: <BiIdCard className="fs-5" />,
    path: '/candidate'
  },
  { name: 'Jobs', icon: <BiAddToQueue className="fs-5" />, path: '/clients' },
  {
    name: 'Shedule',
    icon: <CalendarMonthOutlinedIcon className="fs-5" />,
    path: '/shedule'
  },
  // {
  //   name: 'Analytics',
  //   icon: <BiBarChart className="fs-5" />,
  //   path: '/analytic'
  // },
  {
    name: 'Mass Message',
    icon: <RecordVoiceOverOutlinedIcon className="fs-5" />,
    path: '/message'
  },
  {
    name: 'Team',
    icon: <PersonAddAltOutlinedIcon className="fs-5" />,
    path: '/permission'
  },
  {
    name: 'Calendly',
    icon: (
      <img
        src={Calendly}
        style={{
          height: '20px',
          width: '20px',
          color: 'white',
          marginLeft: '-1px'
        }}
      />
    ),
    path: ''
  },
  {
    name: 'Join / Create Agency',
    icon: <GroupsOutlinedIcon className="fs-5" />,
    path: '/jointeam'
  },
  {
    name: 'Integration',
    icon: <InsertLinkOutlinedIcon className="fs-5" />,
    path: '/integration',
    divider2: true
  },
  {
    name: 'Help',
    icon: <FlagOutlinedIcon className="fs-5" />,
    path: '/help'
  },
  {
    name: 'Log Out',
    icon: <RiLogoutBoxRLine className="fs-5" />,
    path: '/logout'
  }
];
