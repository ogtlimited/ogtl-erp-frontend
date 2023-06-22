/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../services/api';
import { useAppContext } from '../../../Context/AppContext';
import { DesignationFormModal } from '../../../components/Modal/DesignationFormModal';
import { DesignationForm } from '../../../components/FormJSON/CreateDesignation';
import moment from 'moment';
import UniversalPaginatedTable from '../../../components/Tables/UniversalPaginatedTable';

const Designations = () => {
  const { user } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [designations, setDesignations] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [mode, setMode] = useState("Create");

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");
  
  const CurrentUserRoles = user?.employee_info?.roles

 // All Designations:
 const fetchDesignations = useCallback(async () => {
  try {
    const response = await axiosInstance.get('/api/v1/designations.json', {
      headers: {          
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": "69420",
      },
      params: {
        pages: page,
        limit: sizePerPage,
      },
    });
    const resData = response?.data?.data?.designations;
    const totalPages = response?.data?.data?.pages;
    
    const thisPageLimit = sizePerPage;
    const thisTotalPageSize = totalPages;

    setSizePerPage(thisPageLimit);
    setTotalPages(thisTotalPageSize);

    const formattedDesignation = resData.map((e, index) => ({
      ...e,
      // index: index + 1,
      created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
    }));

    setDesignations(formattedDesignation);
    setLoading(false);
  } catch (error) {
    console.log("Get All Designations error:", error);
    setLoading(false);
  }
}, [page, sizePerPage]);

  useEffect(() => {
    fetchDesignations();
  }, [fetchDesignations]);

  const handleCreate = () => {
    setMode("Create");
    setDesignation(DesignationForm);
  };

  const handleEdit = (row) => {
    setDesignation(row);
    setMode("Edit");
  };

  const columns = [
    // {
    //   dataField: "index",
    //   text: "S/N",
    //   sort: true,
    //   headerStyle: { width: "5%" },
    // },
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
            {CurrentUserRoles.includes("hr_manager") && (
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#DesignationFormModal"
                onClick={() => handleEdit(row)}
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </a>
            )}

            {CurrentUserRoles.includes("hr_manager") && (
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
            {CurrentUserRoles.includes("hr_manager") && (
              <a
                href="/"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#DesignationFormModal"
                onClick={handleCreate}
              >
                <i className="fa fa-plus"></i> Create Designation
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="row  ">
        <UniversalPaginatedTable
          data={designations}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
          
          page={page}
          setPage={setPage}
          sizePerPage={sizePerPage}
          setSizePerPage={setSizePerPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
        />
      </div>

      <DesignationFormModal
        mode={mode}
        data={designation}
        fetchDesignations={fetchDesignations}
      />

    </>
  );
};

export default Designations;
