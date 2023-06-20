/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../services/api';
import { useAppContext } from '../../../Context/AppContext';
import { AddDesignationModal } from '../../../components/Modal/AddDesignationModal';
import { EditDesignationModal } from '../../../components/Modal/EditDesignationModal';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import moment from 'moment';
import UniversalTable from '../../../components/Tables/UniversalTable';

const Designations = () => {
  const [designations, setDesignations] = useState([]);
  const { user } = useAppContext();
  const [editDesignation, setEditDesignation] = useState([]);
  const [deleteData, setdeleteData] = useState(null);
  
  const actionUser = user?.employee_info?.roles

 // All Designations:
 const fetchDesignations = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/designations.json', {
      headers: {          
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": "69420",
      },
    });
    const resData = response?.data?.data?.designations;

    const formattedDesignation = resData.map((e, index) => ({
      index: index + 1,
      title: e?.title.toUpperCase(),
      created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
    }));

    setDesignations(formattedDesignation);
  } catch (error) {
    console.log("Get All Designations error:", error);
  }
};

  useEffect(() => {
    fetchDesignations();
  }, []);

  const columns = [
    {
      dataField: "index",
      text: "S/N",
      sort: true,
      headerStyle: { width: "5%" },
    },
    {
      dataField: "title",
      text: "Designations",
      sort: true,
      headerStyle: { width: "35%" },
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "",
      text: "Action",
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <div className="dropdown dropdown-action text-right">
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            {actionUser.includes("hr_manager") && (
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </a>
            )}

            {actionUser.includes("hr_manager") && (
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <i className="fa fa-trash m-r-5"></i> Delete
              </a>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Designations</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="#">HR</Link>
              </li>
              <li className="breadcrumb-item active">Designations</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {actionUser.includes("hr_manager") && (
              <a
                href="/"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-plus"></i> Add Designation
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="row  ">
        <UniversalTable
          data={designations}
          columns={columns}
        />
      </div>

      <AddDesignationModal allDesignation={fetchDesignations} />

      <EditDesignationModal
        editDesignation={editDesignation}
        fetchDesignation={fetchDesignations}
      />

      <ConfirmModal
        title="Designation"
        selectedRow={deleteData}
      />
    </>
  );
};

export default Designations;
