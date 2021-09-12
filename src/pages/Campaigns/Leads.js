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
        <h2 className="table-avatar">
        <a href="#" className="avatar"><img alt="" src={avater} /></a>
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
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Leads</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Leads</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
      <div className="col-sm-12">
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
