/** @format */

import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axiosInstance from '../../../../services/api';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit';
import filterFactory, {
  textFilter,
  selectFilter,
  dateFilter,
} from 'react-bootstrap-table2-filter';
import {
  // LeaveStatusOptions,
  LeaveTypeOptions,
  department
} from '../../../../constants/index';

import paginationFactory from 'react-bootstrap-table2-paginator';
import usePagination from '../../../../pages/HR/Admin/JobApplicantsPagination.Admin';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ReporteeLeavesTable = ({
  data,
  setData,
  columns,
  context,
  loading,
  page,
  setPage,
  sizePerPage,
  setSizePerPage,
  totalPages,
  setTotalPages,
  departmentFilter,
  setDepartmentFilter,
  searchTerm,
  setSearchTerm,
  setLoading,
}) => {
  // const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  // const [leaveStatusFilter, setLeaveStatusFilter] = useState('');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('');
  const [dataToFilter, setDataToFilter] = useState('');
  const [mobileView, setmobileView] = useState(false);
  const [unfiltered, setunfiltered] = useState([]);
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });

  const resizeTable = () => {
    if (window.innerWidth >= 768) {
      setmobileView(false);
    }
    if (columns.length > 8) {
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
  }, [mobileView]);

  const imageUrl = 'https://erp.outsourceglobal.com';

  const handleDepartmentFilter = (e) => {
    setDepartmentFilter(e.target.value);
    const filteredItems = data.filter(
      (item) => item.department === e.target.value
    );
    
    if (filteredItems === null) {
      setDataToFilter(data);
    }
    setDataToFilter(filteredItems);
    setLeaveTypeFilter('');
  };

  // TODO: Department filter for backend paginated data (replicate and tweak for Filter by Leave Type)
  // const handleDepartmentFilter = (e) => {
  //   setDepartmentFilter(e.target.value);
  //   console.log("Search for this:", e.target.value);
  //   setPage(1);
  //   setLoading(true);

  //   axiosInstance
  //     .get(`leads-leave-applications`, {
  //       params: {
  //         department: e.label,
  //         page: page,
  //         limit: sizePerPage,
  //       },
  //     })
  //     .then((res) => {
  //       let resData = res?.data?.data?.application;
  //       let resOptions = res?.data?.data?.pagination;

  //       const thisPageLimit = sizePerPage;
  //       const thisTotalPageSize = resOptions?.numberOfPages;

  //       setSizePerPage(thisPageLimit);
  //       setTotalPages(thisTotalPageSize);

  //       const formatted = resData.map((leave) => ({
  //         ...leave,
  //         full_name:
  //           leave?.employee.first_name +
  //           ' ' +
  //           leave?.employee.middle_name +
  //           ' ' +
  //           leave?.employee.last_name,
  //         reportee_department: leave?.department?.department,
  //         from_date: new Date(leave.from_date).toDateString(),
  //         to_date: new Date(leave.to_date).toDateString(),
  //         requested_leave_days: Math.ceil(
  //           (new Date(leave.to_date) - new Date(leave.from_date)) /
  //             (1000 * 3600 * 24)
  //         ),
  //       }));

  //       setData(formatted);
  //       setunfiltered(formatted);
  //     });
  //   setLoading(false);
  // };

  // const handleLeaveStatusFilter = (e) => {
  //   setLeaveStatusFilter(e.target.value);
  //   const filteredItems = data.filter((item) => item.status === e.target.value);
  //   if (filteredItems === null) {
  //     setDataToFilter(data);
  //   }
  //   setDataToFilter(filteredItems);
  //   setLoading(false);
  //   setLeaveTypeFilter('');
  //   setDepartmentFilter('')
  // };

  const handleLeaveTypeFilter = (e) => {
    setLeaveTypeFilter(e.target.value);
    setSearchTerm("");
    const filteredItems = data.filter(
      (item) => item.leave_type_id.leave_type === e.target.value
    );
    if (filteredItems === null) {
      setDataToFilter(data);
    }
    setDataToFilter(filteredItems);
    setDepartmentFilter('');
  };

  useEffect(() => {
    setDataToFilter(data);
    setTimeout(() => {
    }, 7000);
  }, [data]);

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
          .get(`leads-leave-applications`, {
            params: {
              search: searchTerm,
              page: page,
              limit: sizePerPage,
            },
          })
          .then((res) => {
            let resData = res?.data?.data?.application;
            let resOptions = res?.data?.data?.pagination;

            const thisPageLimit = sizePerPage;
            const thisTotalPageSize = resOptions?.numberOfPages;

            setSizePerPage(thisPageLimit);
            setTotalPages(thisTotalPageSize);

            let formatted = resData.map((leave) => ({
              ...leave,
              full_name:
                leave?.employee.first_name +
                ' ' +
                leave?.employee.middle_name +
                ' ' +
                leave?.employee.last_name,
              reportee_department: leave?.department?.department,
              from_date: new Date(leave.from_date).toDateString(),
              to_date: new Date(leave.to_date).toDateString(),
              requested_leave_days: Math.ceil(
                (new Date(leave.to_date) - new Date(leave.from_date)) /
                  (1000 * 3600 * 24)
              ),
            }));

            setData(formatted);
            setDepartmentFilter('');
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
              <MySearch
                {...props.searchProps}
                style={{ marginBottom: 15, paddingLeft: '12%' }}
                className="inputSearch"
              />

              <ExportCSVButton
                className="float-right btn export-csv"
                {...props.csvProps}
              >
                Export CSV
              </ExportCSVButton>

              <div className="hr-filter-select">
                <div>
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleDepartmentFilter(e)}
                    defaultValue={departmentFilter}
                    value={departmentFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter by department
                    </option>
                    {department.map((option, idx) => (
                      <option key={idx}>{option.title}</option>
                    ))}
                  </select>
                </div>

                {/* <div className="col-md-3">
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleLeaveStatusFilter(e)}
                    defaultValue={leaveStatusFilter}
                    value={leaveStatusFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter by status
                    </option>
                    {LeaveStatusOptions.map((option, idx) => (
                      <option key={idx}>{option.title}</option>
                    ))}
                  </select>
                </div> */}

                <div className="col-md-3">
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleLeaveTypeFilter(e)}
                    defaultValue={leaveTypeFilter}
                    value={leaveTypeFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter by leave type
                    </option>
                    {LeaveTypeOptions.map((option, index) => (
                      <option key={index}>{option.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <BootstrapTable
                {...props.baseProps}
                bordered={false}
                // selectRow={selectRow}
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
                    'No Record Found'
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

export default ReporteeLeavesTable;
