/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";

import axiosInstance from "../../../services/api";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";

const EmployeeWarningLetters = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchWarningLetter = () => {
      axiosInstance
        .get(`/api/warningLetter/employee/${id}`)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchWarningLetter();
  }, [id]);

  const columns = [
    {
      dataField: "employee_id",
      text: "Employee",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => (
        <h2>
          {row?.employee_id?.first_name} {row?.employee_id?.last_name}
        </h2>
      ),
    },
    {
      dataField: "reason",
      text: "Reason",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => <h2>{ReactHtmlParser(row?.reason)}</h2>,
    },
    {
      dataField: "details",
      text: "Details",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => <h2>{ReactHtmlParser(row?.details)}</h2>,
    },
    {
      dataField: "actions",
      text: "Actions To Take",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => <h2>{ReactHtmlParser(row?.actions)}</h2>,
    },
    {
      dataField: "date_issued",
      text: "Date Issued",
      sort: true,
      formatter: (value, row) => (
        <h2>{moment(row?.date_issued).format("L")}</h2>
      ),
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">My Warning Letter List</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default EmployeeWarningLetters;
