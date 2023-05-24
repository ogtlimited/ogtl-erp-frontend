/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axiosInstance from '../../../services/api';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory from 'react-bootstrap-table2-filter';
// import usePagination from '../../../pages/HR/Admin/JobApplicantsPagination.Admin';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
import female from '../../../assets/img/female_avatar.png';
import female2 from '../../../assets/img/female_avatar2.png';
import female3 from '../../../assets/img/female_avatar3.png';
import male from '../../../assets/img/male_avater.png';
import male2 from '../../../assets/img/male_avater2.png';
import male3 from '../../../assets/img/male_avater3.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../../Context/AppContext';
import paginationFactory from 'react-bootstrap-table2-paginator';

const LeadersSubordinatesTable = ({
  data,
  setData,
  defaultSorted,
  selectedOption,
  filters,
  seteditData,
  setmode,
  loadForm,
  loading,
  departments,
  projects,
  designations,

  // page,
  // setPage,
  // sizePerPage,
  // setSizePerPage,
  // totalPages,
  // setTotalPages,
  departmentFilter,
  setDepartmentFilter,
  projectFilter,
  setProjectFilter,
  designationFilter,
  setDesignationFilter,
  statusFilter,
  setStatusFilter,
  searchTerm,
  setSearchTerm,
  setLoading,
  context,
}) => {

  const status = [
    {
      code: 'active',
      label: 'Active',
    },
    {
      code: 'left',
      label: 'Resigned',
    },
    {
      code: 'terminated',
      label: 'Terminated',
    },
  ];

  const navigate = useNavigate();
  const { SearchBar } = Search;
  const males = [male, male2, male3];
  const females = [female, female2, female3];
  const { ExportCSVButton } = CSVExport;
  const [dataToFilter, setDataToFilter] = useState('');
  const [unfiltered, setunfiltered] = useState([]);
  const [show, setShow] = React.useState(false);
  const [mobileView, setmobileView] = useState(false);
  const imageUrl = 'https://erp.outsourceglobal.com';
  const { user, setIsFromBiometrics } = useAppContext();
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });

  const { id } = useParams();

  useEffect(() => {}, [filters, loadForm]);

  const resizeTable = () => {
    if (window.innerWidth >= 768) {
      setmobileView(false);
    }
    if (columns.length >= 7) {
      setmobileView(true);
    } else if (window.innerWidth <= 768) {
      setmobileView(true);
    }
  };

  useEffect(() => {
    resizeTable();
    setunfiltered(data);
    window.addEventListener('resize', () => {
      resizeTable();
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileView]);

  useEffect(() => {
    setDataToFilter(data);
    // setTimeout(() => {
    //   setLoading(true);
    // }, 5000);
  }, [data]);

  // Pagination
  // const count = totalPages;
  // const _DATA = usePagination(data, sizePerPage, totalPages);

  // const handleChange = (e, p) => {
  //   setPage(p);
  //   _DATA.jump(p);
  // };

  // const handleChangeSizePerPage = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   setInfo((prevState) => ({ ...prevState, [name]: value }));

  //   setSizePerPage(e.target.value);
  //   setPage(1);
  // };

  const columns = [
    {
      dataField: 'fullName',
      text: 'Employee Name',
      sort: true,
      headerStyle: { minWidth: '250px' },
      formatter: (value, row) => (
        <h2 className="table-avatar">
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
          <Link to={`/dashboard/user/profile/${row._id}`}>
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
      dataField: 'department_name',
      text: 'Department',
      sort: true,
      headerStyle: { minWidth: '150px' },
      formatter: (val, row) => <span>{val?.toUpperCase()}</span>,
    },
    {
      dataField: 'project',
      text: 'Campaign',
      sort: true,
      headerStyle: { minWidth: '150px' },
      formatter: (val, row) => <span>{val?.toUpperCase()}</span>,
    },
    {
      dataField: 'designation_name',
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
      headerStyle: { minWidth: '100px', textAlign: 'left' },
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
  //           .get(`/leads/subordinates/${id}`, {
  //             params: {
  //               department: departmentFilter,
  //               project: projectFilter,
  //               designation: designationFilter,
  //               status: statusFilter,
  //               search: searchTerm,
  //               page: page,
  //               limit: sizePerPage,
  //             },
  //           })
  //           .then((e) => {
  //             let resData = e?.data?.data?.employees;
  //             let resOptions = e?.data?.data?.pagination;

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
  //             setunfiltered(mapp);
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
  //   [departmentFilter, designationFilter, ogidFilter, page, setData, setLoading, setPage, setSearchTerm, setSizePerPage, setTotalPages, sizePerPage, statusFilter, user._id]
  // );

  const handleDepartmentFilter = (e) => {
    setDepartmentFilter(e.target.value);
    // setPage(1);
    setLoading(true);

    axiosInstance
      .get(`/leads/subordinates/${id}`, {
        params: {
          department: dataToFilter,
          project: projectFilter,
          designation: designationFilter,
          status: statusFilter,
          search: searchTerm,
          // page: page,
          // limit: sizePerPage,
        },
      })
      .then((e) => {
        let resData = e?.data?.data?.employees;
        // let resOptions = e?.data?.data?.pagination;

        // const thisPageLimit = sizePerPage;
        // const thisTotalPageSize = resOptions?.numberOfPages;

        // setSizePerPage(thisPageLimit);
        // setTotalPages(thisTotalPageSize);

        const mapp = resData.map((emp) => {
          return {
            ...emp,
            fullName:
              emp.first_name + ' ' + emp.middle_name+ ' ' + emp?.last_name,
              designation_name: emp?.designation ? emp?.designation?.designation : '',
              department_name: emp?.department ? emp?.department?.department : '',
              project: emp?.projectId ? emp?.projectId?.project_name : '',
          };
        });

        setData(mapp);
        setunfiltered(mapp);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
    // setDesignationFilter('');
    // setOgidFilter('');
    // setStatusFilter('');
  };

  // const handleProjectFilter = (e) => {
  //   setProjectFilter(e.target.value);
  //   setPage(1);
  //   setLoading(true);

  //   axiosInstance
  //     .get(`/leads/subordinates/${id}`, {
  //       params: {
  //         department: departmentFilter,
  //         project: dataToFilter,
  //         designation: designationFilter,
  //         status: statusFilter,
  //         ogid: ogidFilter,
  //         search: searchTerm,
  //         page: page,
  //         limit: sizePerPage,
  //       },
  //     })
  //     .then((e) => {
  //       let resData = e?.data?.data?.employees;
  //       let resOptions = e?.data?.data?.pagination;

  //       const thisPageLimit = sizePerPage;
  //       const thisTotalPageSize = resOptions?.numberOfPages;

  //       setSizePerPage(thisPageLimit);
  //       setTotalPages(thisTotalPageSize);

  //       const mapp = resData.map((emp) => {
  //         return {
  //           ...emp,
  //           fullName:
  //             emp.first_name + ' ' + emp.middle_name+ ' ' + emp?.last_name,
  //           designation_name: emp?.designation?.designation,
  //           department_name: emp?.department?.department,
  //           project: emp?.projectId?.project_name,
  //         };
  //       });

  //       setData(mapp);
  //       setunfiltered(mapp);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  //   setLoading(false);
  //   // setDesignationFilter('');
  //   // setOgidFilter('');
  //   // setStatusFilter('');
  // };

  const handleDesignationFilter = (e) => {
    setDesignationFilter(e.target.value);
    // setPage(1);
    setLoading(true);

    axiosInstance
      .get(`/leads/subordinates/${id}`, {
        params: {
          department: departmentFilter,
          project: projectFilter,
          designation: dataToFilter,
          status: statusFilter,
          search: searchTerm,
          // page: page,
          // limit: sizePerPage,
        },
      })
      .then((e) => {
        let resData = e?.data?.data?.employees;
        // let resOptions = e?.data?.data?.pagination;

        // const thisPageLimit = sizePerPage;
        // const thisTotalPageSize = resOptions?.numberOfPages;

        // setSizePerPage(thisPageLimit);
        // setTotalPages(thisTotalPageSize);

        const mapp = resData.map((emp) => {
          return {
            ...emp,
            fullName:
              emp.first_name + ' ' + emp.middle_name+ ' ' + emp?.last_name,
              designation_name: emp?.designation ? emp?.designation?.designation : '',
              department_name: emp?.department ? emp?.department?.department : '',
              project: emp?.projectId ? emp?.projectId?.project_name : '',
          };
        });

        setData(mapp);
        setunfiltered(mapp);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
    // setDepartmentFilter('');
    // setOgidFilter('');
    // setStatusFilter('');
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    // setPage(1);
    setLoading(true);

    axiosInstance
      .get(`/leads/subordinates/${id}`, {
        params: {
          department: departmentFilter,
          project: projectFilter,
          designation: designationFilter,
          status: dataToFilter,
          search: searchTerm,
          // page: page,
          // limit: sizePerPage,
        },
      })
      .then((e) => {
        let resData = e?.data?.data?.employees;
        // let resOptions = e?.data?.data?.pagination;

        // const thisPageLimit = sizePerPage;
        // const thisTotalPageSize = resOptions?.numberOfPages;

        // setSizePerPage(thisPageLimit);
        // setTotalPages(thisTotalPageSize);

        const mapp = resData.map((emp) => {
          return {
            ...emp,
            fullName:
              emp.first_name + ' ' + emp.middle_name+ ' ' + emp?.last_name,
              designation_name: emp?.designation ? emp?.designation?.designation : '',
              department_name: emp?.department ? emp?.department?.department : '',
              project: emp?.projectId ? emp?.projectId?.project_name : '',
          };
        });

        setData(mapp);
        setunfiltered(mapp);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
    // setDepartmentFilter('');
    // setDesignationFilter('');
    // setOgidFilter('');
  };

  const showNullMessage = () => {
    setTimeout(() => {
      setShow(true);
    }, 10000);
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
            <SearchBar
              {...props.searchProps}
              style={{ marginBottom: 15, paddingLeft: '12%', width: '300px' }}
              className="inputSearch"
            />
              {/* <MySearch
                {...props.searchProps}
                style={{ marginBottom: 15, paddingLeft: '12%' }}
                className="inputSearch"
              /> */}

              <ExportCSVButton
                className="float-right btn export-csv"
                {...props.csvProps}
              >
                Export CSV
              </ExportCSVButton>

              <div className="hr-filter-select">
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
                      <option key={idx}>{option.department}</option>
                    ))}
                  </select>
                </div>

                {/* <div className="col-md-3">
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleProjectFilter(e)}
                    defaultValue={projectFilter}
                    value={projectFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter by Campaign
                    </option>
                    {projects.map((option, idx) => (
                      <option key={idx}>{option.project}</option>
                    ))}
                  </select>
                </div> */}

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
                      <option key={idx}>{option.designation}</option>
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
                
                pagination={paginationFactory()}
              />

              {/* <select
                className="application-table-sizePerPage"
                name="sizePerPage"
                value={info.sizePerPage}
                onChange={handleChangeSizePerPage}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select> */}
              {/* <div className="application-table-pagination">
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
              </div> */}
            </div>
          )}
        </ToolkitProvider>
      )}
      {/* <EditEmployeeModal employee={editEmployee} /> */}
    </>
  );
};

export default LeadersSubordinatesTable;
