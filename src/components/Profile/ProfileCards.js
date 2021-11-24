import React, {useEffect, useState} from "react";
import BankInformation from "./components/BankInformation";
import ContactDetails from "./components/ContactDetails";
import EducationInformation from "./components/EducationInformation";
import EmergencyContact from "./components/EmergencyContact";
import Experience from "./components/Experience";
import History from "./components/History";
import PersonalInfo from "./components/PersonalInfo";
import avater from "../../assets/img/male_avater.png";
import avater2 from "../../assets/img/male_avater2.png";
import avater3 from "../../assets/img/female_avatar3.png";
import avater4 from "../../assets/img/female_avatar.png";
import avater5 from "../../assets/img/female_avatar2.png";
const ProfileCards = ({
  setformType,
  userData,
  submitted,
  formValue,
  setFormValue,
  fetchUserInfo,
}) => {
  const [employeeDetails, setemployeeDetails] = useState({})
  const [campaign, setcampaign] = useState({})
  const [avaterList, setavaterList] = useState([avater, avater2, avater3, avater4, avater5])
  const handleChange = (type) => {
    setformType(type);
  };
  useEffect(() => {
    console.log(userData.employee)
    setemployeeDetails(userData?.employee)
    setcampaign(userData?.employee?.projectId)
  }, [userData])
  return (
    <>
      <div className="card tab-box">
        <div className="row user-tabs">
          <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a href="#emp_profile" data-toggle="tab" className="nav-link ">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#emp_campaign"
                  data-toggle="tab"
                  className="nav-link active"
                >
                  Campaign
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#bank_statutory"
                  data-toggle="tab"
                  className="nav-link"
                >
                  Bank &amp; Statutory{" "}
                  <small className="text-danger">(Admin Only)</small>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="tab-content">
        <div id="emp_profile" className="pro-overview tab-pane ">
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
          <div className="row">
            <div className="col-md-6 d-flex">
              <BankInformation
                handleChange={handleChange}
                salaryDetails={userData}
                submitted={submitted}
                formValue={formValue}
                fetchUserInfo={fetchUserInfo}
                setFormValue={setFormValue}
              />
            </div>
            <div className="col-md-6 d-flex">
              <EmergencyContact
                handleChange={handleChange}
                emergencyContact={userData?.emergencyContact}
                submitted={submitted}
                formValue={formValue}
                setFormValue={setFormValue}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 d-flex">
              <EducationInformation
                handleChange={handleChange}
                education={userData?.education}
                submitted={submitted}
                formValue={formValue}
                setFormValue={setFormValue}
              />
            </div>
            <div className="col-md-6 d-flex">
              <Experience
                handleChange={handleChange}
                workExperience={userData?.workExperience}
                submitted={submitted}
                formValue={formValue}
                setFormValue={setFormValue}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 d-flex">
              <History
                handleChange={handleChange}
                history={userData?.history}
                submitted={submitted}
                formValue={formValue}
                setFormValue={setFormValue}
              />
            </div>
          </div>
        </div>
        <div id="emp_campaign" className="pro-overview tab-pane fade">
          <div class="row">
            <div class="col-lg-4 col-sm-6 col-md-4 col-xl-3">
              <div class="card">
                <div class="card-body">
                  <h4 class="project-title mb-2">
                    <a href="">{campaign?.project_name}</a>
                  </h4>

                  <p class="text-muted">
                   {campaign?.objectives}
                  </p>
                  <div class="pro-deadline m-b-15">
                    <div class="sub-title">Start date:</div>
                    <div class="text-muted">{new Date(campaign?.start_date).toDateString()}</div>
                  </div>
                  <div class="project-members m-b-15">
                    <div>Team Leader :</div>
                    <ul class="team-members">
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
                  <div class="project-members m-b-15">
                    <div>Team :</div>
                    <ul class="team-members">
                      {campaign?.number_of_employees && 
                      Array(campaign.number_of_employees).fill(1).slice(0,4).map((e, i) => (
                          <li>
                            <a
                              href="#"
                              data-toggle="tooltip"
                              title=""
                              data-original-title=""
                            >
                              <img alt="" src={avaterList[Math.floor(Math.random() * avaterList.length)]} />
                            </a>
                          </li>

                      ))}
                      <li>
                        <a href="#" class="all-users">
                          {campaign?.number_of_employees <= 4 ? campaign?.number_of_employees : '+' + (campaign?.number_of_employees - 4)}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <p class="m-b-5">
                    Progress <span class="text-success float-right">40%</span>
                  </p>
                  <div class="progress progress-xs mb-0">
                    <div
                      style={{ width: "40%" }}
                      title=""
                      data-toggle="tooltip"
                      role="progressbar"
                      class="progress-bar bg-success"
                      data-original-title="40%"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="bank_statutory" className="pro-overview tab-pane fade">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title"> Basic Salary Information</h3>
              <form>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label class="col-form-label">
                        Salary basis <span class="text-danger">*</span>
                      </label>
                      <select class="form-control">
                        <option>Select salary basis type</option>
                        <option>Hourly</option>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label class="col-form-label">
                        Salary amount{" "}
                        <small class="text-muted">per month</small>
                      </label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">₦</span>
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Type your salary amount"
                          value="0.00"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label class="col-form-label">Payment type</label>
                      <select class="form-control">
                        <option>Select payment type</option>
                        <option>Bank transfer</option>
                        <option>Check</option>
                        <option>Cash</option>
                      </select>
                    </div>
                  </div>
                </div>
                <hr />
                <h3 class="card-title"> Bank Information</h3>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label class="col-form-label">Bank</label>
                      <input class="form-control" />
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label class="col-form-label">Account Number</label>
                      <input class="form-control" />
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label class="col-form-label">BVN</label>
                      <input class="form-control" />
                    </div>
                  </div>
                </div>
                <hr />
                <h3 class="card-title"> Tax & Pension Information</h3>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label class="col-form-label">Tax %</label>
                      <input class="form-control" />
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label class="col-form-label">Pension %</label>
                      <input class="form-control" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCards;
