import React, { useEffect, useState } from 'react';
import '../Profile/Candidates.css';
import '../Profile/Clients.css';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  // AvatarGroup,
  FormControlLabel,
  MenuItem,
  Modal,
  Popover,
  Typography
  // Pagination,
  // PaginationItem
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
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import MuiCheckbox from '@mui/material/Checkbox';
import { BiCheckbox, BiCheckboxSquare } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  FiltersJobs,
  getJobs,
  getJobsLivings,
  getJobsPositions,
  getJobsSkills,
  getJobsStatus,
  getJobsWorks,
  highlightJobs
} from '../../Redux/Actions/JobsAction';
import moment from 'moment';

// import UserPlus from '../../Images/user_plus.svg';
import Paginations from '../../components/pagination/Paginations';
import Filter from '../../components/Filters/Filter';
import SelectField from '../../components/input/SelectField';
import {
  addJobs,
  deleteJobs,
  filterHighlightJob,
  getCategory,
  updateStatus
} from '../../Redux/Actions/CategoryAction';
import gender from '../../constants/gender';
import { Filters } from '../../Redux/Actions/NanniesAction';
import StatusDot from '../../components/status/StatusDot';

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  outline: 'none',
  p: 4
};

function Clients() {
  const tablehead = [
    {
      name: 'Name'
    },
    {
      name: 'Postcode'
    },
    {
      name: 'Contract'
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
      name: 'Activity'
    },
    {
      name: 'Joined'
    },
    {
      name: 'Mobile'
    },
    {
      name: 'Highlight'
    }
  ];

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
  const [filter, setFilter] = useState({ filters: [], sorts: [] });

  const [categoryId, setCategoryId] = useState();
  const [jobId, setJobId] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElModal, setAnchorElModal] = useState(null);
  const [starClicked, setStarClicked] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(15);
  const [filterOpen, setFilterOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [highlight, setHighlight] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changes = useSelector((state) => state.Agency.agencyChange);
  const jobs = useSelector((state) => state.Jobs.jobs.content);
  const totalElement = useSelector((state) => state.Jobs.jobs.totalElements);
  const categoryData = useSelector(
    (state) => state?.Category?.category?.content
  );
  const loading = useSelector((state) => state.Jobs.loading);

  const positions = useSelector((state) => state.Jobs.positions);
  const works = useSelector((state) => state.Jobs.works);
  const livings = useSelector((state) => state.Jobs.livings);
  const statuses = useSelector((state) => state.Jobs.statuses);
  const skills = useSelector((state) => state.Jobs.skills);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const counter = Math.ceil(totalElement / size);
  // select all checkbox function
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = jobs.map((row) => row.id);
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
    setSelectAll(newSelected.length === jobs.length);
  };

  // select star(highlight) function
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

  useEffect(() => {
    if (filter.filters?.length > 0 || filter.sorts?.length > 0) {
      dispatch(FiltersJobs({ ...filter, page: page - 1, size }));
    } else {
      dispatch(getJobs(size, page - 1));
    }
  }, [size, page, changes]);

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

  const pageperRow = (size) => {
    setSize(size);
  };

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setJobId(row.id);
    setHighlight(row.highlight);
  };

  const handleModal = (event, row) => {
    setAnchorElModal(event.currentTarget);
    setJobId(row.id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseModal = () => {
    setAnchorElModal(null);
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setAnchorElModal(null);
    setModalOpen(true);
  };

  const open = Boolean(anchorEl);
  const openModal = Boolean(anchorElModal);
  const idp = open ? 'simple-popover' : undefined;

  const handleHighlight = () => {
    if (categoryId) {
      dispatch(addJobs(categoryId, jobId, 0));
    }
    if (highlight) {
      if (filter.filters?.length > 0 || filter.sorts?.length > 0) {
        dispatch(highlightJobs(jobId, { highlight: false })).then(() => {
          dispatch(FiltersJobs({ ...filter, page: page - 1, size }));
        });
      } else {
        dispatch(highlightJobs(jobId, { highlight: false })).then((res) => {
          dispatch(getJobs(size, page - 1));
        });
      }
    }
    if (!highlight) {
      if (filter.filters?.length > 0 || filter.sorts?.length > 0) {
        dispatch(highlightJobs(jobId, { highlight: true })).then(() => {
          dispatch(FiltersJobs({ ...filter, page: page - 1, size }));
        });
      } else {
        dispatch(highlightJobs(jobId, { highlight: true })).then(() => {
          dispatch(getJobs(size, page - 1));
        });
      }
    }
    setAnchorEl(null);
  };

  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

  useEffect(() => {
    dispatch(getJobsPositions());
    dispatch(getJobsWorks());
    dispatch(getJobsLivings());
    dispatch(getJobsStatus());
    dispatch(getJobsSkills());
  }, [changes]);

  const handleFilter = (e) => {
    const { name, value, type } = e.target;

    if (type == 'checkbox') {
      const { name, checked, value } = e.target;
      let workArr = [...formValues.works];
      let livingArr = [...formValues.livings];
      let skillArr = [...formValues.skills];
      let positionArr = [...formValues.positions];

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
          key: 'required_skills',
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
          key: 'necessary_positions',
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
      if (obj.value.length > 0) {
        newFilter.push(obj);
        setFilter({ ...filter, filters: newFilter });
      }
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
      dispatch(FiltersJobs({ ...filter, page: page - 1, size }));
    }
  };

  const handleClear = () => {
    setFormValues(initialValues);
    setFilter({ filters: [], sorts: [] });
    dispatch(getJobs(size, page - 1));
  };

  const removeJob = () => {
    dispatch(deleteJobs(jobId)).then((res) => {
      setModalOpen(false);
      dispatch(getJobs(size, page - 1));
    });
  };

  const handleStatus = (id, value) => {
    dispatch(updateStatus(id, value)).then(() => {
      if (filter.filters?.length > 0 || filter.sorts?.length > 0) {
        dispatch(FiltersJobs({ ...filter, page: page - 1, size }));
      } else {
        dispatch(getJobs(size, page - 1));
      }
    });
  };

  return (
    <>
      <div
        style={{ paddingTop: 100, minWidth: '60%' }}
        className="w-100 m-auto px-3"
      >
        <div className="main-candidate mx-5">
          <p className="client-head">Clients</p>
          <Filter
            type="jobs"
            client={jobs}
            filterOpen={filterOpen}
            status={statuses}
            position={positions}
            work={works}
            living={livings}
            skill={skills}
            gender={gender}
            handleFilter={handleFilter}
            handleSearch={handleSearch}
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
              <Table
                sx={{ minWidth: 700 }}
                className="overfloX"
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    {tablehead.map((data, index) => {
                      return (
                        <StyledTableCell
                          key={index}
                          align="center"
                          className="border-remove"
                        >
                          <div className="d-flex justify-content-center align-items-center">
                            {data.name == 'Name' && (
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
                  {jobs &&
                    jobs.map((row, index) => {
                      var works = row?.works?.map(function (item) {
                        return item['name'];
                      });
                      const idpModal = open ? 'simple-popover' : undefined;

                      return (
                        <StyledTableRow
                          key={index}
                          selected={isSelected(row.id)}
                        >
                          <StyledTableCell
                            align="center"
                            width="20%"
                            className="border-remove"
                          >
                            <div className="d-flex table-cell-width">
                              <Checkbox
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon />}
                                checked={isSelected(row.id)}
                                onChange={() => handleSelect(row.id)}
                              />
                              <div
                                className="user-card pt-2 cursor-pointer"
                                onClick={() =>
                                  navigate('/jobdetail', {
                                    state: { id: row.id, edit: true }
                                  })
                                }
                              >
                                <div className="px-1">
                                  <Avatar
                                    alt="Remy Sharp"
                                    sx={{ width: 40, height: 40 }}
                                    src={row.photo}
                                  />
                                </div>
                                <div>
                                  <div className="px-2 d-flex flex-column align-items-start user-text">
                                    <span className="username-text">
                                      {row.name}
                                    </span>
                                    <span className="userlocation-text">
                                      {row.area !== null && row.area}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="border-remove"
                          >
                            <div className="table-cell-width">
                              {row.postcode}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="border-remove"
                          >
                            {works.toString()}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            style={{ width: '140px' }}
                            className="border-remove"
                          >
                            <div>
                              <div className="d-flex align-items-center justify-content-center">
                                {row?.necessaryPositions &&
                                  row?.necessaryPositions
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
                                {row?.necessaryPositions?.length > 1 && (
                                  <div className="more-position-card">
                                    +{row?.necessaryPositions?.length - 1} More
                                  </div>
                                )}
                              </div>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
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
                          >
                            <div className="d-flex align-items-center justify-content-center flex-column gap-1">
                              {row.livings.map((e, index) => {
                                return (
                                  <div key={index} className="position-card">
                                    {e.name}
                                  </div>
                                );
                              })}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="border-remove"
                          >
                            <div className="d-flex justify-content-center">
                              <span className="actbtn-active text-white">
                                45
                              </span>
                              <span className="deactbtn">5</span>
                              <span className="actbtn-active2">1</span>
                            </div>
                          </StyledTableCell>

                          <StyledTableCell
                            align="center"
                            className="border-remove"
                          >
                            {moment(row.createdAt).format('DD/MM/YY')}
                            <br />
                            <span className="time">
                              {moment(row.createdAt).format('LT')}
                            </span>
                          </StyledTableCell>

                          <StyledTableCell
                            width="10%"
                            align="center"
                            className="border-remove"
                          >
                            <span className="mobile-num">
                              {row.phoneNumber}
                            </span>
                            <br />
                            <span className="time">{row.email}</span>
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="border-remove"
                          >
                            <div>
                              {row.highlight === true ? (
                                <StarIcon
                                  onClick={(event) => handleClick(event, row)}
                                  style={{
                                    color: '#297ADB',
                                    cursor: 'pointer'
                                  }}
                                />
                              ) : (
                                <StarOutlineIcon
                                  onClick={(event) => handleClick(event, row)}
                                  style={{ cursor: 'pointer' }}
                                />
                              )}
                              {/* {starClicked.includes(row.id) ? (
                                <>
                                  <StarIcon
                                    style={{
                                      color: '#297ADB',
                                      cursor: 'pointer',
                                      fontSize: '21px'
                                    }}
                                  />
                                </>
                              ) : (
                                <>
                                  <StarOutlineIcon
                                    style={{
                                      cursor: 'pointer',
                                      fontSize: '21px'
                                    }}
                                  />
                                </>
                              )} */}
                              <Popover
                                id={idp}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left'
                                }}
                              >
                                <Typography
                                  sx={{ p: 2 }}
                                  style={{ width: '200px' }}
                                >
                                  <SelectField
                                    onChange={(e) =>
                                      setCategoryId(e.target.value)
                                    }
                                    name="category"
                                    className="w-100"
                                    label="Category"
                                    size="small"
                                  >
                                    {categoryData?.length > 0 &&
                                      categoryData.map((e, index) => {
                                        return (
                                          <MenuItem key={index} value={e.id}>
                                            {e.name}
                                          </MenuItem>
                                        );
                                      })}
                                  </SelectField>
                                  <Button
                                    onClick={() => handleHighlight()}
                                    className="mt-2"
                                    variant="contained"
                                    size="small"
                                  >
                                    Add
                                  </Button>
                                </Typography>
                              </Popover>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className="border-remove"
                          >
                            <MoreVertIcon
                              onClick={(e) => handleModal(e, row)}
                              style={{ cursor: 'pointer' }}
                            />
                            <Popover
                              id={idpModal}
                              open={openModal}
                              anchorEl={anchorElModal}
                              onClose={handleCloseModal}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                              }}
                            >
                              <Typography
                                key={row.id}
                                sx={{ p: 2 }}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleOpenModal()}
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
            {jobs?.length > 0 && (
              <Paginations
                count={counter}
                getData={getDatas}
                pageperRow={pageperRow}
                size={size}
                page={page}
                getPrevData={getPrevData}
                getFirstData={getFirstData}
                getLastData={getLastData}
              />
            )}
          </>
        )}

        <div className="mt-3"></div>
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure want to delete job?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="d-flex justify-content-end">
                <button className="cancel-btn mx-2" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button
                  className="modal-connected-btn"
                  style={{ width: '30%' }}
                  onClick={() => removeJob()}
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

export default Clients;
