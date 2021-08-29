/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import data from '../../../db/shift.json'
const ShiftAdmin = () => {
    const columns = [
        {
          dataField: "shift_name",
          text: "Shift Name",
          sort: true,
         
        },
        {
          dataField: "status",
          text: "Status",
          sort: true,
         
          formatter: (value, row) => (
              <>
                <div class="action-label">
                    <a class="btn btn-white btn-sm btn-rounded" href="">
                        <i class="fa fa-dot-circle-o text-success"></i> Active
                    </a>
                </div>
            </>
            )    ,
          
          
        },
        {
          dataField: "start_time",
          text: "Start time",
          sort: true,
          
          
        },
        {
            dataField: "end_time",
            text: "End time",
            sort: true,
          //   filter: dateFilter({
          //     style: { display: 'flex' },
          //     getFilter: (filter) => {
          //         attendanceDateFilter = filter;
          //     }
          //   }),
           
          },
          {
            dataField: "break_time",
            text: "Break time",
            sort: true,
          },
          {
            dataField: "",
            text: "Action",
            sort: false,

          },

      ];
  return (
    <>
      <div class="page-header">
        <div class="row">
          <div class="col">
            <h3 class="page-title">Shift List</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li class="breadcrumb-item">
                <Link to="/">Employees</Link>
              </li>
              <li class="breadcrumb-item active">Shift List</li>
            </ul>
          </div>
          <div class="col-auto float-right ml-auto">
            <a
              href="#"
              class="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#add_shift"
            >
              Add Shifts
            </a>
            <a
              href="#"
              class="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#add_schedule"
            >
              {" "}
              Assign Shifts
            </a>
          </div>
        </div>
      </div>
      <div class="row">
      <div class="col-12">
          <LeavesTable
            data={data}
            columns={columns}

          />

      </div>
      </div>
    </>
  );
};

export default ShiftAdmin;
