import React, { useState, useEffect } from "react";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import tokenService from "../../../services/token.service";
import axiosInstance from "../../../services/api";
import FormModal from "../../../components/Modal/Modal";
import { LeaveApplicationFormJSON } from "../../../components/FormJSON/HR/Leave/application";
import { useAppContext } from "../../../Context/AppContext";
import FormModal2 from "../../../components/Modal/FormModal2";
import helper from "../../../services/helper";
import moment from "moment";
const LeavesUser = () => {
  const { allEmployees, combineRequest, showAlert } = useAppContext();
  const [userId, setuserId] = useState("");
  const [user, setuser] = useState(null);
  const [usedLeaves, setusedLeaves] = useState(0);
  const [template, settemplate] = useState(null);
  const [submitted, setsubmitted] = useState(false);
  const [formValue, setformValue] = useState({});
  const [editData, seteditData] = useState({});
  const [allLeaves, setallLeaves] = useState([]);
  const [allSubordinatesLeaves, setallSubordinatesLeaves] = useState([]);
  const [annual, setannual] = useState(0);
  const [casual, setcasual] = useState(0);
  const [medical, setmedical] = useState(0);
  const [Subordinatesannual, setSubordinatesannual] = useState(0);
  const [Subordinatescasual, setSubordinatescasual] = useState(0);
  const [Subordinatesmedical, setSubordinatesmedical] = useState(0);
  const [remaining, setremaining] = useState(0);
  const [formMode, setformMode] = useState("add");
  const [fetched, setfetched] = useState(false);
  const [loadedSelect, setloadedSelect] = useState(false);
  const [loadLeaves, setloadLeaves] = useState(false);

  const currentUser = tokenService.getUser();
  const fetchLeaves = () => {
    axiosInstance
      .get(`/leave-application?employee_id=${currentUser?._id}`)
      .then((e) => {
        const leaves = e?.data?.data?.filter(
          (f) => f?.employee_id?._id == userId
        );
        const casual = leaves.filter((e) => e.leave_type_id !== "Sick").length;
        const medic = leaves.filter((e) => e.leave_type_id === "Sick").length;
        const open = leaves.filter((l) => l.status === "open").length;
        let count = 0;
        leaves.forEach((e) => {
          let a = moment(new Date(e.from_date));
          let b = moment(new Date(e.to_date));
          count += b.diff(a, "days") + 1;
        });

        setusedLeaves(count);
        setannual(annual);
        setcasual(casual);
        setmedical(medic);

        setallLeaves(leaves);
        if (allLeaves.length) {
          setloadLeaves(true);
        }
      });

    axiosInstance
      .get(`/leave-application?leave_approver=${currentUser?._id}`)
      .then((e) => {
        const leaves = e.data.data;

        const casual = leaves.filter((e) => e.leave_type_id !== "Sick").length;
        const medic = leaves.filter((e) => e.leave_type_id === "Sick").length;

        setSubordinatesannual(annual);
        setSubordinatescasual(casual);
        setSubordinatesmedical(medic);
        setallSubordinatesLeaves(e.data.data);
        // setapprovedSubordinatesLeaves(approved);
        // setSubordinatesPlanned(open);
        // setSubordinatesPresent(allEmployees.length - approved);
        // setfetched(true);
      });
  };
  useEffect(() => {
    let user = tokenService.getUser();
    setuser(user);
    setuserId(user._id);
    if (userId) {
      fetchLeaves();
    }
  }, [userId]);
  useEffect(() => {
    if (!fetched) {
      fetchLeaves();
    }
  }, [allEmployees, fetched]);

  useEffect(() => {
    let user = tokenService.getUser();

    const values = {
      ...formValue,
    };
    if (submitted) {
      axiosInstance
        .post("/leave-application", values)
        .then((e) => {
          showAlert(true, e?.data?.message, "alert alert-success");
          fetchLeaves();
        })
        .catch((err) => {
          console.log(err.response);
          showAlert(true, err?.response.data?.message, "alert alert-danger");
        });
    }
  }, [formValue, submitted]);
  useEffect(() => {
    combineRequest()
      .then((res) => {
        const { employees } = res.data.createEmployeeFormSelection;
        const employeeOpts = employees.map((e) => {
          return {
            value: e._id,
            label: e.first_name + " " + e.last_name,
          };
        });
        const finalForm = LeaveApplicationFormJSON.Fields.map((field) => {
          if (field.name === "leave_approver") {
            field.options = employeeOpts;
            return field;
          }
          return field;
        });

        settemplate({
          title: LeaveApplicationFormJSON.title,
          Fields: finalForm,
        });
        if (!loadedSelect) {
          setloadedSelect(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loadedSelect]);
  const columns = [
    {
      dataField: "leave_type_id",
      text: "Leave Type",
      sort: true,
      // headerStyle: {minWidth: "100px"},
    },
    {
      dataField: "from_date",
      text: "From Date",
      sort: true,
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
      //   filter: dateFilter({
      //     style: { display: 'flex' },
      //     getFilter: (filter) => {
      //         attendanceDateFilter = filter;
      //     }
      //   }),
      // headerStyle: {minWidth: "150px"},
    },
    {
      dataField: "to_date",
      text: "To Date",
      sort: true,
      formatter: (val, row) => <p>{new Date(val).toDateString()}</p>,
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
          {value === "approved" ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-success"></i> {value}
            </span>
          ) : value === "cancelled" ? (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-danger"></i> {value}
            </span>
          ) : value === "open" ? (
            <span className="btn btn-gray btn-sm btn-rounded ">
              <i className="fa fa-dot-circle-o text-primary"></i> {value}
            </span>
          ) : (
            <span className="btn btn-gray btn-sm btn-rounded">
              <i className="fa fa-dot-circle-o text-purple"></i> Approved
            </span>
          )}
        </>
      ),
    },
    {
      dataField: "leave_approver",
      text: "Approved by",
      sort: true,
      formatter: (value, row) => (
        <>
          {row.leave_approver.first_name} {row.leave_approver.last_name}
        </>
      ),
      // headerStyle: {minWidth: "80px", textAlign:'center'},
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
          <div className="col-auto float-right ml-auto">
            {loadedSelect && (
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                onClick={() => setformMode("add")}
                data-target="#FormModal"
              >
                <i className="fa fa-plus"></i> Add Leave
              </a>
            )}
          </div>
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
                  Your Leaves
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_subordinates-leaves"
                >
                  Leaves by Subordinates
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className=" tab-content">
          <div id="tab_leaves" className="col-12 tab-pane show active">
            <div className="row">
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Used Leave</h6>
                  <h4>{usedLeaves}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Medical Leave</h6>
                  <h4>{medical}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Other Leave</h6>
                  <h4>{casual}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Remaining Leave</h6>
                  <h4>{user?.leaveCount}</h4>
                </div>
              </div>
            </div>
            <LeavesTable columns={columns} data={allLeaves} />
          </div>
          <div id="tab_subordinates-leaves" className="col-12 tab-pane">
            <div className="row">
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Used Leave</h6>
                  <h4>{usedLeaves}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Medical Leave</h6>
                  <h4>{Subordinatesmedical}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Other Leave</h6>
                  <h4>{Subordinatescasual}</h4>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stats-info">
                  <h6>Remaining Leave</h6>
                  <h4>{user?.leaveCount}</h4>
                </div>
              </div>
            </div>
            <LeavesTable columns={columns} data={allSubordinatesLeaves} />
          </div>
        </div>
      </div>
      {loadedSelect && (
        <FormModal2
          title="Leave Application"
          editData={editData}
          setformValue={setformValue}
          template={helper.formArrayToObject(template.Fields)}
          setsubmitted={setsubmitted}
        />
      )}
    </>
  );
};

export default LeavesUser;
