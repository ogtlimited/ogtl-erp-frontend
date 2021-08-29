import React from "react";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { leaveList } from "../../../db/leaves";

import LeaveApproverBtn from "../../../components/Tables/EmployeeTables/Leaves/LeaveApproverBtn";
const LeavesUser = () => {
  const columns = [
    {
      dataField: "leave_type",
      text: "Leave Type",
      sort: true,
      // headerStyle: {minWidth: "100px"},
      
    },
    {
        dataField: "from",
        text: "From Date",
        sort: true,
      //   filter: dateFilter({
      //     style: { display: 'flex' },
      //     getFilter: (filter) => {
      //         attendanceDateFilter = filter;
      //     }
      //   }),
        // headerStyle: {minWidth: "150px"},
        
      },
      {
        dataField: "to",
        text: "To Date",
        sort: true,
        // headerStyle: {minWidth: "150px"},
        
      },
    {
      dataField: "reason",
      text: "Reason",
      sort: true,

      // headerStyle: {minWidth: "100px", textAlign:'center'},
      
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      // headerStyle: {minWidth: "120px"},
      formatter: (value, row) => (
          <>
            <LeaveApproverBtn value={value} row={row} />
        </>
        )    ,

    },
    {
      dataField: "approved_by",
      text: "Approved by",
      sort: true,
      // headerStyle: {minWidth: "80px", textAlign:'center'},
      
    },
    
    
  ];
  return (
    <>
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">Leaves</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li class="breadcrumb-item active">Leaves</li>
            </ul>
          </div>
          <div class="col-auto float-right ml-auto">
            <a
              href="#"
              class="btn add-btn"
              data-toggle="modal"
              data-target="#add_leave"
            >
              <i class="fa fa-plus"></i> Add Leave
            </a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div class="stats-info">
            <h6>Annual Leave</h6>
            <h4>12</h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stats-info">
            <h6>Medical Leave</h6>
            <h4>3</h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stats-info">
            <h6>Other Leave</h6>
            <h4>4</h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stats-info">
            <h6>Remaining Leave</h6>
            <h4>5</h4>
          </div>
        </div>
      </div>
      <div class="row">
          <div class="col-12">
          <LeavesTable columns={columns} data={leaveList} />
          </div>
      </div>
    </>
  );
};

export default LeavesUser;
