import React, { useState, useEffect } from "react";
import usePagination from "../../../pages/HR/Admin/JobApplicantsPagination.Admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function EmployeeSalaryTable({
  data,
  setData,
  columns,
  //   loading,
  //   setLoading,

  page,
  setPage,
  sizePerPage,
  setSizePerPage,
  totalPages,
  setTotalPages,
  context,
}) {
  const [loading, setLoading] = useState(false);
  const [dataToFilter, setDataToFilter] = useState("");
  const [show, setShow] = React.useState(false);
  const [mobileView, setmobileView] = useState(false);
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });

  const resizeTable = () => {
    if (window.innerWidth >= 768) {
      setmobileView(false);
    }
    if (columns.length >= 7) {
      setmobileView(true);
    } else if (window.innerWidth <= 768) {
      setmobileView(true);
    }
  };

  useEffect(() => {
    setDataToFilter(data);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [data]);

  // Pagination
  const count = totalPages;
  const _DATA = usePagination(data, sizePerPage, totalPages);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleChangeSizePerPage = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo((prevState) => ({ ...prevState, [name]: value }));

    setSizePerPage(e.target.value);
    setPage(1);
  };

  const showNullMessage = () => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
    return <>{show ? "No Data Available" : null}</>;
  };

  const renderTableRows = () => {
    return data.map((employee, index) => (
      <tr key={index}>
        <td>{employee.basic}</td>
        <td>{employee.housing}</td>
        <td>{employee.transport}</td>
        <td>{employee.salary.monthly_salary}</td>
        <td>{employee.salary.monthly_income_tax}</td>
        <td>{employee.salary.monthly_pension}</td>
        <td>{employee.salary.net_pay}</td>
      </tr>
    ));
  };

  return (
    <div className="emp_salary_container col-12">
      <div
        className="emp_salary_custom-table-div"
        style={{ backgroundColor: "pink" }}
      >
        <table>
          <thead className="emp_salary_custom-table-thead">
            <tr>
              <th colSpan="3">Earnings</th>
              <th className="emp_salary_tr_th exempt"></th>
              <th colSpan="2">Deductions</th>
              <th className="emp_salary_tr_th exempt"></th>
            </tr>
            <tr>
              <th>Basic</th>
              <th>Housing Allowance</th>
              <th>Transport Allowance</th>
              <th>Gross Salary</th>
              <th>Tax</th>
              <th>Pension</th>
              <th>Net Salary</th>
            </tr>
          </thead>
          <tbody className="emp_salary_custom-table-tbody">
            {renderTableRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeSalaryTable;
