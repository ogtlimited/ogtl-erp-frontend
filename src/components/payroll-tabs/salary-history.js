import moment from "moment";
import React, { useEffect, useState } from "react";
import { selectFilter } from "react-bootstrap-table2-filter";
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
  const [filterObj, setfilterObj] = useState({});
  const [months, setmonths] = useState(
    moment.monthsShort().map((e) => ({
      label: e,
      value: e,
    }))
  );


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

  const handleResponse = (res) => {
    return res.map((e) => ({
      ...e,
      ...e?.salarySlip?.employeeSalary,
      id: e?.employee.ogid,
      employee: e.employee?.first_name + " " + e?.employee?.last_name,
      netPay: e.salarySlip?.netPay,
      ead: e.salarySlip?.salaryAfterDeductions,
      totalDeduction: e?.salarySlip?.totalDeductions,
    }));
  };

  const handleFilter = (key, val) => {
    if(val){
      setfilterObj({
        ...filterObj,
        [key]: val,
      });
      
      console.log(filterObj, key, val)

    }else{
      delete filterObj[key]
      setfilterObj(filterObj)
    }
  };
  const handleSubmitFilter = () =>{
    let dateString = filterObj.month + " " + filterObj.year
    const date =  moment(new Date(new Date(dateString))).startOf("month").format("YYYY-MM-DD")
    const enddate = moment(new Date(new Date(dateString))).endOf("month").format("YYYY-MM-DD")
    const obj = {
      startOfMonth: date,
      endOfMonth: enddate
    }
    if(filterObj.employee ){
      obj['employee'] = filterObj.employee
    }
    const queryString = Object.keys(obj).map(key => key + '=' + obj[key]).join('&');

    axiosInstance
      .get(`/api/payroll-archive?${queryString}`)
      .then((res) => {
        console.log(res.data.data);

        setData(handleResponse(res.data.data));
        setUploadSuccess(false);
      })
      .catch((error) => {
        console.log(error?.response);
      });
  }

  const fetchArchive = () => {
    axiosInstance
      .get(`/api/payroll-archive`)
      .then((res) => {
        console.log(res.data.data);

        setData(handleResponse(res.data.data));
        setUploadSuccess(false);
      })
      .catch((error) => {
        console.log(error?.response);
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`/api/payroll-archive`)
      .then((res) => {
        console.log(res);
        let formatted = handleResponse(res.data.data);
        console.log(formatted);
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
          value: e._id,
        };
      });
      setEmployeeOpts(employeeOpts);
    });
  }, []);
  useEffect(() => {
    if (uploadSuccess) {
      fetchArchive();
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
      headerStyle: { minWidth: "250px" },
    },
    {
      dataField: "paid",
      text: "Status",
      headerStyle: { minWidth: "100px" },
      formatter: (value, row) => (
        <>
          {value === true ? (
            <a href="" className="pos-relative">
              <span className="status-online"></span>{" "}
              <span className="ml-4 d-block">Paid</span>
            </a>
          ) : (
            <a href="" className="pos-relative">
              <span className="status-pending"></span>{" "}
              <span className="ml-4 d-block">{"Processing"}</span>
            </a>
          )}
        </>
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
      dataField: "netPay",
      text: "Net Pay",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    {
      dataField: "ead",
      text: "Earing after Ded.",
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
      dataField: "monthlyIncomeTax",
      text: "Monthly IncomeTax",
      sort: true,
      headerStyle: { minWidth: "100px" },
      formatter: (val, row) => <p>{helper.handleMoneyFormat(val)} </p>,
    },
    // {
    //   dataField: "",
    //   text: "Action",
    //   headerStyle: { minWidth: "150px" },
    //   formatter: (value, row) => (
    //     <Link
    //       className="btn btn-sm btn-primary"
    //       // to={`/admin/payslip/${row?._id}`}
    //       to={{
    //         pathname: `/dashboard/payroll/payslip/${row?.employeeId?._id}`,
    //         state: { employee: row?.employeeId },
    //       }}
    //     >
    //       Generate Slip
    //     </Link>
    //   ),
    // },
  ];
  return (
    <div className="tab-pane" id="tab_archive">
      <div>
        <div className="text-right mb-4 ">
          {selected.length > 0 && (
            <a className="btn add-btn m-r-5" onClick={() => console.log(true)}>
              Apply Bulk payment {}
            </a>
          )}
          {/* {user?.role?.hr?.create && (
            <a
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#uploadAttendance"
              onClick={() => settoggleModal(true)}
            >
              Upload New Salary
            </a>
          )} */}
        </div>
        <div className="row">
          <div className="col-3 mb-4 ml-3">
            <Select
              defaultValue={[]}
              onChange={(e) => handleFilter("employee", e?.value)}
              options={employeeOpts}
              placeholder="Filter Employees"
              isClearable={true}
              style={{ display: "inline-block" }}
              // formatGroupLabel={formatGroupLabel}
            />
          </div>
          <div className="col-4 mb-4">
            <div className="row">
              <div className="col-6">
                <Select
                  defaultValue={[]}
                  onChange={(e) => handleFilter("month", e?.value)}
                  options={months}
                  placeholder="Filter Month"
                  isClearable={true}
                  style={{ display: "inline-block" }}
                  // formatGroupLabel={formatGroupLabel}
                />
              </div>
              <div className="col-6">
                <Select
                  defaultValue={[]}
                  onChange={(e) => handleFilter("year", e?.value)}
                  options={helper.generateArrayOfYears()}
                  placeholder="Filter Year"
                  isClearable={true}
                  style={{ display: "inline-block" }}
                  // formatGroupLabel={formatGroupLabel}
                />
              </div>
            </div>
          </div>
          <div className="col-2 mt-2 mb-1 ml-4">
            {/* <br /> */}
            <button disabled={Object.keys(filterObj).length === 0} className="form-control btn btn-primary add-btn pt-2" onClick={() =>handleSubmitFilter(filterObj)} role="button">
              Filter
            </button>
          </div>
        </div>
      </div>

      <LeavesTable
        data={data}
        columns={columns}
        clickToSelect={true}
        selected={selected}
        handleOnSelect={handleOnSelect}
        handleOnSelectAll={handleOnSelectAll}
      />

      {toggleModal && (
        <GeneralUpload
          settoggleModal={settoggleModal}
          title="Upload Payroll"
          url="/api/employees-salary"
          setUploadSuccess={setUploadSuccess}
        />
      )}
    </div>
  );
};
export default SalaryHistory;
