// !REMOVE
/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LeavesTable from '../../../components/Tables/EmployeeTables/Leaves/LeaveTable';
import { DefaultjobOpeningFormJson } from '../../../components/FormJSON/HR/recruitment/JobOpening';
import { useAppContext } from '../../../Context/AppContext';
import axiosInstance from '../../../services/api';
import ConfirmModal2 from '../../../components/Modal/ConfirmModal2';
import { ApproverBtn } from '../../../components/ApproverBtn';
import FormModal from '../../../components/Modal/FormModal';
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

const DefaultJobOpening = () => {
  const [formValue, setFormValue] = useState(null);
  const [template, setTemplate] = useState(DefaultjobOpeningFormJson);
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
  const create = () => {
    let initialValues = {};
    let temp = HelperService.formArrayToObject(template.Fields);
    for (let i in temp) {
      initialValues[i] = '';
    }
    setmode('add');

    setFormValue(initialValues);
    seteditData(initialValues);
  };

  const fetchJobOpenings = () => {
    axiosInstance
      .get('/api/jobOpening/defaultJobs')
      .then((res) => {
        console.log(res);
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
          .post('/api/jobOpening/defaultJobs', hash)
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
        axiosInstance
          .patch('/api/jobOpening/defaultJobs/' + editData._id, formValue)
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
      .delete(`/api/jobOpening/defaultJobs/${row._id}`)
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
      axiosInstance
        .patch('/api/jobOpening/' + statusRow._id, update)
        .then((res) => {
          fetchJobOpenings();
          showAlert(true, res.data.message, 'alert alert-success');
        })
        .catch((error) => {
          showAlert(true, error.response.data.message, 'alert alert-danger');
        });
    }
  }, [status, statusRow]);

  const columns = [
    {
      dataField: 'job_title',
      text: 'Job Title',
      sort: true,
      headerStyle: { minWidth: '150px' },
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
                data-target="#FormModal1"
                onClick={() => editRow(row)}
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </a>
            )}
            {user?.role?.hr?.delete && (
              <a
                className="dropdown-item"
                data-toggle="modal"
                data-target="#exampleModal2"
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
            <h3 className="page-title">Default Job Opening List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Employees</Link>
              </li>
              <li className="breadcrumb-item active">
                {' '}
                Default Job Opening List
              </li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#FormModal1"
              onClick={() => create()}
            >
              Add Default Job
            </a>
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

      <FormModal
        title="Default Job Opening Form"
        editData={editData}
        setformValue={setFormValue}
        template={HelperService.formArrayToObject(template.Fields)}
        setsubmitted={setSubmitted}
      />

      <ConfirmModal2
        title="Job Opening"
        selectedRow={selectedRow}
        deleteFunction={deleteJobOpening}
      />
    </>
  );
};

export default DefaultJobOpening;
