import React, { useCallback, useEffect, useState } from "react";
import { useParams,useSearchParams } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import moment from "moment";
import helper from "../../services/helper";
import UniversalTable from "../../components/Tables/UniversalTable";
// import AllowanceReversalModal from "./../../components/Modal/AllowanceReversalModal"; // Adjust if needed

const AllowanceSlip = () => {
    const { id, start, end } = useParams();
    const [searchParams] = useSearchParams();
    const { user, ErrorHandler, getAvatarColor } = useAppContext();
    const [owner, setOwner] = useState({});
    const [allAllowances, setAllAllowances] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [selectedRow, setSelectedRow] = useState(null);

    // const CurrentUserRoles = user?.employee_info?.roles;
    // const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

    // const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    //     canCreateAndEdit.includes(role)
    // );
    const employee = searchParams.get('employee')?.replace(/['"]/g, "");


    const fetchAllowanceSlip = useCallback(async () => {
        try {
            const res = await axiosInstance.get(`/api/v1/employee_allowances/${id}.json`, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "ngrok-skip-browser-warning": "69420"
                },
                params: {
                    start_date: start,
                    end_date: end
                }
            });

            const resData = res?.data;

            const formattedData = resData.map((item) => {
                return {
                    ...item,
                    employee,
                    ogid: id,
                    effective_date: item.effective_date,
                    amount: item.amount,

                    // allowanceCategory: item?.allowance?.category?.replace(
                    //     /\b\w/g,
                    //     (char) => char.toUpperCase()
                    // ),
                    // allowanceStatus: item?.allowance?.status ? "Active" : "Inactive",
                    // allowanceAmount: helper.handleMoneyFormat(item?.allowance?.amount)
                };
            });

            setAllAllowances(formattedData);

            const owner = resData[0]?.user;
            setOwner(owner);

            setLoading(false);
        } catch (error) {
            const component = "Allowance Breakdown:";
            ErrorHandler(error, component);
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, end, start]);

    useEffect(() => {
        fetchAllowanceSlip();
    }, [fetchAllowanceSlip]);

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
        {
            dataField: "ogid",
            text: "OGID",
            sort: true,
            headerStyle: { width: "25%" }
        },
        {
            dataField: "effective_date",
            text: "Effective Date",
            sort: true,
            headerStyle: { width: "25%" },
        },
        
        {
            dataField: "amount",
            text: "Amount",
            sort: true,
            headerStyle: { width: "10%" }
        }
        
    ];

    return (
        <>
            {allAllowances.length ? (
                <div className="col" style={{ marginBottom: "50px" }}>
                    <h4 className="page-title">
                        {employee} |{" "}
                        <span className="payroll_month_indicator">Allowance Breakdown</span>
                    </h4>
                    <ul className="breadcrumb">
                        <li className="">{id}</li>{" "}
                        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>
                        {/* <li className="breadcrumb-item active">{owner?.designation}</li> */}
                    </ul>
                </div>
            ) : null}

            <div className="row">
                <UniversalTable
                    data={allAllowances}
                    columns={columns}
                    loading={loading}
                    setLoading={setLoading}
                />
            </div>

            {/* <AllowanceReversalModal
        selectedRow={selectedRow}
        fetchAllowances={fetchAllowanceSlip}
      /> */}
        </>
    );
};

export default AllowanceSlip;
