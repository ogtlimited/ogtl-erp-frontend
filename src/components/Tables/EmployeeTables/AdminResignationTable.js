/** @format */

import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axiosInstance from '../../../services/api';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit';
import filterFactory, {
  textFilter,
  selectFilter,
  dateFilter,
} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import usePagination from '../../../pages/HR/Admin/JobApplicantsPagination.Admin';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const AdminResignationTable = ({
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
  departments,
  leaveTypes,
}) => {
  // const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
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
    setPage(1);
    setLoading(true);

    axiosInstance
      .get(`leads-leave-applications`, {
        params: {
          department: e.target.value,
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

        const formatted = resData.map((leave) => ({
          ...leave,
          full_name:
            leave?.employee.first_name +
            ' ' +
            leave?.employee.middle_name +
            ' ' +
            leave?.employee.last_name,
          status_action: leave?.status,
          leave_type: leave?.leave_type_id?.leave_type,
          department: leave?.department_id?.department,
          from_date: new Date(leave.from_date).toDateString(),
          to_date: new Date(leave.to_date).toDateString(),
          total_leave_days: Math.ceil(
            (new Date(leave.to_date) - new Date(leave.from_date)) /
              (1000 * 3600 * 24)
          ),
        }));

        setData(formatted);
        setunfiltered(formatted);
      });
    setLoading(false);
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

            const formatted = resData.map((leave) => ({
              ...leave,
              full_name:
                leave?.employee.first_name +
                ' ' +
                leave?.employee.middle_name +
                ' ' +
                leave?.employee.last_name,
              status_action: leave?.status,
              leave_type: leave?.leave_type_id?.leave_type,
              department: leave?.department_id?.department,
              from_date: new Date(leave.from_date).toDateString(),
              to_date: new Date(leave.to_date).toDateString(),
              total_leave_days: Math.ceil(
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
                      Filter by Department
                    </option>
                    {departments.map((option, idx) => (
                      <option key={idx}>{option.department}</option>
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
                    null
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

export default AdminResignationTable;
