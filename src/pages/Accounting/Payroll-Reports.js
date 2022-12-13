import { update } from "lodash";
import moment from "moment";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import ViewModal from "../../components/Modal/ViewModal";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { useAppContext } from "../../Context/AppContext";
import AlertSvg from "../../layouts/AlertSvg";
import axiosInstance from "../../services/api";
import { formatter } from "../../services/numberFormatter";
import ApprovePayroll from "./ApprovePayroll";

const PayrollReports = () => {
  const { showAlert, user  } = useAppContext();
  const handleClose = () => {};
  const [generating, setgenerating] = useState(false);
  const ref = useRef(null);
  const [val, setval] = useState("");
  const year = moment().format("YYYY");
  const currMonthName = moment().format("MMMM");
  const [counter, setcounter] = useState(0);
  const [displayState, setdisplayState] = useState("")
  const [previewData, setpreviewData] = useState(null);
  const [totalSalary, settotalSalary] = useState(0);
  const [data, setData] = useState([]);
  const [card, setcard] = useState([
    {
      title: "Total salary",
      amount: "₦" + 0,
      icon: "las la-money-bill-wave-alt",
      id: 1,
    },
    {
      title: "No. Campaign",
      amount: 0,
      icon: "las la-project-diagram",
      id: 3,
    },
    {
      title: "No. Active Employees",
      amount: 0,
      icon: "las la-project-diagram",
      id: 3,
    },
  ]);
  const click = () => {
    setval(ref.current.value);
    ref.current.value = val + ref.current.value;
  };

  const fetchEmployeeSalary = useCallback(() => {
    const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
    const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");
    console.log(startOfMonth, endOfMonth);
    axiosInstance
      .get(
        `/api/salary-slip?startOfMonth=${startOfMonth}&endOfMonth=${endOfMonth}`
      )
      .then((res) => {
        settotalSalary(formatter.format(res.data.data[1].total[0].salaries));
        console.log(res.data.data[0].salarySlips);
        const mapped = res.data.data[0].salarySlips.map((e) => {
          return {
            employee:
              e.employeeId?.first_name +
              " " +
              e.employeeId?.last_name +
              " " +
              e.employeeId?.middle_name,
            email: e.employeeId.company_email,
            date_of_joining: e.employeeId.date_of_joining,
            designation: e.employeeId?.designation.designation,
            salary: e.employeeSalary.netPay,
            employeeId: e.employeeId,
            id: e.employeeId._id,
          };
        });
        setData(mapped);
      })
      .catch((error) => {
        console.log(error?.response);
      });
  }, []);

  useEffect(() => {
    axiosInstance.get("/collection-count").then((res) => {
      const { projects, employees } = res.data.count;
      let total = [totalSalary, projects, employees];
      setpreviewData({
        salary: totalSalary,
        projects: projects,
        employees: employees,
      });
      let updated = card.map((e, i) => {
        return {
          ...e,
          amount: total[i],
        };
      });
      setcard(updated);
    });
  }, [totalSalary]);

  const generatePayroll = () => {
    setgenerating(true);
    axiosInstance
      .post("/api/salary-slip/generate", { action: "generate" })
      .then((res) => {
        fetchEmployeeSalary();
        setgenerating(false);
        // setData(res.data.data[0].salarySlips);
      })
      .catch((error) => {
        setgenerating(false);
        console.log(error?.response);
      });
  };

  useEffect(() => {
    console.log('salary')
    fetchEmployeeSalary();
    
  }, []);

  const columns = [
    {
      dataField: "employee",
      text: "Employee Name",
      sort: true,
      headerStyle: { minWidth: "250px" },
      formatter: (value, row) => <h2 className="table-avatar">{value}</h2>,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{val || "Not Available"}</p>,
    },

    {
      dataField: "designation",
      text: "Designation",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{val || "Not Available"}</p>,
    },
    {
      dataField: "joining_date",
      text: "Joining Date",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{moment(val).format("L")}</p>,
    },
    {
      dataField: "salary",
      text: "Salary",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{formatter.format(val)}</p>,
    },
    {
      dataField: "id",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <Link
          className="btn btn-sm btn-primary"
          // to={`/admin/payslip/${row?._id}`}
          to={{
            pathname: `/dashboard/payroll/payslip/${value}`,
            state: { employee: value },
          }}
        >
          View Pay Slip
        </Link>
      ),
    },
  ];

  return (
    <>
      {user?.role?.title === "CEO" ? <div className="alert alert-primary sliding-text" role="alert">
        <div>
          <AlertSvg />
          <svg
            className="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
          >
            <use xlinkHref="#info-fill" />
          </svg>
          <span className="pl-3">
            Payroll is generated on the 25th of every month
          </span>
          <span className="pl-3">
            {" "}
            | &nbsp; You can preview and approve payroll once generated 
          </span>
        </div>
      </div> : <div className="alert alert-primary sliding-text" role="alert">
        <div>
          <AlertSvg />
          <svg
            className="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
          >
            <use xlinkHref="#info-fill" />
          </svg>
          <span className="pl-3">
            Payroll is generated on the 25th of every month
          </span>
          <span className="pl-3">
            {" "}
            | &nbsp; You can click the generate button to generate payroll for
            the current month
          </span>
        </div>
      </div>}
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Payroll Reports</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item ">Dashboard</li>
              <li className="breadcrumb-item active">Payroll Reports</li>
            </ul>
          </div>
          <div className="col-auto float-end ms-auto">
            {user?.role?.title !== "CEO" && <button className="btn add-btn" onClick={generatePayroll}>
              {!generating ? (
                <>
                  <i className="fa fa-plus"></i> Generate Payroll
                </>
              ) : (
                <div
                  className="spinner-border text-light pl-2"
                  role="status"
                ></div>
              )}
            </button>}

           {user?.role?.title === "CEO" &&  <button
              data-toggle="modal"
              data-target="#generalModal"
              className="btn add-btn mx-5"
              onClick={() => {
                setdisplayState("raw")
                console.log('state', displayState)
              }}
            >
              Preview and approve payroll
            </button>}
          </div>
        </div>
      </div>
      <div className="row">
        {card.map((card) => (
          <div key={card.id} className="col-md-6 col-sm-6 col-lg-6 col-xl-4">
            <div className="card dash-widget">
              <div className="card-body">
                <span className="dash-widget-icon">
                  <i className={card.icon}></i>
                </span>
                <div className="dash-widget-info">
                  <h4>{card.amount}</h4>
                  <span>{card.title}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-md-12">
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>

      <ViewModal
        closeModal={handleClose}
        title={`Payroll Approval for ${currMonthName}  ${year}`}
        content={<ApprovePayroll setdisplayState={setdisplayState} state={displayState} previewData={previewData} />}
      />
    </>
  );
};

export default PayrollReports;
