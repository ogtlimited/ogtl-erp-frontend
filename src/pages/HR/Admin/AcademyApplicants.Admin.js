import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AcademyTable from './AcademyApplicantsTable';
import axiosInstance from '../../../services/api';
import { useAppContext } from '../../../Context/AppContext';
// import ConfirmModal from '../../../components/Modal/ConfirmModal';
// import helper from '../../../services/helper';
// import GeneralApproverBtn from '../../../components/Misc/GeneralApproverBtn';
// import {
//   InterviewProcessStageOptions,
//   InterviewStatusOptions,
// } from '../../../constants';
// import ViewModal from '../../../components/Modal/ViewModal';
// import JobApplicationContent from '../../../components/ModalContents/JobApplicationContent';
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
  const [modalType, setmodalType] = useState('schedule-interview');
  const [loading, setLoading] = useState(true);

  const fetchAcademyApplicants = () => {
    axiosInstance
      .get('/api/academy')
      .then((res) => {
        console.log('Academy Application', res?.data?.data);
        let resData = res?.data?.data;
        let formatted = resData.map((e) => ({
          ...e,
          full_name: e.first_name + ' ' + e.last_name,
        }));
        
         console.log('This app user', user);
         if (user?.isRepSiever) {
           const userApplications = formatted.filter(
             (apl) => apl.rep_sieving_call?._id === user._id
           );
           console.log("This user app", userApplications);
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

  //update jobOpening
  // const handleUpdate = useCallback((id, update) => {
  //   console.log(update);
  //   axiosInstance
  //     .patch('/api/jobApplicant/' + id, update)
  //     .then((res) => {
  //       fetchAcademyApplicants();
  //       showAlert(true, res.data.message, 'alert alert-success');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       showAlert(true, error.response.data.message, 'alert alert-danger');
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   if (interview_status.length) {
  //     const update = {
  //       interview_status,
  //       _id: statusRow?._id,
  //     };
  //     handleUpdate(statusRow._id, update);
  //   }
  // }, [interview_status, statusRow, handleUpdate]);

  // useEffect(() => {
  //   if (process_stage.length) {
  //     const update = {
  //       process_stage,
  //       _id: processingStageRow?._id,
  //     };
  //     handleUpdate(processingStageRow._id, update);
  //   }
  // }, [process_stage, processingStageRow, handleUpdate]);

  const columns = [
    {
      dataField: 'full_name',
      text: 'Academy Applicant',
      sort: true,
      formatter: (value, row) => (
        <h2>
          {row?.first_name} {row?.last_name}
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
      dataField: 'certifications',
      text: 'Certifications',
      sort: true,
      formatter: (value, row) => (
        <h2>
          {row?.certifications}
        </h2>
      ),
    },

    // {
    //   dataField: 'interview_status',
    //   text: 'Interview Status',
    //   sort: true,
    //   formatter: (value, row) => (
    //     <>
    //       <GeneralApproverBtn
    //         options={InterviewStatusOptions}
    //         setStatus={setInterviewStatus}
    //         value={value}
    //         row={row}
    //         setstatusRow={setstatusRow}
    //       />
    //     </>
    //   ),
    // },

    // {
    //   dataField: 'process_stage',
    //   text: 'Processing Stage',
    //   sort: true,

    //   formatter: (value, row) => (
    //     <>
    //       <GeneralApproverBtn
    //         options={InterviewProcessStageOptions}
    //         setStatus={setprocessingStage}
    //         value={value}
    //         row={row}
    //         setstatusRow={setprocessingStageRow}
    //       />
    //     </>
    //   ),
    // },

    // {
    //   dataField: 'resume_attachment',
    //   text: 'Resume Attachment',
    //   sort: true,
    //   formatter: (value, row) => (
    //     <a href={value} className="btn btn-sm btn-primary" download>
    //       <i className="fa fa-download"></i> Download
    //     </a>
    //   ),
    // },

    // {
    //   dataField: '',
    //   text: 'Action',
    //   sort: true,
    //   csvExport: false,
    //   headerStyle: { minWidth: '70px', textAlign: 'left' },
    //   formatter: (value, row) => (
    //     <div className="dropdown dropdown-action text-right">
    //       <>
    //         <a
    //           href="#"
    //           className="action-icon dropdown-toggle"
    //           data-toggle="dropdown"
    //           aria-expanded="false"
    //         >
    //           <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
    //         </a>
    //         <div className="dropdown-menu dropdown-menu-right">
    //           {user?.role?.hr?.delete && (
    //             <a
    //               className="dropdown-item"
    //               data-toggle="modal"
    //               data-target="#exampleModal"
    //               onClick={() => {
    //                 setmodalType();
    //                 setSelectedRow(helper.handleEdit(row));
    //               }}
    //             >
    //               <i className="fa fa-trash m-r-5"></i> Delete
    //             </a>
    //           )}
    //           <a
    //             className="dropdown-item"
    //             data-toggle="modal"
    //             data-target="#generalModal"
    //             onClick={() => {
    //               setmodalType('view-details');
    //               setViewRow(row);
    //             }}
    //           >
    //             <i className="fa fa-eye m-r-5"></i> View
    //           </a>
    //           <a
    //             className="dropdown-item"
    //             data-toggle="modal"
    //             data-target="#generalModal"
    //             onClick={() => {
    //               setmodalType('schedule-interview');
    //               setSelectedRow(helper.handleEdit(row));
    //             }}
    //           >
    //             <i className="fa fa-clock m-r-5"></i> Schedule Interview
    //           </a>
    //         </div>
    //       </>
    //     </div>
    //   ),
    // },
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
            // statusInterview={InterviewStatusOptions}
            // processingStage={InterviewProcessStageOptions}
          />
        </div>
      </div>

      {/* <ConfirmModal
        title="Job Applicant"
        selectedRow={selectedRow}
        // deleteFunction={deleteJobApplicant}
      /> */}

      {/* {modalType === 'view-details' ? (
        <ViewModal
          title="Applicant Details"
          content={<JobApplicationContent jobApplication={viewRow} />}
        />
      ) : (
        <ViewModal
          title="Schedule Interview"
          content={
            <ScheduleInterview
              // handleUpdate={handleUpdate}
              jobApplication={selectedRow}
            />
          }
        />
      )} */}
    </>
  );
};

export default AcademyApplicants;
