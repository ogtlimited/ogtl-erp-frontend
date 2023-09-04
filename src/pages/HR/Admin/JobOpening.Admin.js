// !REMOVE
/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LeavesTable from '../../../components/Tables/EmployeeTables/Leaves/LeaveTable';
import { jobOpeningFormJson } from '../../../components/FormJSON/HR/recruitment/JobOpening';
import { useAppContext } from '../../../Context/AppContext';
import axiosInstance from '../../../services/api';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import { ApproverBtn } from '../../../components/ApproverBtn';
import FormModal2 from '../../../components/Modal/FormModal2';
import HelperService from '../../../services/helper';
import Select from 'react-select';
import helper from '../../../services/helper';

const jobOpts = [
  {
    label: 'CLOSED',
    value: 'CLOSED',
  },
  {
    label: 'OPEN',
    value: 'OPEN',
  },
];

const JobOpening = () => {
  const [formValue, setFormValue] = useState(null);
  const [template, setTemplate] = useState(jobOpeningFormJson);
  const [submitted, setSubmitted] = useState(false);
  const { createRecruitmens, showAlert, setformUpdate, user } = useAppContext();
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editData, seteditData] = useState(null);
  const [statusRow, setstatusRow] = useState(null);
  const [status, setStatus] = useState('');
  const [clickedRow, setclickedRow] = useState(null);
  const [loadSelect, setloadSelect] = useState(false);
  const [unfiltered, setunfiltered] = useState([]);
  const [mode, setmode] = useState('add');

  const editRow = (row) => {
    setmode('edit');
    seteditData(row);
    let formatted = helper.handleEdit(row);
    setformUpdate(formatted);
    setclickedRow(formatted);
  };


  const fetchJobOpenings = () => {
    axiosInstance
      .get('/api/jobOpening/open-and-closed')
      .then((res) => {
        setData(res.data.data);
        setunfiltered(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchJobOpenings();
  }, []);
  const handleClick = (i) => {
    if (i?.value === 'All' || i === null) {
      setData(unfiltered);
    } else {
      const filt = unfiltered.filter((e) => i.label.includes(e.status));

      setData(filt);
    }
  };

  //create job opening
  useEffect(() => {
    if (submitted) {
      if (mode === 'add') {
        let hash = {};
        for (const [key, value] of Object.entries(formValue)) {
          if (value !== '') {
            hash[key] = value;
          }
        }

        axiosInstance
          .post('/api/jobOpening', hash)
          .then((res) => {
            // setFormValue(null);
            setSubmitted(false);
            setData((prevData) => [...prevData, res.data.data]);
            fetchJobOpenings();

            showAlert(true, res.data?.message, 'alert alert-success');
          })
          .catch((error) => {
            console.log(error);
            setSubmitted(false);
            // setFormValue(null);
            showAlert(
              true,
              error?.response?.data?.message,
              'alert alert-danger'
            );
          });
      } else {
        formValue._id = editData._id;
        // delete formValue.__v;
        // delete formValue.createdAt;
        // delete formValue.updatedAt;

        axiosInstance
          .patch('/api/jobOpening/' + editData._id, formValue)
          .then((res) => {
            // setFormValue(null);
            setSubmitted(false);
            fetchJobOpenings();
            showAlert(true, res?.data?.message, 'alert alert-success');
          })
          .catch((error) => {
            console.log(error);
            // setFormValue(null);
            setSubmitted(false);
            showAlert(
              true,
              error?.response?.data?.message,
              'alert alert-danger'
            );
            console.log("edit this formValue:", formValue);
          });
      }
    }
  }, [formValue, editData]);

  // useEffect(() => {

  //   seteditData(clickedRow);
  // }, [clickedRow, submitted]);

  //delete job opening
  const deleteJobOpening = (row) => {
    axiosInstance
      .delete(`/api/jobOpening/${row._id}`)
      .then((res) => {
        setData((prevData) =>
          prevData.filter((pdata) => pdata._id !== row._id)
        );
        showAlert(true, res.data.message, 'alert alert-info');
      })
      .catch((error) => {
        showAlert(true, error.response.data.message, 'alert alert-danger');
      });
  };

  //update jobOpening
  useEffect(() => {
    if (status.length) {
      const update = {
        ...statusRow,
        status: status,
        designation_id: statusRow.designation_id?._id,
        project_id: statusRow.project_id?._id,
      };
      delete update.__v;
      console.log('Updated?:', update);
      axiosInstance
        .patch('/api/jobOpening/' + statusRow._id, {
          _id: update._id,
          status: update.status,
          job_title: update.job_title,
          designation_id: update.designation_id,
        })
        .then((res) => {
          fetchJobOpenings();
          showAlert(true, res.data.message, 'alert alert-success');
        })
        .catch((error) => {
          showAlert(true, error.response.data.message, 'alert alert-danger');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, statusRow]);

  const columns = [
    {
      dataField: 'job_title',
      text: 'Job Title',
      sort: true,
      headerStyle: { minWidth: '150px' },
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      headerStyle: { minWidth: '100px' },
      formatter: (value, row) => (
        <>
          <ApproverBtn
            setstatusRow={setstatusRow}
            setStatus={setStatus}
            value={value}
            row={row}
            context="job_opening"
          />
        </>
      ),
    },
    {
      dataField: 'designation_id',
      text: 'Designation',
      sort: true,
      headerStyle: { minWidth: '100px' },
      formatter: (value, row) => <h2>{row?.designation_id?.designation}</h2>,
    },
    {
      dataField: 'project_id',
      text: 'Project',
      sort: true,
      headerStyle: { minWidth: '100px' },
      formatter: (value, row) => (
        <h2>{row?.project_id?.project_name || 'Not Available'}</h2>
      ),
    },
    {
      dataField: 'location',
      text: 'Location',
      sort: true,
      headerStyle: { minWidth: '100px' },
      formatter: (value, row) => (
        <h2>{row?.location?.branch || 'Not Available'}</h2>
      ),
    },
    {
      dataField: '',
      text: 'Action',
      sort: true,
      headerStyle: { minWidth: '70px', textAlign: 'left' },
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
            {user?.role?.hr?.update && (
              <a
                className="dropdown-item"
                data-toggle="modal"
                data-target="#FormModal"
                onClick={() => editRow(row)}
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </a>
            )}
            {user?.role?.hr?.delete && (
              <a
                className="dropdown-item"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => {
                  setSelectedRow(row);
                }}
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
        <div className="row">
          <div className="col">
            <h3 className="page-title">Job Opening List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Employees</Link>
              </li>
              <li className="breadcrumb-item active">Job Opening List</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {loadSelect && user?.role?.hr?.create ? (
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#FormModal"
                // onClick={() => create()}
              >
                Add Job Opening
              </a>
            ) : (
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#FormModal"
                // onClick={() => create()}
              >
                <div className="spinner-border" role="status" style={{height: "20px", width: "20px"}}>
                  <span className="sr-only">Loading...</span>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="col-3 mb-2">
            <Select
              defaultValue={[]}
              onChange={handleClick}
              options={jobOpts}
              placeholder="Filter Job Openings"
              isClearable={true}
              style={{ display: 'inline-block' }}
              // formatGroupLabel={formatGroupLabel}
            />
          </div>
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
      {loadSelect ? (
        <FormModal2
          title={mode === 'add' ? 'Create Job Opening' : 'Edit Job Opening'}
          editData={editData}
          setformValue={setFormValue}
          template={HelperService.formArrayToObject(template.Fields)}
          setsubmitted={setSubmitted}
        />
      ) : (
        <FormModal2
          title={
            mode === 'add'
              ? 'Create Job Opening'
              : 'Loading form, please wait...'
          }
        />
      )}
      
      <ConfirmModal
        title="Job Opening"
        selectedRow={selectedRow}
        deleteFunction={deleteJobOpening}
      />
    </>
  );
};

export default JobOpening;
