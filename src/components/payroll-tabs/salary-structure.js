import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import { salaryStructureFormJson } from "../FormJSON/payroll/salary-structure";
import LeavesTable from "../Tables/EmployeeTables/Leaves/LeaveTable";

const SalaryStructure = ({ setformType, formValue, submitted }) => {
  const handleChange = (type) => {
    console.log(type);
    setformType(type);
  };
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);
  const { showAlert } = useAppContext();
  const [statusRow, setstatusRow] = useState(null);
  const [status, setStatus] = useState("");

  const fetchSalaryStructures = () => {
    axiosInstance
      .get("/api/salary-structure")
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error?.response);
      });
  };
  useEffect(() => {
    fetchSalaryStructures();
  }, []);

  // localhost:3000/api/salary-component?projectId=6141f0eb636f25b9428409c3

  // useEffect(() => {
  //   axiosInstance
  //     .get("/api/salary-component")
  //     .then((res) => {
  //       console.log("salary component", res);
  //       // const salaryComponentsOpt = res?.data?.data?.map((e) => {
  //       //   return {
  //       //     label: `${e.first_name} ${e.middle_name} ${e.last_name}`,
  //       //     value: e._id,
  //       //   };
  //       // });

  //       // const finalForm = salaryStructureFormJson.Fields.map((field) => {
  //       //   if (field.name === "job_applicant_id") {
  //       //     field.options = salaryComponentsOpt;
  //       //     return field;
  //       //   }
  //       //   return field;
  //       // });
  //       // setTemplate({
  //       //   title: salaryStructureFormJson.title,
  //       //   Fields: finalForm,
  //       // });
  //       // console.log(template);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {
    if (submitted === true) {
      console.log(formValue);
      // axiosInstance
      //   .post("/api/salary-component", formValue)
      //   .then((res) => {
      //     console.log(res);
      //     fetchSalaryStructures();
      //     showAlert(true, "Salary structure created.", "alert alert-success");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     showAlert(true, error?.response?.data?.message, "alert alert-danger");
      //   });
    }
  }, [submitted, formValue]);

  const columns = [
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerStyle: { minWidth: "200px" },
    },
    {
      dataField: "projectId",
      text: "Project",
      sort: true,
      headerStyle: { minWidth: "150px" },

      formatter: (val, row) => (
        <p>{row?.projectId?.project_name || "Not Available"}</p>
      ),
    },
    {
      dataField: "departmentId",
      text: "Department",
      sort: true,
      headerStyle: { minWidth: "150px" },

      formatter: (val, row) => (
        <p>{row?.departmentId?.department || "Not Available"}</p>
      ),
    },
    {
      dataField: "earnings",
      text: "Earnings",
      sort: true,
    },
    {
      dataField: "deductions",
      text: "Deductions",
      sort: true,
    },

    {
      dataField: "status",
      text: "Status",
      sort: true,
    },
    {
      dataField: "netPay",
      text: "Net Pay",
      sort: true,
    },
    {
      dataField: "",
      text: "",

      style: {
        fontSize: "12px",
        lineHeight: "16px",
      },
    },
    // {
    //   dataField: "over_time",
    //   text: "Overtime",
    //   headerStyle: { minWidth: "100px" },
    //   sort: true,
    //   style: {
    //     fontSize: "12px",
    //     lineHeight: "16px",
    //   },
    //},
  ];
  return (
    <>
      <div className="tab-pane" id="tab_structure">
        <div className="text-right mb-4 clearfix">
          <button
            className="btn btn-primary add-btn"
            type="button"
            onClick={() => handleChange("structure")}
            data-toggle="modal"
            data-target="#FormModal"
          >
            <i className="fa fa-plus"></i> Add Structure
          </button>
        </div>
        <LeavesTable data={data} columns={columns} />
        {/* <SalaryStructureModa type={type} /> */}
      </div>
    </>
  );
};

export default SalaryStructure;
