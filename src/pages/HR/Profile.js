import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import avater from '../../assets/img/anthony.jpg'
import { ContactDetailJson } from "../../components/FormJSON/HR/Employee/ContactDetails";
import { EmergencyDetailJson } from "../../components/FormJSON/HR/Employee/EmergencyContact";
import { PersonalDetailJson } from "../../components/FormJSON/HR/Employee/PersonalDetails";
import { WorkExperienceJson } from "../../components/FormJSON/HR/Employee/WorkExperience";
import FormModal from "../../components/Modal/Modal";
import ProfileCards from "../../components/Profile/ProfileCards";

const Profile = () => {
    const [formType, setformType] = useState('')
    const [template, settemplate] = useState(PersonalDetailJson)
    useEffect(() => {
        if(formType === 'PersonalDetails'){
            settemplate(PersonalDetailJson)
        }else if(formType === 'WorkExperience'){
            settemplate(WorkExperienceJson)
        }else if(formType === 'ContactDetails'){
            settemplate(ContactDetailJson)
        }else if(formType === 'EmergencyContact'){
            settemplate(EmergencyDetailJson)
        }
        console.log(formType)
    }, [formType])
  return (
    <>
      <div class="page-header">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="page-title">Profile</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li class="breadcrumb-item active">Profile</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="card mb-0">
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <div class="profile-view">
                <div class="profile-img-wrap">
                  <div class="profile-img">
                    <a href="#">
                      <img alt="" src={avater} />
                    </a>
                  </div>
                </div>
                <div class="profile-basic">
                  <div class="row">
                    <div class="col-md-5">
                      <div class="profile-info-left">
                        <h3 class="user-name m-t-0 mb-0">Anthony Potbelly</h3>
                        <h6 class="text-muted">Software  Developement</h6>
                        <small class="text-muted">Backend Engineer</small>
                        <div class="staff-id">Employee ID : OG-0001</div>
                        <div class="small doj text-muted">
                          Date of Join : 1st Jan 2013
                        </div>
                        <div class="staff-msg">
                          <a class="btn btn-custom" href="chat.html">
                            Send Message
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-7">
                      <ul class="personal-info">
                        <li>
                          <div class="title">Phone:</div>
                          <div class="text">
                            <a href="">9876543210</a>
                          </div>
                        </li>
                        <li>
                          <div class="title">Email:</div>
                          <div class="text">
                            <a href="">johndoe@example.com</a>
                          </div>
                        </li>
                        <li>
                          <div class="title">Birthday:</div>
                          <div class="text">24th July</div>
                        </li>
                        <li>
                          <div class="title">Address:</div>
                          <div class="text">
                            1861 Mabushi, AMAC Abuja, NG, 901101
                          </div>
                        </li>
                        <li>
                          <div class="title">Gender:</div>
                          <div class="text">Male</div>
                        </li>
                        <li>
                          <div class="title">Reports to:</div>
                          <div class="text">
                            <div class="avatar-box">
                              <div class="avatar avatar-xs">
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
                <div class="pro-edit">
                  <a
                    data-target="#profile_info"
                    data-toggle="modal"
                    class="edit-icon"
                    href="#"
                  >
                    <i class="fa fa-pencil"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileCards setformType={setformType} />
      <FormModal  template={template} />
    </>
  );
};

export default Profile;
