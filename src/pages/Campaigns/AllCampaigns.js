import React, {useState, useEffect} from "react";
import GeneralTable from "../../components/Tables/Table";
import data from '../../db/campaigns.json'
import avater from '../../assets/img/male_avater.png'
import { Link } from "react-router-dom";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { object } from "yup/lib/locale";
import FormModal2 from "../../components/Modal/FormModal2";
import helper from "../../services/helper";
import { campaignFormJson } from "../../components/FormJSON/campaignForm";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
const AllCampaigns = () => {
  const [template, setTemplate] = useState(campaignFormJson);
  const [editData, seteditData] = useState(null);
  const [data, setData] = useState([]);
  const { combineRequest, showAlert, setformUpdate } = useAppContext();
  const [formValue, setFormValue] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const fetchCampaign = () => {
    axiosInstance
      .get("/api/project")
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);

      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    combineRequest().then((res) => {
      console.log(res);
      const { employees } = res.data.createEmployeeFormSelection;
      const emp = employees?.map((e) => {
        return {
          label: e.first_name + ' ' + e.last_name,
          value: e._id,
        };
      });
      
      console.log(campaignFormJson)
      const formatted = campaignFormJson.Fields.map(c =>{
        if(c.name === 'client_id' || c.name === 'manager' || c.name === 'quality_analyst'){
          return {
            ...c,
            options: emp
          }
        }
        return c
      })
      campaignFormJson.Fields = formatted
      console.log(campaignFormJson)
      setTemplate(campaignFormJson)
      // if (type === "projectId") {
      //   setFormOptions(projectsOpts);
      // } else {
      //   setFormOptions(departmentsOpts);
      // }
    });
  }, [template]);
  useEffect(() => {
    fetchCampaign();
  }, []);
  useEffect(() => {
   console.log(formValue)
   if(submitted){
     axiosInstance.post("/api/project", formValue).then(res =>{
       console.log(res)
       showAlert(true,
        "New campaign created",
        "alert alert-success")
     }).catch(err =>{
       console.log(err)
       showAlert(true,
        "Error creating campaign",
        "alert alert-danger")
     })
   }
   setFormValue(null)
  }, [formValue, setSubmitted])
  const columns = [
    {
      dataField: "project_name",
      text: "Campaign name",
      sort: true,
      headerStyle: { width: "450px" },
      formatter: (value, row) => (
        <Link  to={`/admin/campaign-info/${row._id}`}>
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
        <span >
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
    {
      dataField: "manager",
      text: "Lead",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => (
        <ul className="team-members">
          <li className="row">
            <a
              href="#"
              data-toggle="tooltip"
              title=""
              data-original-title=""
            >
              <img alt="" src={avater} />
            </a>
            <span className="pt-1">{row.manager.first_name} {row.manager.last_name}</span>
          </li>
        </ul>
      ),
    },
    {
      dataField: "team_member",
      text: "Team members",
      sort: true,
      headerStyle: { minWidth: "180px" },
      formatter: (value, row) => (
        <ul className="team-members">
              
          {value?.slice(0,3).map((mem, i) => {
              return (
                    <li>
                        {(i+1) <= 3  ? 
                        <a
                        href="#"
                        data-toggle="tooltip"
                        title=""
                        data-original-title={mem.employee_name}
                      >
                        <img alt="" src={avater} />
                      </a>
             
                        : 
                        <a href="#" className="all-users">+{value.length}</a>
                        }
                    </li>
                )
            })}
        </ul>
      ),
    },
    {
      dataField: "approved",
      text: "Status",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <>
        {value ==true  ?
        <a href="" className="pos-relative"> <span className="status-online"></span> <span className="ml-4 d-block">Approved</span></a>
        : value == 'Pending' ?
         <a href="" className="pos-relative"> <span className="status-pending"></span> <span className="ml-4 d-block">{value}</span></a>
         : value == 'Terminated' ?
         <a href="" className="pos-relative"> <span className="status-terminated"></span> <span className="ml-4 d-block">{value}</span></a>
         :
         <a href="" className="pos-relative"> <span className="status-terminated"></span> <span className="ml-4 d-block">{value}</span></a>
        }

        </>
      )   
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "150px" },
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
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Create Project
            </a>
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
          <LeavesTable
            data={data}
            columns={columns}
          />
        </div>
      </div>
      <FormModal2
        title="Create Campaign"
        editData={editData}
        setformValue={setFormValue}
        template={helper.formArrayToObject(template.Fields)}
        setsubmitted={setSubmitted}
      />
    </>
  );
};

export default AllCampaigns;
