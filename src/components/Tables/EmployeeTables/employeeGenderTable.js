/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/** @format */

import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit';
import Select from 'react-select';
import axiosInstance from '../../../services/api';
import filterFactory, {
  textFilter,
  selectFilter,
  dateFilter,
} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import female from '../../../assets/img/female_avatar.png';
import female2 from '../../../assets/img/female_avatar2.png';
import female3 from '../../../assets/img/female_avatar3.png';
import male from '../../../assets/img/male_avater.png';
import male2 from '../../../assets/img/male_avater2.png';
import male3 from '../../../assets/img/male_avater3.png';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../../../Context/AppContext';
import usePagination from '../../../pages/HR/Admin/JobApplicantsPagination.Admin';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// import ToggleTable from '../toggleTable';
// import EditEmployeeModal from '../modals/EditEmployeeModal';
const EmployeesGenderTable = ({
  designation,
  data,
  setData,
  defaultSorted,
  selectedOption,
  filters,
  seteditData,
  setmode,
  loadForm,
  loading,
  setLoading,
  prevPage,
  page,
  nextPage,
  sizePerPage,
  totalPages,
  setPrevPage,
  setPage,
  setNextPage,
  setSizePerPage,
  setTotalPages,
  fetchEmployeeByGender,
  designationFilter,
  setDesignationFilter,
  searchTerm,
  setSearchTerm,
  context
}) => {
  const { SearchBar, ClearSearchButton } = Search;
  const males = [male, male2, male3];
  const females = [female, female2, female3];
  const { ExportCSVButton } = CSVExport;
  const [allEmployee, setAllEmployee] = useState([]);
  const [unfiltered, setunfiltered] = useState([]);
  const [mobileView, setmobileView] = useState(false);
  const imageUrl = 'https://erp.outsourceglobal.com';
  const { user } = useAppContext();
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });
  const { id } = useParams();

  useEffect(() => {}, [filters, loadForm]);
  const handleClick = (i, type) => {
    if (i?.value === 'All' || i == null) {
      setAllEmployee(unfiltered);
    } else {
      const filt = unfiltered.filter((e) => i.value === e[type]?._id);

      setAllEmployee(filt);
    }
  };
  const handleEdit = (row) => {
    let hash = {};
    seteditData(null);
    for (let d in row) {
      if (typeof row[d] == 'object' && row[d] !== null) {
        hash[d] = row[d]._id;
      } else {
        hash[d] = row[d];
      }
    }
    setmode('edit');
    console.log(hash);
    seteditData(hash);
  };
  const clearFilter = (e) => {
    e.preventDefault();
    // attendaceDateFilter('')
    setAllEmployee(unfiltered);
  };

  useEffect(() => {
    setAllEmployee(data);
    setunfiltered(data);
  }, [data]);
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        setmobileView(false);
      } else {
        setmobileView(true);
      }
    });
  }, [mobileView]);

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
      headerStyle: { minWidth: '70px', textAlign: 'left' },
      formatter: (value, row) => (
        <>
          {filters && user?.role?.hr?.update && (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleEdit(row)}
                href="#"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </button>
          )}
        </>
      ),
    },
  ];


  const handleChangeDesignation = (e) => {
    setDesignationFilter(e.target.value);
    setPage(1);
    setLoading(true);

    axiosInstance
      .get(`/departments/employees/${id}`, {
        params: {
          designation: e.label,
          page: page,
          limit: sizePerPage,
        },
      })
      .then((res) => {
        let resData = res?.data?.data?.employeesByDepartment;
        let resOptions = res?.data?.data?.pagination;

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

        setData(formatted);
        setunfiltered(formatted);
      });
    setLoading(false);
  };

  const MySearch = (props) => {
    let input;
    const handleClick = () => {
      setPage(1);
      setLoading(true);
      props.onSearch(input.value);
      const searchTerm = input.value;
      setSearchTerm(searchTerm);

      if (page === 1) {
        axiosInstance
          .get(`/departments/${id}`, {
            params: {
              search: searchTerm,
              page: page,
              limit: sizePerPage,
            },
          })
          .then((res) => {
            let resData = res?.data?.data?.employeesByDepartment;
            let resOptions = res?.data?.data?.pagination;

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

            setData(formatted);
            setunfiltered(formatted);
            setDesignationFilter('');
          });
      }
      setLoading(false);
    };

    return (
      <div className="job-app-search">
        <input
          className="form-control"
          style={{
            backgroundColor: '#fff',
            width: '33.5%',
            marginRight: '20px',
          }}
          ref={(n) => (input = n)}
          type="text"
        />
        <button className="btn btn-primary" onClick={handleClick}>
          Search
        </button>
      </div>
    );
  };

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
  
  return (
    <>
      {allEmployee && (
        <ToolkitProvider
          keyField="id"
          data={allEmployee}
          columns={columns}
          search
          exportCSV
        >
          {(props) => (
            <div className="col-12">
              <MySearch
                {...props.searchProps}
                style={{ marginBottom: 15, paddingLeft: '12%' }}
                className="inputSearch"
              />
                <div className="col-md-3 pt-3 float-right">
                  {filters && (
                    <ExportCSVButton
                      className="float-right btn export-csv"
                      {...props.csvProps}
                    >
                      Export CSV
                    </ExportCSVButton>
                  )}
                </div>
              <div className="d-flex row mb-3">
                <div className="col-md-3 processing_stage_filter">
                  <select
                    onChange={(e) => handleChangeDesignation(e)}
                    value={designationFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter By Designation
                    </option>
                    {designation.map((option, idx) => (
                      <option key={idx} placeholder="Filter By designation">
                        {option}
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
                defaultSorted={defaultSorted}
                noDataIndication={
                  loading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    ''
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
      {/* <EditEmployeeModal employee={editEmployee} /> */}
    </>
  );
};

export default EmployeesGenderTable;
