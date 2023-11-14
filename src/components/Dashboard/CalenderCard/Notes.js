import React, { useEffect, useState } from 'react';
import CloseIcon from '../../../Images/close_notes.svg';
import CloseIconNote from '../../../Images/notes_close.svg';
import CheckIconNote from '../../../Images/notes_check.svg';
import { IoIosClose } from 'react-icons/io';
import {
  deleteNotes,
  getSchedules
} from '../../../Redux/Actions/CalenderAction';
import { useDispatch } from 'react-redux';

const Notes = (props) => {
  const {
    index,
    note,
    handleCheck,
    editNote,
    handleDeleteNote,
    updateid,
    editnote,
    editnoteid,
    editClose,
    updateNote,
    // setNotetext,
    notetext,
    handleChange
  } = props;

  return (
    <div key={index}>
      <li className="note-item">
        <div className="">
          {editnoteid ? (
            <>
              <div className="input-container-notes w-100 mb-2">
                <input
                  type="text"
                  className="note-input"
                  defaultValue={note.content}
                  onChange={(e) => {
                    handleChange(e.target.value, index);
                  }}
                />
                <img
                  src={CheckIconNote}
                  className="cursor-pointer px-2"
                  onClick={() => updateNote(note.id, note.content)}
                />
                <img
                  src={CloseIconNote}
                  className="cursor-pointer"
                  onClick={() => editClose(note.id, index)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="note-content-container">
                <div className="card-check form-check">
                  <input
                    className="form-check-input cursor-pointer"
                    type="checkbox"
                    checked={note.done}
                    value={note.id}
                    onChange={(e) =>
                      handleCheck(e.target.checked, note.id, index)
                    }
                    id="flexCheckDefault"
                  />
                </div>
                <div
                  className="note-content"
                  onClick={() => {
                    editNote(note.id, note.content, index);
                  }}
                >
                  {note.content.split(' ').map((word, index) => {
                    if (word.startsWith('@')) {
                      return (
                        <span key={index} className="highlight-text">
                          {word + ' '}
                        </span>
                      );
                    } else {
                      return <span key={index}>{word + ' '}</span>;
                    }
                  })}
                  {/* {note.content.startsWith('@') ? (
                    <>
                      <span className="highlight-text">
                        {note.content.split(' ')[0] + ' '}
                      </span>

                      {note.content.split(' ').slice(1).join(' ')}
                    </>
                  ) : (
                    note.content
                  )} */}
                </div>
                <div
                  className="delete-note cursor-pointer"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  <IoIosClose />
                </div>
              </div>
            </>
          )}
        </div>
      </li>
    </div>
  );
};

export default Notes;
