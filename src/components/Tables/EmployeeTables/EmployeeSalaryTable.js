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

function EmployeeSalaryTable({
  employeeData, // Updated prop name
  setEmployeeData,
  slipcolumns,
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
  setGenerating,
  context,
}) {
  const navigate = useNavigate();
  const { user, getAvatarColor } = useAppContext();
  const [show, setShow] = React.useState(false);
  const [mobileView, setmobileView] = useState(false);
  const [selectedSalarySlipId, setSelectedSalarySlipId] = useState(null);

  const [info, setInfo] = useState({
    sizePerPage: 10,
  });
  const [userId, setUserId] = useState("");

  const resizeTable = () => {
    if (window.innerWidth >= 768) {
      setmobileView(false);
    }
    if (slipcolumns?.length >= 7) {
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
  const _DATA = usePagination(employeeData, sizePerPage, totalPages);

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
    setSelectedSalarySlipId(employee?.id);
    console.log("hello");
  };

  console.log(employeeData, "dataa");

  /**
   ** !This is the original code without the avatar:
   * 
   * const renderTableRows = () => {
      return data.map((employee, index) => (
        <tr className="emp_salary_custom-table-tbody_sub_tr" key={index}>
          {slipcolumns.map((column) => (
            <td key={column.dataField}>
              {typeof employee[column.dataField] === "number"
                ? helper.handleMoneyFormat(employee[column.dataField])
                : employee[column.dataField]}
            </td>
          ))}

          {viewAction && (
            <td>
              {regenerate && user?.role?.title !== "CEO" ? (
                <a
                  href="#"
                  className="btn btn-sm btn-primary"
                  data-toggle="modal"
                  data-target="#RegeneratePayrollModal"
                  onClick={() => handleRegeneratePayroll(employee)}
                  style={{ marginRight: "20px" }}
                >
                  Regenerate
                </a>
              ) : null}

              <button
                className="btn btn-sm btn-secondary"
                onClick={() => handleAction(employee)}
              >
                {actionTitle}
              </button>
            </td>
          )}
        </tr>
      ));
    };
  *
  * 
  */

  // * !This is the code with the avatar:
  const renderTableRows = () => {
    return employeeData.map((employee, index) => (
      <tr className="emp_salary_custom-table-tbody_sub_tr" key={index}>
        {slipcolumns.map((column, columnIndex) => (
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
            ) : column.dataField === "prorate" ? (
              employee[column.dataField] ? (
                "True"
              ) : (
                "False"
              )
            ) : (
              employee[column.dataField]
            )}
          </td>
        ))}

        {viewAction && (
          <td>
            {regenerate && user?.role?.title !== "CEO" ? (
              <a
                href="#"
                className="btn btn-sm btn-primary"
                data-toggle="modal"
                data-target="#RegeneratePayrollModal"
                onClick={() => handleRegeneratePayroll(employee)}
                style={{ marginRight: "20px" }}
              >
                Regenerate
              </a>
            ) : null}

            <button
              className="btn btn-sm btn-secondary"
              onClick={() => handleAction(employee)}
            >
              {actionTitle}
            </button>

{/* {employee?.ogid === } */}
            <button
              className="btn btn-sm btn-secondary"
              style={{ marginLeft: "20px" }}
              data-toggle="modal"
              data-target="#EditSalarySlipModal"
              onClick={() => handleEdit(employee)}
            >
              Edit
            </button>
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
                ? "table stable-responsive"
                : "table table-responsive"
            }`}
          >
            <table className="emp_salary_custom_table custom-table">
              <thead className="emp_salary_custom-table-thead">
                <tr>
                  <th className="emp_salary_tr_th exempt" colSpan="2"></th>
                  <th colSpan="5">Earnings</th>
                  <th className="emp_salary_tr_th exempt"></th>
                  <th colSpan={slipcolumns?.length <= 12 ? "3" : "4"}>
                    Deductions
                  </th>
                  <th className="emp_salary_tr_th exempt"></th>
                </tr>

                <tr className="emp_salary_custom-table-thead_sub_tr">
                  {slipcolumns?.map((column) => (
                    <th key={column.dataField}>{column.text}</th>
                  ))}
                  {viewAction && <th>Action</th>}
                </tr>
              </thead>
              {loading ? (
                <tr className="emp_salary_custom-table-tbody loading">
                  <td colSpan={slipcolumns?.length + 1}>
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
                  {employeeData?.length ? (
                    renderTableRows()
                  ) : (
                    <tr className="emp_salary_custom-table-tbody no-data">
                      <td colSpan={slipcolumns?.length + 1}>
                        {showNullMessage()}
                      </td>
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
        setGenerating={setGenerating}
        userId={userId}
      />

      <EditSalarySlipModal
        salarySlipId={selectedSalarySlipId}
        initialSalary={
          employeeData?.find((employee) => employee.id === selectedSalarySlipId)
            ?.monthlySalary || 0
        }
        initialNetPay={
          employeeData?.find((employee) => employee.id === selectedSalarySlipId)
            ?.netPay || 0
        }
        initialProrate={
          employeeData?.find((employee) => employee.id === selectedSalarySlipId)
            ?.prorate || false
        }
      />
    </>
  );
}

export default EmployeeSalaryTable;
