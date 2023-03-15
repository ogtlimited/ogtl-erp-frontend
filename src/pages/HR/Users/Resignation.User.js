/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from 'react';
import LeavesTable from '../../../components/Tables/EmployeeTables/Leaves/LeaveTable';
import { resignationFormJson } from '../../../components/FormJSON/HR/Employee-lifecycle/Resignation';
import tokenService from '../../../services/token.service';
import axiosInstance from '../../../services/api';
import ViewModal from '../../../components/Modal/ViewModal';
// import { ApplyLeaveModal } from '../../../components/Modal/ApplyLeaveModal';
// import { EditLeaveModal } from '../../../components/Modal/EditLeaveModal';
import { useAppContext } from '../../../Context/AppContext';
import FormModal from '../../../components/Modal/Modal';
import ResignationContent from '../../../components/ModalContents/ResignationContent';
import moment from 'moment';

const ResignationUser = () => {
  const { createPerfomance, showAlert, user } = useAppContext();
  const [data, setData] = useState([]);
  const [template, setTemplate] = useState(resignationFormJson);
  const [modalType, setmodalType] = useState('');
  const [viewRow, setViewRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadSelect, setloadSelect] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [editData, seteditData] = useState({});
  
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState('');

  const currentUser = tokenService.getUser();

  // const fetchResignation = () => {
  //   axiosInstance
  //     .get("/Exit")
  //     .then((res) => {
  //       console.log("Resignation Data:", res?.data?.data)
  //       const map = res?.data?.data.map(e => {
  //         return {
  //           ...e,
  //           fullName: `${e?.employee_id?.first_name} ${e?.employee_id?.last_name}`,
  //           resignation_letter_date: new Date(e?.resignation_letter_date).toDateString(),
  //           relieving_date: new Date(e?.relieving_date).toDateString(),

  //         }
  //       })
  //       setData(map);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  
  useEffect(() => {
    // fetchResignation();
  }, []);

  useEffect(() => {
    createPerfomance().then((res) => {
      const { employees } = res.data.createPerformanceForm;
      const employeeOpts = employees?.map((e) => {
        return {
          label: `${e.first_name} ${e.last_name}`,
          value: e._id,
        };
      });
      const finalForm = resignationFormJson.Fields.map((field) => {
        if (field.name === "employee_id") {
          field.options = employeeOpts;
          return field;
        }
        return field;
      });
      setTemplate({
        title: resignationFormJson.title,
        Fields: finalForm,
      });

      if (!loadSelect) setloadSelect(true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

   //create Resignation
   useEffect(() => {
    if (submitted === true) {
      axiosInstance
        .post("/Exit", formValue)
        .then((res) => {
          setSubmitted(false);
          // fetchResignation();

          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error.response.data);
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
  }, [submitted]);

  const userColumns = [
    {
      dataField: "fullName",
      text: "Employee name",
      sort: true,
      headerStyle: { width: "250px" },
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      formatter: (value, row) => (
        <>
          {value === 'approved' ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-success"></i> {value}
            </span>
          ) : value === 'cancelled' ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-primary"></i> {value}
            </span>
          ) : value === 'rejected' ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-danger"></i> {value}
            </span>
          ) : value === 'pending' ? (
            <span className="btn btn-gray btn-sm btn-rounded ">
              <i className="fa fa-dot-circle-o text-warning"></i> {value}
            </span>
          ) : null}
        </>
      ),
    },
    {
      dataField: "reason_for_resignation",
      text: "Reason for Resignation",
      sort: true,
    },

    {
      dataField: "resignation_letter_date",
      text: "Resignation Letter Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "relieving_date",
      text: "Effective Resignation Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: 'status_action',
      text: 'Action',
      csvExport: false,
      headerStyle: { width: '10%' },
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
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#generalModal"
              onClick={() => {
                setmodalType('view-details');
                setViewRow(row);
              }}
            >
              <i className="fa fa-eye m-r-5"></i> View
            </a>

            {row.status === 'pending' && row.acted_on === false ? (
              <a
                href="#"
                className="dropdown-item"
                data-toggle="modal"
                data-target="#EditModal"
                // onClick={() => handleEditApplication(row)}
              >
                <i className="fa fa-edit m-r-5"></i> Edit
              </a>
            ) : null}
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
            <h3 className="page-title">Leaves</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Leaves</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {loadSelect && user?.role?.hr?.create && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-plus"></i> Apply Resignation
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <LeavesTable data={data} columns={userColumns} />
        </div>
      </div>

      {loadSelect && (
        <FormModal
          editData={editData}
          template={template}
          setsubmitted={setSubmitted}
          setformValue={setFormValue}
        />
      )}

      {modalType === 'view-details' ? (
        <ViewModal
          title="Leave Application Details"
          content={<ResignationContent Content={viewRow} />}
        />
      ) : (
        ''
      )}

      {/* <ApplyLeaveModal fetchYourLeaves={fetchYourLeaves} />
      <EditLeaveModal editLeave={editLeave} fetchYourLeaves={fetchYourLeaves} /> */}
    </>
  );
};

export default ResignationUser;
