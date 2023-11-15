import React from 'react';
import List from '../../Images/Notification/list_plus.svg';
import Done from '../../Images/Notification/done.svg';
import Assign from '../../Images/Notification/id_card.svg';
import MassMessage from '../../Images/Notification/user_voice.svg';
import Event from '../../Images/Notification/calendar_plus.svg';
import Job from '../../Images/Notification/user_pin.svg';
import Request from '../../Images/Notification/mail_open.svg';
import Accept from '../../Images/Notification/happy.svg';
import AssignYou from '../../Images/Notification/user_circle.svg';
import Placed from '../../Images/Notification/label.svg';
import Trial from '../../Images/Notification/Trial.svg';

const NotificationIcon = ({ notificationType }) => {
  return (
    <div>
      <div>{notificationType === 'NOTE_CREATED' && <img src={List} />}</div>
      <div>{notificationType === 'NOTE_DONE' && <img src={Done} />}</div>
      <div>{notificationType === 'EVENT_CREATED' && <img src={Event} />}</div>
      <div>{notificationType === 'JOB_CREATED' && <img src={Job} />}</div>
      <div>
        {notificationType === 'MASS_MESSAGES_SENT' && <img src={MassMessage} />}
      </div>
      <div>
        {notificationType === 'INVITATION_REQUEST' && <img src={Request} />}
      </div>
      <div>
        {notificationType === 'INVITATION_ACCEPTANCE' && <img src={Accept} />}
      </div>
      <div>
        {notificationType === 'CANDIDATE_ON_TRIAL' && <img src={Trial} />}
      </div>
      <div>
        {notificationType === 'JOB_ASSIGNED_TO_USER' && <img src={AssignYou} />}
      </div>
      <div>{notificationType === 'JOB_PLACED' && <img src={Placed} />}</div>
      <div>
        {notificationType === 'CANDIDATE_ASSIGNED' && <img src={Assign} />}
      </div>
      <div>
        {notificationType === 'TEST_NOTIFICATION' && <img src={Accept} />}
      </div>
      <div>
        {notificationType === 'JOB_AVAILABLE' && (
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <title>basic / label</title>
            <defs>
              <rect id="path-1" x="0" y="0" width="24" height="24"></rect>
            </defs>
            <g
              id="Symbols"
              stroke="none"
              stroke-width="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="basic-/-label">
                <mask id="mask-2" fill="white">
                  <use xlinkHref="#path-1"></use>
                </mask>
                <g id="basic-/-label-(Background/Mask)"></g>
                <path
                  d="M15.5,5 C16.1700001,5 16.7700005,5.32999998 17.1300001,5.83999997 L21.5,12 L17.1300001,18.1599998 C16.7700005,18.6700001 16.1700001,19 15.5,19 L4.5,18.9899998 C3.39999998,18.9899998 2.5,18.1000004 2.5,17 L2.5,7 C2.5,5.89999998 3.39999998,5.01 4.5,5.01 L15.5,5 C15.9466667,5 15.9466667,5 15.5,5 Z M4.5,17 L15.5,17 L19.0499992,12 L15.5,7 L4.5,7 L4.5,17 L4.5,17 Z"
                  fill="#2E3A59"
                  mask="url(#mask-2)"
                ></path>
              </g>
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};

export default NotificationIcon;
