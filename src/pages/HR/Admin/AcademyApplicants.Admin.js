/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AcademyTable from './AcademyApplicantsTable';
import axiosInstance from '../../../services/api';
import { useAppContext } from '../../../Context/AppContext';
// import ConfirmModal from '../../../components/Modal/ConfirmModal';
import helper from '../../../services/helper';
import AcademyApproverBtn from '../../../components/Misc/AcademyApproveBtn';
import {
  AcademyInterviewProcessStageOptions,
  AcademyStatusOptions,
} from '../../../constants';
import ViewModal from '../../../components/Modal/ViewModal';
import AcademyApplicantsContent from '../../../components/ModalContents/AcademyApplicantsContent';
// import ScheduleInterview from '../../../components/ModalContents/ScheduleInterview';


const AcademyApplicants = () => {
  const [data, setData] = useState([]);
  const { showAlert, user } = useAppContext();
  const [statusRow, setstatusRow] = useState(null);
  const [processingStageRow, setprocessingStageRow] = useState(null);
  const [interview_status, setInterviewStatus] = useState('');
  const [process_stage, setprocessingStage] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [viewRow, setViewRow] = useState(null);
  const [unfiltered, setunfiltered] = useState([]);
  const [modalType, setmodalType] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAcademyApplicants = () => {
    axiosInstance
      .get('/api/academy')
      .then((res) => {
        let resData = res?.data?.data;
        let formatted = resData.map((e) => ({
          ...e,
          full_name: e.first_name + ' ' + e.last_name,
        }));
        
         if (user?.isRepSiever) {
           const userApplications = formatted.filter(
             (apl) => apl.rep_sieving_call?._id === user._id
           );
           setData(userApplications);
           setunfiltered(userApplications);
         } else {
           setData(formatted);
           setunfiltered(formatted);
         }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAcademyApplicants();
    setTimeout(() => {
      setLoading(false);
    }, 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleClick = (i) => {
  //   if (i?.value === 'All' || i === null) {
  //     setData(unfiltered);
  //   } else {
  //     const filt = unfiltered.filter((e) => i.label.includes(e.status));

  //     setData(filt);
  //   }
  // };

  //delete job opening
  // const deleteJobApplicant = (row) => {
  //   axiosInstance
  //     .delete(`/api/jobApplicant/${row._id}`)
  //     .then((res) => {
  //       setData((prevData) =>
  //         prevData.filter((pdata) => pdata._id !== row._id)
  //       );
  //       showAlert(true, res.data.message, 'alert alert-success');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       showAlert(true, error.response.data.message, 'alert alert-danger');
  //     });
  // };

  // update Academy
  const handleUpdate = useCallback((id, update) => {
    axiosInstance
      .patch('/api/academy/update/' + id, update)
      .then((res) => {
        fetchAcademyApplicants();
        showAlert(true, res.data.message, 'alert alert-success');
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, 'alert alert-danger');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // For Interview Stage
  useEffect(() => {
    if (interview_status.length) {
      const update = {
        interview_status,
        // _id: statusRow?._id,
      };
      handleUpdate(statusRow._id, update);
    }
  }, [interview_status, statusRow, handleUpdate]);

  // For Processing Stage
  useEffect(() => {
    if (process_stage.length) {
      const update = {
        process_stage,
        // _id: processingStageRow?._id,
      };
      handleUpdate(processingStageRow._id, update);
    }
  }, [process_stage, processingStageRow, handleUpdate]);


  // Table for Academy
  const columns = [
    {
      dataField: 'full_name',
      text: 'Academy Applicant',
      sort: true,
      formatter: (value, row) => (
        <h2>
          {row?.full_name}
        </h2>
      ),
    },
    {
      dataField: 'user_name',
      text: 'Academy Applicant Email',
      sort: true,
      formatter: (value, row) => (
        <>
          <h2>{row?.user_name}</h2>
        </>
      ),
    },
    {
      dataField: 'alt_mobile_number',
      text: 'Mobile Number',
      sort: true,
      formatter: (value, row) => (
        <>
          {row?.alt_mobile_number === "" ? (
            <h2>None</h2>
          ) : (
            <h2>{row?.alt_mobile_number}</h2>
          )}
        </>
      ),
    },
    {
      dataField: 'interview_status',
      text: 'Academy Status',
      sort: true,
      formatter: (value, row) => (
        <>
          <AcademyApproverBtn
            options={AcademyStatusOptions}
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
          <AcademyApproverBtn
            options={AcademyInterviewProcessStageOptions}
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
        <a href={row?.cv} className="btn btn-sm btn-primary" download>
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
            <h3 className="page-title">Academy Applicants List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Members</Link>
              </li>
              <li className="breadcrumb-item active">
                Academy Applicants List
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {/* <div className="col-3 mb-2">
             <Select
               defaultValue={[]}
               onChange={handleClick}
               options={jobOpts}
               placeholder="Filter Job Applicants"
               isClearable={true}
               style={{ display: "inline-block" }}
               // formatGroupLabel={formatGroupLabel}
             />
           </div> */}

          <AcademyTable
            data={data}
            loading={loading}
            setLoading={setLoading}
            setData={setData}
            columns={columns}
            statusInterview={AcademyStatusOptions}
            processingStage={AcademyInterviewProcessStageOptions}
          />
        </div>
      </div>

      {/* <ConfirmModal
        title="Job Applicant"
        selectedRow={selectedRow}
        // deleteFunction={deleteJobApplicant}
      /> */}

      {modalType === 'view-details' ? (
        <ViewModal
          title="Applicant Details"
          content={<AcademyApplicantsContent jobApplication={viewRow} />}
        />
      ) : ""
      }
    </>
  );
};

export default AcademyApplicants;
