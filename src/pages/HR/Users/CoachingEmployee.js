import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/Misc/PageHeader";
import AcceptDeclineModal from "../../../components/Modal/AcceptDeclineModal";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import tokenService from "../../../services/token.service";
// import logo from '../assets/img/outsource.png'
// import PageHeader from '../components/page-header'
// import Pdf from "react-to-pdf";

const ref = React.createRef();
const options = {
  // orientation: 'port',
  unit: "in",
  format: [4, 2],
};
const RightSide = () => {
  return (
    <div class="col-auto float-right ml-auto">
      <div class="btn-group btn-group-sm">
        <button class="btn btn-white">CSV</button>
        {/* <Pdf targetRef={ref} filename="payslip.pdf"  x={1} y={1} scale={0.8}>
                {({ toPdf }) => <button class="btn btn-white" onClick={toPdf}>Pdf</button>}
            </Pdf> */}
        <button onClick={() => window.print()} class="btn btn-white">
          <i class="fa fa-print fa-lg"></i> Print
        </button>
      </div>
    </div>
  );
};
const CoachingEmployee = () => {
  const { fetchEmployeeCoachingList, updateEmployeeCoachingList, user } =
    useAppContext();
  const [submitAction, setsubmitAction] = useState("");
  const [showReason, setshowReason] = useState(false);
  const [reason, setreason] = useState("");
  const [noForm, setnoForm] = useState(true);
  const [file, setfile] = useState(null);

  const [coachingForm, setcoachingForm] = useState({});
  useEffect(() => {
    const user = tokenService.getUser();
    console.log(file);
    axiosInstance.get("/api/coaching-form/employee/" + user._id).then((res) => {
      console.log(res.data?.data[0]);
      if (res.data.data.length === 0) {
        setnoForm(false);
      }
      setcoachingForm(res.data?.data[0]);
    });
    if (submitAction.length) {
      const payload = {
        user_response: submitAction,
        reason,
      };
      console.log(payload);
      axiosInstance.put("/api/coaching-form/user-response/" + coachingForm._id, payload).then((res) => {
        console.log(res.data?.data[0]);
        if (res.data.data.length === 0) {
          setnoForm(false);
        }
        setcoachingForm(res.data?.data[0]);
      });
      // updateEmployeeCoachingList(payload).then((res) => {
      //   console.log(res.data);
      // });
    }
  }, [submitAction, file]);
  const breadcrumb = "Coaching Review";
  return (
    <>
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Coaching Form</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/">Dashboard</a>
              </li>
              <li class="breadcrumb-item active">Coaching Form</li>
            </ul>
          </div>
         </div>
      </div>

      {noForm ? (
        <div ref={ref} class="row justify-content-center">
          <div class="col-md-11 mt-5">
            <div class="card px-2 ">
              <div class="card-body">
                <h4 class="payslip-title">Coaching Form Review</h4>
                <div class="row">
                  {/* <div class="col-sm-6 m-b-20">
                             <img src={logo} class="inv-logo" alt="" />
                             
                         </div> */}
                </div>
                <div class="row mt-5">
                  <div class="col-lg-12  m-b-20">
                    <table class="table table-bordered">
                      <tbody>
                        <tr>
                          <td>
                            <strong>Team Member Name</strong>{" "}
                            <span class="float-right">
                              {coachingForm?.employee_id?.first_name}  {coachingForm?.employee_id?.last_name}
                            </span>
                          </td>
                          <td>
                            <strong>Date</strong>{" "}
                            <span class="float-right">
                              {coachingForm?.incident_date}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Title / Position</strong>{" "}
                            <span class="float-right">{user?.designation}</span>
                          </td>
                          <td>
                            <strong>Supervisor</strong>{" "}
                            <span class="float-right">
                              {coachingForm?.supervisor?.first_name} {coachingForm?.employee_id?.last_name}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="row px-3 mt-5" id="accordion">
                  <div class="card col-sm-12 px-0">
                    <div class="card-header" id="headingOne">
                      <h5 class="mb-0">
                        <button
                          class="btn btn-link text-dark"
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
                      class="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div
                        class="card-body"
                        dangerouslySetInnerHTML={{
                          __html: coachingForm?.goals,
                        }}
                      >
                        {/* {coachingForm?.goals} */}
                      </div>
                    </div>
                  </div>
                  <div class="card col-sm-12 px-0">
                    <div class="card-header" id="headingTwo">
                      <h5 class="mb-0">
                        <button
                          class="btn btn-link text-dark collapsed"
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
                      class="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                    >
                      <div
                        class="card-body"
                        dangerouslySetInnerHTML={{
                          __html: coachingForm?.reality,
                        }}
                      >
                        {/* {coachingForm?.reality} */}
                      </div>
                    </div>
                  </div>

                  <div class="card col-sm-12 px-0">
                    <div class="card-header" id="headingFour">
                      <h5 class="mb-0">
                        <button
                          class="btn btn-link text-dark collapsed"
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
                      class="collapse"
                      aria-labelledby="headingFour"
                      data-parent="#accordion"
                    >
                      <div
                        class="card-body"
                        dangerouslySetInnerHTML={{
                          __html: coachingForm?.opportunities,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div class="card col-sm-12 px-0">
                    <div class="card-header" id="headingFive">
                      <h5 class="mb-0">
                        <button
                          class="btn btn-link text-dark collapsed"
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
                      class="collapse"
                      aria-labelledby="headingFive"
                      data-parent="#accordion"
                    >
                      <div
                        class="card-body"
                        dangerouslySetInnerHTML={{
                          __html: coachingForm?.way_forward,
                        }}
                      >
                        {/* {coachingForm?.way_forward} */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <button
                      data-toggle="modal"
                      data-target="#acceptDecline"
                      class="btn btn-primary submit-btn"
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
          <div ref={ref} class="row justify-content-center">
            <div class="col-md-11 mt-5">
              <div class="card px-5 ">
                <div class="card-body">
                  <h4 class="payslip-title">No pending coaching form</h4>
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
