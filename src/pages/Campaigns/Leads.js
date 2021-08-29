import React from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import data from '../../db/campaigns.json'
import avater from '../../assets/img/male_avater.png'

const Leads = () => {
  const columns = [
    {
      dataField: "lead",
      text: "Lead Name",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <h2 class="table-avatar">
        <a href="#" class="avatar"><img alt="" src={avater} /></a>
        <a href="#">{value}</a>
        </h2>
      ),
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      headerStyle: { width: "150px" },
    },
    {
      dataField: "phone",
      text: "Phone",
      sort: true,
      headerStyle: { width: "150px" },
    },
    {
      dataField: "campaign_name",
      text: "Campaign name",
      sort: true,
      headerStyle: { width: "450px" },
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
        <div class="row">
          <div class="col-sm-12">
            <h3 class="page-title">Leads</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li class="breadcrumb-item active">Leads</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
      <div class="col-sm-12">
         <LeavesTable
            data={data}
            columns={columns}
         /> 
      </div>
          
      </div>
    </>
  );
};

export default Leads;
