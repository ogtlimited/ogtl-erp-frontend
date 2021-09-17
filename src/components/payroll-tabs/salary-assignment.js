import moment from "moment";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";

import SalaryAssignmentModal from "../Modal/SalaryAssignmentModal";
import LeavesTable from "../Tables/EmployeeTables/Leaves/LeaveTable";

const SalaryAssignment = ({ salaryStructure }) => {
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);
  const { combineRequest } = useAppContext();
  const [employeeOpts, setEmployeeOpts] = useState([]);

  const fetchSalaryAssignments = (ogid) => {
    axiosInstance
      .get(`/api/salary-structure-assignment?ogId=${ogid}`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error?.response);
      });
  };

  useEffect(() => {
    combineRequest().then((res) => {
      console.log(res);
      const { employees } = res.data.createEmployeeFormSelection;
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
      dataField: "salaryStructureId",
      text: "Salary Structure",
      sort: true,
      headerStyle: { minWidth: "200px" },

      formatter: (val, row) => <p>{row?.salaryStructureId?.title}</p>,
    },
    {
      dataField: "fromDate",
      text: "Assignment Date",
      sort: true,
      headerStyle: { width: "200px" },

      formatter: (val, row) => <p>{moment(row?.fromDate).format("L")}</p>,
    },

    {
      dataField: "",
      text: "",
      headerStyle: { minWidth: "200px" },
      style: {
        fontSize: "12px",
        lineHeight: "16px",
      },
    },
  ];
  return (
    <>
      <div className="tab-pane" id="tab_assignment">
        <div className="text-right mb-4 clearfix">
          <button
            className="btn btn-primary add-btn"
            type="button"
            data-toggle="modal"
            data-target="#SalaryAssignmentModal"
          >
            <i className="fa fa-plus"></i> Add Assignment
          </button>
        </div>
        <div className="col-12 mb-2">
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
      <SalaryAssignmentModal salaryStructure={salaryStructure} />
    </>
  );
};

export default SalaryAssignment;
