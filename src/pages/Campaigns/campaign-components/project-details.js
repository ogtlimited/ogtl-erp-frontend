/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import male from "../../../assets/img/male_avater.png";
import female from "../../../assets/img/female_avatar.png";
import male2 from "../../../assets/img/male_avater2.png";
import moment from "moment";
import GeneralApproverBtn from "../../../components/Misc/GeneralApproverBtn";
import AddTeam from "./form-components/AddTeam";
import AddMembers from "./form-components/AddMembers";
import "../campaign.css";

const CampaignRightCard = ({ campaign_info }) => {
  const [approval, setApproval] = useState([
    {
      title: "open",
      color: "text-primary",
    },
    {
      title: "approved",
      color: "text-success",
    },
    {
      title: "suspended",
      color: "text-warning",
    },
    {
      title: "rejected",
      color: "text-danger",
    },
  ]);
  const [status, setStatus] = useState("");

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h6 className="card-title m-b-15">Campaign details</h6>
          <table className="table table-striped table-border">
            <tbody>
              <tr>
                <td>Total Hours:</td>
                <td className="text-right">
                  {campaign_info?.hours_of_operation} Hours
                </td>
              </tr>
              <tr>
                <td>Created:</td>
                <td className="text-right">
                  {moment(campaign_info?.createdAt).format("Do MMM, YYYY")}
                </td>
              </tr>
              <tr>
                <td>Start Date:</td>
                <td className="text-right">
                  {moment(campaign_info?.start_date).format("Do MMM, YYYY")}
                </td>
              </tr>
              <tr>
                <td>End Date:</td>
                <td className="text-right">
                  {moment(campaign_info?.end_date).format("Do MMM, YYYY")}
                </td>
              </tr>
              <tr>
                <td>Status:</td>
                <td className="text-right">
                  <GeneralApproverBtn
                    options={approval}
                    setStatus={setStatus}
                    value={campaign_info?.status}
                  />
                </td>
              </tr>
              <tr>
                <td>Created by:</td>
                <td className="text-right">
                  <a href="/">
                    {campaign_info?.creator?.first_name}
                    {campaign_info?.creator?.last_name}
                  </a>
                </td>
              </tr>
              <tr>
                <td>Bill Structure:</td>
                <td className="text-right">
                  {campaign_info?.billing_structure}
                </td>
              </tr>
              <tr>
                <td>Diallers:</td>
                <td className="text-right">{campaign_info?.diallers}</td>
              </tr>
              <tr>
                <td>Number of Employees:</td>
                <td className="text-right">
                  {campaign_info?.number_of_employees}
                </td>
              </tr>
            </tbody>
          </table>
          {/* <p className="m-b-5">
            Progress <span className="text-success float-right">40%</span>
          </p>
          <div className="progress progress-xs mb-0">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              data-toggle="tooltip"
              title=""
              style={{ width: "40%" }}
              data-original-title="40%"
            ></div>
          </div> */}
        </div>
      </div>
      <div className="card project-user">
        <div className="card-body">
          <h6 className="card-title m-b-20">
            Assigned Leader
            <button
              type="button"
              className="float-right btn btn-primary btn-sm"
              data-toggle="modal"
              data-target="#FormModalLead"
            >
              <i className="fa fa-plus"></i> Add
            </button>
          </h6>
          <ul className="list-box teams">
            {campaign_info?.team_leads.map((e) => (
              <li>
                <a href="profile.html">
                  <div className="list-item">
                    <div className="list-left">
                      <span className="avatar">
                        <img
                          alt=""
                          src={e.gender === "male" ? male2 : female}
                        />
                      </span>
                    </div>
                    <div className="list-body">
                      <span className="message-author">
                        {e.first_name} {e.middle_name} {e.last_name}
                      </span>
                      <div className="clearfix"></div>
                      <span className="message-content">Team Leader</span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card project-user">
        <div className="card-body">
          <h6 className="card-title m-b-20">
            Assigned Members
            <button
              type="button"
              className="float-right btn btn-primary btn-sm"
              data-toggle="modal"
              data-target="#FormModalMembers"
            >
              <i className="fa fa-plus"></i> Add
            </button>
          </h6>
          <ul className="list-box teams">
            {campaign_info?.team_members?.map((e) => (
              <li>
                <a href="profile.html">
                  <div className="list-item">
                    <div className="list-left">
                      <span className="avatar">
                        <img
                          alt=""
                          src={e.gender === "male" ? male2 : female}
                        />
                      </span>
                    </div>
                    <div className="list-body">
                      <span className="message-author">
                        {e.first_name} {e.middle_name} {e.last_name}
                      </span>
                      <div className="clearfix"></div>
                      <span className="message-content">
                        {e.designation.designation}
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AddTeam campaign_info={campaign_info} />
      <AddMembers campaign_info={campaign_info} />
    </>
  );
};

export default CampaignRightCard;
