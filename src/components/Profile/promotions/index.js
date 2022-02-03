import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../../services/api";
import moment from "moment";

const EmployeePromotions = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPromotion = () => {
      axiosInstance
        .get(`/api/promotion/employee/${id}`)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchPromotion();
  }, [id]);

  const columns = [
    {
      dataField: "employee",
      text: "Employee name",
      sort: true,
      headerStyle: { width: "350px" },
      formatter: (value, row) => (
        <h2>
          {row?.employee?.first_name} {row?.employee?.last_name}
        </h2>
      ),
    },
    {
      dataField: "department",
      text: "Department",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => <h2>{row?.employee?.department?.title}</h2>,
    },
    {
      dataField: "promotion_from",
      text: "Former Designation",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <h2>{row?.employee?.designation?.designation}</h2>
      ),
    },
    {
      dataField: "newDesignation",
      text: "New Designation",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => <h2>{row?.newDesignation?.designation}</h2>,
    },
    {
      dataField: "promotionDate",
      text: "Promotion Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <h2>{moment(row?.promotionDate).format("L")}</h2>
      ),
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">My Promotions</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default EmployeePromotions;
