import React, { useEffect, useState } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import avater from "../../assets/img/male_avater.png";
import axiosInstance from "../../services/api";
import { Link } from "react-router-dom";
import { formatter } from "../../services/numberFormatter";
import moment from "moment";

const PayslipReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPaySlips = () => {
      axiosInstance
        .get("/api/salary-slip")
        .then((res) => {
          setData(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchPaySlips();
  }, []);

  const columns = [
    {
      dataField: "employee_name",
      text: "Employee name",
      sort: true,
      headerStyle: { width: "350px" },
      formatter: (val, row) => (
        <h2 className="table-avatar">
          <a href="profile.html" className="avatar">
            <img alt="" src={avater} />
          </a>
          <Link to={`/admin/profile-dashboard/${row?.employeeId?._id}`}>
            {row?.employeeId?.first_name} {row?.employeeId?.middle_name}{" "}
            {row?.employeeId?.last_name} <span>{row?.employeeId?.ogid}</span>
          </Link>
        </h2>
      ),
    },
    {
      dataField: "netPay",
      text: "Paid Amount",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => <span>{formatter.format(row?.netPay)}</span>,
    },

    {
      dataField: "month",
      text: "Payment Month",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <span>{moment(row?.createdAt).format("MMMM")}</span>
      ),
    },
    {
      dataField: "year",
      text: "Payment Year",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <span>{moment(row?.createdAt).format("YYYY")}</span>
      ),
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: () => (
        <a href="#" className="btn btn-sm btn-primary">
          PDF
        </a>
      ),
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Payslip Reports</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Payslip Reports</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <LeavesTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
};

export default PayslipReport;
