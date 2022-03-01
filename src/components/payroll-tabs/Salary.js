import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import helper from "../../services/helper";
import GeneralUpload from "../Modal/GeneralUpload";

import SalaryAssignmentModal from "../Modal/SalaryAssignmentModal";
import LeavesTable from "../Tables/EmployeeTables/Leaves/LeaveTable";

const Salary = ({ salaryStructure }) => {
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);
  const [toggleModal, settoggleModal] = useState(false);
  const { createPayroll, user } = useAppContext();
  const [employeeOpts, setEmployeeOpts] = useState([]);

  const fetchSalaryAssignments = () => {
    axiosInstance
      .get(`/api/employees-salary`)
      .then((res) => {
        console.log(res)
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error?.response);
      });
  };
  

  useEffect(() => {
    axiosInstance
    .get(`/api/employees-salary`)
    .then((res) => {
      console.log(res)
      setData(res.data.data);
    })
    .catch((error) => {
      console.log(error?.response);
    });
    createPayroll().then((res) => {
      const { employees } = res.data.createPayrollForm;
      const employeeOpts = employees?.map((e) => {
        return {
          label: `${e.first_name} ${e.last_name}`,
          value: e.ogid,
        };
      });
      setEmployeeOpts(employeeOpts);
    });
  }, []);

  const columns = [
    {
      dataField: "employeeId",
      text: "Employee",
      sort: true,
      headerStyle: { minWidth: "300px" },
      formatter: (val, row) => (
        <p>
          {row?.employeeId?.first_name} {row?.employeeId?.last_name}
        </p>
      ),
    },
    {
      dataField: "basic",
      text: "Basic",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,

    },
    {
      dataField: "medical",
      text: "Medical",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "housing",
      text: "Housing",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "transport",
      text: "Transport",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "otherAllowances",
      text: "Other Allowance",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "monthlySalary",
      text: "Monthly Salary",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "",
      text: "Annual Salary",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat((row.monthlySalary * 12).toFixed(2))}</p>
    },
    {
      dataField: "totalRelief",
      text: "Total Relief",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{val} </p>,
    },
    {
      dataField: "monthlyIncomeTax",
      text: "Monthly IncomeTax",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "",
      text: "Action",
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <Link
          className="btn btn-sm btn-primary"
          // to={`/admin/payslip/${row?._id}`}
          to={{
            pathname: `/dashboard/payroll/payslip/${row?.employeeId?._id}`,
            state: { employee: row?.employeeId },
          }}
        >
          Generate Slip
        </Link>
      ),
    }
  ];
  return (
    <>
      <div className="tab-pane show active" id="tab_salaries">
        <div className="text-right mb-4 ">
          {user?.role?.hr?.create && (
            <a
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#uploadAttendance"
              onClick={() => settoggleModal(true)}
            >
              Upload Attendance
            </a>
          )}
        </div>
        <div className="col-5 mb-4">
          <Select
            defaultValue={[]}
            onChange={(val) => fetchSalaryAssignments(val?.value)}
            options={employeeOpts}
            placeholder="Filter Employees"
            isClearable={true}
            style={{ display: "inline-block" }}
            // formatGroupLabel={formatGroupLabel}
          />
        </div>

        <LeavesTable data={data} columns={columns} />
      </div>
      {toggleModal && (
        <GeneralUpload
          settoggleModal={settoggleModal}
          title="Upload Payroll"
          url="/api/employees-salary"
        />

      )}
    </>
  );
};
export default Salary;
