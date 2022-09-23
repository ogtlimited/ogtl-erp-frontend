/* eslint-disable jsx-a11y/anchor-is-valid */
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

const SalaryDetails = ({ salaryStructure }) => {
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [toggleModal, settoggleModal] = useState(false);
  const [selected, setselected] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { createPayroll, user, showAlert, handleProgress, uploadProgress } = useAppContext();
  const [employeeOpts, setEmployeeOpts] = useState([]);
  const [filterObj, setfilterObj] = useState({});
  const [months, setmonths] = useState(
    moment.monthsShort().map((e) => ({
      label: e,
      value: e,
    }))
  );


  const handleOnSelect = (row, isSelect) => {
    // console.log(row);
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
  const handleFilter = (key, val) => {
    if(val){
      setfilterObj({
        ...filterObj,
        [key]: val,
      });
      
      // console.log(filterObj, key, val)

    }else{
      delete filterObj[key]
      setfilterObj(filterObj)
    }
  };
  const handleBulkPayment = () => {
    // console.log(selected);
    let mapData = data.map((d) => {
      return {
        _id: d.id,
        employeeId: d.employeeId,
        paid: selected.includes(d.id) ? true : false,
      };
    });
    // console.log(data);
    // console.log(mapData);
    uploadProgress()
    axiosInstance
      .post(`/api/payroll/uploadPayment`, { slips: mapData })
      .then((res) => {
        setTimeout(() => {
          handleProgress({
            state: false,
            count: 25
          });
          showAlert(true, "uploaded successfully", "alert alert-success");
          
        }, 5000);
        // console.log(res);
        setUploadSuccess(false);
      })
      .catch((error) => {
        // console.log(error?.response);
        handleProgress({
          state: false,
          count: 25
        });
        setTimeout(() => {
          showAlert(true, "failed to uploaded", "alert alert-danger");
          
        }, 5000);
      });
  };

  const fetchSalaryAssignments = () => {
    axiosInstance
      .get(`/api/salary-slip`)
      .then((res) => {
        // console.log(res);
        setData(res.data.data);
        setUploadSuccess(false);
      })
      .catch((error) => {
        console.log(error?.response);
      });
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
        // console.log(res.data.data);

        setData(handleResponse(res.data.data));
        setUploadSuccess(false);
      })
      .catch((error) => {
        console.log(error?.response);
      });
  }
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

  useEffect(() => {
    axiosInstance
      .get(`/api/salary-slip`)
      .then((res) => {
        // console.log(res.data.data[0]);
        let formatted = res.data.data[0].salarySlips.map((e) => ({
          ...e,
          ...e.employeeSalary,
          ogid: e.employeeId.ogid,
          id: e._id,
          employee: e.employeeId?.first_name + " " + e.employeeId?.last_name,

        }));
        setData(formatted);
      })
      .catch((error) => {
        console.log(error?.response);
      });
    // createPayroll().then((res) => {
    //   const { employees } = res.data.createPayrollForm;
    //   const employeeOpts = employees?.map((e) => {
    //     return {
    //       label: `${e.first_name} ${e.last_name}`,
    //       value: e.ogid,
    //     };
    //   });
    //   setEmployeeOpts(employeeOpts);
    // });
  }, []);

  //Debugging
  useEffect(() => {
    axiosInstance
      .get(`/api/employees-salary`)
      .then((res)=>{
        let formatted2 = res.data.data.map((e) => ({
          ...e,
          employeeId:e.employeeId._id,
          ogid: e.employeeId.ogid,
          id: e._id,
          employee: e.employeeId?.first_name + " " + e.employeeId?.last_name,

        }));
        setData2(formatted2);
        console.log({employeeSalary:data2})
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
  }, [data2]);



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
            pathname: `/dashboard/payroll/salary-breakdown/${row?.employeeId}`,
            state: { employee: row?.employeeId },
          }}
        >
          View
        </Link>
      ),
    },
  ];
  return (
    <>
      <div className="tab-pane show active" id="tab_salaries">
        <div className="text-right mb-4 ">
          {selected.length > 0 && (
            <a
              className="btn add-btn m-r-5"
              onClick={() => handleBulkPayment()}
            >
              Apply Bulk payment {}
            </a>
          )}
          {user?.role?.hr?.create && (
            <a
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#uploadAttendance"
              onClick={() => settoggleModal(true)}
            >
              Upload New Salary
            </a>
          )}
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

        <LeavesTable
          data={data2}
          columns={columns}
          clickToSelect={true}
          selected={selected}
          handleOnSelect={handleOnSelect}
          handleOnSelectAll={handleOnSelectAll}
        />
      </div>
      {toggleModal && (
        <GeneralUpload
          settoggleModal={settoggleModal}
          title="Upload Payroll"
          url="/api/employees-salary"
          setUploadSuccess={setUploadSuccess}
        />
      )}
    </>
  );
};
export default SalaryDetails;
