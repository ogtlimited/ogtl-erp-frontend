import React, { useEffect, useState } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../services/api";
import moment from "moment";

const RecruitmentSupervision = () => {
  const [data, setData] = useState([]);
  const fetchJobTasks = () => {
    axiosInstance
      .get("/api/jobApplicant/tasks")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    fetchJobTasks();
  }, []);

  const columns = [
    {
      dataField: "company_email",
      text: "Employee Email",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => <h2>{row?.in_house_agent?.company_email}</h2>,
    },
    {
      dataField: "sieving",
      text: "CV Sieving",
      sort: true,
      headerStyle: { minWidth: "200px" },
    },
    {
      dataField: "phone_screening",
      text: "Phone Screening",
      sort: true,
      headerStyle: { minWidth: "200px" },
    },
    {
      dataField: "scheduled_for_interview",
      text: "Interview Schedule",
      sort: true,
      headerStyle: { minWidth: "200px" },
    },
    {
      dataField: "total_assigned_records",
      text: "Total Assigned Records",
      sort: true,
      headerStyle: { minWidth: "200px" },
    },

    {
      dataField: "date",
      text: "Date",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => <h2>{moment(row?.date).format("L")}</h2>,
    },
  ];

  return (
    <div class="row">
      <div class="col-md-12">
        <h3 class="card-title mb-1s">Recruitment Supervision Sheet</h3>
        <LeavesTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default RecruitmentSupervision;
