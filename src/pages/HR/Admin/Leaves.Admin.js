import React, { useState, useEffect } from "react";
import LeaveApproverBtn from "../../../components/Tables/EmployeeTables/Leaves/LeaveApproverBtn";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { leaveList } from "../../../db/leaves";
import male from "../../../assets/img/male_avater.png";
import FormModal from "../../../components/Modal/Modal";
import { LeaveApplicationFormJSON } from "../../../components/FormJSON/HR/Leave/application";
import axiosInstance from "../../../services/api";
import HelperService from "../../../services/helper";
import { useAppContext } from "../../../Context/AppContext";
const LeavesAdmin = () => {
  const [allLeaves, setallLeaves] = useState([]);
  const { showAlert, allEmployees, combineRequest } = useAppContext();
  const [template, settemplate] = useState([]);
  const [submitted, setsubmitted] = useState(false);
  const [formValue, setformValue] = useState({});
  const [present, setpresent] = useState(0);
  const [planned, setplanned] = useState(0);
  const [approvedLeaves, setapprovedLeaves] = useState(0);
  const [status, setStatus] = useState("");
  const [editData, seteditData] = useState({});
  const [formMode, setformMode] = useState('add')
  const [fetched, setfetched] = useState(false);
  const [statusRow, setstatusRow] = useState({});
  const fetchLeaves = () => {
    console.log('CALL ERROR')
    axiosInstance.get("/leave-application").then((e) => {
      const leaves = e.data.data;
      setallLeaves(e.data.data);
      console.log(leaves);
      const approved = leaves.filter((e) => e.status === "approved").length;
      const open = leaves.filter((l) => l.status === "open").length;
      console.log(open, approved);
      setapprovedLeaves(approved);
      setplanned(open);
      setpresent(allEmployees.length - approved);
      setfetched(true);
    });
  };
  useEffect(() => {
    if (status.length) {
      console.log(status);
      console.log(statusRow);
      const update = {
        ...statusRow,
        status: status,
        employee_id: statusRow.employee_id._id,
        from_date: new Date(statusRow.from_date),
        to_date: new Date(statusRow.to_date),
        posting_date: new Date(statusRow.posting_date),
      };
      console.log(update);
      delete update.createdAt;
      delete update.updatedAt;
      delete update.__v;
      axiosInstance
        .put("/leave-application/" + statusRow._id, update)
        .then((e) => {
          console.log(e);
          fetchLeaves();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [status]);
  useEffect(() => {
    const employeeOpts = allEmployees.map((e) => {
      return {
        label: e.first_name + " " + e.last_name + " (" + e.ogid + ")",
        value: e._id,
      };
    });
    const finalForm = LeaveApplicationFormJSON.Fields.map((field) => {
      if (field.name === "employee_id") {
        field.options = employeeOpts;
        return field;
      }
      return field;
    });
    settemplate({
      title: LeaveApplicationFormJSON.title,
      Fields: finalForm,
    });
  }, [allEmployees]);
  useEffect(() => {
    if (!fetched) {
      console.log('FETCHED')
      fetchLeaves();
    }
  }, [allEmployees, fetched]);
  useEffect(() => {
    if (submitted === true) {
      axiosInstance
        .post("/leave-application", formValue)
        .then((res) => {
          setsubmitted(false);
          showAlert(
            true,
            "Leave Application submitted successfully",
            "alert-success"
          );
          fetchLeaves();
        })
        .catch((err) => {
          console.log(err);
          showAlert(true, "Unable to submit leave application", "alert-danger");
        });
    }
  }, [submitted, formValue]);
  const handleEdit = (row) =>{
    setformMode('edit')
    seteditData(row)
  }
  const columns = [
    {
      dataField: "employee_id",
      text: "Employee Name",
      sort: true,
      headerStyle: { minWidth: "250px" },
      formatter: (value, row) => (
        <h2 class="table-avatar">
          <a href="" class="avatar">
            <img alt="" src={male} />
          </a>
          <a href="">
            {value.first_name + " " + value.last_name}{" "}
            <span>{value.designation.designation}</span>
          </a>
        </h2>
      ),
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { minWidth: "120px" },
      formatter: (value, row) => (
        <>
          <LeaveApproverBtn
            setstatusRow={setstatusRow}
            setStatus={setStatus}
            value={value}
            row={row}
          />
        </>
      ),
    },
    {
      dataField: "leave_type_id",
      text: "Leave Type",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "from_date",
      text: "From Date",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
      //   filter: dateFilter({
      //     style: { display: 'flex' },
      //     getFilter: (filter) => {
      //         attendanceDateFilter = filter;
      //     }
      //   }),
    },
    {
      dataField: "to_date",
      text: "To Date",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
    },
    {
      dataField: "leave_approver",
      text: "Approved By",
      sort: true,

      headerStyle: { minWidth: "100px", textAlign: "center" },
    },
    {
      dataField: "total_leave_days",
      text: "Total Leave Days",
      sort: true,
      headerStyle: { minWidth: "80px", textAlign: "center" },
      formatter: (val, row) => (
        <p>{HelperService.diffDays(row.from_date, row.to_date)}</p>
      ),
    },
    {
      dataField: "",
      headerStyle: { minWidth: "80px", textAlign: "center" },
      formatter: (val, row) => (
        <div class="dropdown dropdown-action">
          <a
            href="#"
            class="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa fa-ellipsis-v"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a
              class="dropdown-item"
              href="#"
              onClick={() => handleEdit(row)}
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i class="fa fa-pencil m-r-5"></i> Edit
            </a>
            <a
              class="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#delete_salary"
            >
              <i class="fa fa-trash-o m-r-5"></i> Delete
            </a>
          </div>
        </div>
      ),
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
              onClick={() => setformMode('add')}
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
            <h4>
              {present} / {allEmployees.length}
            </h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stats-info">
            <h6>Opened Leaves</h6>
            <h4>{planned} &nbsp;</h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stats-info">
            <h6>Approved Leaves</h6>
            <h4>{approvedLeaves}</h4>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stats-info">
            <h6>Pending Requests</h6>
            <h4> {planned}</h4>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <LeavesTable columns={columns} data={allLeaves} />
        </div>
      </div>
      <FormModal
        setformValue={setformValue}
        template={template}
        setsubmitted={setsubmitted}
        editData={editData}
        formMode={formMode}
      />
    </>
  );
};

export default LeavesAdmin;
