/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { employeeFormJson } from '../../../components/FormJSON/HR/Employee/employee';

import FormModal2 from '../../../components/Modal/FormModal2';
import EmployeesDepartmentTable from '../../../components/Tables/EmployeeTables/employeeDepartmentTable';

import { useAppContext } from '../../../Context/AppContext';

import axiosInstance from '../../../services/api';
import Papa from 'papaparse';
import helper from '../../../services/helper';
import UploadModal from '../../../components/Modal/uploadModal';
import EmployeeHelperService from './employee.helper';

const AllEmployeesDepartmentAdmin = () => {
  const breadcrumb = 'All Employees';
  const [allEmployees, setallEmployees] = useState([]);
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);
  const [totalGenderCount, setTotalGenderCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState('');

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

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);

  const [prevPage, setPrevPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [totalPages, setTotalPages] = useState('');

  const [designationFilter, setDesignationFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchGenderByDepartment = async () => {
    const department = localStorage.getItem('department');
    setDepartment(department);

    try {
      const response = await axiosInstance.get(
        `/departments/gender-count/${id}`
      );
      console.log("gender data:", response.data.data);

      const formattedFemale =
        response.data?.data?.genderCountByDepartment.filter(
          (gender) => gender._id === 'female'
        );
      const female = formattedFemale.length ? formattedFemale[0].total : 0;
      setFemale(female);

      const formattedMale = response.data?.data?.genderCountByDepartment.filter(
        (gender) => gender._id === 'male'
      );
      const male = formattedMale.length ? formattedMale[0].total : 0;
      setMale(male);

      const headCount = male + female;
      setTotalGenderCount(headCount);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchEmployeeByDepartment = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get(`/departments/${id}`, {
        params: {
          designation: designationFilter,
          search: searchTerm,
          page: page,
          limit: sizePerPage,
        },
      })
      .then((res) => {
        let resData = res?.data?.data.employeesByDepartment;
        console.log("Data:", resData);
        let resOptions = res?.data?.data?.pagination;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = resOptions.numberOfPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        let formatted = resData.map((e) => ({
          ...e,
          fullName: e.first_name + ' ' + e.last_name + ' ' + e?.middle_name,
          designation_name: e?.designation?.designation,
          department_name: e?.department?.department,
        }));

        const dept = resData?.map((e) => ({
          label: e.designation ? e.designation.designation : "",
          value: e.designation ? e.designation._id : "",
        }))
        
        const uniqueArray = dept.filter((value, index) => {
          const _value = JSON.stringify(value);
          return index === dept.findIndex(obj => {
            return JSON.stringify(obj) === _value;
          });
        });

        setfilters([
          {
            name: 'designation',
            placeholder: 'Filter by designation',
            options: uniqueArray,
          },
        ]);

        setallEmployees(formatted);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [designationFilter, id, page, searchTerm, sizePerPage]);

  useEffect(() => {
    fetchEmployeeByDepartment ();
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, [ fetchEmployeeByDepartment ]);

  useEffect(() => {
    fetchGenderByDepartment();
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
      

      // setfilters([
      //   {
      //     name: 'designation',
      //     placeholder: 'Filter by designation',
      //     options: service.designationOpts,
      //   },
      // ]);
      
      const finalForm = empHelper.finalForm(employeeFormJson, service, mode);
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
            <h3 className="page-title">{department}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Department</li>
            </ul>
          </div>
          {/* <div className="col-auto float-right ml-auto">
            {user?.role?.hr?.create && (
              <>
                <a
                  href="#"
                  className="btn add-btn "
                  data-toggle="modal"
                  data-target="#FormModal"
                  onClick={() => create()}
                >
                  <i className="fa fa-plus"></i> Add Employee
                </a>
                <button
                  onClick={() => settoggleModal(true)}
                  type="button"
                  className="btn add-btn mx-3"
                  data-toggle="modal"
                  data-target="#uploadModal"
                >
                  <i className="fa fa-cloud-upload"></i>
                  Bulk Upload
                </button>
              </>
            )}
            <div className="view-icons">
              <a
                href="employees.html"
                className="grid-view btn btn-link active"
              >
                <i className="fa fa-th"></i>
              </a>
              <a href="employees-list.html" className="list-view btn btn-link">
                <i className="fa fa-bars"></i>
              </a>
            </div>
          </div> */}

          {/* <button
            onClick={() => navigate("/dashboard/hr/all-employees")}
            type="button"
            className="btn add-btn mx-3"
          >
            <i className="fa fa-users"></i>
            All Employees
          </button> */}

          <div className="dept-dashboard-card-group">
            <div className="dept-dashboard-card">
              <div className="card-body">
                <span className="dash-widget-icon">
                  <i className="las la-users"></i>
                </span>
                <div className="card-info">
                  {loading ? <h3>-</h3> : <h3>{totalGenderCount}</h3>}
                </div>
              </div>
              <span>Head Count</span>
            </div>
            <div className="dept-dashboard-card">
              <div className="card-body">
                <span className="dash-widget-icon">
                  <i className="las la-male"></i>
                </span>
                <div className="card-info">
                  {loading ? <h3>-</h3> : <h3>{male}</h3>}
                </div>
              </div>
              <span>Male</span>
            </div>
            <div className="dept-dashboard-card">
              <div className="card-body">
                <span className="dash-widget-icon">
                  <i className="las la-female"></i>
                </span>
                <div className="card-info">
                  {loading ? <h3>-</h3> : <h3>{female}</h3>}
                </div>
              </div>
              <span>Female</span>
            </div>
          </div>
        </div>
      </div>

      <EmployeesDepartmentTable
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
        fetchEmployeeByDepartment={fetchEmployeeByDepartment}
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

export default AllEmployeesDepartmentAdmin;
