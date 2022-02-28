import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/Misc/PageHeader";
import AcceptDeclineModal from "../../../components/Modal/AcceptDeclineModal";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import tokenService from "../../../services/token.service";
import ReactHtmlParser from "react-html-parser";

// import logo from '../assets/img/outsource.png'
// import PageHeader from '../components/page-header'
// import Pdf from "react-to-pdf";

const ref = React.createRef();
const options = {
  // orientation: 'port',
  unit: "in",
  format: [4, 2],
};

const CoachingEmployee = () => {
  const {
    fetchEmployeeCoachingList,
    updateEmployeeCoachingList,
    user,
    showAlert,
  } = useAppContext();
  const [submitAction, setsubmitAction] = useState("");
  const [showReason, setshowReason] = useState(false);
  const [reason, setreason] = useState("");
  const [noForm, setnoForm] = useState(false);
  const [file, setfile] = useState(null);

  const [coachingForm, setcoachingForm] = useState(null);
  const fetchPendingForms = () => {
    const user = tokenService.getUser();

    axiosInstance
      .get("/api/coaching-form/employee/" + user?._id)
      .then((res) => {
        const pending = res.data.data.filter(
          (data) => data.user_response === "pending"
        );
        if (pending.length === 0) {
          setnoForm(false);
        } else {
          setcoachingForm(pending[0]);
          setnoForm(true);
        }
      });
  };
  useEffect(() => {
    fetchPendingForms();
  }, [noForm]);

  useEffect(() => {
    if (submitAction.length) {
      const payload = {
        user_response: submitAction,
        reason,
      };

      axiosInstance
        .put("/api/coaching-form/user-response/" + coachingForm._id, payload)
        .then((res) => {
          if (res.data.data.length === 0) {
            setnoForm(false);
          }
          showAlert(true, res.data.message, "alert alert-success");
          fetchPendingForms();
          // setcoachingForm(res.data?.data[0]);
        })
        .catch((error) => {
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
      // updateEmployeeCoachingList(payload).then((res) => {

      // });
    }
  }, [submitAction, file]);
  const breadcrumb = "Coaching Review";

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Coaching Form</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Coaching Form</li>
            </ul>
          </div>
        </div>
      </div>

      {noForm ? (
        <div ref={ref} className="row justify-content-center">
          <div className="col-md-11 mt-5">
            <div className="card px-2 ">
              <div className="card-body">
                <h4 className="payslip-title">Coaching Form Review</h4>
                <div className="row">
                  {/* <div className="col-sm-6 m-b-20">
                          <img src={logo} className="inv-logo" alt="" />
                          
                      </div> */}
                </div>
                <div className="row mt-5">
                  <div className="col-lg-12  m-b-20">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>
                            <strong>Team Member Name</strong>{" "}
                            <span className="float-right">
                              {coachingForm?.employee_id?.first_name}{" "}
                              {coachingForm?.employee_id?.last_name}
                            </span>
                          </td>
                          <td>
                            <strong>Date</strong>{" "}
                            <span className="float-right">
                              {coachingForm?.incident_date}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Title / Position</strong>{" "}
                            <span className="float-right">
                              {coachingForm?.employee_id?.designation}
                            </span>
                          </td>
                          <td>
                            <strong>Supervisor</strong>{" "}
                            <span className="float-right">
                              {coachingForm?.supervisor?.first_name}{" "}
                              {coachingForm?.supervisor?.last_name}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="row px-3 mt-5" id="accordion">
                  <div className="card col-sm-12 px-0">
                    <div className="card-header" id="headingOne">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link text-dark"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Goal
                        </button>
                      </h5>
                    </div>

                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        {ReactHtmlParser(coachingForm?.goals)}
                      </div>
                    </div>
                  </div>
                  <div className="card col-sm-12 px-0">
                    <div className="card-header" id="headingTwo">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link text-dark collapsed"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Reality
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        {ReactHtmlParser(coachingForm?.reality)}
                      </div>
                    </div>
                  </div>

                  <div className="card col-sm-12 px-0">
                    <div className="card-header" id="headingFour">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link text-dark collapsed"
                          data-toggle="collapse"
                          data-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          Opportunities / Options
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseFour"
                      className="collapse"
                      aria-labelledby="headingFour"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        {ReactHtmlParser(coachingForm?.opportunities)}
                      </div>
                    </div>
                  </div>
                  <div className="card col-sm-12 px-0">
                    <div className="card-header" id="headingFive">
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link text-dark collapsed"
                          data-toggle="collapse"
                          data-target="#collapseFive"
                          aria-expanded="false"
                          aria-controls="collapseFive"
                        >
                          Way Forward
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseFive"
                      className="collapse"
                      aria-labelledby="headingFive"
                      data-parent="#accordion"
                    >
                      <div className="card-body">
                        {ReactHtmlParser(coachingForm?.way_forward)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <button
                      data-toggle="modal"
                      data-target="#acceptDecline"
                      className="btn btn-primary submit-btn"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div ref={ref} className="row justify-content-center">
            <div className="col-md-11 mt-5">
              <div className="card px-5 ">
                <div className="card-body">
                  <h4 className="payslip-title">No pending coaching form</h4>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <AcceptDeclineModal
        setsubmitAction={setsubmitAction}
        reason={reason}
        setreason={setreason}
        file={file}
        setfile={setfile}
      />
    </>
  );
};

export default CoachingEmployee;
