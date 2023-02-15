/* eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect } from 'react';
import departments from '../../../db/departments.json';

import LeaveTable from '../../../components/Tables/EmployeeTables/Leaves/LeaveTable';
import { Link, useNavigate } from 'react-router-dom';
import { departmentFormJson } from '../../../components/FormJSON/HR/Employee/department';
import FormModal2 from '../../../components/Modal/FormModal2';
import axiosInstance from '../../../services/api';
import { useAppContext } from '../../../Context/AppContext';
import Select from 'react-select';
import helper from '../../../services/helper';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import ClipboardCopyNotification from './ClipboardCopyNotification';
import { AddDepartmentModal } from '../../../components/Modal/AddDepartmentModal';

const Departments = () => {
  const navigate = useNavigate();
  const [template, settemplate] = useState({});
  const { formUpdate, setformUpdate, showAlert, user } = useAppContext();
  const [submitted, setsubmitted] = useState(false);
  const [formValue, setformValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [deleteData, setdeleteData] = useState(null);
  const [departMentOpts, setDepartmentOts] = useState(null);
  const [unfiltered, setunfiltered] = useState([]);
  const [mode, setmode] = useState('add');
  const [isCopied, setIsCopied] = useState(false);

  const [allDepartments, setallDepartments] = useState([]);

  // Clipboard Copy Async Function
  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  // Clipboard copy onclick event
  const handleCopyClick = (row) => {
    copyTextToClipboard(row._id)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const fetchDept = () => {
    settemplate(departmentFormJson);
    axiosInstance.get('/department').then((e) => {
      const res = e?.data?.data;

      const formatted = res.map((e, idx) => ({
        ...e,
        index: idx + 1,
      }))
      setallDepartments(formatted);

      setunfiltered(formatted);
      const departOpts = e.data.data.map((e) => {
        return {
          label: e.department,
          value: e._id,
        };
      });
      setDepartmentOts(departOpts);
    });
  };
  const editRow = (row) => {
    // setformUpdate(null)
    let formatted = helper.handleEdit(row);
    setmode('edit');
    seteditData(formatted);
    setformUpdate(formatted);
    setclickedRow(formatted);
  };
  const create = () => {
    let initialValues = {};
    for (let i in template) {
      initialValues[i] = '';
    }
    setmode('add');
    setformValue(initialValues);
    seteditData(initialValues);
  };

  const handleClick = (i) => {
    if (i?.value === 'All' || i === null) {
      setallDepartments(unfiltered);
    } else {
      const filt = unfiltered.filter((e) => i.label.includes(e.department));

      setallDepartments(filt);
    }
  };
  useEffect(() => {
    fetchDept();
    setallDepartments(departments);
  }, []);

  useEffect(() => {
    if (submitted) {
      if (mode === 'add') {
        axiosInstance
          .post('/department', formValue)
          .then((e) => {
            // setformValue({});
            fetchDept();
            showAlert(true, 'New department created', 'alert alert-success');
          })
          .catch((err) => {
            // setformValue(null);
            setsubmitted(false);
            showAlert(true, err?.response?.data?.message, 'alert alert-danger');
          });
      } else {
        axiosInstance
          .put('/department/' + editData._id, formValue)
          .then((e) => {
            setformValue(null);
            showAlert(
              true,
              'Department successfully updated',
              'alert alert-success'
            );
            fetchDept();
          })
          .catch((err) => {
            setformValue(null);
            setsubmitted(false);
            // showAlert(true, err?.response?.data?.message, 'alert alert-danger');
          });
      }
    }
  }, [formValue]);

  const viewShifts = (row) => {
    localStorage.setItem("department", row.department);
    navigate(`/dashboard/hr/departments/shifts/${row._id}`)
  }

  const deleteDepartment = (row) => {
    axiosInstance
      .delete(`/department/${row._id}`)
      .then((res) => {
        fetchDept();
        setallDepartments((prevData) =>
          prevData.filter((pdata) => pdata._id !== row._id)
        );
        showAlert(true, res.data.message, 'alert alert-info');
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, 'alert alert-danger');
      });
  };
  const columns = [
    {
      dataField: 'index',
      text: '#',
      headerStyle: { width: '5%' },
    },
    {
      dataField: 'department',
      text: 'Department',
      sort: true,
      headerStyle: { width: '40%' },
    },
    {
      dataField: '_id',
      text: 'Department ID',
      sort: true,
      headerStyle: { width: '10%' },
    },
    {
      dataField: '',
      text: '',
      headerStyle: { width: '20%' },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleCopyClick(row)}
            >
              Copy to clipboard <i className="fa fa-copy"></i>
            </button>
          </div>
        </div>
      ),
    },
    {
      dataField: '',
      text: 'Action',
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
            {user?.role?.hr?.update && (
              <a
                className="dropdown-item"
                onClick={() => editRow(row)}
                href="#"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </a>
            )}

            {user?.role?.hr?.delete && (
              <a
                className="dropdown-item"
                onClick={() => setdeleteData(row)}
                href="#"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <i className="fa fa-trash m-r-5"></i> Delete
              </a>
            )}
            
            <a
                className="dropdown-item"
                onClick={() => viewShifts(row)}
                href="#"
                data-toggle="modal"
                data-target="#ShiftFormModal"
              >
                <i className="fa fa-clock m-r-5"></i> Shifts
              </a>
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
            <h3 className="page-title">Department</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Department</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {user?.role?.hr?.create && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#DepartmentFormModal"
                // data-target="#FormModal"
                // onClick={() => create()}
              >
                <i className="fa fa-plus"></i> Add Department
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-3 mb-2">
          <Select
            defaultValue={[]}
            onChange={handleClick}
            options={departMentOpts}
            placeholder="Filter Departments"
            isClearable={true}
            style={{ display: 'inline-block' }}
            // formatGroupLabel={formatGroupLabel}
          />
        </div>
        <LeaveTable
          data={allDepartments}
          // defaultSorted={defaultSorted}
          columns={columns}
        />
      </div>
      <FormModal2
        title="Create Department"
        editData={editData}
        setformValue={setformValue}
        template={template}
        setsubmitted={setsubmitted}
      />
      <ConfirmModal
        title="Department"
        selectedRow={deleteData}
        deleteFunction={deleteDepartment}
      />

      <AddDepartmentModal getAllDepartments={fetchDept} />
      
      {isCopied && <ClipboardCopyNotification />}
    </>
  );
};

export default Departments;
