import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { campaignFormJson } from "../../components/FormJSON/campaignForm";
import FormModal2 from "../../components/Modal/FormModal2";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import helper from "../../services/helper";

const CampaignHeader = ({ campaign_info, fetchProjects }) => {
  const [loadedSelect, setloadedSelect] = useState(false);
  const [template, setTemplate] = useState(campaignFormJson);
  const [editData, seteditData] = useState(null);
  const [formValue, setFormValue] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [clickedRow, setclickedRow] = useState(null);

  const { createCampaign, showAlert, setformUpdate, user } = useAppContext();

  useEffect(() => {
    let formatted = helper.handleEdit(campaign_info);
    setformUpdate(formatted);
    setclickedRow(formatted);
  }, [campaign_info]);

  useEffect(() => {
    seteditData(clickedRow);
  }, [clickedRow, submitted, template]);

  useEffect(() => {
    createCampaign().then((res) => {
      console.log(res);
      const { employees, clientS } = res.data.createCampaignForm;
      const emp = employees?.map((e) => {
        return {
          label: e.first_name + " " + e.last_name,
          value: e._id,
        };
      });

      const clients = clientS?.map((e) => {
        return {
          label: e.company,
          value: e._id,
        };
      });

      const formatted = campaignFormJson.Fields.map((c) => {
        if (c.name === "manager" || c.name === "quality_analyst") {
          return {
            ...c,
            options: emp,
          };
        } else if (c.name === "client_id") {
          c.options = clients;
          return c;
        }
        return c;
      });
      campaignFormJson.Fields = formatted;
      console.log(campaignFormJson);
      setTemplate(campaignFormJson);
      // if (type === "projectId") {
      //   setFormOptions(projectsOpts);
      // } else {
      //   setFormOptions(departmentsOpts);
      // }
      if (template !== null) {
        setloadedSelect(true);
      }
    });
  }, [template, createCampaign]);

  useEffect(() => {
    if (formValue) {
      let newValue = {
        ...formValue,
        creator: user?._id,
      };
      delete newValue.status;

      axiosInstance
        .put(`/api/project/${campaign_info?._id}`, newValue)
        .then((res) => {
          console.log(res);
          setFormValue(null);
          fetchProjects();
          showAlert(true, res.data?.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error);
          setFormValue(null);
          showAlert(true, error?.response?.data?.message, "alert alert-danger");
        });
    }
  }, [formValue, user?._id]);

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">
              {campaign_info?.project_name} Campaign
            </h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/campaigns">Campaigns</Link>
              </li>
              <li className="breadcrumb-item active">Campaign</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              className="btn add-btn"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Edit Campaign
            </a>
            <a
              href="task-board.html"
              className="btn btn-white float-right m-r-10"
              data-toggle="tooltip"
              title=""
              data-original-title="Task Board"
            >
              <i className="fa fa-bars"></i>
            </a>
          </div>
        </div>
      </div>
      {loadedSelect ? (
        <FormModal2
          title="Edit Campaign"
          editData={editData}
          setformValue={setFormValue}
          template={helper.formArrayToObject(template.Fields)}
          setsubmitted={setSubmitted}
        />
      ) : null}
    </>
  );
};

export default CampaignHeader;
