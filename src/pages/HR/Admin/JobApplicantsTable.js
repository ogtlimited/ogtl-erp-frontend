/** @format */

import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit';
import Select from 'react-select';
import filterFactory, {
  textFilter,
  selectFilter,
  dateFilter,
} from 'react-bootstrap-table2-filter';

import paginationFactory from 'react-bootstrap-table2-paginator';
import usePagination from './JobApplicantsPagination.Admin';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const LeavesTable = ({
  data,
  setData,
  loading,
  setLoading,
  columns,
  context,
  clickToSelect = false,
  selected,
  handleOnSelect,
  handleOnSelectAll,
  statusInterview,
  processingStage,
  prevPage,
  page,
  nextPage,
  sizePerPage,
  totalPages,
  setPage,
  fetchJobApplicants,
  setPrevPage,
  setNextPage,
  setSizePerPage,
  setTotalPages,
}) => {
  const { SearchBar, ClearSearchButton } = Search;
  const { ExportCSVButton } = CSVExport;
  const selectRow = {
    mode: 'checkbox',
    clickToSelect: clickToSelect,
    selected: selected,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
  };

  const [mobileView, setmobileView] = useState(false);
  const [monthlyFilter, setMonthlyFilter] = useState('');
  const [intervieStatusFilter, setIntervieStatusFilter] = useState('');
  const [processingStageFilter, setprocessingStageFilter] = useState('');
  const [dataToFilter, setDataToFilter] = useState('');

  const handleIntervieStatusFilter = (e) => {
    setIntervieStatusFilter(e.target.value);
    const filteredItems = data.filter(
      (item) => item.interview_status === e.target.value
    );
    // console.log("FilterStatus", filteredItems)
    if (filteredItems === null) {
      setDataToFilter(data);
    }
    // setDataToFilter(filteredItems)
    setDataToFilter(filteredItems);
    setLoading(false);
    setprocessingStageFilter('');
    // console.log("Processing Status",processingStageFilter)
  };

  const handleProcessingStageFilter = (e) => {
    setprocessingStageFilter(e.target.value);
    const filteredItems = data.filter(
      (item) => item.process_stage === e.target.value
    );
    // if(filteredItems.length===0) return
    // setDataToFilter(filteredItems)
    setDataToFilter(filteredItems);
    setLoading(false);
    setIntervieStatusFilter('');
  };

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
  }, [data]);

  const imageUrl = 'https://erp.outsourceglobal.com';

  console.log(
    'This application options from Backend:',
    prevPage,
    page,
    nextPage,
    sizePerPage,
    totalPages
  );

  // Pagination
  const count = totalPages;
  const _DATA = usePagination(data, sizePerPage, totalPages);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
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

              <div class="filter">
                <div class="interview_status_filter">
                  <select
                    onChange={(e) => handleIntervieStatusFilter(e)}
                    defaultValue={intervieStatusFilter}
                    value={intervieStatusFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter By Interview Status
                    </option>
                    {statusInterview.map((option, idx) => (
                      <option key={idx}>{option.title}</option>
                    ))}
                  </select>
                </div>

                <div class="processing_stage_filter">
                  <select
                    onChange={(e) => handleProcessingStageFilter(e)}
                    defaultValue={processingStageFilter}
                    value={processingStageFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter By Processing Stage
                    </option>
                    {/* <option>All</option> */}
                    {processingStage.map((option, idx) => (
                      <option key={idx}>{option.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <BootstrapTable
                {...props.baseProps}
                bordered={false}
                filter={filterFactory()}
                data={data}
                columns={columns}
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
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )
                }
                pagination={paginationFactory({
                  onSizePerPageChange: (page, sizePerPage) => {
                    setSizePerPage(page);
                    setPage(sizePerPage);
                  },
                })}
              />
              <div className="application-table-pagination">
                <Stack spacing={2}>
                  <Pagination
                    className='job-applicant-pagination'
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

export default LeavesTable;
