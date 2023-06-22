/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axiosInstance from '../../../services/api';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory from 'react-bootstrap-table2-filter';
import usePagination from '../../../pages/HR/Admin/JobApplicantsPagination.Admin';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import female from '../../../assets/img/female_avatar.png';
import female2 from '../../../assets/img/female_avatar2.png';
import female3 from '../../../assets/img/female_avatar3.png';
import male from '../../../assets/img/male_avater.png';
import male2 from '../../../assets/img/male_avater2.png';
import male3 from '../../../assets/img/male_avater3.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../Context/AppContext';

const EmployeesTable = ({
  data,
  setData,
  loading,
  setLoading,

  departments,
  campaigns,
  designations,

  page,
  setPage,
  sizePerPage,
  setSizePerPage,
  totalPages,
  setTotalPages,

  departmentFilter,
  setDepartmentFilter,
  campaignFilter,
  setCampaignFilter,
  officeFilter,
  setOfficeFilter,
  designationFilter,
  setDesignationFilter,
  statusFilter,
  setStatusFilter,
  searchTerm,
  setSearchTerm,
  context,
}) => {

  const status = [
    {
      code: 'active',
      label: 'ACTIVE',
    },
    {
      code: 'left',
      label: 'RESIGNED',
    },
    {
      code: 'terminated',
      label: 'TERMINATED',
    },
  ];

  const navigate = useNavigate();
  const males = [male, male2, male3];
  const females = [female, female2, female3];
  const { ExportCSVButton } = CSVExport;
  const [dataToFilter, setDataToFilter] = useState('');
  const [show, setShow] = useState(false);
  const [mobileView, setmobileView] = useState(false);
  const imageUrl = 'https://erp.outsourceglobal.com';
  const { setIsFromBiometrics } = useAppContext();
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });

  const resizeTable = () => {
    if (window.innerWidth >= 768) {
      setmobileView(false);
    }
    if (columns.length >= 8) {
      setmobileView(true);
    } else if (window.innerWidth <= 768) {
      setmobileView(true);
    }
  };

  useEffect(() => {
    resizeTable();
    window.addEventListener('resize', () => {
      resizeTable();
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileView]);

  useEffect(() => {
    setDataToFilter(data);
  }, [data]);

  // Pagination
  const count = totalPages;
  const _DATA = usePagination(data, sizePerPage, totalPages);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleChangeSizePerPage = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo((prevState) => ({ ...prevState, [name]: value }));

    setSizePerPage(e.target.value);
    setPage(1);
  };

  const handleNavigate = () => {
    setIsFromBiometrics(false);
  }

  const columns = [
    {
      dataField: 'fullName',
      text: 'Employee Name',
      sort: true,
      headerStyle: { minWidth: '250px' },
      formatter: (value, row) => (
        <h2 className="table-avatar" onClick={handleNavigate}>
          <a href="" className="avatar">
            <img
              alt=""
              src={
                row.image
                  ? imageUrl + row.image
                  : row.gender === 'male'
                  ? males[Math.floor(Math.random() * males.length)]
                  : females[Math.floor(Math.random() * females.length)]
              }
            />
          </a>
          <Link to={`/dashboard/user/profile/${row.ogid}`}>
            {value} <span>{row?.designation_name}</span>
          </Link>
        </h2>
      ),
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      headerStyle: { minWidth: '120px' },
      formatter: (value, row) => (
        <>
          {value === 'active' ? (
            <a href="" className="pos-relative">
              {' '}
              <span className="status-online"></span>{' '}
              <span className="ml-4 d-block">{value.toUpperCase()}</span>
            </a>
          ) : value === 'left' ? (
            <a href="" className="pos-relative">
              {' '}
              <span className="status-pending"></span>{' '}
              <span className="ml-4 d-block">{'RESIGNED'}</span>
            </a>
          ) : value === 'terminated' ? (
            <a href="" className="pos-relative">
              {' '}
              <span className="status-terminated"></span>{' '}
              <span className="ml-4 d-block">{value.toUpperCase()}</span>
            </a>
          ) : (
            <a href="" className="pos-relative">
              {' '}
              <span className="status-terminated"></span>{' '}
              <span className="ml-4 d-block">{value.toUpperCase()}</span>
            </a>
          )}
        </>
      ),
    },
    {
      dataField: 'ogid',
      text: 'Employee ID',
      sort: true,
      headerStyle: { minWidth: '150px' },
    },
    {
      dataField: 'office',
      text: 'Office Type',
      sort: true,
      headerStyle: { minWidth: '150px' },
      formatter: (val, row) => <span>{val?.toUpperCase()}</span>,
    },
    {
      dataField: 'officeName',
      text: 'Office',
      sort: true,
      headerStyle: { minWidth: '150px' },
      formatter: (val, row) => <span>{val?.toUpperCase()}</span>,
    },
    {
      dataField: 'designation',
      text: 'Designation',
      sort: true,
      headerStyle: { minWidth: '150px' },
    },
    {
      dataField: 'company_email',
      text: 'Company Email',
      sort: true,
      headerStyle: { minWidth: '100px' },
    },
    {
      dataField: '',
      text: 'Action',
      sort: true,
      headerStyle: { minWidth: '70px', textAlign: 'left' },
      formatter: (value, row) => (
        <>
          <div className="text-center">
            <div className="leave-user-action-btns">
              <button
                className="btn btn-sm btn-primary"
                data-toggle="modal"
                onClick={() => navigate(`/dashboard/hr/all-employees/employee/update/${row._id}`)}
              >
                Edit
              </button>
            </div>
          </div>
        </>
      ),
    },
  ];

  // // Search START
  // const MySearch = useCallback(
  //   (props) => {
  //     let input;
  //     const handleClick = () => {
  //       setPage(1);
  //       setLoading(true);
  //       props.onSearch(input.value);
  //       const searchTerm = input.value;
  //       setSearchTerm(searchTerm);

  //       if (page === 1) {
  //         axiosInstance
  //           .get('/employees/paginated-employees', {
  //             params: {
  //               department: departmentFilter,
  //               designation: designationFilter,
  //               status: statusFilter,
  //               search: searchTerm,
  //               page: page,
  //               limit: sizePerPage,
  //             },
  //           })
  //           .then((e) => {
  //             let resData = e?.data?.employees;
  //             let resOptions = e?.data?.pagination;

  //             const thisPageLimit = sizePerPage;
  //             const thisTotalPageSize = resOptions?.numberOfPages;

  //             setSizePerPage(thisPageLimit);
  //             setTotalPages(thisTotalPageSize);

  //             const mapp = resData.map((emp) => {
  //               return {
  //                 ...emp,
  //                 fullName:
  //                   emp.first_name + ' ' + emp.middle_name+ ' ' + emp?.last_name,
  //                 designation_name: emp?.designation?.designation,
  //                 department_name: emp?.department?.department,
  //                 project: emp?.projectId?.project_name,
  //               };
  //             });
  //             setData(mapp);
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //             setLoading(false);
  //           });
  //       }
  //       setLoading(false);
  //     };

  //     return (
  //       <div className="job-app-search">
  //         <input
  //           className="form-control"
  //           style={{
  //             backgroundColor: '#fff',
  //             width: '33.5%',
  //             marginRight: '20px',
  //           }}
  //           ref={(n) => (input = n)}
  //           type="text"
  //         />
  //         <button className="btn btn-primary" onClick={handleClick}>
  //           Search
  //         </button>
  //       </div>
  //     );
  //   },
  //   [departmentFilter, designationFilter, page, setData, setLoading, setPage, setSearchTerm, setSizePerPage, setTotalPages, sizePerPage, statusFilter]
  // );
  // // Search END

  const handleDepartmentFilter = (e) => {
    setCampaignFilter('');
    setDesignationFilter('');
    setStatusFilter('');
    setDepartmentFilter(e.target.value);
    setOfficeFilter(e.target.value);
    setPage(1);
    setLoading(true);

    axiosInstance
    .get('/api/v1/employees.json', {
      headers: {          
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": "69420",
      },
      
      params: {
        page: page,
        limit: sizePerPage,
        operation_office_id: e.target.value,
      },
    })
      .then((e) => {
        const resData = e?.data?.data?.employees;
        const totalPages = e?.data?.data?.pages;
        
        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const mapp = resData.map((emp) => {
          return {
            ...emp,
            fullName: emp?.full_name,
            office: emp?.office?.office_type,
            officeName: emp?.office?.title,
            designation: emp?.designation,
            company_email: emp?.email
          };
        });

        setData(mapp);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
  };

  const handleCampaignFilter = (e) => {
    setDepartmentFilter('');
    setDesignationFilter('');
    setStatusFilter('');
    setCampaignFilter(e.target.value);
    setOfficeFilter(e.target.value);
    setPage(1);
    setLoading(true);
    
    axiosInstance
    .get('/api/v1/employees.json', {
      headers: {          
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": "69420",
      },
      
      params: {
        page: page,
        limit: sizePerPage,
        operation_office_id: e.target.value,
      },
    })
      .then((e) => {
        const resData = e?.data?.data?.employees;
        const totalPages = e?.data?.data?.pages;
        
        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const mapp = resData.map((emp) => {
          return {
            ...emp,
            fullName: emp?.full_name,
            office: emp?.office?.office_type,
            officeName: emp?.office?.title,
            designation: emp?.designation,
            company_email: emp?.email
          };
        });

        setData(mapp);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
  };

  const handleDesignationFilter = (e) => {
    setDesignationFilter(e.target.value);
    setPage(1);
    setLoading(true);


    axiosInstance
    .get('/api/v1/employees.json', {
      headers: {          
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": "69420",
      },
      
      params: {
        page: page,
        limit: sizePerPage,
        hr_designation_id: e.target.value,
      },
    })
      .then((e) => {
        const resData = e?.data?.data?.employees;
        const totalPages = e?.data?.data?.pages;
        
        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const mapp = resData.map((emp) => {
          return {
            ...emp,
            fullName: emp?.full_name,
            office: emp?.office?.office_type,
            officeName: emp?.office?.title,
            designation: emp?.designation,
            company_email: emp?.email
          };
        });

        setData(mapp);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
  };

  const handleStatusFilter = (e) => {
    setDepartmentFilter('');
    setCampaignFilter('');
    setDesignationFilter('');
    setStatusFilter(e.target.value);
    setPage(1);
    setLoading(true);

    axiosInstance
    .get('/api/v1/employees.json', {
      headers: {          
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": "69420",
      },
      
      params: {
        page: page,
        limit: sizePerPage,
        search: searchTerm,
        status: e.target.value,
      },
    })
      .then((e) => {
        const resData = e?.data?.data?.employees;
        const totalPages = e?.data?.data?.pages;
        
        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const mapp = resData.map((emp) => {
          return {
            ...emp,
            fullName: emp?.full_name,
            office: emp?.office?.office_type,
            officeName: emp?.office?.title,
            designation: emp?.designation,
            company_email: emp?.email
          };
        });

        setData(mapp);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
  };

  const showNullMessage = () => {
    setTimeout(() => {
      setShow(true);
    }, 60000);
    return <>{show ? "No Data Available" : null}</>;
  };

  return (
    <>
      {dataToFilter && (
        <ToolkitProvider
          keyField="id"
          data={dataToFilter}
          columns={columns}
          search
          exportCSV
        >
          {(props) => (
            <div className="col-12">
              {/* <MySearch
                {...props.searchProps}
                style={{ marginBottom: 15, paddingLeft: '12%' }}
                className="inputSearch"
              /> */}
              
              <ExportCSVButton
                className="float-right btn export-csv" style={{ marginBottom: 15}}
                {...props.csvProps}
              >
                Export CSV
              </ExportCSVButton>

              <div className="hr-filter-select col-12">
                
                <div className="col-md-3">
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleDepartmentFilter(e)}
                    defaultValue={departmentFilter}
                    value={departmentFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter by Department
                    </option>
                    {departments.map((option, idx) => (
                      <option key={idx} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  
                </div>

                <div className="col-md-3">
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleCampaignFilter(e)}
                    defaultValue={campaignFilter}
                    value={campaignFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter by Campaign
                    </option>
                    {campaigns.map((option, idx) => (
                      <option key={idx} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleDesignationFilter(e)}
                    defaultValue={designationFilter}
                    value={designationFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter by Designation
                    </option>
                    {designations.map((option, idx) => (
                      <option key={idx} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleStatusFilter(e)}
                    defaultValue={statusFilter}
                    value={statusFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter by Status
                    </option>
                    {status.map((option, index) => (
                      <option key={index} value={option.code}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <BootstrapTable
                {...props.baseProps}
                bordered={false}
                filter={filterFactory()}
                headerClasses="header-class"
                classes={
                  !mobileView
                    ? 'table '
                    : context
                    ? 'table table-responsive'
                    : 'table table-responsive'
                }
                noDataIndication={
                  loading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    showNullMessage()
                  )
                }
              />

              <select
                className="application-table-sizePerPage"
                name="sizePerPage"
                value={info.sizePerPage}
                onChange={handleChangeSizePerPage}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
              <div className="application-table-pagination">
                <Stack className="application-table-pagination-stack">
                  <Pagination
                    className="job-applicant-pagination"
                    count={count}
                    page={page}
                    boundaryCount={4}
                    onChange={handleChange}
                    color="primary"
                    showFirstButton
                    showLastButton
                    variant="outlined"
                    shape="rounded"
                  />
                </Stack>
              </div>
            </div>
          )}
        </ToolkitProvider>
      )}
    </>
  );
};

export default EmployeesTable;
