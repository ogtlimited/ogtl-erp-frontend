/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState, useRef } from "react";
import AllowancesTable from "../Tables/AllowancesTable";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import helper from "../../services/helper";
import { AddAllowanceModal } from "../Modal/AddAllowancesModal";

const AllowancesTab = () => {
    const navigate = useNavigate();
    const {
        ErrorHandler,
        user,
        getAvatarColor,
        loadingPayday,
        allowanceFromDate,
        setAllowanceFromDate,
        allowanceToDate,
        setAllowanceToDate,
    } = useAppContext();
    const [allowances, setAllowances] = useState([]); // Refactored from "deductions"
    const [loading, setLoading] = useState(false);

    const allowanceFromDateRef = useRef(allowanceFromDate);
    const allowanceToDateRef = useRef(allowanceToDate);

    useEffect(() => {
        allowanceFromDateRef.current = allowanceFromDate;
    }, [allowanceFromDate]);

    useEffect(() => {
        allowanceToDateRef.current = allowanceToDate;
    }, [allowanceToDate]);

    const CurrentUserRoles = user?.employee_info?.roles;
    const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

    const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
        canCreateAndEdit.includes(role)
    );

    const fetchAllowances = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/api/v1/allowances.json`, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "ngrok-skip-browser-warning": "69420"
                },
                params: {
                    start_date: allowanceFromDate,
                    end_date: allowanceToDate
                }
            });

            const resData = response?.data?.data?.allowances;

            const formattedData = resData.map((item) => {
                return {
                    ...item,
                    employeeName: item?.name || "N/A",
                    employeeId: item?.ogid,
                    office: item?.office,
                    totalAllowances: helper.handleMoneyFormat(item?.total_allowances) || "-" // Adjusted from total_deductions to total_allowances
                };
            });

            setAllowances(formattedData);
            setLoading(false);
        } catch (error) {
            const component = "Allowance Error | ";
            ErrorHandler(error, component);
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allowanceFromDate, allowanceToDate]);

    useEffect(() => {
        fetchAllowances();
    }, [fetchAllowances]);

    const handleViewAllBreakdown = (row) => {
        navigate(
            `/dashboard/payroll/staff-allowances/${row.ogid}/${allowanceFromDateRef.current}/${allowanceToDateRef.current}?employee=${row.employee}`
        );
    };

    const columns = [
        {
            dataField: "employee",
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
        // {
        //     dataField: "employeeId",
        //     text: "OGID",
        //     sort: true,
        //     headerStyle: { width: "15%" },
        //     formatter: (val, row) => <span>{val?.toUpperCase()}</span>
        // },
        
        {
            dataField: "amount", // Updated from totalDeductions to totalAllowances
            text: "Amount",
            sort: true,
            headerStyle: { width: "20%" }
        },
        {
            dataField: "effective_date", // Updated from totalDeductions to totalAllowances
            text: "Effective Date",
            sort: true,
            headerStyle: { width: "25%" }
        },
        CurrentUserCanCreateAndEdit && {
            dataField: "",
            text: "Action",
            headerStyle: { width: "25%" },
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
                            View Allowances
                        </button>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="tab-pane" id="tab_allowances">
            <div style={{ marginBottom: "50px" }}>
                <div className="row">
                    {CurrentUserCanCreateAndEdit && (
                        <div className="col-auto float-right ml-auto">
                            <a
                                href="#"
                                className="btn add-btn m-r-5"
                                data-toggle="modal"
                                data-target="#AddAllowanceModal" // Updated to AddAllowanceModal
                            >
                                Add Allowances
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <div className="row">
                <AllowancesTable // Updated LoansTable to AllowancesTable
                    data={allowances}
                    setData={setAllowances}
                    columns={columns}
                    loading={loading}
                    setLoading={setLoading}
                    fromDate={allowanceFromDate}
                    toDate={allowanceToDate}
                    setFromDate={setAllowanceFromDate}
                    setToDate={setAllowanceToDate}
                    loadingPayday={loadingPayday}
                />
            </div>

            <AddAllowanceModal fetchAllowances={fetchAllowances} />
        </div>
    );
};

export default AllowancesTab;
