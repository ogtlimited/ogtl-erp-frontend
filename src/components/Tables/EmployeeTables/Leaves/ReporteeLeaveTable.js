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
  leaveTypeFilter,
  setLeaveTypeFilter,
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

  useEffect(() => {
    setDataToFilter(data);
    setTimeout(() => {
    }, 7000);
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

              <ExportCSVButton
                className="float-right btn export-csv" style={{ marginBottom: 15}}
                {...props.csvProps}
              >
                Export CSV
              </ExportCSVButton>

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
