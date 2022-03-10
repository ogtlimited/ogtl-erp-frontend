import React, { useState, useEffect } from "react";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { leaveList } from "../../../db/leaves";
import male from "../../../assets/img/male_avater.png";
import FormModal from "../../../components/Modal/Modal";
import { LeaveApplicationFormJSON } from "../../../components/FormJSON/HR/Leave/application";
import axiosInstance from "../../../services/api";
import HelperService from "../../../services/helper";
import { useAppContext } from "../../../Context/AppContext";
import GeneralApproverBtn from "../../../components/Misc/GeneralApproverBtn";
import GeneralUpload from "../../../components/Modal/GeneralUpload";
import tokenService from "../../../services/token.service";
const LeavesAdmin = () => {
  const [approval, setApproval] = useState([
    {
      title: "open",
      color: "text-secondary",
    },
    {
      title: "approved by supervisor",
      color: "text-info",
    },
    {
      title: "approved",
      color: "text-success",
    },
    {
      title: "cancelled",
      color: "text-warning",
    },
    {
      title: "rejected",
      color: "text-danger",
    },
  ]);
  const [allLeaves, setallLeaves] = useState([]);
  const [allSubordinatesLeaves, setallSubordinatesLeaves] = useState([]);
  const { showAlert, allEmployees, combineRequest } = useAppContext();
  const [template, settemplate] = useState([]);
  const [submitted, setsubmitted] = useState(false);
  const [formValue, setformValue] = useState({});
  const [present, setpresent] = useState(0);
  const [planned, setplanned] = useState(0);
  const [approvedLeaves, setapprovedLeaves] = useState(0);
  const [subordinatespresent, setSubordinatesPresent] = useState(0);
  const [subordinatesplanned, setSubordinatesPlanned] = useState(0);
  const [approvedSubordinatesLeaves, setapprovedSubordinatesLeaves] = useState(0);
  const [toggleModal, settoggleModal] = useState(false);
  const [status, setStatus] = useState("");
  const [editData, seteditData] = useState({});
  const [formMode, setformMode] = useState("add");
  const [fetched, setfetched] = useState(false);
  const [statusRow, setstatusRow] = useState({});

  const user = tokenService.getUser();

  const fetchLeaves = () => {
    axiosInstance.get("/leave-application").then((e) => {
      const leaves = e.data.data;
      setallLeaves(e.data.data);
      const approved = leaves.filter((e) => e.status === "approved").length;
      const open = leaves.filter((l) => l.status === "open").length;

      setapprovedLeaves(approved);
      setplanned(open);
      setpresent(allEmployees.length - approved);
    });

    axiosInstance.get(`/leave-application?leave_approver=${user?._id}`).then((e) => {
      const leaves = e.data.data;
      setallSubordinatesLeaves(e.data.data);
      const approved = leaves.filter((e) => e.status === "approved").length;
      const open = leaves.filter((l) => l.status === "open").length;

      setapprovedSubordinatesLeaves(approved);
      setSubordinatesPlanned(open);
      setSubordinatesPresent(allEmployees.length - approved);
      setfetched(true);
    });
  };
  useEffect(() => {
    if (status.length) {
      const update = {
        ...statusRow,
        status: status,
        leave_approver: statusRow.employee_id._id,
        employee_id: statusRow.leave_approver._id,
        from_date: new Date(statusRow.from_date),
        to_date: new Date(statusRow.to_date),
        posting_date: new Date(statusRow.posting_date),
      };

      delete update.createdAt;
      delete update.updatedAt;
      delete update.__v;
      axiosInstance
        .put("/leave-application/" + statusRow._id, update)
        .then((e) => {
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
  const handleEdit = (row) => {
    setformMode("edit");
    seteditData(row);
  };
  const columns = [
    {
      dataField: "employee_id",
      text: "Employee Name",
      sort: true,
      headerStyle: { minWidth: "250px" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <a href="" className="avatar">
            <img alt="" src={male} />
          </a>
          <a href="">
            {value?.first_name + " " + value?.last_name}{" "}
            <span>{value?.designation?.designation}</span>
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
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <a href="" className="avatar">
            <img alt="" src={male} />
          </a>
          <a href="">
            {value?.first_name + " " + value?.last_name}{" "}
            <span>{value?.designation.designation}</span>
          </a>
        </h2>
      ),
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
        <div className="dropdown dropdown-action">
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleEdit(row)}
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </a>
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#delete_salary"
            >
              <i className="fa fa-trash-o m-r-5"></i> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Leaves</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Leaves</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto"></div>
        </div>
      </div>
      <div className="page-menu">
        <div className="row">
          <div className="col-sm-12">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#tab_leaves"
                >
                  Leaves
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#tab_subordinates-leaves">
                  Leaves by Subordinates
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row tab-content">
        <div id="tab_leaves" className="col-12 tab-pane show active">
          <div className="row">
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Today Presents</h6>
                <h4>
                  {present} / {allEmployees.length}
                </h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Opened Leaves</h6>
                <h4>{planned} &nbsp;</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Approved Leaves</h6>
                <h4>{approvedLeaves}</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Pending Requests</h6>
                <h4> {planned}</h4>
              </div>
            </div>
          </div>
          <LeavesTable columns={columns} data={allLeaves} />
        </div>

        <div id="tab_subordinates-leaves" className="col-12 tab-pane">
          <div className="row">
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Today Presents</h6>
                <h4>
                  {subordinatespresent} / {allEmployees.length}
                </h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Opened Leaves</h6>
                <h4>{subordinatesplanned} &nbsp;</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Approved Leaves</h6>
                <h4>{approvedSubordinatesLeaves}</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stats-info">
                <h6>Pending Requests</h6>
                <h4> {subordinatesplanned}</h4>
              </div>
            </div>
          </div>
          <LeavesTable columns={columns} data={allSubordinatesLeaves} />
        </div>
      </div>
      <FormModal
        setformValue={setformValue}
        template={template}
        setsubmitted={setsubmitted}
        editData={editData}
        formMode={formMode}
      />
      {toggleModal && (
        <GeneralUpload
          settoggleModal={settoggleModal}
          title="Upload Attendance"
          url="'/api/attendance/bulk'"
        />
      )}
    </>
  );
};

export default LeavesAdmin;
