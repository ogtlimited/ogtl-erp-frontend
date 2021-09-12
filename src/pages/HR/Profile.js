import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import avater from '../../assets/img/anthony.jpg'
import { ContactDetailJson } from "../../components/FormJSON/HR/Employee/ContactDetails";
import { EmergencyDetailJson } from "../../components/FormJSON/HR/Employee/EmergencyContact";
import { EmployeeEducationJson } from "../../components/FormJSON/HR/Employee/EmployeeEducation";
import { PersonalDetailJson } from "../../components/FormJSON/HR/Employee/PersonalDetails";
import { WorkExperienceJson } from "../../components/FormJSON/HR/Employee/WorkExperience";
import FormModal from "../../components/Modal/Modal";
import ProfileCards from "../../components/Profile/ProfileCards";

const Profile = () => {
    const [formType, setformType] = useState('')
    const [formValue, setformValue] = useState({})
    const [submitted, setsubmitted] = useState(false)
    const [path, setpath] = useState('/personal-details')
    const [template, settemplate] = useState({})
    const [editData, seteditData] = useState({});
    useEffect(() => {
        if(formType === 'PersonalDetails'){
            settemplate(PersonalDetailJson)
            setformValue({})
            setpath('/PersonalDetailJson')
        }else if(formType === 'WorkExperience'){
            settemplate(WorkExperienceJson)
            setformValue({})
            setpath('/WorkExperienceJson')
        }else if(formType === 'ContactDetails'){
            settemplate(ContactDetailJson)
            setformValue({})
        }else if(formType === 'EmergencyContact'){
            settemplate(EmergencyDetailJson)
            setformValue({})
        }
        else if(formType === 'EmployeeEducation'){
            settemplate(EmployeeEducationJson)
            setformValue({})
        }
        console.log(formType)
    }, [formType])
    useEffect(() => {
      if(submitted === true){
        console.log(formValue)
        setformValue({})
        setsubmitted(false)

      }
    }, [formValue])
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Profile</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Profile</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card mb-0">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="profile-view">
                <div className="profile-img-wrap">
                  <div className="profile-img">
                    <a href="#">
                      <img alt="" src={avater} />
                    </a>
                  </div>
                </div>
                <div className="profile-basic">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="profile-info-left">
                        <h3 className="user-name m-t-0 mb-0">Anthony Potbelly</h3>
                        <h6 className="text-muted">Software  Developement</h6>
                        <small className="text-muted">Backend Engineer</small>
                        <div className="staff-id">Employee ID : OG-0001</div>
                        <div className="small doj text-muted">
                          Date of Join : 1st Jan 2013
                        </div>
                        <div className="staff-msg">
                          <a className="btn btn-custom" href="chat.html">
                            Send Message
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <ul className="personal-info">
                        <li>
                          <div className="title">Phone:</div>
                          <div className="text">
                            <a href="">9876543210</a>
                          </div>
                        </li>
                        <li>
                          <div className="title">Email:</div>
                          <div className="text">
                            <a href="">johndoe@example.com</a>
                          </div>
                        </li>
                        <li>
                          <div className="title">Birthday:</div>
                          <div className="text">24th July</div>
                        </li>
                        <li>
                          <div className="title">Address:</div>
                          <div className="text">
                            1861 Mabushi, AMAC Abuja, NG, 901101
                          </div>
                        </li>
                        <li>
                          <div className="title">Gender:</div>
                          <div className="text">Male</div>
                        </li>
                        <li>
                          <div className="title">Reports to:</div>
                          <div className="text">
                            <div className="avatar-box">
                              <div className="avatar avatar-xs">
                                <img
                                  src="assets/img/profiles/avatar-16.jpg"
                                  alt=""
                                />
                              </div>
                            </div>
                            <a href="profile.html">Sir Abubakar</a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="pro-edit">
                  <a
                    data-target="#profile_info"
                    data-toggle="modal"
                    className="edit-icon"
                    href="#"
                  >
                    <i className="fa fa-pencil"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileCards setformType={setformType} />
      <FormModal editData={editData} setformValue={setformValue} settemplate={settemplate} template={template} setsubmitted={setsubmitted} />
    </>
  );
};

export default Profile;
