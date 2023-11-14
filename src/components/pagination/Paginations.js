import React from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const Paginations = (props) => {
  const {
    count,
    getData,
    getPrevData,
    getFirstData,
    getLastData,
    pageperRow,
    page
  } = props;

  return (
    <div>
      <div className="d-flex pagination-wrap justify-content-end mt-5">
        <div>
          {/* <Pagination
            sx={{
              '& .MuiPaginationItem-root.Mui-selected': {
                background: '#3180ED',
                color: 'white'
              },
              '& .MuiPaginationItem-root.Mui-disabled': {
                background: 'white',
                color: '#3D3C3F',
                opacity: '100%',
                border: '1px solid #3180ED',
                height: '32px',
                width: '32px'
              },
              '& .MuiButtonBase-root': {
                background: 'white',
                color: '#3D3C3F',
                border: '1px solid #3180ED',
                height: '32px',
                width: '32px'
              },
              '& .MuiButtonBase-root.MuiPaginationItem-icon.MuiPaginationItem-iconEdgeEnd':
                {
                  color: 'red'
                },
              '& .MuiButtonBase-root.MuiPaginationItem-icon.MuiPaginationItem-iconEdgeStart':
                {
                  color: 'green'
                }
            }}
            count={count}
            onChange={(event, page) => getData(event, page)}
            // onChange={(event, page) => getJobData(event, page)}
            renderItem={(item) => (
              <PaginationItem
                components={{
                  last: () => <KeyboardDoubleArrowRightIcon />,
                  next: () => <KeyboardArrowRightIcon />,
                  first: () => <KeyboardDoubleArrowLeftIcon />,
                  previous: () => <KeyboardArrowLeftIcon />
                }}
                {...item}
              />
            )}
            showFirstButton
            showLastButton
            variant="outlined"
            shape="rounded"
            className="pagi"
          /> */}

          <div className="select-dropdown-pagination d-flex justify-content-end align-items-center">
            <select onChange={(event) => pageperRow(event.target.value)}>
              <option value="15">15 / page</option>
              <option value="30">30 / page</option>
              <option value="50">50 / page</option>
              <option value="100">100 / page</option>
            </select>
            <button
              className="btn p-0 m-0"
              disabled={page == 1}
              onClick={() => getFirstData(page)}
            >
              <KeyboardDoubleArrowLeftIcon />
            </button>
            <button
              className="btn p-0 m-0"
              disabled={page == 1}
              onClick={() => getPrevData(page)}
            >
              <NavigateBeforeIcon />{' '}
            </button>
            {page}/{count}
            <button
              className="btn p-0 m-0"
              disabled={page === count}
              onClick={() => getData(page)}
            >
              <ChevronRightIcon />
            </button>
            <button
              className="btn p-0 m-0"
              disabled={page === count}
              onClick={() => getLastData()}
            >
              <KeyboardDoubleArrowRightIcon />
            </button>
          </div>
        </div>
        <div className="d-flex second-page-list">
          <div className="d-flex justify-content-center align-items-center"></div>
        </div>
      </div>
    </div>
  );
};

export default Paginations;
