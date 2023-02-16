/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useMemo, useState, useEffect, useContext } from 'react';
import departments from '../../../db/designationList.json';
import { designation } from '../../../components/FormJSON/HR/Employee/designation';
import list from '../../../designation.json';
import LeaveTable from '../../../components/Tables/EmployeeTables/Leaves/LeaveTable';
import Select from 'react-select';
import dates from './dates.json';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../services/api';
import { useAppContext } from '../../../Context/AppContext';
import FormModal2 from '../../../components/Modal/FormModal2';
import helper from '../../../services/helper';
import { AddDesignationModal } from '../../../components/Modal/AddDesignationModal';
import { EditDesignationModal } from '../../../components/Modal/EditDesignationModal';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import ClipboardCopyNotification from './ClipboardCopyNotification';

let qualityFilter;

const Designations = () => {
  const [allDesignation, setallDesignation] = useState([]);
  const { formUpdate, setformUpdate, showAlert, user } = useAppContext();
  const [submitted, setsubmitted] = useState(false);
  const [formValue, setformValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const [editDesignation, setEditDesignation] = useState([]);
  const [clickedRow, setclickedRow] = useState(null);
  const [deleteData, setdeleteData] = useState(null);
  const [template, settemplate] = useState({});
  const [designationOpts, setDesignationOts] = useState(null);
  const [unfiltered, setunfiltered] = useState([]);
  const [mode, setmode] = useState('add');
  const [isCopied, setIsCopied] = useState(false);

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

  const editRow = (row) => {
    // setformUpdate(null)
    let formatted = helper.handleEdit(row);
    setmode('edit');
    setformUpdate(formatted);
    setclickedRow(formatted);
  };

  const handleEditApplication = (row) => {
    setEditDesignation(row);
  };

  const fetchDesignation = () => {
    settemplate(designation);
    axiosInstance.get('/designation').then((res) => {
      const response = res?.data?.data;

      const formatted = response.map((e, idx) => ({
        ...e,
        index: idx + 1,
      }))
      setallDesignation(formatted);

      setunfiltered(formatted);
      const depsigOpts = res.data.data.map((e) => {
        return {
          label: e.designation,
          value: e._id,
        };
      });
      setDesignationOts(depsigOpts);
    });
  };

  useEffect(() => {
    fetchDesignation();
  }, []);

  const handleClick = (i) => {
    if (i?.value === 'All' || i === null) {
      setallDesignation(unfiltered);
    } else {
      const filt = unfiltered.filter((e) => {
        return i.label.includes(e.designation);
      });

      setallDesignation(filt);
    }
  };

  useEffect(() => {
    fetchDesignation();

    if (submitted) {
      if (mode === 'add') {
        axiosInstance
          .post('/designation', formValue)
          .then((e) => {
            showAlert(
              true,
              'Designation successfully created',
              'alert alert-success'
            );
            // setformValue(null);
            fetchDesignation();
          })
          .catch((err) => {
            // setformValue(null);
            console.log(err);
          });
      } else {
        // formValue._id = formUpdate._id;
        axiosInstance
          .put('/designation/' + formUpdate._id, formValue)
          .then((e) => {
            showAlert(
              true,
              'Designation successfully updated',
              'alert alert-success'
            );
            setformValue(null);
            fetchDesignation();
          })
          .catch((err) => {
            setformValue(null);
            console.log(err);
          });
      }
    }
    // setallDepartments(departments);
  }, [formValue]);

  const deleteDesignation = (row) => {
    console.log('Id:', row._id);
    axiosInstance
      .patch(`/designation/${row._id}`)
      .then((res) => {
        console.log('this:', res);
        // setallDesignation((prevData) =>
        //   prevData.filter((pdata) => pdata._id !== row._id)
        // );
        showAlert(true, res?.data?.message, 'alert alert-info');
        fetchDesignation();
        window.location.reload();
        // $('#exampleModal').modal('toggle');
      })
      .catch((error) => {
        console.log('That:', error?.response?.data?.message);
        showAlert(true, error?.response?.data?.message, 'alert alert-danger');
      });
  };

  const columns = [
    {
      dataField: "index",
      text: "#",
      headerStyle: { width: "5%" },
    },
    {
      dataField: 'designation',
      text: 'Designation',
      sort: true,
      headerStyle: { width: '40%' },
    },
    {
      dataField: '_id',
      text: 'Designation ID',
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
      dataField: 'createdAt',
      text: 'Created',
      sort: true,
      headerStyle: { width: '20%' },
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
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
                href="#"
                data-toggle="modal"
                data-target="#FormEditModal"
                onClick={() => handleEditApplication(row)}
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
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <AddDesignationModal allDesignation={fetchDesignation} />
      <EditDesignationModal
        editDesignation={editDesignation}
        fetchDesignation={fetchDesignation}
      />
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Designations</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Designations</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {user?.role?.hr?.create && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
                // onClick={() => create()}
              >
                <i className="fa fa-plus"></i> Add Designation
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="row  ">
        <div className="col-3 mb-2">
          <Select
            defaultValue={[]}
            onChange={handleClick}
            options={designationOpts}
            placeholder="Filter Designations"
            isClearable={true}
            style={{ display: 'inline-block' }}
            // formatGroupLabel={formatGroupLabel}
          />
        </div>
        <LeaveTable
          data={allDesignation}
          // defaultSorted={defaultSorted}
          columns={columns}
        />
      </div>
      <FormModal2
        title="Create Designation"
        editData={editData}
        setformValue={setformValue}
        template={template}
        setsubmitted={setsubmitted}
      />
      <ConfirmModal
        title="Designation"
        selectedRow={deleteData}
        deleteFunction={deleteDesignation}
      />
      {isCopied && <ClipboardCopyNotification />}
    </>
  );
};

export default Designations;
