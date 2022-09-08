/** @format */

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PublicHolidayModal from '../../components/Modal/PublicHolidayModal';
import HolidayListModal from '../../components/Modal/HolidayListModal';
import { PublicHolidayList } from '../../components/FormJSON/PublicHolidayList';

const PublicHoliday = () => {
  const [holidayModal, setHolidayModal] = useState(false);
  const [viewHoliday, setViewHoliday] = useState(false);
  const [data, setData] = useState(PublicHolidayList);
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(null);

  // View Public Holiday
  const handleViewHoliday = (publicHoliday) => () => {
    setViewHoliday(true);
    setList(publicHoliday);
  };

  //  Delete Public Holiday
  const handleDeleteHoliday = (publicHolidayToRemove) => () => {
    setData((holidays) =>
      holidays.filter((holiday) => holiday.id !== publicHolidayToRemove.id)
    );
  };

  // Edit Public Holiday
  const handleEditHoliday = (publicHoliday) => () => {
    setHolidayModal(true);
    setList(publicHoliday);
  };

  return (
    <>
      {holidayModal && <PublicHolidayModal closeModal={setHolidayModal} />}
      {viewHoliday && (
        <HolidayListModal closeModal={setViewHoliday} list={list} />
      )}
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Public Holidays</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active"> Public Holiday</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <button
              onClick={() => setHolidayModal(true)}
              className="btn add-btn"
              data-toggle="modal"
              data-target="#add_public_holiday"
            >
              <i className="fa fa-plus"></i>
              Add Public Holiday
            </button>
          </div>
        </div>
      </div>
      <div className="public-holiday-list">
        <table className="public-holiday-table">
          <thead className="public-holiday-table-head">
            <tr className="public-holiday-table-th">
              <th>Title</th>
              <th>Date of Application</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="public-holiday-table-body">
            {data.map((publicHoliday) => (
              <tr key={publicHoliday.id} className="public-holiday-table-td">
                <td>{publicHoliday.title}</td>
                <td>{publicHoliday.date_of_Application}</td>
                <button
                  className="req-table-btn view-holiday-btn"
                  onClick={handleViewHoliday(publicHoliday)}
                >
                  View
                </button>
                <button
                  className="req-table-btn delete-holiday-btn"
                  onClick={handleDeleteHoliday(publicHoliday)}
                >
                  Delete
                </button>
                <button
                  className="req-table-btn edit-holiday-btn"
                  onClick={handleEditHoliday(publicHoliday)}
                >
                  Edit
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PublicHoliday;
