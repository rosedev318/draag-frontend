import React, { useState, useEffect, useRef } from 'react';
import '../Profile/Candidates.css';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Modal,
  Popover,
  Tooltip,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Checkbox from '@mui/material/Checkbox';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import { BiCheckboxSquare } from 'react-icons/bi';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import MuiCheckbox from '@mui/material/Checkbox';
import { BiCheckbox, BiCheckboxSquare } from 'react-icons/bi';
import { Form, useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  Ratings,
  getCandidate,
  getPositions,
  getStatuses,
  getTemplates,
  sendMessages,
  Filters,
  deleteNanny,
  deleteAllNanny,
  getWorks,
  getLivings,
  getQuaSkills,
  hightlightNannies
} from '../../Redux/Actions/NanniesAction';
import Input from '../../components/input/Input';
import SelectField from '../../components/input/SelectField';
import message from '../../constants/message';
import Filter from '../../components/Filters/Filter';
// import Paginations from '../../components/pagination/Paginations';
import UserPlus from '../../Images/user_plus.svg';
import Paginations from '../../components/pagination/Paginations';
import CheckGray from '../../Images/circle_check-gray.svg';
import CheckGreen from '../../Images/circle_check-green.svg';
import { nanniesUpdateForm } from '../../Redux/Actions/NanniesAction';
import StatusDot from '../../components/status/StatusDot';
import gender from '../../constants/gender';

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
const imageUrl =
  'https://cdn.respond.io/platform/web/assets/static/images/placeholders/whatsapp-bg.png';

function Checkbox({ label, checked, onChange }) {
  return (
    <FormControlLabel
      label={label}
      control={
        <MuiCheckbox
          // icon={icon}
          // checkedIcon={checkedIcon}
          icon={<BiCheckbox className="fs-4" />}
          checkedIcon={<BiCheckboxSquare color="#15C269" className="fs-4" />}
          checked={checked}
          onChange={onChange}
        />
      }
    />
  );
}

// modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '5px'
};

function Candidates() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    status: '',
    postcode: '',
    notes: '',
    area: '',
    works: [],
    livings: [],
    skills: [],
    positions: [],
    gender: []
  };
  const [formValues, setFormValues] = useState(initialValues);

  // table pagination state and functions
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(15);
  const [textValue, setTextValue] = useState('');

  const [starClicked, setStarClicked] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState([]);
  const [candidate, setCandidate] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [template, setTemplate] = useState([]);
  const [mobile, setMobile] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState({ filters: [], sorts: [] });
  const [anchorEl, setAnchorEl] = useState(null);
  // delete modal
  const [openM, setOpenM] = useState(false);
  const [id, setId] = useState('');

  const loading = useSelector((state) => state.Nannies.loading);
  const Templates = useSelector((state) => state.Nannies.templates);
  const totalElement = useSelector(
    (state) => state.Nannies.nannies.totalElements
  );
  const candidateData = useSelector((state) => state.Nannies.nannies.content);
  const ratings = useSelector((state) => state.Nannies.ratings);
  const statuses = useSelector((state) => state.Nannies.statuses);
  const positions = useSelector((state) => state.Nannies.positions);
  const works = useSelector((state) => state.Nannies.works);
  const livings = useSelector((state) => state.Nannies.livings);
  const skills = useSelector((state) => state.Nannies.qskills);
  const changes = useSelector((state) => state.Agency.agencyChange);

  const counter = Math.ceil(totalElement / size);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (candidateData) {
      setCandidate(candidateData);
    }
  }, [candidateData]);

  useEffect(() => {
    if (filter.filters?.length > 0 || filter.sorts?.length > 0) {
      dispatch(Filters({ ...filter, page: page - 1, size }));
    } else {
      dispatch(getCandidate(size, page - 1));
    }
  }, [size, page, changes]);

  useEffect(() => {
    dispatch(Ratings());
    dispatch(getStatuses());
    dispatch(getPositions());
    dispatch(getWorks());
    dispatch(getLivings());
    dispatch(getQuaSkills());
  }, [changes]);

  const handleStatus = (id, value) => {
    const form = new FormData();
    form.append('status', value);
    dispatch(nanniesUpdateForm(id, form)).then(() => {
      if (filter.filters?.length > 0 || filter.sorts?.length > 0) {
        dispatch(Filters({ ...filter, page: page - 1, size }));
      } else {
        dispatch(getCandidate(size, page - 1));
      }
    });
  };

  // pagination
  const getDatas = (page) => {
    setPage(page + 1);
  };

  const getPrevData = (page) => {
    setPage(page - 1);
  };

  const getFirstData = (page) => {
    setPage(page - page + 1);
  };

  const getLastData = () => {
    setPage(counter);
  };

  const pageperRows = (size) => {
    setSize(size);
  };

  // input text whatsapp compaign function
  function handleTextChange(event) {
    if (event.key === 'Enter') {
      setTextValue(event.target.value + '/n');
    } else {
      setTextValue(event.target.value);
    }
  }

  // input select job whatsapp compaign function
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // select all checkbox function
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = candidate.map((row) => row.id);
      setSelected(newSelected);
      setSelectAll(true);
    } else {
      setSelected([]);
      setSelectAll(false);
    }
  };

  // select checkbox one by one function
  const handleSelect = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    setSelectAll(newSelected.length === candidate.length);
  };

  // select star(highlight) function
  const handleStarClick = (id) => {
    const selectedIndex = starClicked.indexOf(id);
    let newStarClicked = [];

    if (selectedIndex === -1) {
      newStarClicked = newStarClicked.concat(starClicked, id);
    } else if (selectedIndex === 0) {
      newStarClicked = newStarClicked.concat(starClicked.slice(1));
    } else if (selectedIndex === starClicked.length - 1) {
      newStarClicked = newStarClicked.concat(starClicked.slice(0, -1));
    } else if (selectedIndex > 0) {
      newStarClicked = newStarClicked.concat(
        starClicked.slice(0, selectedIndex),
        starClicked.slice(selectedIndex + 1)
      );
    }

    setStarClicked(newStarClicked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // candidate table header
  const tablehead = [
    {
      name: 'Candidate'
    },
    {
      name: 'Age'
    },
    {
      name: 'Postcode'
    },
    {
      name: 'Rating'
    },
    {
      name: 'Position'
    },
    {
      name: 'Status'
    },
    {
      name: 'Work Type'
    },
    {
      name: 'Joined'
    },
    {
      name: 'CV'
    },
    {
      name: 'Mobile'
    },
    {
      name: 'Highlight'
    },
    { name: 'Lead' }
  ];

  // broadcast history table header
  const broadcast = [
    {
      name: 'Content/template	'
    },
    {
      name: 'Status'
    },
    {
      name: 'Sender'
    },
    {
      name: 'Total recipients	'
    },
    {
      name: 'Date/time'
    }
  ];

  // Mass Messages
  useEffect(() => {
    dispatch(getTemplates());
  }, []);

  useEffect(() => {
    setTemplate(Templates);
  }, [Templates]);

  const handleMessage = () => {
    const form = new FormData();

    form.append('nannyIds', 'c85531ba-9dcd-4dc7-9f9f-f5fda516cf05');
    form.append('phoneNumbers', mobile);
    // form.append('template');
    // form.append('jobId');
    // form.append('text');
    // form.append('imageFile');
    dispatch(sendMessages(form));
  };

  // filter function
  const handleFilter = (e) => {
    const { name, value, type } = e.target;

    if (type == 'checkbox') {
      const { name, checked, value } = e.target;
      // console.log('check', name, checked, value);
      let workArr = [...formValues.works];
      let livingArr = [...formValues.livings];
      let skillArr = [...formValues.skills];
      let positionArr = [...formValues.positions];
      let genderArr = [...formValues.gender];

      if (name == 'works') {
        if (checked) {
          workArr.push(value);
        } else {
          workArr = workArr.filter((val) => val !== value);
        }
        setFormValues({
          ...formValues,
          works: workArr
        });

        const newWork = workArr.map((e) => e.toLowerCase());

        let obj = {
          key: 'works',
          operator: 'like_any',
          values: newWork,
          fieldType: 'String'
        };

        let newFilter = filter.filters;
        const index = newFilter.findIndex((o1) => o1.key == obj.key);
        if (index !== -1) {
          newFilter.splice(index, 1);
        }
        if (obj.values.length > 0) {
          newFilter.push(obj);
          setFilter({ ...filter, filters: newFilter });
        }
      }
      if (name == 'livings') {
        if (checked) {
          livingArr.push(value);
        } else {
          livingArr = livingArr.filter((val) => val !== value);
        }
        setFormValues({
          ...formValues,
          livings: livingArr
        });

        const newLiving = livingArr.map((e) => e.toLowerCase());

        let obj = {
          key: 'livings',
          operator: 'like_any',
          values: newLiving,
          fieldType: 'String'
        };

        let newFilter = filter.filters;
        const index = newFilter.findIndex((o1) => o1.key == obj.key);
        if (index !== -1) {
          newFilter.splice(index, 1);
        }
        if (obj.values.length > 0) {
          newFilter.push(obj);
          setFilter({ ...filter, filters: newFilter });
        }
      }
      if (name == 'skills') {
        if (checked) {
          skillArr.push(value);
        } else {
          skillArr = skillArr.filter((val) => val !== value);
        }
        setFormValues({
          ...formValues,
          skills: skillArr
        });

        const newSkill = skillArr.map((e) => e.toLowerCase());

        let obj = {
          key: 'qualified_skills',
          operator: 'like_any',
          values: newSkill,
          fieldType: 'String'
        };

        let newFilter = filter.filters;
        const index = newFilter.findIndex((o1) => o1.key == obj.key);
        if (index !== -1) {
          newFilter.splice(index, 1);
        }
        if (obj.values.length > 0) {
          newFilter.push(obj);
          setFilter({ ...filter, filters: newFilter });
        }
      }
      if (name == 'positions') {
        if (checked) {
          positionArr.push(value);
        } else {
          positionArr = positionArr.filter((val) => val !== value);
        }
        setFormValues({
          ...formValues,
          positions: positionArr
        });

        const newPosition = positionArr.map((e) => e.toLowerCase());

        let obj = {
          key: 'positions',
          operator: 'like_any',
          values: newPosition,
          fieldType: 'String'
        };

        let newFilter = filter.filters;
        const index = newFilter.findIndex((o1) => o1.key == obj.key);
        if (index !== -1) {
          newFilter.splice(index, 1);
        }
        if (obj.values.length > 0) {
          newFilter.push(obj);
          setFilter({ ...filter, filters: newFilter });
        }
      }
      if (name == 'gender') {
        if (checked) {
          genderArr.push(value);
        } else {
          genderArr = genderArr.filter((val) => val !== value);
        }
        setFormValues({
          ...formValues,
          gender: genderArr
        });

        const newGender = genderArr.map((e) => e.toUpperCase());

        let obj = {
          key: 'sex',
          operator: 'in',
          values: newGender,
          fieldType: 'String'
        };

        let newFilter = filter.filters;
        const index = newFilter.findIndex((o1) => o1.key == obj.key);
        if (index !== -1) {
          newFilter.splice(index, 1);
        }
        if (obj.values.length > 0) {
          newFilter.push(obj);
          setFilter({ ...filter, filters: newFilter });
        }
      }
    }

    if (name == 'status') {
      setFormValues({ ...formValues, status: value });

      let obj = {
        key: 'status',
        operator: 'equal',
        value: value,
        fieldType: 'String'
      };

      let newFilter = filter.filters;
      const index = newFilter.findIndex((o1) => o1.key == obj.key);
      if (index !== -1) {
        newFilter.splice(index, 1);
      }
      newFilter.push(obj);
      setFilter({ ...filter, filters: newFilter });
    }

    if (value == 'DESC') {
      let obj = {
        key: 'age',
        direction: value
      };

      let newFilter = filter.sorts;
      const index = newFilter.findIndex((o1) => o1.key == obj.key);
      if (index !== -1) {
        newFilter.splice(index, 1);
      }
      newFilter.push(obj);
      setFilter({ ...filter, sorts: newFilter });
    }

    if (name == 'name') {
      setFormValues({ ...formValues, name: value });

      let obj = {
        key: 'name',
        operator: 'like',
        value: value,
        fieldType: 'String'
      };

      let newFilter = filter.filters;
      const index = newFilter.findIndex((o1) => o1.key == obj.key);
      if (index !== -1) {
        newFilter.splice(index, 1);
      }
      newFilter.push(obj);
      setFilter({ ...filter, filters: newFilter });
    }

    if (name == 'postcode') {
      setFormValues({ ...formValues, postcode: value });

      let obj = {
        key: 'postcode',
        operator: 'near',
        value: value,
        fieldType: 'String'
      };

      let newFilter = filter.filters;
      const index = newFilter.findIndex((o1) => o1.key == obj.key);
      if (index !== -1) {
        newFilter.splice(index, 1);
      }
      newFilter.push(obj);
      setFilter({ ...filter, filters: newFilter });
    }

    if (name == 'notes') {
      setFormValues({ ...formValues, notes: value });

      let obj = {
        key: 'notes',
        operator: 'like',
        value: value,
        fieldType: 'String'
      };

      let newFilter = filter.filters;
      const index = newFilter.findIndex((o1) => o1.key == obj.key);
      if (index !== -1) {
        newFilter.splice(index, 1);
      }
      newFilter.push(obj);
      setFilter({ ...filter, filters: newFilter });
    }

    if (name == 'area') {
      setFormValues({ ...formValues, area: value });

      let obj = {
        key: 'area',
        operator: 'like',
        value: value,
        fieldType: 'String'
      };

      let newFilter = filter.filters;
      const index = newFilter.findIndex((o1) => o1.key == obj.key);
      if (index !== -1) {
        newFilter.splice(index, 1);
      }
      newFilter.push(obj);
      setFilter({ ...filter, filters: newFilter });
    }
  };

  const handleSearch = () => {
    if (filter.filters?.length > 0 || filter.sorts?.length > 0) {
      dispatch(Filters({ ...filter, page: page - 1, size }));
    }
  };

  const handleClear = () => {
    setFormValues(initialValues);
    setFilter({ filters: [], sorts: [] });
    dispatch(getCandidate(size, page - 1));
  };

  // delete small popover

  const handleClick = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setId(rowId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setAnchorEl(null);
    setOpenM(true);
  };

  const removeNanny = () => {
    handleCloseM();
    dispatch(deleteNanny(id, size, page - 1));
  };

  const handleCloseM = () => setOpenM(false);

  const multipleDeleteNanny = () => {
    dispatch(deleteAllNanny({ ids: selected }, size, page - 1, setSelectAll));
  };

  const handleHightlight = (row, index) => {
    const form = new FormData();
    let dataValue = JSON.parse(JSON.stringify(candidate));
    if (row.highlight) {
      dataValue[index].highlight = false;
      form.append('highlight', false);
    } else {
      dataValue[index].highlight = true;
      form.append('highlight', true);
    }
    setCandidate(dataValue);
    dispatch(hightlightNannies(row.id, form));
  };

  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <>
      <div
        style={{ paddingTop: 100, minWidth: '60%' }}
        className="w-100 m-auto px-3"
      >
        <div className="main-candidate mx-5">
          <p className="client-head">Candidates</p>
          <Filter
            candidate={candidate}
            status={statuses}
            position={positions}
            work={works}
            living={livings}
            skill={skills}
            gender={gender}
            filterOpen={filterOpen}
            handleFilter={handleFilter}
            handleSearch={handleSearch}
            deleteAll={multipleDeleteNanny}
            handleClear={handleClear}
            formValues={formValues}
            handleFilterOpen={handleFilterOpen}
          />
          <p className="candidate-num pt-5 pb-0">
            There are {totalElement} candidates{' '}
          </p>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table className="overfloX" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {tablehead.map((data, index) => {
                      return (
                        <StyledTableCell
                          key={index}
                          align="center"
                          className="table-head-text border-remove "
                        >
                          <div className="d-flex justify-content-center align-items-center ">
                            {data.name == 'Candidate' && (
                              <Checkbox
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon />}
                                onChange={handleSelectAll}
                                checked={selectAll}
                              />
                            )}
                            {data.name}
                          </div>
                        </StyledTableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {candidate &&
                    candidate.map((row, index) => {
                      const star = Object.values(ratings).filter(
                        (e) => e?.code === row?.rating
                      );
                      const rate =
                        star &&
                        star.map((e) => {
                          return e.displayText;
                        });
                      const rateIcon = rate[0]?.split(' ')[0];
                      const idp = open ? 'simple-popover' : undefined;
                      return (
                        <StyledTableRow
                          key={index}
                          selected={isSelected(row.id)}
                        >
                          <StyledTableCell className="border-remove">
                            <div className="d-flex table-cell-width">
                              <Checkbox
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon />}
                                checked={isSelected(row.id)}
                                onChange={() => handleSelect(row.id)}
                              />
                              <div
                                onClick={() =>
                                  navigate('/profile', {
                                    state: {
                                      id: row.id
                                    }
                                  })
                                }
                                style={{
                                  textDecoration: 'none',
                                  color: 'black',
                                  cursor: 'pointer'
                                }}
                              >
                                <div className="user-card">
                                  <div className="">
                                    <Avatar
                                      alt="Remy Sharp"
                                      sx={{ width: 40, height: 40 }}
                                      src={row.photo}
                                    />
                                  </div>
                                  <div>
                                    <div className="px-2 d-flex flex-column align-items-start user-text">
                                      <span className="username-text">
                                        {row.firstName}
                                      </span>
                                      <span className="userlocation-text">
                                        {row.city !== undefined &&
                                          row.city + ','}{' '}
                                        {row.area !== null && row.area}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="table-head-text border-remove "
                          >
                            {row.age}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="table-head-text border-remove "
                          >
                            <div className="table-cell-width">
                              {row.postcode}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="table-head-text border-remove "
                          >
                            <div className="table-cell-width">
                              <StarIcon
                                className="fs-6 "
                                style={{
                                  color: '#15C269',
                                  cursor: 'pointer'
                                }}
                              />
                              ({rateIcon})
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            style={{ width: '140px' }}
                            className="border-remove"
                          >
                            <div>
                              <div className="d-flex align-items-center justify-content-center">
                                {row?.positions &&
                                  row?.positions
                                    ?.slice(0, 1)
                                    .map((e, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className="d-flex align-items-center"
                                        >
                                          <div className="position-card">
                                            {e.name}
                                          </div>
                                        </div>
                                      );
                                    })}
                              </div>
                              <div className="d-flex align-items-center justify-content-center mt-1">
                                {row?.positions?.length > 1 && (
                                  <div className="more-position-card">
                                    +{row?.positions?.length - 1} More
                                  </div>
                                )}
                              </div>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="border-remove"
                          >
                            <div className="select-dropdown-status d-flex justify-content-center align-items-center">
                              <StatusDot status={row?.status?.name} />
                              <select
                                onChange={(e) =>
                                  handleStatus(row.id, e.target.value)
                                }
                              >
                                {statuses.length > 0 &&
                                  statuses.map((e, index) => {
                                    return (
                                      <option
                                        key={index}
                                        selected={e?.name == row?.status?.name}
                                        value={e?.code}
                                      >
                                        {e?.name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="border-remove"
                            style={{ width: '140px' }}
                          >
                            <div>
                              <div className="d-flex align-items-center justify-content-center">
                                {row?.works?.slice(0, 1).map((e, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="d-flex align-items-center justify-content-center"
                                    >
                                      <div className="position-card">
                                        {e?.name}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="d-flex align-items-center justify-content-center mt-1">
                                {row?.works?.length > 1 && (
                                  <div className="more-position-card">
                                    +{row?.works?.length - 1} More
                                  </div>
                                )}
                              </div>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            className="border-remove"
                            align="center"
                          >
                            <div className=" align-items-center justify-content-center table-cell-width">
                              <div className="align-items-center justify-content-center">
                                <span>
                                  {moment(row.createdAt).format('DD/MM/YY')}
                                </span>
                              </div>
                              <div>
                                <span className="time">
                                  {moment(row.createdAt).format('LT')}
                                </span>
                              </div>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className="border-remove">
                            <div className="d-flex align-items-center justify-content-center mt-0">
                              {row.cv === null ? (
                                <img src={CheckGray} />
                              ) : (
                                <img src={CheckGreen} />
                              )}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="border-remove"
                          >
                            <div className="d-flex flex-column align-items-center">
                              <span className="mobile-num">
                                {row.phoneNumber}
                              </span>
                              <span className="time">{row.email}</span>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="border-remove"
                          >
                            <div>
                              {row.highlight === true ? (
                                <StarIcon
                                  onClick={() => handleHightlight(row, index)}
                                  style={{
                                    color: '#297ADB',
                                    cursor: 'pointer',
                                    fontSize: '21px'
                                  }}
                                />
                              ) : (
                                <StarOutlineIcon
                                  onClick={() => handleHightlight(row, index)}
                                  style={{
                                    cursor: 'pointer',
                                    fontSize: '21px'
                                  }}
                                />
                              )}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell className="border-remove">
                            <Tooltip
                              arrow
                              title={row?.createdBy?.fullName}
                              className="cursor-pointer"
                            >
                              <Avatar
                                sx={{ height: 30, width: 30 }}
                                alt="Remy Sharp"
                                src={row?.createdBy?.profileImageUrl}
                              />
                            </Tooltip>
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            style={{ paddingLeft: 0 }}
                            className="border-remove"
                          >
                            <MoreVertIcon
                              style={{ fontSize: '21px', cursor: 'pointer' }}
                              onClick={(e) => handleClick(e, row.id)}
                            />
                            <Popover
                              id={idp}
                              open={open}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                              }}
                              style={{
                                boxShadow:
                                  '0px 3px 3px 3px RGBA(0, 0, 0, 0.1) !important'
                              }}
                            >
                              <Typography
                                key={row.id}
                                sx={{ p: 2 }}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleOpen()}
                              >
                                Delete
                              </Typography>
                            </Popover>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            {candidate?.length > 0 && (
              <Paginations
                count={counter}
                getData={getDatas}
                pageperRow={pageperRows}
                size={size}
                totalElement={totalElement}
                page={page}
                getPrevData={getPrevData}
                getFirstData={getFirstData}
                getLastData={getLastData}
              />
            )}
          </>
        )}

        <div style={{ paddingTop: '50px' }} className="main-candidate mx-5">
          <div>
            <div>
              <Accordion defaultExpanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ backgroundColor: 'white' }}
                >
                  <Typography className="broadcast-title">
                    Send WhatsApp Campaign
                  </Typography>
                </AccordionSummary>
                <div className="w-100 d-flex end-main">
                  <div className="end1" style={{ backgroundColor: 'white' }}>
                    <AccordionDetails>
                      <div className="mb-3">
                        <SelectField
                          className="w-100"
                          aria-label="Default select example"
                          label="Select a message template"
                          value={selectedOption}
                          onChange={handleChange}
                        >
                          {message?.map((key, index) => {
                            return (
                              <MenuItem key={index} value={key?.value}>
                                {key?.label}
                              </MenuItem>
                            );
                          })}
                        </SelectField>
                      </div>
                      <div className="mb-3">
                        <Input
                          type="text"
                          className="w-100"
                          id="exampleFormControlInput1"
                          label="Phone numbers (separate by comma)"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                      </div>
                      {selectedOption === 'available job' ? (
                        <>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label message-text"
                            >
                              Job
                            </label>
                            <select
                              className="form-select p-3 message-select"
                              aria-label="Default select example"
                            >
                              <option value="">Select a job</option>
                              <option value="nanny">nanny</option>
                            </select>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlTextarea1"
                              className="form-label message-text"
                            >
                              The text of your message
                            </label>
                            <textarea
                              value={textValue}
                              onChange={handleTextChange}
                              className="form-control input-color"
                              id="exampleFormControlTextarea1"
                              rows="5"
                            ></textarea>
                            <div className="mt-3 file-candi">
                              <input
                                type="file"
                                className="form-control p-3 message-select file-candi"
                              />
                            </div>
                          </div>
                        </>
                      )}
                      <div>
                        <p className="mt-4 ">
                          <span className="select-msg">0 Selected</span>{' '}
                          <span className="warn-msg">
                            {' '}
                            (Does not include numbers you have manually put)
                          </span>
                        </p>
                        <p className="mt-2 caution">
                          Caution: Bulk sending messages to contacts may trigger
                          WhatsApp's SPAM work. Make sure to follow WhatsApps
                          Community policy.
                        </p>
                        <div className="d-flex justify-content-end">
                          <button
                            onClick={() => handleMessage()}
                            className="text-white p-2 public-btn"
                            disabled={
                              textValue.length === 0 &&
                              selectedOption === '' &&
                              mobile?.length === 0
                            }
                          >
                            <img src={UserPlus} className="me-2 add-icon" />
                            {/* <PersonAddAlt1Icon className="me-2 add-icon" /> */}
                            Publish Broadcast
                          </button>
                        </div>
                      </div>
                    </AccordionDetails>
                  </div>
                  <div
                    className="end2 d-flex justify-content-center"
                    style={{ backgroundColor: 'white' }}
                  >
                    <div className="">
                      <p>What it will look like:</p>
                      <div className="">
                        <div className="">
                          <div className="whatsapp-mockup ml-lg-auto">
                            <div className="marvel-device iphone">
                              <div className="screen">
                                <div className="screen-container">
                                  <div className="chat">
                                    <div className="chat-container">
                                      <div className="user-bar pr-2 pb-1">
                                        <div className="back mr-4">
                                          <span
                                            aria-hidden="true"
                                            className="v-icon notranslate theme--light"
                                            style={{
                                              fontSize: '25px',
                                              height: '25px',
                                              width: '25px',
                                              color: 'rgb(0, 122, 255)',
                                              caretColor: 'rgb(0, 122, 255)'
                                            }}
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 24 24"
                                              role="img"
                                              aria-hidden="true"
                                              className="v-icon__svg"
                                              style={{
                                                fontSize: '25px',
                                                height: '25px',
                                                width: '25px',
                                                color: 'rgb(0, 122, 255)',
                                                caretColor: 'rgb(0, 122, 255)'
                                              }}
                                            >
                                              <path
                                                className="whatsapp-svg"
                                                d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
                                              ></path>
                                            </svg>
                                          </span>
                                        </div>
                                        <div className="avatar mr-2">
                                          <div className="wa-avatar white">
                                            <div className="v-image v-responsive theme--light wa-icon-container">
                                              <div
                                                className="v-responsive__sizer"
                                                style={{
                                                  paddingBottom: '100%'
                                                }}
                                              ></div>
                                              <div className="wa-image"></div>
                                              <div className="wa-responsive_content"></div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="name d-flex flex-row flex-wrap">
                                          <span
                                            className="caption font-weight-medium text-truncate"
                                            style={{ flex: '0 0 100%' }}
                                          >
                                            Draag
                                          </span>
                                          <span
                                            className="grey--text text--darken-1"
                                            style={{
                                              flex: ' 0 0 100%',
                                              fontSize: '10px'
                                            }}
                                          >
                                            Tap here for contact info
                                          </span>
                                        </div>
                                        <div className="actions">
                                          <span
                                            aria-hidden="true"
                                            className="v-icon notranslate theme--light"
                                            style={{
                                              fontSize: '22px',
                                              height: '22px',
                                              width: '22px',
                                              color: 'rgb(0, 122, 255)',
                                              caretColor: 'rgb(0, 122, 255)'
                                            }}
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 24 24"
                                              role="img"
                                              aria-hidden="true"
                                              className="v-icon__svg"
                                              style={{
                                                fontSize: '22px',
                                                height: '22px',
                                                width: '22px'
                                              }}
                                            >
                                              <path
                                                className="whatsapp-svg"
                                                d="M15,8V16H5V8H15M16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5V7A1,1 0 0,0 16,6Z"
                                              ></path>
                                            </svg>
                                          </span>
                                        </div>
                                        <div className="actions">
                                          <span
                                            aria-hidden="true"
                                            className="v-icon notranslate theme--light"
                                            style={{
                                              fontSize: '18px',
                                              height: '18px',
                                              width: '18px',
                                              color: 'rgb(0, 122, 255)',
                                              caretColor: 'rgb(0, 122, 255)'
                                            }}
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 24 24"
                                              role="img"
                                              aria-hidden="true"
                                              className="v-icon__svg"
                                              style={{
                                                fontSize: '18px',
                                                height: '18px',
                                                width: '18px'
                                              }}
                                            >
                                              <path
                                                className="whatsapp-svg"
                                                d="M20,15.5C18.8,15.5 17.5,15.3 16.4,14.9C16.3,14.9 16.2,14.9 16.1,14.9C15.8,14.9 15.6,15 15.4,15.2L13.2,17.4C10.4,15.9 8,13.6 6.6,10.8L8.8,8.6C9.1,8.3 9.2,7.9 9,7.6C8.7,6.5 8.5,5.2 8.5,4C8.5,3.5 8,3 7.5,3H4C3.5,3 3,3.5 3,4C3,13.4 10.6,21 20,21C20.5,21 21,20.5 21,20V16.5C21,16 20.5,15.5 20,15.5M5,5H6.5C6.6,5.9 6.8,6.8 7,7.6L5.8,8.8C5.4,7.6 5.1,6.3 5,5M19,19C17.7,18.9 16.4,18.6 15.2,18.2L16.4,17C17.2,17.2 18.1,17.4 19,17.4V19Z"
                                              ></path>
                                            </svg>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="conversation">
                                        <div
                                          className="conversation-container"
                                          style={{
                                            backgroundImage: `url(${imageUrl})`
                                          }}
                                        >
                                          <div className="conversation-sticky-time mx-auto mt-3 mb-2 caption-sm">
                                            <span id="date">
                                              {selectedOption
                                                ? moment().format('ddd, MMMM D')
                                                : textValue
                                                ? moment().format('ddd, MMMM D')
                                                : null}
                                            </span>
                                          </div>
                                          <div
                                            data-v-4e71a319=""
                                            className="template-message-layout"
                                          >
                                            <div
                                              data-v-4e71a319=""
                                              id="message-wrapper"
                                              className="message received elevation-1"
                                            >
                                              <div data-v-4e71a319=""></div>
                                              {selectedOption ===
                                              'available job' ? (
                                                <>
                                                  {template?.length > 0 &&
                                                    template.map((t, index) => {
                                                      return (
                                                        <React.Fragment
                                                          key={index}
                                                        >
                                                          <div
                                                            className="ewChatBubble"
                                                            style={{
                                                              marginLeft: 0
                                                            }}
                                                          >
                                                            <div className="template-message-layout">
                                                              <p>{t.name},</p>
                                                              <p>{t.content}</p>
                                                            </div>
                                                            <span>
                                                              {moment().format(
                                                                'LT'
                                                              )}
                                                            </span>
                                                          </div>
                                                          <div
                                                            id="quick-replies-container"
                                                            className="quick-replies-container pt-2"
                                                          >
                                                            {t.quickReplies &&
                                                              t.quickReplies.map(
                                                                (e, index) => {
                                                                  return (
                                                                    <div
                                                                      key={
                                                                        index
                                                                      }
                                                                      className="quick-reply"
                                                                    >
                                                                      <a className="quick-reply-content">
                                                                        {e}
                                                                      </a>
                                                                    </div>
                                                                  );
                                                                }
                                                              )}
                                                          </div>
                                                        </React.Fragment>
                                                      );
                                                    })}
                                                </>
                                              ) : (
                                                textValue !== '' && (
                                                  <>
                                                    <div className="ewChatBubble">
                                                      <p
                                                        style={{
                                                          whiteSpace: 'pre-wrap'
                                                        }}
                                                      >
                                                        {textValue}
                                                      </p>
                                                      <span>
                                                        {moment().format('LT')}
                                                      </span>
                                                    </div>
                                                  </>
                                                )
                                              )}

                                              <span
                                                data-v-4e71a319=""
                                                className="metadata"
                                              >
                                                <span
                                                  id="time"
                                                  className="time"
                                                ></span>
                                              </span>
                                            </div>
                                            <div
                                              id="quick-replies-wrapper"
                                              className="quick-replies-wrapper"
                                            >
                                              <div
                                                id="quick-replies-container"
                                                className="quick-replies-container"
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="conversation-compose ">
                                          <span
                                            aria-hidden="true"
                                            className="v-icon notranslate mx-1 theme--light"
                                            style={{
                                              fontSize: '25px',
                                              height: '25px',
                                              width: '25px',
                                              color: 'rgb(0, 122, 255)',
                                              caretColor: 'rgb(0, 122, 255)'
                                            }}
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 24 24"
                                              role="img"
                                              aria-hidden="true"
                                              className="v-icon__svg"
                                              style={{
                                                fontSize: '25px',
                                                height: '25px',
                                                width: '25px'
                                              }}
                                            >
                                              <path
                                                fill="rgb(0, 122, 255)"
                                                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                                              ></path>
                                            </svg>
                                          </span>
                                          <div className="v-input v-input--hide-details v-input--is-disabled theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined v-text-field--rounded">
                                            <div className="v-input__control">
                                              <div className="v-input__slot">
                                                <fieldset aria-hidden="true">
                                                  <legend>
                                                    <span className="notranslate"></span>
                                                  </legend>
                                                </fieldset>
                                                <div className="v-text-field__slot">
                                                  <input
                                                    disabled="disabled"
                                                    id="input-544"
                                                    type="text"
                                                    style={{
                                                      marginTop: '5px',
                                                      backgroundColor:
                                                        '#FFFFFF',
                                                      border: 'none'
                                                    }}
                                                  />
                                                </div>
                                                <div className="v-input__append-inner">
                                                  <span
                                                    aria-hidden="true"
                                                    className="v-icon notranslate theme--light"
                                                    style={{
                                                      fontSize: '16px',
                                                      height: '16px',
                                                      width: '16px',
                                                      color: 'rgb(0, 122, 255)',
                                                      caretColor:
                                                        'rgb(0, 122, 255)'
                                                    }}
                                                  ></span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="photo grow">
                                            <span
                                              aria-hidden="true"
                                              className="camera v-icon notranslate theme--light"
                                              style={{
                                                fontSize: '22px',
                                                height: '22px',
                                                width: '22px',
                                                color: 'rgb(0, 122, 255)',
                                                caretColor: 'rgb(0, 122, 255)'
                                              }}
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                role="img"
                                                aria-hidden="true"
                                                className="v-icon__svg"
                                                style={{
                                                  fontSize: '22px',
                                                  height: '22px',
                                                  width: '22px'
                                                }}
                                              >
                                                <path
                                                  className="whatsapp-svg"
                                                  d="M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z"
                                                ></path>
                                              </svg>
                                            </span>
                                            <span
                                              aria-hidden="true"
                                              className="microphone v-icon notranslate ml-2 mr-1 theme--light"
                                              style={{
                                                fontSize: '22px',
                                                height: '22px',
                                                width: '22px',
                                                color: 'rgb(0, 122, 255)',
                                                caretColor: 'rgb(0, 122, 255)'
                                              }}
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                role="img"
                                                aria-hidden="true"
                                                className="v-icon__svg"
                                                style={{
                                                  fontSize: '22px',
                                                  height: '22px',
                                                  width: '22px'
                                                }}
                                              >
                                                <path
                                                  className="whatsapp-svg"
                                                  d="M17.3,11C17.3,14 14.76,16.1 12,16.1C9.24,16.1 6.7,14 6.7,11H5C5,14.41 7.72,17.23 11,17.72V21H13V17.72C16.28,17.23 19,14.41 19,11M10.8,4.9C10.8,4.24 11.34,3.7 12,3.7C12.66,3.7 13.2,4.24 13.2,4.9L13.19,11.1C13.19,11.76 12.66,12.3 12,12.3C11.34,12.3 10.8,11.76 10.8,11.1M12,14A3,3 0 0,0 15,11V5A3,3 0 0,0 12,2A3,3 0 0,0 9,5V11A3,3 0 0,0 12,14Z"
                                                ></path>
                                              </svg>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion>
            </div>
          </div>
          <Accordion
            className="mt-5 mb-5"
            style={{ backgroundColor: 'transparent' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ backgroundColor: 'white' }}
            >
              <Typography className="broadcast-title">
                Broadcast history
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: 'white' }}>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 700 }}
                  className="overfloX"
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow>
                      {broadcast.map((data, index) => {
                        return (
                          <StyledTableCell
                            key={index}
                            align="center"
                            style={{ borderBottom: 'none' }}
                          >
                            {data.name}
                          </StyledTableCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell align="center" className="border-remove">
                        1
                      </StyledTableCell>
                      <StyledTableCell className=" border-remove">
                        <div className="d-flex align-items-center justify-content-center">
                          <img src={CheckGreen} />
                        </div>
                        {/* <div className="round">
                          <input type="checkbox" id="checkbox1" />
                          <label htmlFor="checkbox1"></label>
                        </div> */}
                      </StyledTableCell>
                      <StyledTableCell align="center" className="border-remove">
                        Rea Basister
                      </StyledTableCell>
                      <StyledTableCell align="center" className="border-remove">
                        23/70
                      </StyledTableCell>
                      <StyledTableCell align="center" className="border-remove">
                        24/11/23
                        <br />
                        <span className="time">09:45 AM</span>
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell align="center" className="border-remove">
                        2
                      </StyledTableCell>
                      <StyledTableCell className="border-remove">
                        <div className="d-flex align-items-center justify-content-center">
                          <img src={CheckGray} />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="center" className="border-remove">
                        Rea Basister
                      </StyledTableCell>
                      <StyledTableCell align="center" className="border-remove">
                        23/70
                      </StyledTableCell>
                      <StyledTableCell align="center" className="border-remove">
                        24/11/23
                        <br />
                        <span className="time">09:45 AM</span>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </div>
        <Modal
          open={openM}
          onClose={handleCloseM}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure want to delete
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="d-flex justify-content-end">
                <button className="cancel-btn mx-2" onClick={handleCloseM}>
                  Cancel
                </button>
                <button
                  className="modal-connected-btn"
                  style={{ width: '30%' }}
                  onClick={() => removeNanny()}
                >
                  Yes
                </button>
              </div>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default Candidates;

//  <div
// className="ewChatBubble"
// style={{
//   marginLeft: 0
// }}
// >
// <div className="template-message-layout">
//   <p>
//     Hi {'{{0}}'},
//   </p>
//   <div className="pt-2">
//     We have a job
//     that you may be
//     interested in,
//     or you may know
//     someone perfect
//     htmlFor it.
//   </div>
//   <div className="pt-2">
//     Job Offer:{' '}
//     {'{{1}}'}
//   </div>
//   <div>
//     Location:{' '}
//     {'{{2}}'}
//   </div>
//   <div>
//     Type: {'{{3}}'}
//   </div>
//   <div>
//     Days: {'{{4}}'}
//   </div>
//   <div>
//     Hours: {'{{5}}'}
//   </div>
//   <div>
//     Contract:{' '}
//     {'{{6}}'}
//   </div>
//   <div>
//     Start Date:{' '}
//     {'{{7}}'}
//   </div>
//   <div>
//     Salary:{' '}
//     {'{{8}}'}
//   </div>
//   <div>
//     Travel:{' '}
//     {'{{9}}'}
//   </div>
//   <div>
//     Cooking:{' '}
//     {'{{10}}'}
//   </div>
//   <div className="pt-2">
//     Notes:{' '}
//     {'{{11}}'}
//   </div>
//   <div className="pt-2">
//     Like the sound
//     of it or know
//     someone who
//     might do?
//   </div>
// </div>
// <span>
//   {moment().format(
//     'LT'
//   )}
// </span>
// </div>
// <div
// id="quick-replies-container"
// className="quick-replies-container pt-2"
// >
// <div className="quick-reply">
//   <a className="quick-reply-content">
//     Yes
//   </a>
// </div>
// <div className="quick-reply">
//   <a className="quick-reply-content">
//     No
//   </a>
// </div>
// </div>
