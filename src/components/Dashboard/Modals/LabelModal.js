import { Button, MenuItem, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { getJobsStatus } from '../../../Redux/Actions/JobsAction';
import { useSelector } from 'react-redux';
import SelectField from '../../input/SelectField';
import { getJob, updateStatus } from '../../../Redux/Actions/CategoryAction';
import ConfettiExplosion from 'react-confetti-explosion';
import './LabelModal.css';

const bigExplodeProps = {
  force: 0.8,
  duration: 3000,
  particleCount: 250,
  width: 1600
};

const source = {
  position: 'absolute',
  right: '50%',
  left: '50%',
  width: '500px',
  zindex: 5000
};
const LabelModal = (props) => {
  const {
    openLabel,
    handleCloseLabel,
    job,
    setStatus,
    statusData,
    index,
    setPlaceConfetti
  } = props;
  const statusDatas = useSelector((state) => state.Jobs.statuses);
  const [statuses, setStatuses] = useState('');
  const dispatch = useDispatch();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '6px',
    // boxShadow: 24,
    px: 4,
    // height: '300px',
    outline: 'none'
  };

  useEffect(() => {
    dispatch(getJobsStatus());
  }, []);

  useEffect(() => {
    if (statusData?.length > 0) {
      setStatuses(statusData[0]?.code);
    } else {
      setStatuses(job?.status?.code);
    }
  }, []);

  const handleStatus = () => {
    const statusName = statusDatas.filter((e) => e?.code === statuses);
    let taskValue = job;
    taskValue.status.code = statuses;
    taskValue.status.name = statusName[0]?.name;
    setStatus(statuses);
    dispatch(updateStatus(job.id, statuses)).then((res) => {
      if (res?.status === 200) {
        dispatch(getJob(job?.id)).then((res) => {
          if (res?.status === 200) {
            if (res?.data?.status?.name == 'Placed') {
              setPlaceConfetti(true);
            } else {
              setPlaceConfetti(false);
            }
          }
        });
      }
    });
    handleCloseLabel();
  };

  return (
    <div className="main-label position-relative">
      <div className="d-flex justify-content-center align-items-center pb-4 pt-1">
        <div></div>
        <div className="label-title">Status change</div>
        <CloseIcon
          sx={{
            fontSize: '16px',
            color: '#5A6980',
            position: 'absolute',
            right: 0
          }}
          className="cursor-pointer mx-2"
          onClick={() => handleCloseLabel()}
        />
      </div>

      <div className="px-3">
        <div className="d-flex justify-content-start label-title pb-3">
          Change the status of this position
        </div>
        <div className="">
          <SelectField
            name="status"
            value={statuses}
            onChange={(e) => setStatuses(e.target.value)}
            className="w-100"
            size="small"
            label="Status"
          >
            {statusDatas &&
              statusDatas.map((key, index) => {
                return (
                  <MenuItem key={index} value={key?.code}>
                    {key?.name}
                  </MenuItem>
                );
              })}
          </SelectField>
          <div className="d-flex justify-content-end gap-2 pt-3 pb-3">
            <button className="cancelattach-btn" onClick={handleCloseLabel}>
              Cancel
            </button>
            <button className="insertbtn-attach" onClick={() => handleStatus()}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelModal;
