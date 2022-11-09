/** @format */

import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JobApplicantsTable from './JobApplicantsTable';
import axiosInstance from '../../../services/api';
import { useAppContext } from '../../../Context/AppContext';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import helper from '../../../services/helper';
import GeneralApproverBtn from '../../../components/Misc/GeneralApproverBtn';
import {
  InterviewProcessStageOptions,
  InterviewStatusOptions,
} from '../../../constants';
import ViewModal from '../../../components/Modal/ViewModal';
import JobApplicationContent from '../../../components/ModalContents/JobApplicationContent';
import ScheduleInterview from '../../../components/ModalContents/ScheduleInterview';

const JobApplicants = () => {
  const [data, setData] = useState([]);
  const { showAlert, user } = useAppContext();
  const [statusRow, setstatusRow] = useState(null);
  const [processingStageRow, setprocessingStageRow] = useState(null);
  const [interview_status, setInterviewStatus] = useState('');
  const [process_stage, setprocessingStage] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewRow, setViewRow] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [unfiltered, setunfiltered] = useState([]);
  const [modalType, setmodalType] = useState('schedule-interview');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);

  const [prevPage, setPrevPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [totalPages, setTotalPages] = useState('');

  const [intervieStatusFilter, setIntervieStatusFilter] = useState('');
  const [processingStageFilter, setprocessingStageFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchJobApplicants = useCallback(() => {
    if (user?.isRepSiever) {
      axiosInstance
        .get('/api/job-sievers/job-applicants', {
          params: {
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

          const thisCurrentPage =
            pageData >= sizePerPage
              ? resOptions.next.page - 1
              : resOptions.previous.page + 1;

          const thisNextPage =
            pageData >= sizePerPage ? resOptions.next.page : null;

          const thisPageLimit = sizePerPage;
          const thisTotalPageSize = resOptions.numberOfPages;

          setPrevPage(thisPreviousPage);
          setPage(thisCurrentPage);
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

          // console.log("this user", user);
          setData(formatted);
          setunfiltered(formatted);
          setLoading(false);
        });
      return;
    }
    axiosInstance
      // .get(`/api/jobApplicant?page=${page}&limit=${sizePerPage}`) //<-- Or use a one liner if you want
      .get('/api/jobApplicant', {
        params: {
          interview_status: intervieStatusFilter,
          process_stage: processingStageFilter,
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

        const thisCurrentPage =
          pageData >= sizePerPage
            ? resOptions.next.page - 1
            : resOptions.previous.page + 1;

        const thisNextPage =
          pageData >= sizePerPage ? resOptions.next.page : null;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = resOptions.numberOfPages;

        setPrevPage(thisPreviousPage);
        setPage(thisCurrentPage);
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
            : e.default_job_opening_id?.job_title || "-",
        }));

        // console.log("this user", user);
        // console.log('this job data', formatted);
        setData(formatted);
        setunfiltered(formatted);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [intervieStatusFilter, page, processingStageFilter, sizePerPage, user?.isRepSiever]);

  useEffect(() => {
    fetchJobApplicants();
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [fetchJobApplicants]);

  // const handleClick = (i) => {
  //   if (i?.value === 'All' || i === null) {
  //     setData(unfiltered);
  //   } else {
  //     const filt = unfiltered.filter((e) => i.label.includes(e.status));

  //     setData(filt);
  //   }
  // };

  //delete job opening
  const deleteJobApplicant = (row) => {
    axiosInstance
      .delete(`/api/jobApplicant/${row._id}`)
      .then((res) => {
        setData((prevData) =>
          prevData.filter((pdata) => pdata._id !== row._id)
        );
        showAlert(true, res.data.message, 'alert alert-success');
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, 'alert alert-danger');
      });
  };

  //update jobOpening
  const handleUpdate = useCallback((id, update) => {
    if (user?.isRepSiever === false) {
      return showAlert(
        true,
        'You are not authorized to perform this action',
        'alert alert-danger'
      );
    }
    axiosInstance
      .patch('/api/jobApplicant/' + id, update)
      .then((res) => {
        fetchJobApplicants();
        showAlert(true, res.data.message, 'alert alert-success');
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, 'alert alert-danger');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (interview_status.length) {
      const update = {
        interview_status,
        _id: statusRow?._id,
      };
      handleUpdate(statusRow._id, update);
    }
  }, [interview_status, statusRow, handleUpdate]);

  useEffect(() => {
    if (process_stage.length) {
      const update = {
        process_stage,
        _id: processingStageRow?._id,
      };
      handleUpdate(processingStageRow._id, update);
    }
  }, [process_stage, processingStageRow, handleUpdate]);

  const columns = [
    {
      dataField: 'full_name',
      text: 'Job Applicant',
      sort: true,
      formatter: (value, row) => <h2>{row?.full_name}</h2>,
    },
    {
      dataField: 'job_opening_id',
      text: 'Job Opening',
      sort: true,
      formatter: (value, row) => (
        <>
          <h2>{row?.job_opening_id}</h2>
        </>
      ),
    },
    {
      dataField: 'interview_date',
      text: 'Interview Date',
      sort: true,
      formatter: (value, row) => <h2>{row.interview_date}</h2>,
    },
    {
      dataField: 'interview_status',
      text: 'Interview Status',
      sort: true,
      formatter: (value, row) => (
        <>
          <GeneralApproverBtn
            options={InterviewStatusOptions}
            setStatus={setInterviewStatus}
            value={value}
            row={row}
            setstatusRow={setstatusRow}
          />
        </>
      ),
    },
    {
      dataField: 'process_stage',
      text: 'Processing Stage',
      sort: true,

      formatter: (value, row) => (
        <>
          <GeneralApproverBtn
            options={InterviewProcessStageOptions}
            setStatus={setprocessingStage}
            value={value}
            row={row}
            setstatusRow={setprocessingStageRow}
          />
        </>
      ),
    },
    {
      dataField: 'resume_attachment',
      text: 'Resume Attachment',
      sort: true,
      formatter: (value, row) => (
        <a href={value} className="btn btn-sm btn-primary" download>
          <i className="fa fa-download"></i> Download
        </a>
      ),
    },
    {
      dataField: '',
      text: 'Action',
      sort: true,
      csvExport: false,
      headerStyle: { minWidth: '70px', textAlign: 'left' },
      formatter: (value, row) => (
        <div className="dropdown dropdown-action text-right">
          <>
            <a
              href="#"
              className="action-icon dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              {user?.role?.hr?.delete && (
                <a
                  className="dropdown-item"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => {
                    setmodalType();
                    setSelectedRow(helper.handleEdit(row));
                  }}
                >
                  <i className="fa fa-trash m-r-5"></i> Delete
                </a>
              )}
              <a
                className="dropdown-item"
                data-toggle="modal"
                data-target="#generalModal"
                onClick={() => {
                  setmodalType('view-details');
                  setViewRow(row);
                }}
              >
                <i className="fa fa-eye m-r-5"></i> View
              </a>
              <a
                className="dropdown-item"
                data-toggle="modal"
                data-target="#generalModal"
                onClick={() => {
                  setmodalType('schedule-interview');
                  setSelectedRow(helper.handleEdit(row));
                }}
              >
                <i className="fa fa-clock m-r-5"></i> Schedule Interview
              </a>
            </div>
          </>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Job Applicants List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Employees</Link>
              </li>
              <li className="breadcrumb-item active">Job Applicants List</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <JobApplicantsTable
            data={data}
            loading={loading}
            setLoading={setLoading}
            setData={setData}
            columns={columns}
            statusInterview={InterviewStatusOptions}
            processingStage={InterviewProcessStageOptions}
            prevPage={prevPage}
            page={page}
            nextPage={nextPage}
            sizePerPage={sizePerPage}
            totalPages={totalPages}
            setPrevPage={setPrevPage}
            setPage={setPage}
            setNextPage={setNextPage}
            setSizePerPage={setSizePerPage}
            setTotalPages={setTotalPages}
            fetchJobApplicants={fetchJobApplicants}
            intervieStatusFilter={intervieStatusFilter}
            setIntervieStatusFilter={setIntervieStatusFilter}
            processingStageFilter={processingStageFilter}
            setprocessingStageFilter={setprocessingStageFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}

          />
        </div>
      </div>
      <ConfirmModal
        title="Job Applicant"
        selectedRow={selectedRow}
        deleteFunction={deleteJobApplicant}
      />
      {modalType === 'view-details' ? (
        <ViewModal
          title="Applicant Details"
          content={<JobApplicationContent jobApplication={viewRow} />}
        />
      ) : (
        <ViewModal
          title="Schedule Interview"
          content={
            <ScheduleInterview
              handleUpdate={handleUpdate}
              jobApplication={selectedRow}
            />
          }
        />
      )}
    </>
  );
};

export default JobApplicants;
