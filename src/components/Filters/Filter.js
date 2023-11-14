import React, { useState } from 'react';
import Input from '../input/Input';
import SelectField from '../input/SelectField';
import { MenuItem } from '@mui/material';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { Tune } from '@mui/icons-material';
// import { CiSearch } from 'react-icons/ci';
// import { Divider } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import UserPlus from '../../Images/user_plus.svg';
import { Link } from 'react-router-dom';

const Filter = (props) => {
  const {
    type,
    candidate,
    status,
    work,
    living,
    skill,
    position,
    gender,
    handleFilter,
    handleClear,
    formValues,
    handleSearch,
    handleFilterOpen,
    filterOpen
  } = props;

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <FilterAltOutlinedIcon
              onClick={() => handleFilterOpen()}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div>
            {candidate && (
              <Link to="/userdetail">
                <button className="btn add-candidate">
                  <img src={UserPlus} className="me-2 add-icon" />
                  <span>Add Candidate</span>
                </button>
              </Link>
            )}
            {type === 'jobs' && (
              <Link to="/jobdetail">
                <button className="btn add-candidate">
                  <img src={UserPlus} className="me-2 add-icon" />
                  <span>Add Job</span>
                </button>
              </Link>
            )}
          </div>
        </div>
        {filterOpen === true && (
          <>
            <div>
              <div className="row mt-2">
                <div className="col-12 col-md-6 col-lg-6">
                  <Input
                    type="text"
                    name="name"
                    className="w-100"
                    size="small"
                    label="Name"
                    value={formValues?.name}
                    onChange={handleFilter}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-6 margin-row">
                  <SelectField
                    type="text"
                    name="status"
                    className="w-100"
                    size="small"
                    label="Status"
                    value={formValues?.status}
                    onChange={handleFilter}
                  >
                    {status?.length > 0 &&
                      status?.map((key, index) => {
                        return (
                          <MenuItem key={index} value={key?.code}>
                            {key?.name}
                          </MenuItem>
                        );
                      })}
                  </SelectField>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 col-md-6 col-lg-6">
                  <Input
                    type="text"
                    name="postcode"
                    className="w-100"
                    size="small"
                    label="Postcode"
                    value={formValues?.postcode}
                    onChange={handleFilter}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-6 margin-row">
                  <Input
                    type="text"
                    name="notes"
                    className="w-100"
                    size="small"
                    label="Notes"
                    value={formValues?.notes}
                    onChange={handleFilter}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 col-md-6 col-lg-6">
                  <Input
                    type="text"
                    name="area"
                    className="w-100"
                    size="small"
                    label="Area"
                    value={formValues?.area}
                    onChange={handleFilter}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-6 margin-row">
                  <div className="form-text">Works</div>
                  <div className="row row-cols-2 mx-1">
                    {work?.length > 0 &&
                      work.map((data, index) => {
                        return (
                          <div className="form-check" key={index}>
                            <label className="cursor-pointer">
                              <input
                                name="works"
                                className="form-check-input"
                                type="checkbox"
                                value={data?.code}
                                checked={formValues?.works?.includes(
                                  data?.code
                                )}
                                id={data.index}
                                onChange={(e) => handleFilter(e)}
                              />

                              {data.name}
                            </label>
                          </div>
                          // <label key={index} className="">
                          //   <input name="works" value={data.code} type="checkbox" />
                          //   <span className="checkmark"></span>
                          //   <div className="mx-2">{data.name}</div>
                          // </label>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="form-text">Livings</div>
                  <div className="d-flex gap-2">
                    {living[0] &&
                      living.map((data, index) => {
                        return (
                          <div className="form-check" key={index}>
                            <label className="cursor-pointer">
                              <input
                                name="livings"
                                className="form-check-input"
                                type="checkbox"
                                value={data.code}
                                checked={formValues?.livings?.includes(
                                  data?.code
                                )}
                                onChange={(e) => handleFilter(e)}
                                id={data.index}
                              />

                              {data.name}
                            </label>
                          </div>
                          // <label key={index} className="">
                          //   <input name="works" value={data.code} type="checkbox" />
                          //   <span className="checkmark"></span>
                          //   <div className="mx-2">{data.name}</div>
                          // </label>
                        );
                      })}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 margin-row">
                  <div className="form-text">Skills</div>
                  <div className="row row-cols-2 mx-1">
                    {skill[0] &&
                      skill.map((data, index) => {
                        return (
                          <div className="form-check" key={index}>
                            <label className="cursor-pointer">
                              <input
                                name="skills"
                                className="form-check-input"
                                type="checkbox"
                                value={data.code}
                                checked={formValues?.skills?.includes(
                                  data?.code
                                )}
                                id={data.index}
                                onChange={(e) => handleFilter(e)}
                              />
                              {data.name}
                            </label>
                          </div>
                          // <label key={index} className="">
                          //   <input name="works" value={data.code} type="checkbox" />
                          //   <span className="checkmark"></span>
                          //   <div className="mx-2">{data.name}</div>
                          // </label>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="form-text">Positions</div>
                  <div className="row row-cols-2 mx-1">
                    {position[0] &&
                      position.map((data, index) => {
                        return (
                          <div className="form-check" key={index}>
                            <label className="cursor-pointer">
                              <input
                                name="positions"
                                className="form-check-input"
                                type="checkbox"
                                value={data.code}
                                checked={formValues?.positions?.includes(
                                  data?.code
                                )}
                                id={data.index}
                                onChange={(e) => handleFilter(e)}
                              />
                              {data.name}
                            </label>
                          </div>
                          // <label key={index} className="">
                          //   <input name="works" value={data.code} type="checkbox" />
                          //   <span className="checkmark"></span>
                          //   <div className="mx-2">{data.name}</div>
                          // </label>
                        );
                      })}
                  </div>
                </div>
                {type !== 'jobs' && (
                  <div className="col-12 col-md-6 col-lg-6 margin-row">
                    <div className="form-text">Sex</div>
                    <div className="d-flex gap-2">
                      {gender[0] &&
                        gender.map((data, index) => {
                          return (
                            <div className="form-check" key={index}>
                              <label className="cursor-pointer">
                                <input
                                  name="gender"
                                  className="form-check-input"
                                  type="checkbox"
                                  value={data.value}
                                  checked={formValues?.gender?.includes(
                                    data?.value
                                  )}
                                  id={data.index}
                                  onChange={(e) => handleFilter(e)}
                                />
                                {data.label}
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>

              <div className="row mt-3">
                <div className="col-12 col-md-6 col-lg-6">
                  <button
                    className="clear-button"
                    onClick={() => handleClear()}
                  >
                    Clear
                  </button>
                </div>
                <div className="col-12 col-md-6 col-lg-6 margin-row">
                  <button
                    className="search-button"
                    onClick={() => handleSearch()}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Filter;

{
  /* <div className="d-flex justify-content-start candidate-main1 py-2 mt-3 gap-between">
        <div className="left-btn">
          <div className="btn-group filter-btn-h ">
            <button className="btn border filter-text filter-btn d-flex align-items-center">
              Position(All)
            </button>
            <button
              className="btn border dropdown-toggle dropdown-toggle-split"
              id="dropdownMenuReference"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-reference="parent"
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul
              className="dropdown-menu"
              style={{ textAlign: 'start' }}
              aria-labelledby="dropdownMenuReference"
            >
              {position?.length > 0 &&
                position.map((e) => {
                  return (
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => handleFilter(e.name, 'position')}
                      >
                        {e.name}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="btn-group left-btn1 filter-btn-h">
            <button className="btn border filter-text d-flex align-items-center">
              {name}
            </button>
            <button
              className="btn border dropdown-toggle dropdown-toggle-split"
              id="dropdownMenuReference"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-reference="parent"
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul
              className="dropdown-menu"
              style={{ textAlign: 'start' }}
              aria-labelledby="dropdownMenuReference"
            >
              {status?.length > 0 &&
                status.map((e) => {
                  return (
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => handleFilter(e.name, 'status')}
                      >
                        {e.name}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="input-candidate">
          <input
            type="text"
            placeholder="Search any user..."
            className="input-search-candidate"
            style={{ paddingLeft: '3rem' }}
            onChange={(e) => handleFilter(e.target.value, 'search')}
          />
          <CiSearch className="se-icon" />
        </div>

        <div
          className="btn-group sort-btn"
          role="group"
          aria-label="Button group with nested dropdown"
        >
          <button className="btn border ">
            <Tune className="me-2 fs-6" style={{ color: 'lightgrey' }} />
            <span className="add-text filter-text">Filter</span>
          </button>
          <div className="btn-group" role="group">
            <button
              id="btnGroupDrop1"
              className="btn border dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FilterListIcon
                className="me-1 fs-6"
                style={{ color: 'lightgrey' }}
              />
              <span className="add-text filter-text"> Sort by A - Z</span>
            </button>
            <ul
              style={{ textAlign: 'start' }}
              className="dropdown-menu"
              aria-labelledby="btnGroupDrop1 p-2"
            >
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => handleFilter('DESC')}
                >
                  DESC
                </a>
              </li>
            </ul>
          </div>
        </div>
        {candidate && (
          <Link to="/userdetail">
            <button className="btn add-candidate">
              <img src={UserPlus} className="me-2 add-icon" />
              <span className="add-text">Add Candidate</span>
            </button>
          </Link>
        )}
        {client && (
          <Link to="">
            <button className="btn add-candidate">
              <img src={UserPlus} className="me-2 add-icon" />
              <span className="add-text">Add Client</span>
            </button>
          </Link>
        )}
      </div>
      <Divider />
      <div className="d-flex mt-3">
        <div className="btn-group filter-btn-h">
          <button className="btn border filter-text d-flex align-items-center">
            More
          </button>
          <button
            className="btn border  dropdown-toggle dropdown-toggle-split"
            id="dropdownMenuReference"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-reference="parent"
          >
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul
            style={{ textAlign: 'start' }}
            className="dropdown-menu"
            aria-labelledby="dropdownMenuReference"
          >
            <li>
              <a className="dropdown-item" onClick={() => deleteAll()}>
                Multiple Delete
              </a>
            </li>
          </ul>
        </div>
      </div> */
}
