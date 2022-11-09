/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../../services/api';
import { useAppContext } from '../../../Context/AppContext';
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

const MySearch = (props) => {
  let input;
  const handleClick = () => {
    props.onSearch(input.value);
    console.log("Search this biko", input.value)
  };
  return (
    <div className='job-app-search'>
      <input
        className="form-control"
        style={ { backgroundColor: '#fff', width: '33.5%', marginRight: '20px' } }
        ref={ n => input = n }
        type="text"
      />
      <button className="btn btn-primary" onClick={ handleClick }>Search</button>
    </div>
  );
};

const JobApplicantsTable = ({
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
  intervieStatusFilter,
  setIntervieStatusFilter,
  processingStageFilter,
  setprocessingStageFilter,
  searchTerm,
  setSearchTerm
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

  const { user } = useAppContext();
  const [mobileView, setmobileView] = useState(false);
  const [monthlyFilter, setMonthlyFilter] = useState('');
  const [dataToFilter, setDataToFilter] = useState('');

  const handleIntervieStatusFilter = (e) => {
    setIntervieStatusFilter(e.target.value);
    setPage(1)

    axiosInstance
    .get('/api/jobApplicant', {
      params: {
        interview_status: e.target.value,
        page: page,
        limit: sizePerPage,
      },
    })
    .then((res) => {
      let resData = res?.data?.data?.jobApplicants;
      const pageData = res?.data?.data?.totalNumberofApplicants;
      let resOptions = res?.data?.data?.pagination;

      const thisPreviousPage =
        pageData >= sizePerPage && resOptions.next.page === 2
          ? null
          : resOptions.previous.page;

      const thisNextPage =
        pageData >= sizePerPage ? resOptions.next.page : null;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = resOptions.numberOfPages;

      setPrevPage(thisPreviousPage);
      setNextPage(thisNextPage);
      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      let formatted = resData.map((e) => ({
        ...e,
        full_name: e.first_name + ' ' + e.middle_name + ' ' + e.last_name,
        interview_date: e.interview_date
          ? new Date(e.interview_date).toUTCString()
          : 'Not Set',
        job_opening_id: e.job_opening_id?.job_title
          ? e.job_opening_id?.job_title
          : e.default_job_opening_id?.job_title,
      }));

      setData(formatted);
      setDataToFilter(formatted)
      setLoading(false);
      setprocessingStageFilter('');
    });
  };

  const handleProcessingStageFilter = (e) => {
    setprocessingStageFilter(e.target.value);
    setPage(1)

    axiosInstance
    .get('/api/jobApplicant', {
      params: {
        process_stage: e.target.value,
        page: page,
        limit: sizePerPage,
      },
    })
    .then((res) => {
      let resData = res?.data?.data?.jobApplicants;
      const pageData = res?.data?.data?.totalNumberofApplicants;
      let resOptions = res?.data?.data?.pagination;

      const thisPreviousPage =
        pageData >= sizePerPage && resOptions.next.page === 2
          ? null
          : resOptions.previous.page;

      const thisNextPage =
        pageData >= sizePerPage ? resOptions.next.page : null;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = resOptions.numberOfPages;

      setPrevPage(thisPreviousPage);
      setNextPage(thisNextPage);
      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      let formatted = resData.map((e) => ({
        ...e,
        full_name: e.first_name + ' ' + e.middle_name + ' ' + e.last_name,
        interview_date: e.interview_date
          ? new Date(e.interview_date).toUTCString()
          : 'Not Set',
        job_opening_id: e.job_opening_id?.job_title
          ? e.job_opening_id?.job_title
          : e.default_job_opening_id?.job_title,
      }));

      setData(formatted);
      setDataToFilter(formatted)
      setLoading(false);
      setIntervieStatusFilter('');
    });
  };

  const handleSearchChange = (props) => {
    const searchTerm = props
    console.log(searchTerm)
    // setSearchTerm(searchTerm)
    // setPage(1)

    // axiosInstance
    // .get('/api/jobApplicant', {
    //   params: {
    //     search: searchTerm,
    //     page: page,
    //     limit: sizePerPage,
    //   },
    // })
    // .then((res) => {
    //   let resData = res?.data?.data?.jobApplicants;
    //   const pageData = res?.data?.data?.totalNumberofApplicants;
    //   let resOptions = res?.data?.data?.pagination;

    //   const thisPreviousPage =
    //     pageData >= sizePerPage && resOptions.next.page === 2
    //       ? null
    //       : resOptions.previous.page;

    //   const thisNextPage =
    //     pageData >= sizePerPage ? resOptions.next.page : null;

    //   const thisPageLimit = sizePerPage;
    //   const thisTotalPageSize = resOptions.numberOfPages;

    //   setPrevPage(thisPreviousPage);
    //   setNextPage(thisNextPage);
    //   setSizePerPage(thisPageLimit);
    //   setTotalPages(thisTotalPageSize);

    //   let formatted = resData.map((e) => ({
    //     ...e,
    //     full_name: e.first_name + ' ' + e.middle_name + ' ' + e.last_name,
    //     interview_date: e.interview_date
    //       ? new Date(e.interview_date).toUTCString()
    //       : 'Not Set',
    //     job_opening_id: e.job_opening_id?.job_title
    //       ? e.job_opening_id?.job_title
    //       : e.default_job_opening_id?.job_title,
    //   }));

    //   setData(formatted);
    //   setDataToFilter(formatted)
    //   setLoading(false);
    // });
  }

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
    // setTimeout(() => {
    //   setLoading(true);
    // }, 7000);
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
              <MySearch
                {...props.searchProps}
                onChange={handleSearchChange(props.searchProps.searchText)}
                style={{ marginBottom: 15, paddingLeft: '12%' }}
                className="inputSearch"
              />

              <ExportCSVButton
                className="float-right btn export-csv"
                {...props.csvProps}
              >
                Export CSV
              </ExportCSVButton>

              <div className="filter">
                <div className="interview_status_filter">
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

                <div className="processing_stage_filter">
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
                    'No Data Found'
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

export default JobApplicantsTable;
