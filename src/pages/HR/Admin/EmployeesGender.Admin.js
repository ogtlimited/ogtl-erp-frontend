/**
 * /* eslint-disable eqeqeq
 *
 * @format
 */

/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { employeeFormJson } from '../../../components/FormJSON/HR/Employee/employee';

import FormModal2 from '../../../components/Modal/FormModal2';
import EmployeesGenderTable from '../../../components/Tables/EmployeeTables/employeeGenderTable';

import { useAppContext } from '../../../Context/AppContext';

import axiosInstance from '../../../services/api';
import Papa from 'papaparse';
import helper from '../../../services/helper';
import UploadModal from '../../../components/Modal/uploadModal';
import EmployeeHelperService from './employee.helper';

const AllEmployeesGenderAdmin = () => {
  const breadcrumb = 'All Employees';
  const [allEmployees, setallEmployees] = useState([]);
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);
  const [totalGenderCount, setTotalGenderCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [designation, setDesignation] = useState([]);
  const { fetchEmployee, createEmployee, showAlert } = useAppContext();
  const [selectedOption, setSelectedOption] = useState(null);
  const [formValue, setformValue] = useState({});
  const [editData, seteditData] = useState({});
  const [template, settemplate] = useState({});
  const [submitted, setsubmitted] = useState(false);
  const [filters, setfilters] = useState([]);
  const [toggleModal, settoggleModal] = useState(false);
  const [uploading, setuploading] = useState(false);
  const [combinedData, setcombinedData] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loadForm, setloadForm] = useState(false);
  const [mode, setmode] = useState('add');
  const { user } = useAppContext();
  // const navigate = useNavigate();
  const { id } = useParams();
  const [unfiltered, setunfiltered] = useState([]);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);

  const [prevPage, setPrevPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [totalPages, setTotalPages] = useState('');

  const [designationFilter, setDesignationFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const genderData = JSON.parse(localStorage.getItem('gender'));
  const genderTitle = genderData.labels;
  const genderCount = genderData.data;

  const fetchEmployeeByGender = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get(`/employees/gender/${id}`, {
        params: {
          designation: designationFilter,
          search: searchTerm,
          page: page,
          limit: sizePerPage,
        },
      })
      .then((res) => {
        let resData = res?.data?.data?.employeesByGender.employeesByGender;
        let resOptions = res?.data?.data?.employeesByGender.pagination;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = resOptions?.numberOfPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        let formatted = resData.map((e) => ({
          ...e,
          fullName: e.first_name + ' ' + e.last_name + ' ' + e?.middle_name,
          designation_name: e?.designation?.designation,
          department_name: e?.department?.department,
        }));

        setallEmployees(formatted);
        setunfiltered(formatted);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [designationFilter, id, page, searchTerm, sizePerPage]);

  const fetchDesignationByGender = useCallback(() => {
    axiosInstance
      .get(`/employees-gender/designations/${id}`)
      .then((res) => {
        let resData = res?.data?.data?.designationsByGender;
        let formattedDesignation = resData.map((e) => e?._id?.designation);
        setDesignation(formattedDesignation);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchEmployeeByGender();
    fetchDesignationByGender();
  }, [fetchDesignationByGender, fetchEmployeeByGender]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  useEffect(() => {
    const obj = helper.formArrayToObject(employeeFormJson.Fields);
    settemplate(obj);
  }, []);

  useEffect(() => {}, [editData, mode]);
  useEffect(() => {
    createEmployee().then((res) => {
      setcombinedData(res);
      const {
        shifts,
        designations,
        branches,
        departments,
        projects,
        acceptedJobOffers,
        employees,
      } = res.data.createEmployeeForm;
      const empHelper = new EmployeeHelperService(
        shifts,
        designations,
        branches,
        departments,
        projects,
        acceptedJobOffers,
        employees
      );
      const service = empHelper.mapRecords();

      setfilters([
        // {
        //   name: "projectId",
        //   placeholder: "Filter by campaign",
        //   options: service.campaingOpts,
        // },
        // {
        //   name: "department",
        //   placeholder: "Filter by department",
        //   options: service.deptopts,
        // },
        {
          name: 'designation',
          placeholder: 'Filter by designation',
          options: service.designationOpts,
        },
      ]);
      const finalForm = empHelper.finalForm(employeeFormJson, service, mode);
      // settemplate(
      //   {
      //     title: employeeFormJson.title,
      //     Fields: finalForm
      //   }
      // )
      const obj = helper.formArrayToObject(finalForm);
      let initialValues = {
        leaveCount: 0,
      };
      for (let i in obj) {
        initialValues[i] = '';
      }

      if (mode == 'add') {
        // seteditData(initialValues);
        settemplate(obj);
      } else {
        // settemplate(obj);
      }

      if (!loadForm) setloadForm(true);
    });
  }, [mode]);
  const create = () => {
    let initialValues = {};
    for (let i in template) {
      if (i == 'isAdmin') {
        initialValues[i] = false;
      } else if (i == 'date_of_joining') {
        initialValues[i] = new Date().toISOString().slice(0, 10);
      } else {
        initialValues[i] = '';
      }
    }
    setformValue(initialValues);
    seteditData(initialValues);
  };
  // Submit
  useEffect(() => {
    if (submitted) {
      formValue.image = '';
      const fullName = formValue.applicant?.split('-');
      if (mode === 'add') {
        formValue['first_name'] = fullName[0];
        formValue['last_name'] = fullName[1];
        formValue['middle_name'] = fullName[2];
        delete formValue.applicant;
      }

      if (mode === 'add') {
        axiosInstance.post('/employees', formValue).then((res) => {
          fetchEmployee();
          setsubmitted(false);
          showAlert(
            true,
            'New Employee created successfully',
            'alert alert-success'
          );
        });
      } else {
        let id = editData._id;

        let values = {};
        for (let i in template) {
          values[i] = formValue[i];
        }
        axiosInstance.put('/employees/' + id, values).then((res) => {
          fetchEmployee();
          setsubmitted(false);
          seteditData({});

          showAlert(
            true,
            'Employee Details successfully updated',
            'alert alert-success'
          );
        });
      }
    }
  }, [submitted, formValue]);

  // File upload
  const onFileUpload = (e) => {
    const files = e.target.files;

    if (files) {
      Papa.parse(files[0], {
        complete: function (results) {
          const jsonData = helper.arrayToJSONObject(results.data);

          axiosInstance
            .post('/employees/bulk', jsonData)
            .then((res) => {
              showAlert(
                true,
                'Data uploaded successfully',
                'alert alert-success'
              );
              fetchEmployee();
            })
            .catch((err) => {
              console.log(err);
              showAlert(true, err?.message, 'alert alert-danger');
            });
        },
      });
    }
  };

  const defaultSorted = [
    {
      dataField: 'designation',
      order: 'desc',
    },
  ];
  return (
    <>
      {/* { uploading && <div className="progress mb-3">
    <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
  </div> } */}
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">{genderTitle}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Gender</li>
            </ul>
          </div>

          <div className="dept-dashboard-card-group">
            <div className="dept-dashboard-card">
              <div className="card-body">
                <span className="dash-widget-icon">
                  <i className="las la-users"></i>
                </span>
                <div className="card-info">
                  <h3>{genderCount}</h3>
                </div>
              </div>
              <span>Head Count</span>
            </div>
          </div>
        </div>
      </div>

      <EmployeesGenderTable
        designation={designation}
        data={allEmployees}
        setData={setallEmployees}
        loading={loading}
        setLoading={setLoading}
        seteditData={seteditData}
        setmode={setmode}
        filters={filters}
        loadForm={loadForm}
        defaultSorted={defaultSorted}
        selectedOption={selectedOption}
        prevPage={prevPage}
        page={page}
        nextPage={nextPage}
        sizePerPage={sizePerPage}
        totalPages={totalPages}
        setPrevPage={setPrevPage}
        setPage={setPage}
        setNextPage={setNextPage}
        setSizePerPage={setSizePerPage}
        setTotalPages={setTotalPages}
        fetchEmployeeByGender={fetchEmployeeByGender}
        designationFilter={designationFilter}
        setDesignationFilter={setDesignationFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {toggleModal && (
        <UploadModal
          setUploadSuccess={setUploadSuccess}
          setuploading={setuploading}
          settoggleModal={settoggleModal}
          fetchEmployee={fetchEmployee}
        />
      )}

      <FormModal2
        editData={editData}
        setformValue={setformValue}
        template={template}
        setsubmitted={setsubmitted}
      />
    </>
  );
};

export default AllEmployeesGenderAdmin;
