/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { employeeFormJson } from '../../../components/FormJSON/HR/Employee/employee';
// import { AddEmployeeModal } from '../../../components/Modal/AddEmployeeModal';
import { EditEmployeeModal } from '../../../components/Modal/EditEmployeeModal';

import FormModal2 from '../../../components/Modal/FormModal2';
import EmployeesTable from '../../../components/Tables/EmployeeTables/employeeTable';

import { useAppContext } from '../../../Context/AppContext';

import axiosInstance from '../../../services/api';
import helper from '../../../services/helper';
import UploadModal from '../../../components/Modal/uploadModal';
import BulkEmployeeUploadModal from '../../../components/Modal/bulkEmployeeUploadModal';
import EmployeeHelperService from './employee.helper';

const AllEmployeesAdmin = () => {
  const navigate = useNavigate();
  const { fetchEmployee, createEmployee, showAlert, status } = useAppContext();
  const [allEmployees, setallEmployees] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formValue, setformValue] = useState({});
  const [editData, seteditData] = useState({});
  const [loading, setLoading] = useState(true);
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

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState('');

  const [departmentFilter, setDepartmentFilter] = useState('');
  const [designationFilter, setDesignationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [ogidFilter, setOgidFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [bulkEmployeeUploadData, setBulkEmployeeUploadData] = useState([])

  const fetchAllEmployee = useCallback(() => {
    axiosInstance
      .get('/employees/paginated-employees', {
        params: {
          department: departmentFilter,
          designation: designationFilter,
          status: statusFilter,
          ogid: ogidFilter,
          search: searchTerm,
          page: page,
          limit: sizePerPage,
        },
      })
      .then((e) => {
        let resData = e?.data?.employees;
        let resOptions = e?.data?.pagination;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = resOptions?.numberOfPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const mapp = resData.map((emp) => {
          return {
            ...emp,
            fullName:
              emp.first_name + ' ' + emp.last_name + ' ' + emp?.middle_name,
            designation_name: emp?.designation?.designation,
            department_name: emp?.department?.department,
            // project: emp?.projectId?.project_name,
          };
        });

        setallEmployees(mapp);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [
    departmentFilter,
    designationFilter,
    ogidFilter,
    page,
    searchTerm,
    sizePerPage,
    statusFilter,
  ]);

  const fetchDepartment = async () => {
    try {
      const response = await axiosInstance.get('/department');
      const resData = response?.data?.data;

      const formatted = resData.map((e) => ({
        department: e.department,
      }));

      setDepartments(formatted);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchDesignation = async () => {
    try {
      const response = await axiosInstance.get('/designation');
      const resData = response?.data?.data;

      const formatted = resData.map((e) => ({
        designation: e.designation,
      }));

      setDesignations(formatted);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEmployee();
    fetchDepartment();
    fetchDesignation();
    const obj = helper.formArrayToObject(employeeFormJson.Fields);
    settemplate(obj);
  }, [fetchAllEmployee]);

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
        employees,
        status
      );

      const service = empHelper.mapRecords();

      setfilters([
        {
          name: 'projectId',
          placeholder: 'Filter by campaign',
          options: service.campaingOpts,
        },
        {
          name: 'department',
          placeholder: 'Filter by department',
          options: service.deptopts,
        },
        {
          name: 'designation',
          placeholder: 'Filter by designation',
          options: service.designationOpts,
        },
        {
          name: 'status',
          placeholder: 'Filter by status',
          options: service.employeestatusOpts,
        },
      ]);

      const finalForm = empHelper.finalForm(employeeFormJson, service, mode);

      const obj = helper.formArrayToObject(finalForm);

      if (mode === 'add') {
        // seteditData(initialValues);
        settemplate(obj);
      } else {
        // settemplate(obj);
      }

      if (!loadForm) setloadForm(true);
    });
  }, [createEmployee, loadForm, mode, status]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  // Submit
  useEffect(() => {
    if (submitted) {
      formValue.image = '';

      if (mode === 'add') {
        axiosInstance
          .post('/employees', {
            ...formValue,
            password: '',
          })
          .then((res) => {
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
          fetchAllEmployee();
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    submitted,
    formValue,
    mode,
    fetchEmployee,
    showAlert,
    editData._id,
    template,
  ]);

  // File upload
  // const onFileUpload = (e) => {
  //   const files = e.target.files;

  //   if (files) {
  //     Papa.parse(files[0], {
  //       complete: function (results) {
  //         const jsonData = helper.arrayToJSONObject(results.data);
  //         console.log("csv Data", jsonData)
          // axiosInstance
          //   .post("/employees/bulk", jsonData)
          //   .then((res) => {
          //     showAlert(
          //       true,
          //       "Data uploaded successfully",
          //       "alert alert-success"
          //     );
          //     fetchEmployee();
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //     showAlert(true, err?.message, "alert alert-danger");
          //   });
  //       },
  //     });
  //   }
  // };

  const defaultSorted = [
    {
      dataField: 'designation',
      order: 'desc',
    },
  ];

 
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Employee</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Employee</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {user?.role?.hr?.create && (
              <>
                <a
                  href="#"
                  className="btn add-btn "
                  data-toggle="modal"
                  // data-target="#AddEmployeeFormModal"
                  onClick={() => navigate('/dashboard/hr/all-employees/employee/add')}
                >
                  <i className="fa fa-plus"></i> Add Employee
                </a>

                <button
                  onClick={() => {
                    settoggleModal(true);
                  }}
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
          </div>
        </div>
      </div>
      <EmployeesTable
        loading={loading}
        data={allEmployees}
        setData={setallEmployees}
        seteditData={seteditData}
        setmode={setmode}
        filters={filters}
        loadForm={loadForm}
        defaultSorted={defaultSorted}
        selectedOption={selectedOption}
        departments={departments}
        designations={designations}

        page={page}
        setPage={setPage}
        sizePerPage={sizePerPage}
        setSizePerPage={setSizePerPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        designationFilter={designationFilter}
        setDesignationFilter={setDesignationFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        ogidFilter={ogidFilter}
        setOgidFilter={setOgidFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setLoading={setLoading}
      />
      
      {toggleModal && (
        <BulkEmployeeUploadModal
          setUploadSuccess={setUploadSuccess}
          setuploading={setuploading}
          settoggleModal={settoggleModal}
          fetchEmployee={fetchEmployee}
          setBulkEmployeeUploadData={setBulkEmployeeUploadData}
          bulkEmployeeUploadData={bulkEmployeeUploadData}
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

export default AllEmployeesAdmin;
