/** @format */

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PublicHolidayModal from '../../components/Modal/PublicHolidayModal';
// import { DataGrid } from '@material-ui/data-grid';

const PublicHoliday = () => {
  const [holidayModal, setHolidayModal] = useState(false);


  return (
    <>
      {holidayModal && <PublicHolidayModal closeModal={setHolidayModal} />}
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

    </>
  );
};

export default PublicHoliday;
