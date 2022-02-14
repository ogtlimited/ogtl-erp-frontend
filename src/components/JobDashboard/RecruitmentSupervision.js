import React, { useEffect, useState } from "react";
import sample from "./recruitment-supervision.json";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import moment from "moment";

const RecruitmentSupervision = () => {
  const [data, setData] = useState([]);
  const fetchJobTasks = () => {
    axiosInstance
      .get("/api/jobApplicant/tasks")
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchJobTasks();
  }, []);

  const columns = [
    {
      dataField: "company_email",
      text: "Employee Name",
      sort: true,
      headerStyle: { minWidth: "200px" },
      formatter: (value, row) => (
        <h2>
          {" "}
          {row?.company_email?.first_name} {row?.company_email?.last_name}
        </h2>
      ),
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
        {/* <div class="card card-table">
          <div class="card-header d-flex justify-content-between">
            <h3 class="card-title mb-1s">Recruitment Supervision Sheet</h3> */}
        {/* <span class=" mb-0">Target: CV Sieving 50 | Phone Screening: 30 | Interview Schedule : 20</span>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-nowrap custom-table mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Employee Name</th>
                    <th>CV Sieving</th>
                    <th>Phone Screening</th>
                    <th>Interview Schedule</th>
                    <th class="text-center">Date</th>

                  </tr>
                  
                  
                </thead>
                <tbody>
                    {sample.map((s, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td>
                            <h2 class="table-avatar">
                                <a href="" class="avatar">
                                <img
                                    alt=""
                                    src="avater.jpg"
                                />
                                </a>
                                <a href="" class="">
                                {s.full_name} <span>HR In House Agent</span>
                                </a>
                            </h2>
                            </td>
                            <td className={s.cv_sieving < 50 ? "text-danger" : s.cv_sieving >= 50 ? "text-success" : ""} >
                            {s.cv_sieving}
                            </td>
                            <td className={s.phone_screening < 30 ? "text-danger" : s.phone_screening >= 30 ? "text-success" : ""}>
                                {s.phone_screening}
                                </td>
                            <td className={s.interview_schedule < 20 ? "text-danger" : s.interview_schedule >= 20 ? "text-success" : ""}>
                                {s.interview_schedule}</td>
                            <td>31 May 2019</td>
                        
                        
                        </tr>

                    ))}
                </tbody>
              </table>
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default RecruitmentSupervision;
