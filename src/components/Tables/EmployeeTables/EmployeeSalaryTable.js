/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from "react";
import usePagination from "../../../pages/HR/Admin/JobApplicantsPagination.Admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import helper from "../../../services/helper";
import { useNavigate } from "react-router-dom";
import { RegeneratePayrollModal } from "../../Modal/RegeneratePayrollModal";
import { useAppContext } from "../../../Context/AppContext";
import { EditSalarySlipModal } from "../../Modal/EditSalarySlipModal";
import Email from "./../../../pages/In-Apps/Email";

function EmployeeSalaryTable({
  data,
  setData,
  columns,
  loading,
  setLoading,
  viewAction,
  regenerate,
  actionTitle,

  page,
  setPage,
  sizePerPage,
  setSizePerPage,
  totalPages,
  setTotalPages,

  fetchEmployeeSalarySlip,
  fetchPayrollTotals,
  currentApproverEmail,
  currentBatchApprovalStatus,
  context,
}) {
  const navigate = useNavigate();
  const { user, getAvatarColor } = useAppContext();
  const [show, setShow] = useState(false);
  const [mobileView, setmobileView] = useState(false);
  const [selectedSalarySlip, setSelectedSalarySlip] = useState(null);

  const currentUserEmail = user?.employee_info?.email;

  const [info, setInfo] = useState({
    sizePerPage: 10,
  });
  const [userId, setUserId] = useState("");

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
    resizeTable();
    window.addEventListener("resize", () => {
      resizeTable();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileView]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    }, 1000);
    return <>{show ? "No Data Available" : null}</>;
  };

  const handleRegeneratePayroll = (employee) => {
    setUserId(employee?.ogid);
  };

  const handleAction = (action) => {
    navigate(`/dashboard/payroll/payslip/${action?.id}`);
  };

  const handleEdit = (employee) => {
    const formattedData = {
      id: employee?.id,
      employeeName: employee?.employee,
      initialTax: +employee?.tax || null,
      initialPension: +employee?.pension || null,
      initialBasic: +employee?.basic || null,
      initialProrate: employee?.prorate === "Yes" ? true : false,
      // initialSalary: +employee?.monthlySalary || null,
    };

    setSelectedSalarySlip(formattedData);
  };

  // Render Table Rows:
  const renderTableRows = () => {
    return data.map((employee, index) => (
      <tr className="emp_salary_custom-table-tbody_sub_tr" key={index}>
        {columns.map((column, columnIndex) => (
          <td key={column.dataField}>
            {columnIndex === 0 ? (
              <div className="payroll-table-avatar">
                <div
                  className="avatar-span"
                  style={{
                    backgroundColor: getAvatarColor(
                      employee[column.dataField]?.charAt(0)
                    ),
                  }}
                >
                  {employee[column.dataField]?.charAt(0)}
                </div>
                <div className="payroll-table-avatar-name">
                  {employee[column.dataField]}{" "}
                  <span> {employee[column.idDataField]}</span>
                </div>
              </div>
            ) : typeof employee[column.dataField] === "number" ? (
              helper.handleMoneyFormat(employee[column.dataField])
            ) : (
              employee[column.dataField]
            )}
          </td>
        ))}

        {viewAction && (
          <td>
            {regenerate &&
            currentUserEmail === currentApproverEmail &&
            currentBatchApprovalStatus !== "Approved" ? (
              <a
                href="#"
                className="btn btn-sm btn-primary"
                data-toggle="modal"
                data-target="#RegeneratePayrollModal"
                onClick={() => handleRegeneratePayroll(employee)}
                style={{ marginRight: "10px" }}
              >
                Regenerate
              </a>
            ) : null}

            <button
              className="btn btn-sm btn-info"
              onClick={() => handleAction(employee)}
            >
              {actionTitle}
            </button>

            {currentUserEmail === currentApproverEmail &&
            currentBatchApprovalStatus !== "Approved" ? (
              <button
                className="btn btn-sm btn-secondary"
                style={{ marginLeft: "10px" }}
                data-toggle="modal"
                data-target="#EditSalarySlipModal"
                onClick={() => handleEdit(employee)}
              >
                Edit
              </button>
            ) : null}
          </td>
        )}
      </tr>
    ));
  };

  return (
    <>
      <div className="emp_salary_container col-12">
        <div className="emp_salary_custom-table-div">
          <div
            className={`salary-header-class ${
              !mobileView
                ? "table"
                : context
                ? "table table-responsive payslip-table"
                : "table table-responsive payslip-table"
            }`}
          >
            <table className="emp_salary_custom_table custom-table">
              <thead className="emp_salary_custom-table-thead">
                <tr>
                  <th className="emp_salary_tr_th exempt" colSpan="2"></th>
                  <th colSpan="5">Earnings</th>
                  <th className="emp_salary_tr_th exempt"></th>
                  <th colSpan={columns.length <= 12 ? "3" : "5"}>Deductions</th>
                  <th className="emp_salary_tr_th exempt"></th>
                </tr>

                <tr className="emp_salary_custom-table-thead_sub_tr">
                  {columns?.map((column) => (
                    <th key={column.dataField}>{column.text}</th>
                  ))}
                  {viewAction && <th>Action</th>}
                </tr>
              </thead>
              {loading ? (
                <tr className="emp_salary_custom-table-tbody loading">
                  <td colSpan={columns?.length + 1}>
                    <div
                      className="spinner-border text-primary loading"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                <tbody className="emp_salary_custom-table-tbody">
                  {data?.length ? (
                    renderTableRows()
                  ) : (
                    <tr className="emp_salary_custom-table-tbody no-data">
                      <td colSpan={columns?.length + 1}>{showNullMessage()}</td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>

        <select
          className="application-table-sizePerPage"
          name="sizePerPage"
          value={info.sizePerPage}
          onChange={handleChangeSizePerPage}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={3}>30</option>
          <option value={2}>50</option>
        </select>
        <div className="application-table-pagination">
          <Stack className="application-table-pagination-stack">
            <Pagination
              className="job-applicant-pagination"
              count={count}
              page={page}
              boundaryCount={4}
              onChange={handleChange}
              color="primary"
              showFirstButton
              showLastButton
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      </div>

      <RegeneratePayrollModal
        fetchEmployeeSalarySlip={fetchEmployeeSalarySlip}
        userId={userId}
      />

      <EditSalarySlipModal
        fetchEmployeeSalarySlip={fetchEmployeeSalarySlip}
        fetchPayrollTotals={fetchPayrollTotals}
        data={selectedSalarySlip}
      />
    </>
  );
}

export default EmployeeSalaryTable;
