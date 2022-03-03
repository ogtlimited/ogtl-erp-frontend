import { update } from "lodash";
import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ViewModal from "../../components/Modal/ViewModal";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { useAppContext } from "../../Context/AppContext";
import AlertSvg from "../../layouts/AlertSvg";
import axiosInstance from "../../services/api";
import { formatter } from "../../services/numberFormatter";

const PayrollReports = () => {
  const { combineRequest, showAlert } = useAppContext();
  const ref = useRef(null);
  const [val, setval] = useState("");
  const [counter, setcounter] = useState(0);
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
      title: "No. Employees",
      amount: 0,
      icon: "las la-project-diagram",
      id: 3,
    },
  ])
  const click = () => {
    setval(ref.current.value);
    ref.current.value = val + ref.current.value;
  };

  const fetchEmployeeSalary = () => {
    axiosInstance
      .get("/api/salary-slip")
      .then((res) => {
        console.log(res.data.data[1].total[0].salaries);
        const totalSalary = formatter.format(res.data.data[1].total[0].salaries)
        setData(res.data.data[0].salarySlips);
        combineRequest().then((res) => {
          const { departments, projects, employees  } = res.data.createEmployeeFormSelection;
          let total = [totalSalary, projects.length, employees.length]
          let updated = card.map((e, i) => {
            return {
              ...e,
              amount: total[i]
            }
          })
          setcard(updated)
          console.log(updated)
        });
      })
      .catch((error) => {
        console.log(error?.response);
      });
  };
  const generatePayroll = () => {
    axiosInstance
      .get("/api/salary-slip")
      .then((res) => {
        console.log(res.data.data[1]);
        setData(res.data.data[0].salarySlips);
      })
      .catch((error) => {
        console.log(error?.response);
      });
  };
  useEffect(() => {
    fetchEmployeeSalary();
  }, []);

  const columns = [
    {
      dataField: "",
      text: "Employee Name",
      sort: true,
      headerStyle: { minWidth: "250px" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          {row?.employeeId?.first_name} {row?.employeeId?.middle_name}{" "}
          {row?.employeeId?.last_name}
        </h2>
      ),
    },
    {
      dataField: "company_email",
      text: "Email",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => (
        <p>{row?.employeeId?.company_email || "Not Available"}</p>
      ),
    },

    {
      dataField: "",
      text: "Designation",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => (
        <p>{row?.employeeId?.designation.designation || "Not Available"}</p>
      ),
    },
    {
      dataField: "joining_date",
      text: "Joining Date",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => (
        <p>{moment(row?.employeeId?.date_of_joining).format("L")}</p>
      ),
    },
    {
      dataField: "netPay",
      text: "Salary",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => <p>{formatter.format(row?.netPay)}</p>,
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <Link
          className="btn btn-sm btn-primary"
          // to={`/admin/payslip/${row?._id}`}
          to={{
            pathname: `/dashboard/payroll/payslip/${row?.employeeId._id}`,
            state: { employee: row?.employeeId },
          }}
        >
          View Pay Slip
        </Link>
      ),
    },
  ];
  let cards = [
    {
      title: "Total salary",
      amount: "₦" + "18,000,000",
      icon: "las la-money-bill-wave-alt",
      id: 1,
    },
    {
      title: "No. Departments",
      amount: 0,
      icon: "las la-object-group",
      id: 2,
    },
    {
      title: "No. Campaign",
      amount: 0,
      icon: "las la-project-diagram",
      id: 3,
    },
    {
      title: "No. Employees",
      amount: 0,
      icon: "las la-project-diagram",
      id: 3,
    },
  ];
  return (
    <>
      <div class="alert alert-primary sliding-text" role="alert">
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
          <span className="pl-3">Payroll is generated on the 25th of every month</span>
          <span className="pl-3"> | &nbsp; You can click the generate button to generate payroll for the current month</span>

        </div>
      </div>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Payroll Reports</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item ">Dashboard</li>
              <li className="breadcrumb-item active">Payroll Reports</li>
            </ul>
          </div>
          <div class="col-auto float-end ms-auto">
            <a  href="/#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#generalModal"><i class="fa fa-plus"></i> Generate Payroll</a></div>
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
                  <h3>{card.amount}</h3>
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

      <ViewModal title="Payroll Generated Successfully" content={<>S</>} />
    </>
  );
};

export default PayrollReports;
