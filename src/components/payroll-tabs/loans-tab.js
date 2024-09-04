// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState, useRef } from "react";
import LoansTable from "../Tables/LoansTable";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import { AddLoanModal } from "../Modal/AddLoanModal";
import { useNavigate } from "react-router-dom";
import helper from "../../services/helper";

const LoansTab = () => {
    const navigate = useNavigate();
    const {
        ErrorHandler,
        user,
        getAvatarColor,
        loadingPayday,
        deductionFromDate,
        setDeductionFromDate,
        deductionToDate,
        setDeductionToDate,
    } = useAppContext();
    const [deductions, setDeductions] = useState([]);
    const [loading, setLoading] = useState(false);

    const deductionFromDateRef = useRef(deductionFromDate);
    const deductionToDateRef = useRef(deductionToDate);

    useEffect(() => {
        deductionFromDateRef.current = deductionFromDate;
    }, [deductionFromDate]);

    useEffect(() => {
        deductionToDateRef.current = deductionToDate;
    }, [deductionToDate]);

    const CurrentUserRoles = user?.employee_info?.roles;
    const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

    const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
        canCreateAndEdit.includes(role)
    );

    const fetchDeductions = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/api/v1/deductions.json`, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "ngrok-skip-browser-warning": "69420"
                },
                params: {
                    start_date: deductionFromDate,
                    end_date: deductionToDate
                }
            });

            const resData = response?.data?.data?.deductions;

            const formattedData = resData.map((item) => {
                return {
                    ...item,
                    employeeName: item?.name || "N/A",
                    employeeId: item?.ogid,
                    office: item?.office,
                    totalDeductions:
                        helper.handleMoneyFormat(item?.total_deductions) || "-"
                };
            });

            setDeductions(formattedData);
            setLoading(false);
        } catch (error) {
            const component = "Deduction Error | ";
            ErrorHandler(error, component);
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deductionFromDate, deductionToDate]);

    useEffect(() => {
        fetchDeductions();
    }, [fetchDeductions]);

    const handleViewAllBreakdown = (row) => {
        navigate(
            `/dashboard/payroll/staff-loans/${row.ogid}/${deductionFromDateRef.current}/${deductionToDateRef.current}`
        );
    };

    const columns = [
        {
            dataField: "employeeName",
            text: "Employee",
            sort: true,
            headerStyle: { width: "30%" },
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
            headerStyle: { width: "15%" },
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
            dataField: "totalDeductions",// update when integrating with API
            text: "Loan Amount",
            sort: true,
            headerStyle: { width: "20%" }
        },
        CurrentUserCanCreateAndEdit && {
            dataField: "",
            text: "Action",
            headerStyle: { width: "15%" },
            formatter: (value, row) => (
                <div className="text-center">
                    <div className="leave-user-action-btns">
                        <button
                            className="btn btn-sm btn-primary"
                            data-toggle="modal"
                            onClick={() =>
                                handleViewAllBreakdown(row)
                            }
                        >
                            View Loans
                        </button>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="tab-pane" id="tab_deductions">
            <div style={{ marginBottom: "50px" }}>
                <div className="row">
                    {CurrentUserCanCreateAndEdit && (
                        <div className="col-auto float-right ml-auto">
                            <a
                                href="#"
                                className="btn add-btn m-r-5"
                                data-toggle="modal"
                                data-target="#AddDeductionModal"
                            >
                                Add Loans
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <div className="row">
                <LoansTable
                    data={deductions}
                    setData={setDeductions}
                    columns={columns}
                    loading={loading}
                    setLoading={setLoading}
                    fromDate={deductionFromDate}
                    toDate={deductionToDate}
                    setFromDate={setDeductionFromDate}
                    setToDate={setDeductionToDate}
                    loadingPayday={loadingPayday}
                // date={date}
                // setDate={setDate}
                />
            </div>

            <AddLoanModal fetchDeductions={fetchDeductions} />
        </div>
    );
};

export default LoansTab;
