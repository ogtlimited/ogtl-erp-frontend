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

const SalaryHistory = ({ salaryStructure }) => {
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);
  const [toggleModal, settoggleModal] = useState(false);
  const [selected, setselected] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { createPayroll, user } = useAppContext();
  const [employeeOpts, setEmployeeOpts] = useState([]);

  const handleOnSelect = (row, isSelect) => {
    console.log(row);
    if (isSelect) {
      const sel = [...selected, row.id];
      setselected(sel);
    } else {
      const sel = selected.filter((x) => x !== row.id);
      setselected(sel);
    }
  };

  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map((r) => r.id);
    if (isSelect) {
      setselected(ids);
    } else {
      setselected([]);
    }
  };

  const fetchSalaryAssignments = () => {
    axiosInstance
      .get(`/api/employees-salary`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setUploadSuccess(false);
      })
      .catch((error) => {
        console.log(error?.response);
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`/api/employees-salary`)
      .then((res) => {
        console.log(res);
        let formatted = res.data.data.map((e) => ({
          ...e,
          id: e.employeeId.ogid,
          employee: e.employeeId?.first_name + " " + e.employeeId?.last_name,
        }));
        setData(formatted);
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
  useEffect(() => {
    if (uploadSuccess) {
      fetchSalaryAssignments();
    }
  }, [uploadSuccess]);

  const columns = [
    {
      dataField: "id",
      text: "Employee ID",
      hidden: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "employee",
      text: "Employee",
      sort: true,
      headerStyle: { minWidth: "300px" },
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
      dataField: "netPay",
      text: "Net Pay",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "",
      text: "Annual Salary",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => (
        <p>{helper.handleMoneyFormat((row.monthlySalary * 12).toFixed(2))}</p>
      ),
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
    },
  ];
  return (
    <>
      <div className="tab-pane show active" id="tab_archive">
        <div className="text-right mb-4 "></div>
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

        <LeavesTable
          data={data}
          columns={columns}
          clickToSelect={true}
          selected={selected}
          handleOnSelect={handleOnSelect}
          handleOnSelectAll={handleOnSelectAll}
        />
      </div>
    </>
  );
};
export default SalaryHistory;
