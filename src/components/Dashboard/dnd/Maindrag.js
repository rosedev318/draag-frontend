import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, DndContext, Droppable } from 'react-beautiful-dnd';
import initialData, { demo } from './data';
import Column from './Column';
import { Box, Button, Popover, Skeleton, Typography } from '@mui/material';
import Input from '../../input/Input';
import {
  addJobs,
  createAssignment,
  createCategory,
  filterHighlightJob,
  getCategory,
  getJobRating,
  nanniesHightlight,
  updateCategoryPosition,
  updateJobs
} from '../../../Redux/Actions/CategoryAction';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../Sidebar/SideBar';
import { toast } from 'react-toastify';
import FilterSidebar from '../Sidebar/FilterSidebar';
import Schedule from '../Schedule';
import { getJobsStatus } from '../../../Redux/Actions/JobsAction';
import { userContext } from '../../../context/UserContext';

const Container = styled('div')`
  display: flex;
  align-items: flex-start;
  width: ${(props) => (props.isLoading ? '100%' : '')};
  background-color: ${(props) => (props.isDraggingOver ? '' : '')};
`;

const ListTitle = styled('div')`
  width: 500px;
`;

const Maindrag = (props) => {
  const { openSidebar, setOpenSidebar, openFilter, setOpenFilter, setLoading } =
    props;
  const initialValues = { category: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const initialValuesFil = {
    me: '',
    user: [],
    living: [],
    status: [],
    position: [],
    passport: []
  };
  const [formValuesFil, setFormValuesFil] = useState(initialValuesFil);
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const [jobId, setJobId] = useState();
  const [hover, setHover] = useState(false);
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState('update');
  // const [starter, setStarter] = useState({
  //   columns: {},
  //   columnOrder: [],
  //   jobs: {}
  // });

  const { starter, setStarter } = useContext(userContext);

  const changes = useSelector((state) => state.Agency.agencyChange);
  const categoryData = useSelector(
    (state) => state?.Category?.category?.content
  );

  const Success = useSelector((state) => state?.Category?.success);
  const ratings = useSelector((state) => state.Category.jobRatings);
  const statusap = useSelector((state) => state?.Jobs?.statuses);
  const highlightUserData = useSelector(
    (state) => state?.Category?.highlightNanny
  );

  useEffect(() => {
    setCategories(categoryData);
  }, [categoryData, changes]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setFormValues(initialValues);
  };

  const open = Boolean(anchorEl);

  const addCategory = () => {
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    const errors = validate(formValues);
    if (Object.keys(errors).length === 0) {
      dispatch(createCategory({ name: formValues.category }));
      setAnchorEl(null);
      setFormValues(initialValues);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (isSubmit) {
      setFormErrors(validate({ ...formValues, [name]: value }));
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.category) {
      errors.category = 'Category is required!';
    }

    return errors;
  };

  const handleFilter = (e) => {
    const { name, value, type } = e.target;

    if (type == 'checkbox') {
      const { name, checked, value } = e.target;
      let livingArr = [...formValuesFil.living];
      let statusArr = [...formValuesFil.status];
      let positionArr = [...formValuesFil.position];
      let userArr = [...formValuesFil.user];
      let passportArr = [...formValuesFil.passport];

      if (name == 'living') {
        if (checked) {
          livingArr.push(value);
        } else {
          livingArr = livingArr.filter((val) => val !== value);
        }
        setFormValuesFil({
          ...formValuesFil,
          living: livingArr
        });
      } else if (name == 'status') {
        if (checked) {
          statusArr.push(value);
        } else {
          statusArr = statusArr.filter((val) => val !== value);
        }
        setFormValuesFil({
          ...formValuesFil,
          status: statusArr
        });
      } else if (name == 'position') {
        if (checked) {
          positionArr.push(value);
        } else {
          positionArr = positionArr.filter((val) => val !== value);
        }
        setFormValuesFil({
          ...formValuesFil,
          position: positionArr
        });
      } else if (name == 'user') {
        if (checked) {
          userArr.push(value);
        } else {
          userArr = userArr.filter((val) => val !== value);
        }
        setFormValuesFil({
          ...formValuesFil,
          user: userArr
        });
      } else if (name == 'passport') {
        if (checked) {
          passportArr.push(value);
        } else {
          passportArr = passportArr.filter((val) => val !== value);
        }
        setFormValuesFil({
          ...formValuesFil,
          passport: passportArr
        });
      } else if (name == 'me') {
        const { name, checked, value } = e.target;
        if (checked) {
          setFormValuesFil({
            ...formValuesFil,
            [name]: value
          });
        } else {
          setFormValuesFil({
            ...formValuesFil,
            [name]: ''
          });
        }
      }
    }
  };

  useEffect(() => {
    if (
      formValuesFil?.status ||
      formValuesFil?.position ||
      formValuesFil?.user ||
      formValuesFil?.me ||
      formValuesFil.living ||
      formValues.passport
    ) {
      let str = '';
      if (formValuesFil.living.length > 0) {
        for (var i = 0; i < formValuesFil.living.length; i++) {
          str += `&living=${formValuesFil.living[i]}`;
        }
      }
      if (formValuesFil.status.length > 0) {
        for (var s = 0; s < formValuesFil.status.length; s++) {
          str += `&status=${formValuesFil.status[s]}`;
        }
      }
      if (formValuesFil.position.length > 0) {
        for (var p = 0; p < formValuesFil.position.length; p++) {
          str += `&position=${formValuesFil.position[p]}`;
        }
      }
      if (formValuesFil.user.length > 0) {
        for (var u = 0; u < formValuesFil.user.length; u++) {
          str += `&assigneeId=${formValuesFil.user[u]}`;
        }
      }
      if (formValuesFil?.passport?.length > 0) {
        for (var v = 0; v < formValuesFil.passport.length; v++) {
          str += `&visaStatus=${formValuesFil.passport[v]}`;
        }
      }
      if (formValuesFil?.me?.length > 0) {
        str += `&assigneeId=${formValuesFil.me}`;
      }
      // console.log('str', str);
      // dispatch(
      //   filterHighlightJob({
      //     living: formValuesFil.living,
      //     assignId: formValuesFil?.users,
      //     status: formValuesFil.status,
      //     position: formValuesFil.position
      //   })
      // );

      dispatch(filterHighlightJob(str));
    }
  }, [formValuesFil, changes]);

  useEffect(() => {
    dispatch(getJobRating());
    dispatch(getJobsStatus());
    dispatch(nanniesHightlight(''));
  }, [changes]);

  let columns = {};
  let columnOrder = [];
  let jobs = {};

  useEffect(() => {
    if (Success) {
      let count = 0;
      for (let i = 0; i < categoryData?.length; i++) {
        let category = categoryData[i];
        let jobIds = [];
        for (let t = 0; t < category?.jobs?.length; t++) {
          jobIds.push(category.jobs[t].id);
          jobs[category.jobs[t].id] = {
            id: category.jobs[t].id,
            taskId: category.jobs[t].id,
            name: category.jobs[t].name,
            area: category.jobs[t].area,
            photo: category.jobs[t].photo,
            created: category.jobs[t].createdAt,
            status: category.jobs[t].status,
            livings: category.jobs[t].livings,
            requiredSkills: category.jobs[t].requiredSkills,
            necessaryPositions: category.jobs[t].necessaryPositions,
            address: category.jobs[t].address,
            postcode: category.jobs[t].postcode,
            numberOfChildren: category.jobs[t].numberOfChildren,
            ageOfChildren: category.jobs[t].ageOfChildren,
            days: category.jobs[t].days,
            salary: category.jobs[t].salary,
            startTime: category.jobs[t].startTime,
            finishTime: category.jobs[t].finishTime,
            assignments: category.jobs[t].assignments,
            assignees: category.jobs[t].assignees,
            notes: category.jobs[t].notes,
            rating: category.jobs[t].rating,
            trial: category.jobs[t].trial,
            highlight: category.jobs[t].highlight,
            pets: category.jobs[t].pets
          };
          count++;
        }

        columnOrder.push(categoryData[i].id);
        columns[categoryData[i].id] = {
          id: categoryData[i].id,
          categoryId: categoryData[i].id,
          name: categoryData[i].name,
          jobs: jobIds
        };
      }
    }
    setStarter({ columns, columnOrder, jobs });
    if (columnOrder.length) setLoading(false);
  }, [Success, changes]);

  const jobsData = Object.values(starter.jobs);

  const onDragStart = start => {
    const el = document.getElementById(start.draggableId);
    if (el) {
      el.style.position = 'fixed';
      el.style.zIndex = 50;
    }
  };

  const onDragEnd = ({ destination, source, draggableId, type }) => {
    const el = document.getElementById(draggableId);
    if (el) {
      el.style.position = '';
      el.style.zIndex = '';
    }
    
    if (type == 'nanny' && jobId !== undefined) {
      dispatch(createAssignment(jobId, draggableId)).then((res) => {
        if (res.status == '200') {
          let datas = jobsData.filter((e) => e?.id === jobId);
          let user = highlightUserData?.filter((u) => u?.id === draggableId);
          datas[0]?.assignments.push(user[0]);
          console.log('datas', datas[0]?.assignments);
        }
      });
    } else if (type == 'column') {
      dispatch(updateCategoryPosition(draggableId, destination?.index));
    } else if (
      destination?.droppableId !== undefined &&
      destination?.droppableId !== 'all-column'
    ) {
      dispatch(
        addJobs(destination?.droppableId, draggableId, destination.index)
      );
    }
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = starter.columns[source.droppableId];
    const end = starter.columns[destination.droppableId];

    if (type === 'column') {
      const newOrder = [...starter.columnOrder];
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, draggableId);
      setStarter({
        ...starter,
        columnOrder: newOrder
      });
      return;
    }

    if (start === end) {
      const column = starter?.columns[source.droppableId];
      const jobs = column?.jobs || [];
      jobs.splice(source.index, 1);
      jobs.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...column,
        jobs
      };
      setStarter({
        ...starter,
        columns: {
          ...starter?.columns,
          [column?.id]: newColumn
        }
      });
      return;
    }

    const startTaskIds = [...start.jobs];
    const endTaskIds = [...end.jobs];

    startTaskIds.splice(source.index, 1);
    endTaskIds.splice(destination.index, 0, draggableId);

    const newStartColumn = {
      ...start,
      jobs: startTaskIds
    };
    const endTaskColumn = {
      ...end,
      jobs: endTaskIds
    };

    setStarter({
      ...starter,
      columns: {
        ...starter.columns,
        [start.id]: newStartColumn,
        [end.id]: endTaskColumn
      }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="position-relative">
        <SideBar
          jobId={jobId}
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
        <FilterSidebar
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          handleFilter={handleFilter}
          formValuesFil={formValuesFil}
        />
      </div>

      <div
        style={{
          display: 'flex',
          paddingLeft: '40px',
          flexGrow: '1',
          overflowX: 'auto'
        }}
      >
        <Droppable
          droppableId="all-column"
          type="column"
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <Container
              isLoading={!starter?.columnOrder.length}
              isDraggingOver={snapshot.isDraggingOver}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {!starter?.columnOrder.length
                ? new Array(5)
                    .fill(0)
                    .map((value, index) => (
                      <Skeleton
                        animation="wave"
                        key={index}
                        variant="rounded"
                        sx={{ width: '20%', height: '95%', margin: '8px' }}
                      />
                    ))
                : starter?.columnOrder?.map((columnId, index) => {
                    const column = starter?.columns[columnId];
                    const jobs = column?.jobs?.map(
                      (taskId) => starter?.jobs?.[taskId]
                    );
                    return (
                      <Column
                        index={index}
                        key={column.id}
                        column={column}
                        jobs={jobs}
                        setJobId={setJobId}
                        hover={hover}
                        jobId={jobId}
                        ratings={ratings}
                        statusap={statusap}
                      />
                    );
                  })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
        {starter?.columnOrder.length ? (
          <div
            style={{
              flexShrink: '0',
              width: '315px'
            }}
          >
            <div className="addlist-title mt-2 w-full" onClick={handleClick}>
              + Add another List
            </div>
            <Popover
              style={{ top: '40px' }}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                horizontal: 'left',
                vertical: 'top'
              }}
            >
              <Typography sx={{ p: 2 }}>
                <Input
                  type="text"
                  name="category"
                  className="w-100"
                  error={formErrors.category}
                  helperText={formErrors.category}
                  value={formValues.category}
                  onChange={handleChange}
                  size="small"
                  label={formErrors.category ? 'Category' : 'Category'}
                />
                <Button
                  className="mt-2"
                  variant="contained"
                  onClick={() => addCategory()}
                >
                  Add
                </Button>
                <Button
                  onClick={() => handleClose()}
                  className="mt-2 mx-2"
                  variant="contained"
                >
                  Cancel
                </Button>
              </Typography>
            </Popover>
          </div>
        ) : (
          <></>
        )}
      </div>
    </DragDropContext>
  );
};

export default Maindrag;
