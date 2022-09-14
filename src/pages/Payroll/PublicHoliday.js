/** @format */

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PublicHolidayModal from '../../components/Modal/PublicHolidayModal';
import HolidayListModal from '../../components/Modal/PublicHolidayViewModal';
import PublicHolidayEditModal from '../../components/Modal/PublicHolidayEditModal';
import { PublicHolidayList } from '../../components/FormJSON/PublicHolidayList';

const PublicHoliday = () => {
  const [holidayModal, setHolidayModal] = useState(false);
  const [viewHoliday, setViewHoliday] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data] = useState(PublicHolidayList);
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState(allData);
  const [list, setList] = useState([]);

  // Search Public Holiday
  const handlePublicHolidaySearch = (e) => {
    const search = e.target.value;
    const filteredData = allData.filter((data) => {
      return data.title.toLowerCase().includes(search.toLowerCase());
    });
    setFilterData(filteredData);
  };

  // View Public Holiday
  const handleViewHoliday = (publicHoliday) => () => {
    setViewHoliday(true);
    setList(publicHoliday);
  };

  //  Delete Public Holiday
  const handleDeleteHoliday = (publicHolidayToRemove) => () => {

    // Call [DELETE] API to delete public holiday
    setFilterData((holidays) =>
      holidays.filter((holiday) => holiday.id !== publicHolidayToRemove.id)
    );
  };

  // Edit Public Holiday
  const handleEditHoliday = (publicHoliday) => () => {

    // Call [PUT] API to edit public holiday
    setEditModal(true);
    setList(publicHoliday);
  };

  useEffect(() => {

    //  [GET] Public Holiday from API and set to state variable allData to aid filtering
    setAllData(data);
    setFilterData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {holidayModal && <PublicHolidayModal closeModal={setHolidayModal} />}
      {editModal && (
        <PublicHolidayEditModal closeModal={setEditModal} list={list} />
      )}
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

      {/* Start of Search bar */}
      <input
        type="search"
        className="public-holiday-search"
        placeholder="Search..."
        onChange={(e) => handlePublicHolidaySearch(e)}
      />
      {/* End of Search bar */}

      {/* Start of Public Holiday Table*/}
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
            {filterData.length > 0 ? (
              filterData.map((publicHoliday) => (
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
              ))
            ) : (
              <div className="no-ph-div">
                <p className="no-ph">No Public Holiday Record</p>
              </div>
            )}
          </tbody>
        </table>
      </div>
      {/* End of Public Holiday Table*/}

      {/* Start of Pagination */}
      {/* End of Pagination */}
    </>
  );
};

export default PublicHoliday;
