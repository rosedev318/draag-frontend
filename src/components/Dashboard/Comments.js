import { Avatar, Button } from '@mui/material';
import moment from 'moment';
import React from 'react';

const Comments = (props) => {
  const {
    comment,
    setComment,
    addComment,
    commentsData,
    update,
    commentId,
    editComment,
    setEditComment,
    handleEditComment,
    edit,
    handleOpenComment,
    profile
  } = props;

  const userName = localStorage.getItem('username');

  function stringAvatar(name) {
    return {
      children: `${name.toUpperCase().split(' ')[0][0]}${name.split(' ')[1][0]}`
    };
  }

  return (
    <div style={{ paddingBottom: '80%' }}>
      <div className="pt-3 d-flex align-items-center gap-2">
        <div>
          <Avatar
            alt="Remy Sharp"
            src={profile?.profileImageUrl}
            sx={{
              width: 31,
              height: 31,
              fontSize: '10px'
            }}
          />
        </div>
        <div className="w-100">
          <input
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="comment-input w-100"
            placeholder="Write a comment..."
          />
        </div>
        <Button variant="contained" onClick={() => addComment()}>
          add
        </Button>
      </div>
      {commentsData?.length > 0 &&
        commentsData.map((data, index) => {
          var date = new Date(data.createdAt);
          date.toString();
          return (
            <div key={index} className="pt-3">
              <div>
                <div className="d-flex gap-2">
                  <div className="pt-0">
                    <Avatar
                      alt="Remy Sharp"
                      src={data?.createdBy?.profileImageUrl}
                      sx={{
                        width: 31,
                        height: 31,
                        fontSize: '10px'
                      }}
                    />
                  </div>
                  <div className="w-100">
                    <span className="comment-text">
                      <span className="fw-bold">
                        {data.createdBy.fullName}{' '}
                        <span
                          className="comment-text fw-light px-1"
                          style={{ fontSize: '13px' }}
                        >
                          {moment(date).startOf('minute').fromNow()}
                          {/* 19 may 2017 at 14:56 */}
                        </span>
                      </span>
                    </span>
                    {update && commentId === data.id ? (
                      <input
                        onChange={(e) => setEditComment(e.target.value)}
                        value={editComment}
                        className="border-none w-100 post-input"
                        placeholder="Write a comment..."
                      />
                    ) : (
                      <div className=" w-100 d-flex align-items-center">
                        {data.content}
                      </div>
                    )}
                    <div className="d-flex gap-2">
                      {update && commentId === data.id ? (
                        <small
                          onClick={() => handleEditComment(data.id)}
                          className="text-decoration-underline text-muted cursor-pointer"
                        >
                          Save
                        </small>
                      ) : (
                        <small
                          onClick={() => edit(data)}
                          className="text-decoration-underline text-muted cursor-pointer"
                        >
                          Edit
                        </small>
                      )}
                      <small
                        onClick={() => handleOpenComment(data.id)}
                        className="text-decoration-underline text-muted cursor-pointer"
                      >
                        Delete
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Comments;
