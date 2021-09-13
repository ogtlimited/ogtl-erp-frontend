import React from "react";
import GeneralTable from "../../components/Tables/Table";
import data from '../../db/campaigns.json'
import avater from '../../assets/img/male_avater.png'
const AllCampaigns = () => {
  const columns = [
    {
      dataField: "campaign_name",
      text: "Campaign name",
      sort: true,
      headerStyle: { width: "450px" },
    },
    {
      dataField: "campaign_id",
      text: "Campaign Id",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "lead",
      text: "Lead",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <ul className="team-members">
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
      ),
    },
    {
      dataField: "team_member",
      text: "Team members",
      sort: true,
      headerStyle: { minWidth: "180px" },
      formatter: (value, row) => (
        <ul className="team-members">
              
          {value.slice(0,3).map((mem, i) => {
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
      dataField: "created",
      text: "Created",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <>
        {value == 'Active' ?
        <a href="" className="pos-relative"> <span className="status-online"></span> <span className="ml-4 d-block">{value}</span></a>
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
              data-target="#create_project"
            >
              <i className="fa fa-plus"></i> Create Project
            </a>
            <div className="view-icons">
              <a href="projects.html" className="grid-view btn btn-link">
                <i className="fa fa-th"></i>
              </a>
              <a href="project-list.html" className="list-view btn btn-link active">
                <i className="fa fa-bars"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
     
        <div className="col-12">
          <GeneralTable
            data={data}
            columns={columns}
          />
        </div>
      </div>
    </>
  );
};

export default AllCampaigns;
