// import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import './UserPermission.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SlClose } from 'react-icons/sl';
import {
  Avatar,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import User from '../../Images/user_plus2.svg';
import CheckGray from '../../Images/circle_check-gray.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  agencyUsers,
  deleteInvite,
  disableAgencyRole,
  enableAgencyRole,
  getAgencyRoles,
  sendInvite,
  updateAgencyInfo,
  userInvite,
  userProfile
} from '../../Redux/Actions/AgencyAction';
import CheckGreen from '../../Images/circle_check-green.svg';
import Input from '../../components/input/Input';
import MultiSelectField from '../../components/input/MultiSelectField';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const UserPermission = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [dropdownId, setDropdownId] = useState('');

  const [invitedata, setInvitedata] = useState([]);
  const [agencyData, setAgencyData] = useState([]);
  const [roles, setRoles] = useState({});

  const changes = useSelector((state) => state.Agency.agencyChange);
  const invitedatas = useSelector((state) => state.Agency.userInvite);
  const agencyusers = useSelector((state) => state.Agency.agencyUsers);
  const agencyId = useSelector(
    (state) => state?.Agency?.user?.defaultAgency?.id
  );
  const agencyRoles = useSelector((state) => state?.Agency?.agencyRoles);

  const [id, setId] = useState();

  useEffect(() => {
    setId(agencyId);
  }, [agencyId]);

  const dispatch = useDispatch();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    dispatch(userInvite());
    dispatch(userProfile());
    dispatch(getAgencyRoles());
  }, [changes]);

  useEffect(() => {
    if (id) {
      dispatch(agencyUsers(id));
    }
  }, [id]);

  useEffect(() => {
    setInvitedata(invitedatas);
  }, [invitedatas]);

  useEffect(() => {
    setAgencyData(agencyusers);
  }, [agencyusers]);

  const Invites = Object.values(invitedata).filter(
    (e) => e.status !== 'DELETED'
  );

  const handleSubmit = () => {
    dispatch(sendInvite({ email: email }));
    setModalVisible(false);
    setEmail('');
  };

  const handleDelete = (id) => {
    dispatch(deleteInvite(id)).then(() => {
      dispatch(userInvite());
    });
  };

  const handleAgencyRole = (agencyId, userId, enabled, role, index) => {
    let dataValue = JSON.parse(JSON.stringify(agencyData));
    const roles = agencyRoles?.filter((e) => e.name === role);
    if (enabled) {
      dataValue[index].enabled = false;
      setAgencyData(dataValue);
      dispatch(disableAgencyRole(agencyId, userId, roles[0]?.code));
    } else {
      dataValue[index].enabled = true;
      setAgencyData(dataValue);
      dispatch(enableAgencyRole(agencyId, userId, roles[0]?.code));
    }
  };

  const updateAgencyRole = (agencyId, userId, role) => {
    dispatch(enableAgencyRole(agencyId, userId, role)).then(() => {
      dispatch(agencyUsers(id));
    });
    setDropdown(false);
  };

  const handleDropdown = (id) => {
    setDropdown(!dropdown);
    setDropdownId(id);
  };

  const handleChange = (event, roleIndex, enable) => {
    const {
      target: { value }
    } = event;

    const obj = {
      ...roles,
      [roleIndex]: typeof value === 'string' ? value.split(',') : value
    };

    const payload = obj?.[roleIndex]?.map((e) => {
      return {
        role: e,
        enabled: enable
      };
    });

    // If checked, add the role code to the state; otherwise, remove it
    setRoles(() => ({
      ...roles,
      [roleIndex]: typeof value === 'string' ? value.split(',') : value
    }));
  };

  useEffect(() => {
    agencyData?.map((e, index) => {
      setRoles(() => ({
        ...roles,
        [index]:
          typeof e?.agenciesRoles === 'string'
            ? e?.agenciesRoles.split(',')
            : e?.agenciesRoles
      }));
    });
  }, [agencyData]);

  return (
    <>
      <div className="mt-5 w-100 mainper px-4 m-auto position-relative">
        <div className="d-flex justify-content-between">
          <div style={{ paddingTop: 70 }} className="">
            <p className="user-title">Users</p>
          </div>
          <div
            style={{ paddingTop: 70 }}
            className="d-flex justify-content-evenly align-items-center"
          >
            <button onClick={toggleModal} className="addmember-btn">
              <img src={User} className="mx-1" /> Add Member
            </button>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align="center"
                  style={{ borderBottom: 'none' }}
                >
                  Email
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ borderBottom: 'none' }}
                >
                  Name
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ borderBottom: 'none' }}
                >
                  Role
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ borderBottom: 'none' }}
                >
                  Enabled
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agencyData?.length > 0 &&
                agencyData?.map((data, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell
                        align="left"
                        width="15%"
                        style={{ borderBottom: 'none' }}
                      >
                        <div className="d-flex align-items-center justify-content-start">
                          <Avatar
                            alt="Remy Sharp"
                            src={data.profileImageUrl}
                            className="mx-3"
                            sx={{ width: 24, height: 24 }}
                          />
                          {data.email}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        onClick={() => setDropdown(false)}
                      >
                        {data.fullName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <>
                          <FormControl sx={{ width: 200 }}>
                            <MultiSelectField
                              multiple
                              value={roles?.[index] || []}
                              onChange={(e) =>
                                handleChange(e, index, data.enabled)
                              }
                              renderValue={(selected) =>
                                selected
                                  .map((value) => {
                                    const selectedRole = agencyRoles.find(
                                      (role) => role.code === value
                                    );
                                    return selectedRole
                                      ? selectedRole.name
                                      : '';
                                  })
                                  .join(', ')
                              }
                              size="small"
                              label="Roles"
                              className="w-100"
                            >
                              {agencyRoles.map((role, i) => (
                                <MenuItem key={role.code} value={role.code}>
                                  <Checkbox
                                    checked={
                                      roles?.[index]?.indexOf(role.code) > -1
                                    }
                                    onChange={(e) => handleChange(e, i)}
                                  />
                                  <ListItemText primary={role.name} />
                                </MenuItem>
                              ))}
                            </MultiSelectField>
                          </FormControl>
                        </>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <div className="form-check d-flex align-items-center justify-content-center">
                          <input
                            className="table-check form-check-input cursor-pointer"
                            type="checkbox"
                            checked={data.enabled}
                            id="flexCheckDefault"
                            onChange={() =>
                              handleAgencyRole(
                                data?.agencyId,
                                data?.id,
                                data?.enabled,
                                data?.agenciesRoles,
                                index
                              )
                            }
                          />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <MoreVertIcon className="cursor-pointer" />
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <div>
          <div style={{ paddingTop: 70 }} className="">
            <p className="user-title">Invitations</p>
          </div>
          {Invites?.length === 0 ? (
            <p>No Invitations Found</p>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell className="border-remove">
                      Email
                    </StyledTableCell>
                    <StyledTableCell align="left" className="border-remove">
                      Code
                    </StyledTableCell>
                    <StyledTableCell align="left" className="border-remove">
                      Status
                    </StyledTableCell>
                    <StyledTableCell align="left" className="border-remove">
                      Cancel
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Invites.length > 0 &&
                    Invites.map((data, index) => {
                      return (
                        <StyledTableRow key={index}>
                          <StyledTableCell className="border-remove">
                            {data.email}
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            className="border-remove"
                          >
                            {data?.agencyId}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="border-remove"
                          >
                            <div className="d-flex align-items-start justify-content-start px-2">
                              {data.status == 'SENT' ? (
                                <img src={CheckGreen} />
                              ) : (
                                <img src={CheckGray} />
                              )}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            className="border-remove"
                          >
                            <SlClose
                              onClick={() => handleDelete(data.id)}
                              className="fs-6 mx-3 cursor-pointer"
                              style={{ color: '#9A9A9A' }}
                            />
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            className="border-remove"
                          ></StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {modalVisible && (
            <div className="">
              <div className="model-main">
                <div className="modal-new">
                  <div
                    className="modal-content-new"
                    style={{ marginTop: '-100px' }}
                  >
                    <div>
                      <div className="">
                        <div className="mx-4">
                          <div className="mb-3 mt-4">
                            <Input
                              type="email"
                              className="w-100"
                              label="Email"
                              size="small"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="d-flex justify-content-between mt-4 mb-3 mx-2">
                          <div className="d-flex justify-content-evenly">
                            <button
                              className="cancel-btn mx-2"
                              onClick={toggleModal}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSubmit}
                              className="modal-connected-btn"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPermission;
