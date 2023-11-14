import { Avatar } from '@mui/material';
import moment from 'moment';
import React from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const History = (props) => {
  const { activityData } = props;
  function stringAvatar(name) {
    return {
      children: `${name.toUpperCase().split(' ')[0][0]}${name.split(' ')[1][0]}`
    };
  }

  return (
    <div>
      {activityData?.length > 0 &&
        activityData.map((e, index) => {
          var date = new Date(e.createdAt);
          date.toString();
          return (
            <div key={index} className="pt-3">
              <div>
                <div className="d-flex align-items-center gap-2">
                  <div className="pt-0">
                    {e.type === 'ADD_JOB_TO_CATEGORY' && (
                      <Avatar
                        alt="Remy Sharp"
                        src={e?.createdBy?.profileImageUrl}
                        sx={{
                          width: 24,
                          height: 24,
                          fontSize: '10px'
                        }}
                      />
                    )}
                    {e.type === 'UPDATE_JOB_STATUS' && (
                      <Avatar
                        alt="Remy Sharp"
                        src={e?.createdBy?.profileImageUrl}
                        sx={{
                          width: 24,
                          height: 24,
                          fontSize: '10px'
                        }}
                      />
                    )}
                    {e.type === 'MOVE_JOB_BETWEEN_CATEGORIES' && (
                      <Avatar
                        alt="Remy Sharp"
                        src={e?.createdBy?.profileImageUrl}
                        sx={{
                          width: 24,
                          height: 24,
                          fontSize: '10px'
                        }}
                      />
                    )}
                    {e.type === 'ADD_NANNY_TO_JOB' && (
                      <Avatar
                        alt="Remy Sharp"
                        src={e?.source?.content?.photo}
                        sx={{
                          width: 24,
                          height: 24,
                          fontSize: '10px'
                        }}
                      />
                    )}
                  </div>
                  <div className="w-100">
                    <span className="comment-text">
                      <span className="fw-bold">
                        {e.type == 'ADD_JOB_TO_CATEGORY' &&
                          e.source.content.deleted === false && (
                            <span className="comment-text fw-light">
                              {' '}
                              <span className="fw-bold">
                                {e.createdBy.fullName}
                              </span>{' '}
                              {''}
                              moved{' '}
                              <span className="fw-bold">
                                {' '}
                                {e?.source?.content?.name}{' '}
                              </span>{' '}
                              to{' '}
                              <span className="fw-bold">
                                {e.target[0].content.name}
                              </span>{' '}
                              {e.createdAt !== null &&
                                moment(date).startOf('minute').fromNow()}
                            </span>
                          )}
                        {e.type == 'ADD_NANNY_TO_JOB' &&
                          e.source.content.deleted === false && (
                            <>
                              <span className="fw-bold">
                                {e.source.content.name}
                              </span>
                              <span className="comment-text fw-light">
                                {' '}
                                {/* <span className="fw-bold">
                            {e.target[0].content.name}
                          </span>{' '} */}
                                was assigned to this card by{' '}
                                <span className="fw-bold">
                                  {e.createdBy.fullName}
                                </span>{' '}
                                {e.createdAt !== null &&
                                  moment(date).startOf('minute').fromNow()}
                              </span>
                            </>
                          )}
                        {e.type == 'MOVE_JOB_BETWEEN_CATEGORIES' &&
                          e.source.content.deleted === false && (
                            <>
                              <span className="comment-text fw-light">
                                <span className="fw-bold">
                                  {e.createdBy.fullName}
                                </span>{' '}
                                moved{' '}
                                <span className="fw-bold">
                                  {e.source.content.deleted === false &&
                                    e.source.content.name}
                                </span>{' '}
                                from{' '}
                                <span className="fw-bold">
                                  {e.target[0].content.deleted === false &&
                                    e.target[0].content.name}
                                </span>{' '}
                                to{' '}
                                <span className="fw-bold">
                                  {e.target[1].content.deleted === false &&
                                    e.target[1].content.name}
                                </span>{' '}
                                {e.createdAt !== null &&
                                  moment(date).startOf('second').fromNow()}
                              </span>
                            </>
                          )}
                        {e.type == 'UPDATE_JOB_STATUS' &&
                          e.source.content.deleted === false && (
                            <>
                              <span className="comment-text fw-light">
                                <span className="fw-bold">
                                  {e.createdBy.fullName}
                                </span>{' '}
                                updated{' '}
                                <span className="fw-bold">
                                  {e.source.content.name}
                                </span>{' '}
                                from{' '}
                                <span className="fw-bold">
                                  {e.target[0].content.deleted === false &&
                                    e.target[0].content.name}
                                </span>{' '}
                                to{' '}
                                <span className="fw-bold">
                                  {e.target[1].content.deleted === false &&
                                    e.target[1].content.name}
                                </span>{' '}
                                {e.createdAt !== null &&
                                  moment(date).startOf('second').fromNow()}
                              </span>
                            </>
                          )}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default History;
