import React, {useState} from "react";
import LeaveApproverBtn from "../../../components/Tables/EmployeeTables/Leaves/LeaveApproverBtn";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { leaveList } from "../../../db/leaves";
import male from '../../../assets/img/male_avater.png'
import FormModal from "../../../components/Modal/Modal";
import { LeaveApplicationFormJSON } from "../../../components/FormJSON/HR/Leave/application";
const LeavesAdmin = () => {
  const [formValue, setformValue] = useState({})
  const columns = [
    {
      dataField: "employee",
      text: "Employee Name",
      sort: true,
      headerStyle: {minWidth: "250px"},
      formatter: (value, row) => (
        <h2 class="table-avatar"><a href="" class="avatar"><img alt=""
      src={male} /></a><a href="">{value} <span>{row.designation}</span></a></h2>
      )    ,
      
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: {minWidth: "120px"},
      formatter: (value, row) => (
          <>
            <LeaveApproverBtn value={value} row={row} />
        </>
        )    ,
      
      
    },
    {
      dataField: "leave_type",
      text: "Leave Type",
      sort: true,
      headerStyle: {minWidth: "100px"},
      
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
        headerStyle: {minWidth: "150px"},
        
      },
      {
        dataField: "to",
        text: "To Date",
        sort: true,
        headerStyle: {minWidth: "150px"},
        
      },
    {
      dataField: "approved_by",
      text: "Approved By",
      sort: true,

      headerStyle: {minWidth: "100px", textAlign:'center'},
      
    },
    {
      dataField: "total_leave_days",
      text: "Total Leave Days",
      sort: true,
      headerStyle: {minWidth: "80px", textAlign:'center'},
      
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
              data-target="#FormModal"
            >
              <i class="fa fa-plus"></i> Add Leave
            </a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div class="stats-info">
            <h6>Today Presents</h6>
            <h4>12 / 60</h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stats-info">
            <h6>Planned Leaves</h6>
            <h4>
              8 <span>Today</span>
            </h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stats-info">
            <h6>Unplanned Leaves</h6>
            <h4>
              0 <span>Today</span>
            </h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stats-info">
            <h6>Pending Requests</h6>
            <h4>12</h4>
          </div>
        </div>
      </div>
      <div class="row">
          <div class="col-12">
          <LeavesTable columns={columns} data={leaveList} />
          </div>
      </div>
      <FormModal setformValue={setformValue} template={LeaveApplicationFormJSON} />
    </>
  );
};

export default LeavesAdmin;
