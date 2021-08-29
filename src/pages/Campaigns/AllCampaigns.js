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
        <ul class="team-members">
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
        <ul class="team-members">
              
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
                        <a href="#" class="all-users">+{value.length}</a>
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
        <a href="" class="pos-relative"> <span className="status-online"></span> <span className="ml-4 d-block">{value}</span></a>
        : value == 'Pending' ?
         <a href="" class="pos-relative"> <span className="status-pending"></span> <span className="ml-4 d-block">{value}</span></a>
         : value == 'Terminated' ?
         <a href="" class="pos-relative"> <span className="status-terminated"></span> <span className="ml-4 d-block">{value}</span></a>
         :
         <a href="" class="pos-relative"> <span className="status-terminated"></span> <span className="ml-4 d-block">{value}</span></a>
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
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Projects</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="">Dashboard</a>
              </li>
              <li class="breadcrumb-item active">Campaigns</li>
            </ul>
          </div>
          <div class="col-auto float-right ml-auto">
            <a
              href="#"
              class="btn add-btn"
              data-toggle="modal"
              data-target="#create_project"
            >
              <i class="fa fa-plus"></i> Create Project
            </a>
            <div class="view-icons">
              <a href="projects.html" class="grid-view btn btn-link">
                <i class="fa fa-th"></i>
              </a>
              <a href="project-list.html" class="list-view btn btn-link active">
                <i class="fa fa-bars"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
     
        <div class="col-12">
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
