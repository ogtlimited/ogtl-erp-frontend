import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../services/api";
import { formatter } from "../../services/numberFormatter";

const PayrollReports = () => {
  const ref = useRef(null);
  const [val, setval] = useState("");
  const [counter, setcounter] = useState(0);
  const [data, setData] = useState([]);
  const click = () => {
    setval(ref.current.value);
    ref.current.value = val + ref.current.value;
  };
  useEffect(() => {
    setcounter(counter + 1);
  });
  const fetchEmployeeSalary = () => {
    axiosInstance
      .get("/api/salary-slip")
      .then((res) => {
        setData(res.data.data);
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
      dataField: "ogid",
      text: "Employee ID",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => (
        <p>{row?.employeeId?.ogid || "Not Available"}</p>
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

    // // {
    // //   dataField: "designation",
    // //   text: "Designation",
    // //   sort: true,
    // //   headerStyle: { minWidth: "150px" },
    // // },
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
            pathname: `/admin/payslip/${row?._id}`,
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
    },
    {
      title: "No. Departments",
      amount: 0,
      icon: "las la-object-group",
    },
    {
      title: "No. Campaign",
      amount: 0,
      icon: "las la-project-diagram",
    },
    {
      title: "Invoices",
      amount: "23,000",
      icon: "las la-file-invoice-dollar",
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Payroll Reports</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item ">Dashboard</li>
              <li className="breadcrumb-item active">Payroll Reports</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        {cards.map((card) => (
          <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
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
    </>
  );
};

export default PayrollReports;
