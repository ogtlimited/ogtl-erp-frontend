/* eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import avater from '../../assets/img/profile.png';
import { ContactDetailJson } from '../../components/FormJSON/HR/Employee/ContactDetails';
import { EmergencyDetailJson } from '../../components/FormJSON/HR/Employee/EmergencyContact';
import { EmployeeEducationJson } from '../../components/FormJSON/HR/Employee/EmployeeEducation';
import { PersonalDetailJson } from '../../components/FormJSON/HR/Employee/PersonalDetails';
import { WorkExperienceJson } from '../../components/FormJSON/HR/Employee/WorkExperience';
import FormModal from '../../components/Modal/Modal';
import ProfileCards from '../../components/Profile/ProfileCards';
import axiosInstance from '../../services/api';
import moment from 'moment';
import { historyJson } from '../../components/FormJSON/HR/Employee/history';
import { useAppContext } from '../../Context/AppContext';
import { SalaryDetailJson } from '../../components/FormJSON/HR/Employee/SalaryDetails';
import FormModal2 from '../../components/Modal/FormModal2';
import helper from '../../services/helper';
import ViewModal from '../../components/Modal/ViewModal';
import SocialHandleForm from '../../components/Profile/components/SocialHandleForm';
import tokenService from '../../services/token.service';

const Profile = () => {
  const user = tokenService.getUser();
  const [formType, setformType] = useState('');
  const [template, settemplate] = useState(PersonalDetailJson);
  const { id } = useParams();
  const [userData, setUserdata] = useState(null);
  const [formValue, setFormValue] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { combineRequest } = useAppContext();
  const [employeeShifts, setEmployeeShifts] = useState([]);
  const [ogid, setOgid] = useState(null);

  const fetchUserInfo = async () => {
    try {
      const user = await axiosInstance.get(`/profile-dashboard/${id}`)
      const employeeDashboard = user.data.getEmployeeFullData;
      const employee = user.data.getEmployeeFullData.employee;
      setUserdata(employeeDashboard);

      const ogid = employee?.ogid;
      const shift = await axiosInstance.get(`/api/employee-shift/${ogid}`);
      const employeeShifts = shift?.data?.data;
      setEmployeeShifts(employeeShifts);
      setOgid(ogid);
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    switch (formType) {
      case 'WorkExperience':
        return settemplate(helper.formArrayToObject(WorkExperienceJson.Fields));
      case 'ContactDetails':
        return settemplate(helper.formArrayToObject(ContactDetailJson.Fields));
      case 'EmergencyContact':
        return settemplate(
          helper.formArrayToObject(EmergencyDetailJson.Fields)
        );
      case 'EmployeeEducation':
        return settemplate(
          helper.formArrayToObject(EmployeeEducationJson.Fields)
        );
      case 'History':
        return settemplate(helper.formArrayToObject(historyJson.Fields));
      case 'SalaryDetails':
        return settemplate(helper.formArrayToObject(SalaryDetailJson.Fields));
      default:
        return settemplate(helper.formArrayToObject(PersonalDetailJson.Fields));
    }
  }, [formType]);

  useEffect(() => {
    combineRequest().then((res) => {
      const { designations, branches } = res.data.createEmployeeFormSelection;

      const designationsOpts = designations?.map((e) => {
        return {
          label: e.designation,
          value: e._id,
        };
      });
      const branchesOpts = branches?.map((e) => {
        return {
          label: e.branch,
          value: e._id,
        };
      });
      const finalForm = historyJson.Fields.map((field) => {
        if (field.name === 'branch_id') {
          field.options = branchesOpts;
          return field;
        } else if (field.name === 'designation_id') {
          field.options = designationsOpts;
          return field;
        }
        return field;
      });
      settemplate({
        title: historyJson.title,
        Fields: finalForm,
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Profile</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/all-employees">Employees</Link>
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
                      <img alt="" src={userData?.employee?.image || avater} />
                    </a>
                  </div>
                </div>
                <div className="profile-basic">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="profile-info-left">
                        <h3 className="user-name m-t-0 mb-0">
                          {userData?.employee?.first_name}{' '}
                          {userData?.employee?.middle_name}{' '}
                          {userData?.employee?.last_name}
                        </h3>
                        <h6 className="text-muted">
                          {userData?.employee?.isAdmin
                            ? userData?.employee?.department?.department
                            : userData?.employee?.projectId?.project_name}
                        </h6>
                        <small className="text-muted">
                          {userData?.employee?.designation?.designation ||
                            'Not Available'}
                        </small>
                        <div className="staff-id">
                          Employee ID : {userData?.employee?.ogid}
                        </div>
                        <div className="small doj text-muted">
                          Date Joined :{' '}
                          {userData?.employee?.date_of_joining
                            ? moment(
                                userData?.employee?.date_of_joining
                              ).format('L')
                            : 'Not Available'}
                        </div>
                        <div className="staff-msg">
                          <Link
                            className="btn btn-custom"
                            to={`/dashboard/payroll/payslip/${user?._id}`}
                          >
                            <i className="las la-file-invoice-dollar mr-2"></i>
                            Payslip
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <ul className="personal-info">
                        <li>
                          <div className="title">Phone:</div>
                          <div className="text">
                            {userData?.contactDetails?.mobile || "Not Available"}
                          </div>
                        </li>

                        <li>
                          <div className="title">Email:</div>
                          <div className="text">
                            {userData?.employee?.company_email ||
                              'Not Available'}
                          </div>
                        </li>

                        <li>
                          <div className="title">Birthday:</div>
                          <div className="text">
                            {userData?.personalDetails?.date_of_birth
                              ? moment(
                                  userData?.personalDetails?.date_of_birth
                                ).format("MMMM Do")
                              : "Not Available"}
                          </div>
                        </li>
                        <li>
                          <div className="title">Address:</div>
                          <div className="text">
                            {userData?.contactDetails?.permanent_address ||
                              'Not Available'}
                          </div>
                        </li>

                        <li>
                          <div className="title">Gender:</div>
                          <div className="text">
                            {userData?.employee?.gender || 'Not Available'}
                          </div>
                        </li>
                        <li>
                          <div className="title">Leave Count:</div>
                          <div className="text">
                            {userData?.employee?.leaveCount || 'Not Available'}
                          </div>
                        </li>
                        <li>
                          <div className="title">Branch:</div>
                          <div className="text">
                            {userData?.employee?.branch?.branch ||
                              'Not Available'}
                          </div>
                        </li>
                        <li>
                          <div className="title">Shift:</div>
                          <div className="text">
                            {userData?.employee?.default_shift?.shift_name
                              ? moment(
                                  userData?.employee?.default_shift?.start_time,
                                  ['HH.mm']
                                ).format('hh:mm a') +
                                ' to ' +
                                moment(
                                  userData?.employee?.default_shift?.end_time,
                                  ['HH.mm']
                                ).format('hh:mm a')
                              : 'Not Available'}
                            <a
                              href="#"
                              className="btn btn-custom  float-right mb-2"
                              role="button"
                            >
                              Request Shift
                            </a>
                          </div>
                          <div className="text"></div>
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
                            <a href="profile.html">
                              {userData?.employee?.reports_to?.last_name ||
                                'Not Available'}
                            </a>
                          </div>
                        </li>
                        <li>
                          <div className="title">Social Handle</div>
                          <div className="text">
                            {userData?.employee?.socialHandle &&
                              Object.keys(userData?.employee?.socialHandle).map(
                                (e) => (
                                  <>
                                    <a
                                      href={userData?.employee?.socialHandle[e]}
                                    >
                                      {helper.capitalize(e)}
                                    </a>{' '}
                                    &nbsp;
                                  </>
                                )
                              )}

                            <a
                              className="edit-icon"
                              data-toggle="modal"
                              data-target="#generalModal"
                            >
                              <i className="fa fa-pencil"></i>
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* <div className="pro-edit">
                  <Link
                    data-target="#profile_info"
                    data-toggle="modal"
                    className="edit-icon"
                    role="button"
                  >
                    <i className="fa fa-pencil"></i>
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileCards
        setformType={setformType}
        userData={userData}
        submitted={submitted}
        formValue={formValue}
        setFormValue={setFormValue}
        fetchUserInfo={fetchUserInfo}
        employeeShifts={employeeShifts}
        ogid={ogid}
      />
      <FormModal2
        template={template}
        setformValue={setFormValue}
        setsubmitted={setSubmitted}
      />
      <ViewModal
        title="Social Media Handle"
        content={<SocialHandleForm userData={userData} id={id} />}
      />
    </>
  );
};

export default Profile;
