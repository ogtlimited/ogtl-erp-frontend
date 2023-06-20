import './profileCard.css'
import React, { useEffect, useState, useRef  } from "react";
import { useReactToPrint } from "react-to-print";
import BankInformation from "./components/BankInformation";
import ContactDetails from "./components/ContactDetails";
import EducationInformation from "./components/EducationInformation";
import EmergencyContact from "./components/EmergencyContact";
import Experience from "./components/Experience";
import History from "./components/History";
import PersonalInfo from "./components/PersonalInfo";
import FrontVirtualID from "../../pages/In-Apps/FrontVirtualID";
import BackVirtualID from "../../pages/In-Apps/BackVirtualID";
import { EditEmployeeShiftModal } from '../Modal/EditEmployeeShiftModal';
import { CreateEmployeeShiftModal } from '../Modal/CreateEmployeeShiftModal';
import avater from "../../assets/img/male_avater.png";
import avater2 from "../../assets/img/male_avater2.png";
import avater3 from "../../assets/img/female_avatar3.png";
import avater4 from "../../assets/img/female_avatar.png";
import avater5 from "../../assets/img/female_avatar2.png";
import { useAppContext } from "../../Context/AppContext";
import { BsFillPrinterFill } from 'react-icons/bs';

const ProfileCards = ({
  setformType,
  userData,
  submitted,
  formValue,
  setFormValue,
  fetchUserInfo,
  employeeShifts,
  setEmployeeShifts,
  userID,
  mode,
  setMode,
  userOgid,
}) => {
  const [employeeDetails, setemployeeDetails] = useState({});
  const [campaign, setcampaign] = useState({});
  const { user, isFromBiometrics } = useAppContext();

  const ogid = user?.employee_info?.ogid;
  console.log(ogid, "OGID")

  const FrontVirtualIDRef = useRef();
  const handlePrintFront = useReactToPrint({
    content: () => FrontVirtualIDRef.current
  });

  const BackVirtualIDRef = useRef();
  const handlePrintBack = useReactToPrint({
    content: () => BackVirtualIDRef.current
  });

  const [avaterList, setavaterList] = useState([
    avater,
    avater2,
    avater3,
    avater4,
    avater5,
  ]);
  
  const handleChange = (type) => {
    setFormValue(null);
    setformType(type);
  };

  useEffect(() => {
    setemployeeDetails(userData?.employee);
    setcampaign(userData?.employee?.projectId);
  }, [userData]);
  return (
    <>
      <div className="card tab-box">
        <div className="row user-tabs">
          <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a href="#emp_profile" data-toggle="tab" className={isFromBiometrics ? "nav-link" : "nav-link active"}>
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a href="#emp_virtualID" data-toggle="tab" className="nav-link">
                  Virtual ID
                </a>
              </li>
              {userOgid !== ogid ? <li className="nav-item">
                <a href="#emp_shifts" data-toggle="tab" className={isFromBiometrics ? "nav-link active" : "nav-link"}>
                  Shifts
                </a>
              </li> : null}
              <li className="nav-item">
                <a
                  href="#emp_campaign"
                  data-toggle="tab"
                  className="nav-link"
                >
                  Campaign
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="tab-content">

        <div id="emp_profile" className={isFromBiometrics ? "pro-overview tab-pane fade" : "pro-overview tab-pane active "}>
          <div className="row">
            <div className="col-md-6 d-flex">
              <PersonalInfo
                handleChange={handleChange}
                personalDetails={userData}
                submitted={submitted}
                formValue={formValue}
                fetchUserInfo={fetchUserInfo}
                setFormValue={setFormValue}
              />
            </div>
            <div className="col-md-6 d-flex">
              <ContactDetails
                handleChange={handleChange}
                contactDetails={userData}
                submitted={submitted}
                formValue={formValue}
                fetchUserInfo={fetchUserInfo}
                setFormValue={setFormValue}
              />
            </div>
          </div>
        </div>

        <div id="emp_virtualID" className="pro-overview tab-pane fade" style={{backgroundColor: '#fff'}}>   
          <div className="row" style={{padding: '0 20px'}}>
            {employeeDetails && <FrontVirtualID employeeDetails={employeeDetails} ref={FrontVirtualIDRef} />}
            {employeeDetails && <BackVirtualID ref={BackVirtualIDRef} />}
          </div>

          <div className="row card-print-btn-div">
            {employeeDetails && 
              <button className="btn btn-primary" 
                onClick={handlePrintFront}
                style={{margin: '10px'}}>
                  <BsFillPrinterFill style={{marginRight: '10px'}} /> Print Front
              </button>
            }
            {employeeDetails && 
              <button className="btn btn-primary" 
                onClick={handlePrintBack}
                style={{margin: '10px'}}>
                  <BsFillPrinterFill style={{marginRight: '10px'}} /> Print Back
              </button>
            }
          </div>
        </div>

        <div id="emp_shifts" className={isFromBiometrics ? "pro-overview tab-pane active " : "pro-overview tab-pane fade"}>
          <div className="row">
            <div className="col-md-12 d-flex">   
              {mode === 'edit' ? <EditEmployeeShiftModal employeeShifts={employeeShifts} setEmployeeShifts={setEmployeeShifts} userID={userID} />
              : <CreateEmployeeShiftModal userID={userID} setMode={setMode} setEmployeeShifts={setEmployeeShifts} />}
            </div>
          </div>
        </div>

        <div id="emp_campaign" className="pro-overview tab-pane fade">
          <div className="row">
            <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
              <div className="card">
                <div className="card-body">
                  <h4 className="project-title mb-2">
                    <a href="">{campaign?.project_name}</a>
                  </h4>

                  <p className="text-muted">{campaign?.objectives}</p>
                  <div className="pro-deadline m-b-15">
                    <div className="sub-title">Start date:</div>
                    <div className="text-muted">
                      {new Date(campaign?.start_date).toDateString()}
                    </div>
                  </div>
                  <div className="project-members m-b-15">
                    <div>Team Leader :</div>
                    <ul className="team-members">
                      <li>
                        <a
                          href="#"
                          data-toggle="tooltip"
                          title=""
                          data-original-title=""
                        >
                          <img alt="" src={avater} />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="project-members m-b-15">
                    <div>Team :</div>
                    <ul className="team-members">
                      {campaign?.number_of_employees &&
                        Array(campaign.number_of_employees)
                          .fill(1)
                          .slice(0, 4)
                          .map((e, i) => (
                            <li>
                              <a
                                href="#"
                                data-toggle="tooltip"
                                title=""
                                data-original-title=""
                              >
                                <img
                                  alt=""
                                  src={
                                    avaterList[
                                      Math.floor(
                                        Math.random() * avaterList.length
                                      )
                                    ]
                                  }
                                />
                              </a>
                            </li>
                          ))}
                      <li>
                        <a href="#" className="all-users">
                          {campaign?.number_of_employees <= 4
                            ? campaign?.number_of_employees
                            : "+" + (campaign?.number_of_employees - 4)}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <p className="m-b-5">
                    Progress{" "}
                    <span className="text-success float-right">40%</span>
                  </p>
                  <div className="progress progress-xs mb-0">
                    <div
                      style={{ width: "40%" }}
                      title=""
                      data-toggle="tooltip"
                      role="progressbar"
                      className="progress-bar bg-success"
                      data-original-title="40%"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ProfileCards;
