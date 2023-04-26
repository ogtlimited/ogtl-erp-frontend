/* eslint-disable jsx-a11y/anchor-is-valid */
/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {CSVExport} from 'react-bootstrap-table2-toolkit';
import Select from 'react-select';
import axiosInstance from '../../../services/api';
import filterFactory from 'react-bootstrap-table2-filter';
import female from '../../../assets/img/female_avatar.png';
import female2 from '../../../assets/img/female_avatar2.png';
import female3 from '../../../assets/img/female_avatar3.png';
import male from '../../../assets/img/male_avater.png';
import male2 from '../../../assets/img/male_avater2.png';
import male3 from '../../../assets/img/male_avater3.png';
import { Link, useParams } from 'react-router-dom';
import usePagination from '../../../pages/HR/Admin/JobApplicantsPagination.Admin';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// import ToggleTable from '../toggleTable';
// import EditEmployeeModal from '../modals/EditEmployeeModal';
const CampaignAttendanceTable = ({
  designation,
  data,
  setData,
  loading,
  setLoading,
  page,
  sizePerPage,
  totalPages,
  setPage,
  setSizePerPage,
  setTotalPages,
  fetchEmployeeByCampaign,
  designationFilter,
  setDesignationFilter,
  searchTerm,
  setSearchTerm,
  context,
}) => {
  const males = [male, male2, male3];
  const females = [female, female2, female3];
  const { ExportCSVButton } = CSVExport;
  const [show, setShow] = useState(false);
  const [allEmployee, setAllEmployee] = useState([]);
  const [mobileView, setmobileView] = useState(false);
  const imageUrl = 'https://erp.outsourceglobal.com';
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });
  const { id } = useParams();

  useEffect(() => {
    setAllEmployee(data);
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
          <Link to={`/dashboard/hr/campaign/employee-attendance/${row.fullName}/${row.ogid}`}>
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
  ];

  const handleChangeDesignation = useCallback((e) => {
    setDesignationFilter(e?.value);
    setPage(1);
    setLoading(true);

    axiosInstance
      .get(`/office/employees?campaign=${id}`, {
        params: {
          designation: e.label,
          page: page,
          limit: sizePerPage,
        },
      })
      .then((res) => {
        let resData = res?.data?.data?.employees;
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
      });
    setLoading(false);
  },[id, page, setData, setDesignationFilter, setLoading, setPage, setSizePerPage, setTotalPages, sizePerPage]);

  const MySearch = useCallback((props) => {
    let input;
    const handleClick = () => {
      setPage(1);
      setLoading(true);
      props.onSearch(input.value);
      const searchTerm = input.value;
      setSearchTerm(searchTerm);

      if (page === 1) {
        axiosInstance
          .get(`/office/employees?campaign=${id}`, {
            params: {
              search: searchTerm,
              page: page,
              limit: sizePerPage,
            },
          })
          .then((res) => {
            let resData = res?.data?.data?.employees;
            let resOptions = res?.data?.data?.pagination;

            const thisPageLimit = sizePerPage;
            const thisTotalPageSize = resOptions?.numberOfPages;

            setSizePerPage(thisPageLimit);
            setTotalPages(thisTotalPageSize);

            let formatted = resData.map((e) => ({
              ...e,
              fullName: e.first_name + ' ' + e.last_name + ' ' + e?.middle_name,
              designation_name: e?.designation?.designation,
            }));

            setData(formatted);
            setDesignationFilter('');
          });
      }
      setLoading(false);
    };

    return (
      <div className="job-app-search"
      style={{
        width: '100%',
      }}>
        <input
          className="form-control"
          style={{
            backgroundColor: '#fff',
            width: '33.5%',
            marginRight: '10px',
          }}
          ref={(n) => (input = n)}
          type="text"
        />
        <button className="btn btn-primary" onClick={handleClick}>
          Search
        </button>
      </div>
    );
  }, [id, page, setData, setDesignationFilter, setLoading, setPage, setSearchTerm, setSizePerPage, setTotalPages, sizePerPage]);

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
  
  const showNullMessage = () => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
    return <>{show ? "No Data Available" : null}</>;
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

              <div style={{display: 'flex', justifyContent: "space-between"}}>
                <MySearch
                  {...props.searchProps}
                  style={{ paddingLeft: '12%' }}
                  className="inputSearch"
                />

                <div className="float-right">
                    <ExportCSVButton
                      style={{ width: '120%' }}
                      className="float-right btn export-csv"
                      {...props.csvProps}
                    >
                      Export CSV
                    </ExportCSVButton>
                </div>
              </div>

                
              <div className="d-flex row mb-3">
                <div className="col-md-5">
                  <Select
                    options={designation}
                    isSearchable={true}
                    onChange={(e) => handleChangeDesignation(e)}
                    placeholder="Filter by designation..."
                  />
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

export default CampaignAttendanceTable;
