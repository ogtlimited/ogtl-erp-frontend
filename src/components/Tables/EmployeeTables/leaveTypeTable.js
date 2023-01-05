/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
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

const LeaveTypeTable = ({
  columns,
  departments,
  data,
  loading,
  setLoading,
  context,
}) => {
  const status = [
    {
      code: 'pending',
      label: 'Pending',
    },
    {
      code: 'approved',
      label: 'Approved',
    },
    {
      code:'rejected',
      label: 'Rejected',
    },
  ]

  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;

  const [departmentFilter, setDepartmentFilter] = useState('');
  const [leaveStatusFilter, setLeaveStatusFilter] = useState('');
  const [mobileView, setmobileView] = useState(false);
  const [dataToFilter, setDataToFilter] = useState('');

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
    window.addEventListener('resize', () => {
      resizeTable();
    });
  }, [mobileView]);

  useEffect(() => {
    setDataToFilter(data);
    setTimeout(() => {
      setLoading(true);
    }, 7000);
  }, [data, setLoading]);

  const handleDepartmentFilter = (e) => {
    setDepartmentFilter(e.target.value);
    const filteredItems = data.filter(
      (item) => item.department === e.target.value
    );
    if (filteredItems === null) {
      setDataToFilter(data);
    }
    setDataToFilter(filteredItems);
    setLoading(false);
    setLeaveStatusFilter('');
  };

  const handleLeaveStatusFilter = (e) => {
    setLeaveStatusFilter(e.target.value);
    const filteredItems = data.filter(
      (item) => item.status === e.target.value
    );
    if (filteredItems === null) {
      setDataToFilter(data);
    }
    setDataToFilter(filteredItems);
    setLoading(false);
    setDepartmentFilter('');
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
                style={{ marginBottom: 15, paddingLeft: '12%' }}
                className="inputSearch"
              />

              <ExportCSVButton
                className="float-right btn export-csv"
                {...props.csvProps}
              >
                Export CSV
              </ExportCSVButton>

              
              <div className="d-flex row mb-3">
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

                <div className="col-md-3">
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleLeaveStatusFilter(e)}
                    defaultValue={leaveStatusFilter}
                    value={leaveStatusFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter by Status
                    </option>
                    {status.map((option, index) => (
                      <option key={index} value={option.code}>{option.label}</option>
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
                pagination={paginationFactory()}

                // defaultSorted={defaultSorted}
              />
            </div>
          )}
        </ToolkitProvider>
      )}
    </>
  );
};

export default LeaveTypeTable;
