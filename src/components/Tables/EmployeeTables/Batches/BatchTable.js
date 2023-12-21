/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import usePagination from "../../../../pages/HR/Admin/JobApplicantsPagination.Admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import helper from "../../../../services/helper";
import axiosInstance from "../../../../services/api";
import { useNavigate } from "react-router-dom";
import { RegeneratePayrollModal } from "../../../Modal/RegeneratePayrollModal";
import { useAppContext } from "../../../../Context/AppContext";
import EmployeeSalaryTable from "../EmployeeSalaryTable";
import ShowSalaryTable from "./ShowSalaryTable";
import { ApproveBatchModal } from "../../../Modal/ApproveBatchModal";
import { WhatsApp } from "@material-ui/icons";
import { GeneratePayrollModal } from "../../../Modal/GeneratePayrollModal";
import $ from "jquery";

function BatchTable({
  batchData,
  setBatchData,
  batchColumns,
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

  // fetchEmployeeSalarySlip,
  setGenerating,
  context,
  setBatchId,
  batchId,
}) {
  const { ErrorHandler, showAlert } = useAppContext();
  const [show, setShow] = React.useState(false);
  const [dol, setDol] = useState([]);
  const [mobileView, setmobileView] = useState(false);
  const [showBatchTable, setShowBatchTable] = useState(true);
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });
  const [userId, setUserId] = useState("");

  const resizeTable = () => {
    if (window.innerWidth >= 768) {
      setmobileView(false);
    }
    if (batchColumns.length >= 7) {
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
  const _DATA = usePagination(batchData, sizePerPage, totalPages);

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

  const fetchEmployeeSalarySlip = useCallback(() => {
    setLoading(true);

    axiosInstance
      .get(`/api/v1/salary_slips.json?limit=3&batch_id=${batchId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: page,
          limit: sizePerPage,
        },
      })
      .then((res) => {
        const AllEmployeeSlips = res?.data?.data?.slips;
        const totalPages = res?.data?.data?.pages;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const formattedData = AllEmployeeSlips?.map((e) => ({
          ...e,
          id: e?.slip?.id,
          employee: e?.user?.first_name + " " + e?.user?.last_name,
          ogid: e?.user?.ogid,
          email: e?.user?.email,

          basic: e?.slip?.basic,
          medical: e?.slip?.medical,
          housing: e?.slip?.housing,
          transport: e?.slip?.transport,
          otherAllowances: e?.slip?.other_allowances,
          monthlySalary: e?.slip?.monthly_salary,

          tax: e?.slip?.monthly_income_tax,
          prorate: e?.slip?.prorate,
          pension: e?.slip?.monthly_pension,
          disciplinary_deductions: e?.slip?.disciplinary_deductions,
          totalDeductions: e?.slip?.total_deductions,
          netPay: e?.slip?.net_pay,
        }));

        setDol(formattedData);

        setLoading(false);
      })
      .catch((error) => {
        const component = "Employee Salary Slip Error | ";
        ErrorHandler(error, component);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage, batchId]);

  useEffect(() => {
    fetchEmployeeSalarySlip();
  }, [fetchEmployeeSalarySlip]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await axiosInstance.put(
        `api/v1/approve_batch/${batchId}.json`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      const updatedBatchData = res.data.updatedBatchData; 
      setBatchData(updatedBatchData);
      await fetchEmployeeSalarySlip();

      showAlert(true, "Successfully Approved Batch!", "alert alert-success");

      setLoading(false);
      return "Batch approval successful";
    } catch (error) {
      showAlert(true, error.response.data.errors, "alert alert-warning");

      console.error("Error:", error);
      setLoading(false);
    }
    
  };

  const handleAction = () => {
    setShowBatchTable(false);
  };

  const handleBackToBatchTable = () => {
    setShowBatchTable(true);
  };

  const renderDetailTable = () => {
    const slipcolumns = [
      {
        dataField: "employee",
        text: "Employee",
        idDataField: "ogid",
      },
      {
        dataField: "email",
        text: "Email",
      },
      {
        dataField: "basic",
        text: "Basic",
      },
      {
        dataField: "medical",
        text: "Medical",
      },
      {
        dataField: "housing",
        text: "Housing",
      },
      {
        dataField: "transport",
        text: "Transport",
      },
      {
        dataField: "otherAllowances",
        text: "Other Allowances",
      },
      {
        dataField: "monthlySalary",
        text: "Gross Salary",
      },
      {
        dataField: "tax",
        text: "Tax",
      },
      {
        dataField: "pension",
        text: "Pension",
      },
      {
        dataField: "disciplinary_deductions",
        text: "Disciplinary Deduction",
      },
      {
        dataField: "totalDeductions",
        text: "Total Deductions",
      },
      {
        dataField: "netPay",
        text: "Net Salary",
      },
      {
        dataField: "prorate",
        text: "Prorate",
      },
    ];

    return (
      <div>
        <button
          className="btn btn-primary"
          style={{ margin: "0 0 1rem 1rem" }}
          onClick={handleBackToBatchTable}
        >
          Back to Batch Table
        </button>
        <div className="row">
          <div className="col-md-12">
            <EmployeeSalaryTable
              data={dol}
              setData={setDol}
              loading={loading}
              setLoading={setLoading}
              columns={slipcolumns}
              viewAction={true}
              regenerate={true}
              actionTitle="View"
              page={page}
              setPage={setPage}
              sizePerPage={sizePerPage}
              setSizePerPage={setSizePerPage}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
              fetchEmployeeSalarySlip={fetchEmployeeSalarySlip}
              setGenerating={setGenerating}
            />
          </div>
        </div>

        {/* Button to go back to the batch table */}
      </div>
    );
  };

  const renderTableRows = () => {
    return batchData.map((employee, index) => {
      return (
        <tr className="emp_salary_custom-table-tbody_sub_tr" key={index}>
          {batchColumns.map((column, columnIndex) => (
            <td key={column.dataField}>
              {columnIndex === 0 ? (
                <div className="payroll-table-avatar">
                  <div className="payroll-table-avatar-name">
                    {employee[column.dataField]}{" "}
                    <span> {employee[column.idDataField]}</span>
                  </div>
                </div>
              ) : typeof employee[column.dataField] === "number" ? (
                employee[column.dataField]
              ) : column.dataField === "approved" ? (
                employee[column.dataField] ? (
                  "Yes"
                ) : (
                  "No"
                )
              ) : (
                employee[column.dataField]
              )}
            </td>
          ))}

          {viewAction && (
            <td>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  setBatchId(employee?.id);
                  handleAction();
                }}
              >
                {actionTitle}
              </button>

              <button
                className="btn btn-sm btn-secondary"
                style={{ marginLeft: "20px" }}
                onClick={() => {
                  setBatchId(employee?.id);
                  handleSubmit();
                }}
              >
                Approve Batch
              </button>
            </td>
          )}
        </tr>
      );
    });
  };

  return (
    <>
      {showBatchTable ? (
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
                  <tr className="emp_salary_custom-table-thead_sub_tr">
                    {batchColumns?.map((column) => (
                      <th key={column.dataField}>{column.text}</th>
                    ))}
                    {viewAction && <th>Action</th>}
                  </tr>
                </thead>
                {loading ? (
                  <tr className="emp_salary_custom-table-tbody loading">
                    <td colSpan={batchColumns?.length + 1}>
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
                    {batchData?.length ? (
                      renderTableRows()
                    ) : (
                      <tr className="emp_salary_custom-table-tbody no-data">
                        <td colSpan={batchColumns?.length + 1}>
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
      ) : (
        renderDetailTable()
        // <ShowSalaryTable/>
      )}

      {/* <div className="emp_salary_container col-12">
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
      </div> */}

      <GeneratePayrollModal
        fetchEmployeeSalarySlip={fetchEmployeeSalarySlip}
        setGenerating={setGenerating}
      />

      <RegeneratePayrollModal
        fetchEmployeeSalarySlip={fetchEmployeeSalarySlip}
        setGenerating={setGenerating}
        userId={userId}
      />

      <ApproveBatchModal />
    </>
  );
}

export default BatchTable;
