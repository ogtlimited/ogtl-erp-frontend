import React from "react";
import BankInformation from "./components/BankInformation";
import ContactDetails from "./components/ContactDetails";
import EducationInformation from "./components/EducationInformation";
import EmergencyContact from "./components/EmergencyContact";
import Experience from "./components/Experience";
import History from "./components/History";
import PersonalInfo from "./components/PersonalInfo";

const ProfileCards = ({
  setformType,
  userData,
  submitted,
  formValue,
  setFormValue,
  fetchUserInfo,
}) => {
  const handleChange = (type) => {
    console.log(type);
    setformType(type);
  };
  console.log(userData);
  return (
    <>
      <div className="card tab-box">
        <div className="row user-tabs">
          <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a
                  href="#emp_profile"
                  data-toggle="tab"
                  className="nav-link active"
                >
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a href="#emp_projects" data-toggle="tab" className="nav-link">
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
        <div
          id="emp_profile"
          className="pro-overview tab-pane fade active show"
        >
          <div className="row">
            <div className="col-md-6 d-flex">
              <PersonalInfo
                handleChange={handleChange}
                personalDetails={userData?.personalDetails}
                submitted={submitted}
                formValue={formValue}
                fetchUserInfo={fetchUserInfo}
              />
            </div>
            <div className="col-md-6 d-flex">
              <ContactDetails
                handleChange={handleChange}
                contactDetails={userData?.contactDetails}
                submitted={submitted}
                formValue={formValue}
                fetchUserInfo={fetchUserInfo}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 d-flex">
              <BankInformation
                handleChange={handleChange}
                salaryDetails={userData?.salaryDetails}
                submitted={submitted}
                formValue={formValue}
                fetchUserInfo={fetchUserInfo}
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
      </div>
    </>
  );
};

export default ProfileCards;
