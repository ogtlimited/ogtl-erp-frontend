import React, { useState, useEffect } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { leaveList } from "../../db/leaves";
import male from "../../assets/img/male_avater.png";
import FormModal from "../../components/Modal/Modal";
import { LeaveApplicationFormJSON } from "../../components/FormJSON/HR/Leave/application";
import axiosInstance from "../../services/api";
import HelperService from "../../services/helper";
import { useAppContext } from "../../Context/AppContext";
import GeneralApproverBtn from "../../components/Misc/GeneralApproverBtn";
import GeneralUpload from "../../components/Modal/GeneralUpload";
import tokenService from "../../services/token.service";
const ClientApproval = () => {
  const [approval, setApproval] = useState([
    {
      title: "open",
      color: "text-secondary",
    },

    {
      title: "approved",
      color: "text-success",
    },
    {
      title: "rejected",
      color: "text-danger",
    },
  ]);

  const [allLeaves, setallLeaves] = useState([]);
  const { showAlert, allEmployees, combineRequest } = useAppContext();
  const [template, settemplate] = useState([]);
  const [submitted, setsubmitted] = useState(false);
  const [formValue, setformValue] = useState({});
  const [present, setpresent] = useState(0);
  const [planned, setplanned] = useState(0);
  const [approvedLeaves, setapprovedLeaves] = useState(0);
  const [toggleModal, settoggleModal] = useState(false);
  const [status, setStatus] = useState("");
  const [editData, seteditData] = useState({});
  const [formMode, setformMode] = useState("add");
  const [fetched, setfetched] = useState(false);
  const [statusRow, setstatusRow] = useState({});
  const handleEdit = (row) => {
    setformMode("edit");
    seteditData(row);
  };
  const user = tokenService.getUser();
  console.log("userrrrrr", user);

  const fetchLeaves = () => {
    axiosInstance
      .get(`/leave-application/client-approval/${user?.projectId?._id}`)
      .then((e) => {
        const leaves = e.data.data;
        setallLeaves(e.data.data);

        const approved = leaves.filter((e) => e.status === "approved").length;
        const open = leaves.filter((l) => l.status === "open").length;

        setapprovedLeaves(approved);
        setplanned(open);
        setpresent(allEmployees.length - approved);
        setfetched(true);
      });
  };
  useEffect(() => {
    fetchLeaves();
  }, []);
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
      <div className="row">
        <div className="col-12">
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

export default ClientApproval;
