/** @format */

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../services/api';
// import { useAppContext } from '../../../Context/AppContext';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
// import Select from 'react-select';
import filterFactory, {
  textFilter,
  selectFilter,
  dateFilter,
} from 'react-bootstrap-table2-filter';

import paginationFactory from 'react-bootstrap-table2-paginator';
import usePagination from './JobApplicantsPagination.Admin';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
  setSearchTerm,
}) => {
  // const { SearchBar, ClearSearchButton } = Search;

  // const selectRow = {
  //   mode: 'checkbox',
  //   clickToSelect: clickToSelect,
  //   selected: selected,
  //   onSelect: handleOnSelect,
  //   onSelectAll: handleOnSelectAll,
  // };

  // const { user } = useAppContext();
  // const [monthlyFilter, setMonthlyFilter] = useState('');

  const { ExportCSVButton } = CSVExport;
  const [mobileView, setmobileView] = useState(false);
  const [dataToFilter, setDataToFilter] = useState('');
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });

  const handleIntervieStatusFilter = (e) => {
    setIntervieStatusFilter(e.target.value);
    setPage(1);
    setLoading(true);

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
          pageData >= sizePerPage ? resOptions.next.page : pageData < sizePerPage + 1 ? null : null;

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
            : e.default_job_opening_id?.job_title || '-',
          application_date: new Date(e.createdAt).toUTCString(),
        }));

        setData(formatted);
        setDataToFilter(formatted);
        setprocessingStageFilter('');
      });
    setLoading(false);
  };

  const handleProcessingStageFilter = (e) => {
    setprocessingStageFilter(e.target.value);
    setPage(1);
    setLoading(true);

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
          pageData >= sizePerPage ? resOptions.next.page : pageData < sizePerPage + 1 ? null : null;

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
            : e.default_job_opening_id?.job_title || '-',
          application_date: new Date(e.createdAt).toUTCString(),
        }));

        setData(formatted);
        setDataToFilter(formatted);
        setIntervieStatusFilter('');
      });
    setLoading(false);
  };

  const MySearch = (props) => {
    let input;
    const handleClick = () => {
      if (loading) {
        setData([])
        setDataToFilter([])
      }
      setPage(1);
      setLoading(true);
      props.onSearch(input.value);
      const searchTerm = input.value;
      setSearchTerm(searchTerm);

      if (page === 1) {
        axiosInstance
          .get('/api/jobApplicant', {
            params: {
              search: searchTerm,
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
                : pageData < 10
                ? null
                : resOptions.previous.page;

          
            const thisNextPage =
              pageData >= sizePerPage ? resOptions.next.page : pageData < sizePerPage + 1 ? null : null;

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
                : e.default_job_opening_id?.job_title || '-',
              application_date: new Date(e.createdAt).toUTCString(),
            }));

            setData(formatted);
            setDataToFilter(formatted);
            setIntervieStatusFilter('');
            setprocessingStageFilter('');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileView]);

  useEffect(() => {
    setDataToFilter(data);
    setTimeout(() => {
      setLoading(true);
    }, 5000);
  }, [data, setLoading]);

  // eslint-disable-next-line no-unused-vars
  const imageUrl = 'https://erp.outsourceglobal.com';

  console.log(
    'Pagination:',
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
    if (loading) {
      setData([])
      setDataToFilter([])
    }
    return;
  };

  const handleChangeSizePerPage = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo((prevState) => ({ ...prevState, [name]: value }));

    setSizePerPage(e.target.value);
    setPage(1);
    
    if (loading) {
      setData([])
      setDataToFilter([])
    }
    return;
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

export default JobApplicantsTable;
