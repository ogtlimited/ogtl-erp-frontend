import React, { useState, useEffect } from "react";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import tokenService from "../../../services/token.service";
import axiosInstance from "../../../services/api";
import FormModal from "../../../components/Modal/Modal";
import { LeaveApplicationFormJSON } from "../../../components/FormJSON/HR/Leave/application";
import { useAppContext } from "../../../Context/AppContext";
import FormModal2 from "../../../components/Modal/FormModal2";
import helper from "../../../services/helper";
import moment from "moment";
import JobOpening from "./JobOpening.Admin";
import DefaultJobOpening from "./DefaultJobOpening";
const JobOpeningContainer = () => {
  const { allEmployees, combineRequest, showAlert } = useAppContext();
  const [userId, setuserId] = useState("");
  const [user, setuser] = useState(null);
  const [usedLeaves, setusedLeaves] = useState(0);
  const [template, settemplate] = useState(null);
  const [submitted, setsubmitted] = useState(false);
  const [formValue, setformValue] = useState({});
  const [editData, seteditData] = useState({});


  const currentUser = tokenService.getUser();



  return (
    <>
    
      <div className="page-menu">
        <div className="row">
          <div className="col-sm-12">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#tab_leaves"
                >
                  Job Openings
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#tab_subordinates-leaves">
                  Default Job Opening
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="">
      <div className="tab-content">
        <div id="tab_leaves" className="col-12 tab-pane show active">
          <JobOpening />
        </div>
        <div id="tab_subordinates-leaves" className="col-12 tab-pane">
        
          <DefaultJobOpening />
        </div>
      </div>
      </div>
    </>
  );
};

export default JobOpeningContainer;
