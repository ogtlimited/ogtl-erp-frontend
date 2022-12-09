/** @format */

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
import {
  LeaveStatusOptions,
  LeaveTypeOptions,
  department
} from '../..//..//..//constants/index';

import paginationFactory from 'react-bootstrap-table2-paginator';

const AdminLeavesTable = ({
  data,
  columns,
  context,
  loading,
  // clickToSelect = false,
  // selected,
  // handleOnSelect,
  // handleOnSelectAll
}) => {
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const [departmentFilter, setDepartmentFilter] = useState('');
  // const [leaveStatusFilter, setLeaveStatusFilter] = useState('');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('');
  const [dataToFilter, setDataToFilter] = useState('');
  const [mobileView, setmobileView] = useState(false);
  // const selectRow = {
  //   mode: 'checkbox',
  //   clickToSelect: clickToSelect,
  //   selected: selected,
  //   onSelect: handleOnSelect,
  //   onSelectAll: handleOnSelectAll,
  // };

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

  const imageUrl = 'https://erp.outsourceglobal.com';

  const handleDepartmentFilter = (e) => {
    setDepartmentFilter(e.target.value);
    const filteredItems = data.filter(
      (item) => item.reportee_department === e.target.value
    );
    if (filteredItems === null) {
      setDataToFilter(data);
    }
    setDataToFilter(filteredItems);
    setLeaveTypeFilter('');
  };

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
    const filteredItems = data.filter(
      (item) => item.leave_type === e.target.value
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
                    {LeaveTypeOptions.map((option, idx) => (
                      <option key={idx}>{option.title}</option>
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

export default AdminLeavesTable;
