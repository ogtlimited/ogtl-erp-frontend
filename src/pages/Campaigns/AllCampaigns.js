import React, { useState, useEffect } from "react";
import GeneralTable from "../../components/Tables/Table";
import data from "../../db/campaigns.json";
import avater from "../../assets/img/male_avater.png";
import { Link } from "react-router-dom";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { object } from "yup/lib/locale";
import FormModal2 from "../../components/Modal/FormModal2";
import helper from "../../services/helper";
import { campaignFormJson } from "../../components/FormJSON/campaignForm";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import GeneralApproverBtn from "../../components/Misc/GeneralApproverBtn";

const approval = [
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
];

const AllCampaigns = () => {
  const [template, setTemplate] = useState(campaignFormJson);
  const [editData, seteditData] = useState(null);
  const [data, setData] = useState([]);
  const { createCampaign, showAlert, setformUpdate, user } = useAppContext();
  const [formValue, setFormValue] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loadedSelect, setloadedSelect] = useState(false);
  const [status, setStatus] = useState("");
  const [statusRow, setstatusRow] = useState(null);

  const fetchCampaign = () => {
    axiosInstance
      .get("/api/project")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    fetchCampaign();
  }, []);

  useEffect(() => {
    if (formValue) {
      let newValue = {
        ...formValue,
        creator: user?._id,
      };

      axiosInstance
        .post("/api/project", newValue)
        .then((res) => {
          console.log(res);
          setFormValue(null);
          fetchCampaign();
          showAlert(true, res.data?.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error);
          setFormValue(null);
          showAlert(true, error?.response?.data?.message, "alert alert-danger");
        });
    }
  }, [formValue, user?._id]);

  useEffect(() => {
    if (status.length) {
      const update = {
        status,
      };

      axiosInstance
        .patch("/api/project/approve/" + statusRow._id, update)
        .then((res) => {
          fetchCampaign();
          showAlert(true, "Status updated", "alert alert-success");
        })
        .catch((error) => {
          console.log(error.response);
          showAlert(true, error.response.data.message, "alert alert-danger");
        });
    }
    return () => {
      setStatus("");
      setstatusRow(null);
      showAlert(false);
    };
  }, [status, statusRow]);

  const columns = [
    {
      dataField: "project_name",
      text: "Campaign name",
      sort: true,
      headerStyle: { width: "250px" },
      formatter: (value, row) => (
        <Link to={`/dashboard/operations/campaign-info/${row._id}`}>
          {value}
        </Link>
      ),
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "createdAt",
      text: "Created",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <span>{new Date(value).toLocaleDateString()}</span>
      ),
    },
    {
      dataField: "manager",
      text: "Manager",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => (
        <ul className="team-members">
          <li className="row">
            <a data-toggle="tooltip" title="" data-original-title="">
              <img alt="" src={avater} />
            </a>
            <span className="pt-1">
              {row?.manager?.first_name} {row?.manager?.last_name}
            </span>
          </li>
        </ul>
      ),
    },
    {
      dataField: "client_id",
      text: "Client",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => <h2>{value?.company}</h2>,
    },

    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <>
          <GeneralApproverBtn
            options={approval}
            setStatus={setStatus}
            value={value}
            row={row}
            setstatusRow={setstatusRow}
          />
        </>
      ),
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Projects</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Campaigns</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {user?.role?.projects?.create && (
              <a
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-plus"></i> Create Project
              </a>
            )}
            <div className="view-icons">
              <a href="projects" className="grid-view btn btn-link">
                <i className="fa fa-th"></i>
              </a>
              <a href="project-list" className="list-view btn btn-link active">
                <i className="fa fa-bars"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
      {loadedSelect ? (
        <FormModal2
          title="Create Campaign"
          editData={editData}
          setformValue={setFormValue}
          template={helper.formArrayToObject(template.Fields)}
          setsubmitted={setSubmitted}
        />
      ) : null}
    </>
  );
};

export default AllCampaigns;
