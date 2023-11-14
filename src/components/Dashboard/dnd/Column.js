import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Button, MenuItem, Popover, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import Input from '../../input/Input';
import {
  deleteCategory,
  removeJob,
  updateCategory
} from '../../../Redux/Actions/CategoryAction';
import { useDispatch } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SelectField from '../../input/SelectField';
import { toast } from 'react-toastify';
import ClearIcon from '@mui/icons-material/Clear';

const Container = styled('div')`
  margin: 8px;
  border-radius: 6px;
  border: none;
  display: flex;
  flex-direction: column;
  width: 315px !important;
`;

const TaskList = styled('div')`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
  width: 300px;
  transition: background-color ease 0.2s;
`;

const Column = ({
  jobs,
  column,
  index,
  setJobId,
  hover,
  jobId,
  ratings,
  statusap,
  searchJobs
}) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [selectcard, setSelectcard] = useState();
  const [cardid, setCardid] = useState([]);
  const [categoryId, setCategoryId] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickAction = (event) => {
    setAnchorE2(event.currentTarget);
    setCategoryId(column?.id);
  };

  useEffect(() => {
    setCategory(column.name);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAction = () => {
    setAnchorE2(null);
  };

  const editCategory = (id) => {
    dispatch(updateCategory({ id, name: category }));
  };

  const removeCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  const open = Boolean(anchorEl);
  const openA = Boolean(anchorE2);
  const idp = open ? 'simple-popover' : undefined;
  const ida = openA ? 'simple-popover' : undefined;

  const handleCheck = (e, id) => {
    const { type } = e.target;
    if (type == 'checkbox') {
      const { checked } = e.target;
      if (checked) {
        setCardid((previd) => [...previd, id]);
      } else {
        let arr = cardid;
        arr = arr.filter((item) => item !== id);
        setCardid(arr);
      }
    }
  };

  const handleRemoveJob = () => {
    if (cardid?.length > 0) {
      let str = '';
      for (var i = 0; i < cardid.length; i++) {
        str += `&jobIds=${cardid[i]}`;
      }
      dispatch(removeJob(categoryId, str));
    } else {
      setSelectcard(true);
    }
  };

  const toggleInput = () => {
    setSelectcard(!selectcard);
    setAnchorE2(null);
  };

  return (
    <Draggable draggableId={column?.id} key={index} index={index} type="column">
      {(provided) => (
        <Container
          className="main-column"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="d-flex justify-content-between align-items-center position-relative">
            <div
              className="list-title cursor-pointer"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              {column?.name}{' '}
              <span style={{ color: '#A7A8AB' }}>
                {jobs?.filter((e) => e?.highlight)?.length}
              </span>
            </div>
            <div style={{ cursor: 'pointer', position: 'absolute', right: 0 }}>
              <div className="dropdown action-drop">
                <div data-bs-toggle="dropdown" aria-expanded="false">
                  <MoreVertIcon
                    onClick={(e) => {
                      handleClickAction(e);
                    }}
                    className="dot-icon"
                  />
                </div>
                <ul
                  // anchore1={anchorE2}
                  style={{
                    width: '200px',
                    fontSize: '14px',
                    borderRadius: '8px'
                  }}
                  className="dropdown-menu text-start"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <div className="d-flex justify-content-center align-items-center pt-1">
                    <li className="fw-bold">Card Actions</li>
                    <div className="position-absolute" style={{ right: 6 }}>
                      <ClearIcon
                        style={{
                          color: 'black',
                          fontSize: '20px',
                          cursor: 'pointer'
                        }}
                      />
                    </div>
                  </div>
                  <li>
                    <a className="dropdown-item" onClick={() => toggleInput()}>
                      Select Card
                    </a>
                  </li>
                  <div style={{ paddingLeft: '16px' }}>
                    <div
                      className="d-flex align-items-center"
                      onClick={() => handleRemoveJob()}
                    >
                      Remove
                      {cardid?.length > 0 && (
                        <>
                          &nbsp;
                          <span className="select-card-number">
                            {cardid?.length}
                          </span>
                        </>
                      )}
                      &nbsp;Card
                    </div>
                  </div>
                  <div
                    className="pt-1 pb-2"
                    style={{ paddingLeft: '16px' }}
                    onClick={() => removeCategory(categoryId)}
                  >
                    Delete Folder
                  </div>
                </ul>
              </div>
            </div>
            <Popover
              id={idp}
              style={{ position: 'absolute', top: '40px' }}
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  size="small"
                  label="Category"
                />
                <Button
                  className="mt-2"
                  variant="contained"
                  onClick={() => editCategory(column.id, category)}
                >
                  Edit
                </Button>
                <Button
                  onClick={handleClose}
                  className="mt-2 mx-2"
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => removeCategory(column.id)}
                  className="mt-2"
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </Typography>
            </Popover>

            {/* <Popover
              id={ida}
              style={{ position: 'absolute', top: '40px', width: '700px' }}
              open={openA}
              anchorEl={anchorE2}
              onClose={handleCloseAction}
              anchorOrigin={{
                horizontal: 'left'
              }}
            >
              <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Button
                  style={{
                    fontSize: '13px',
                    textTransform: 'capitalize',
                    backgroundColor: '#2dd47b',
                    width: '150px'
                  }}
                  variant="contained"
                  onClick={() => toggleInput()}
                >
                  Select Card
                </Button>
                <Button
                  style={{
                    fontSize: '13px',
                    textTransform: 'capitalize',
                    width: '150px'
                  }}
                  className="mt-2"
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveJob()}
                >
                  Remove Card
                </Button>
              </Box>
            </Popover> */}

            <div className="list-title card-color"></div>
          </div>
          <Droppable className="px-4" droppableId={column?.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                className="main-column"
                isDraggingOver={snapshot.isDraggingOver}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {jobs &&
                  jobs
                    .filter((e) => e?.highlight)
                    .map((task, index) => (
                      <Task
                        key={task.id}
                        task={task}
                        index={index}
                        setJobId={setJobId}
                        hover={hover}
                        jobId={jobId}
                        ratings={ratings}
                        statusap={statusap}
                        category={category}
                        selectcard={selectcard}
                        handleCheck={handleCheck}
                      />
                    ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
