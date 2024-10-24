/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState, useRef } from "react";
import LoansTable from "../Tables/LoansTable";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import { AddLoanModal } from "../Modal/AddLoanModal";
import helper from "../../services/helper";
import EmployeeLoanUpload from "../../components/Modal/EmployeeLoanUpload";

const LoansTab = () => {
    const [toggleModal, settoggleModal] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const downloadTemplate = () => {
        const csvContent = "OGID,Amount,Start Date,End Date,Number Of Installment\n"; // CSV header row
    
        const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Employee-Loan-Template.csv");
        document.body.appendChild(link); // Required for Firefox
        link.click();
        document.body.removeChild(link);
      };

    const {
        ErrorHandler,
        user,
        getAvatarColor,
        loadingPayday,
        loanFromDate,
        setLoanFromDate,
        loanToDate,
        setLoanToDate,
    } = useAppContext();
    const [loans, setLoans] = useState([]);  // Renamed from 'deductions' to 'loans'
    const [loading, setLoading] = useState(false);

    const loanFromDateRef = useRef(loanFromDate);
    const loanToDateRef = useRef(loanToDate);

    useEffect(() => {
        loanFromDateRef.current = loanFromDate;
    }, [loanFromDate]);

    useEffect(() => {
        loanToDateRef.current = loanToDate;
    }, [loanToDate]);

    const CurrentUserRoles = user?.employee_info?.roles;
    const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

    const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
        canCreateAndEdit.includes(role)
    );

    const fetchLoans = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/api/v1/loans.json`, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "ngrok-skip-browser-warning": "69420"
                },
                params: {
                    start_date: loanFromDate,
                    end_date: loanToDate
                }
            });

            const resData = response?.data?.data?.loan;

            console.log(response);

            const formattedData = resData.map((item) => {
                const startDate = item?.start_date;
                const endDate = item?.end_date;
                const duration = calculateLoanDuration(startDate, endDate); // Calculate loan duration

                return {
                    ...item,
                    employeeName: item?.name || "N/A",
                    employeeId: item?.ogid,
                    office: item?.office,
                    loan_amount:
                        helper.handleMoneyFormat(item?.amount) || "-",
                    installments: item?.number_of_installment,
                    duration, // Add loan duration to the data
                };
            });

            setLoans(formattedData);
            setLoading(false);
        } catch (error) {
            const component = "Loan Error | ";
            ErrorHandler(error, component);
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loanFromDate, loanToDate]);

    useEffect(() => {
        fetchLoans();
    }, [fetchLoans]);

    // Function to calculate the loan duration in months
    const calculateLoanDuration = (startDate, endDate) => {
        if (!startDate || !endDate) return "-";

        const start = new Date(startDate);
        const end = new Date(endDate);

        const years = end.getFullYear() - start.getFullYear();
        const months = end.getMonth() - start.getMonth() + 1 + years * 12;

        return months > 0 ? `${months} month(s)` : "-";
    };

    const columns = [
        {
            dataField: "employeeName",
            text: "Employee",
            sort: true,
            headerStyle: { width: "25%" },
            formatter: (value, row) => (
                <h2 className="table-avatar">
                    <span
                        className="avatar-span"
                        style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
                    >
                        {value?.charAt(0)}
                    </span>
                    <div>
                        {value} <span>{row?.employeeId}</span>
                    </div>
                </h2>
            )
        },
        {
            dataField: "employeeId",
            text: "OGID",
            sort: true,
            headerStyle: { width: "10%" },
            formatter: (val, row) => <span>{val?.toUpperCase()}</span>
        },
        {
            dataField: "office",
            text: "Office",
            sort: true,
            headerStyle: { width: "20%" },
            formatter: (val, row) => <span>{val?.toUpperCase()}</span>
        },
        {
            dataField: "loan_amount",
            text: "Loan Amount",
            sort: true,
            headerStyle: { width: "10%" }
        },
        {
            dataField: "is_active",
            text: "Status",
            sort: true,
            headerStyle: { width: "5%" }
        },
        {
            dataField: "duration", // Display calculated loan duration
            text: "Loan Duration",
            sort: true,
            headerStyle: { width: "10%" }
        },
        {
            dataField: "start_date",
            text: "Start Date",
            sort: true,
            headerStyle: { width: "10%" },
        },
        {
            dataField: "end_date",
            text: "End Date",
            sort: true,
            headerStyle: { width: "10%" },
        },

    ];

    return (
        <div className="tab-pane" id="tab_loans"> {/* Renamed tab id */}
            <div style={{ marginBottom: "50px",display:'flex', justifyContent:'right' }}>
                <div className="col-auto float-right ml-auto">
                    <a href="#" className="btn add-btn" onClick={downloadTemplate}>
                        <i className="fa fa-download"></i> Download Template
                    </a>
                </div>
                <div className="row">
                    {CurrentUserCanCreateAndEdit && (
                        <div className="col-auto float-right ml-auto">
                            <a
                                href="#"
                                className="btn add-btn m-r-5"
                                data-toggle="modal"
                                data-target="#AddLoanModal"
                            >
                                Add Loans
                            </a>
                        </div>
                    )}
                </div>
                <div className="row">
                    {CurrentUserCanCreateAndEdit && (
                            <div className="col-auto float-right ml-auto">
                                <a
                                    href="#"
                                    className="btn add-btn m-l-15"
                                    data-toggle="modal"
                                    data-target="#EmployeeSalaryUploadModal"
                                    onClick={() => settoggleModal(true)}
                                >
                                    Upload Loans
                                </a>
                            </div>
                        )}
                </div>
            </div>

            <div className="row">
                <LoansTable
                    data={loans}
                    setData={setLoans}
                    columns={columns}
                    loading={loading}
                    setLoading={setLoading}
                    fromDate={loanFromDate}
                    toDate={loanToDate}
                    setFromDate={setLoanFromDate}
                    setToDate={setLoanToDate}
                    loadingPayday={loadingPayday}
                />
            </div>
            {toggleModal && (
        <div>
          <EmployeeLoanUpload
            settoggleModal={settoggleModal}
            title="Upload Loans"
            url="/api/v1/bulk_loans.json"
            uploadSuccess={uploadSuccess}
            setUploadSuccess={setUploadSuccess}
            fetchAllSalaries={fetchLoans}
          />
        </div>
      )}
            <AddLoanModal fetchLoans={fetchLoans} />
        </div>
    );
};

export default LoansTab;
