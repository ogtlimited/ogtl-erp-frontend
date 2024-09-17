import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import moment from "moment";
import helper from "../../services/helper";
import UniversalTable from "../../components/Tables/UniversalTable";
// import AllowanceReversalModal from "./../../components/Modal/AllowanceReversalModal"; // Adjust if needed

const AllowanceSlip = () => {
    const { id, start, end } = useParams();
    const { user, ErrorHandler } = useAppContext();
    const [owner, setOwner] = useState({});
    const [allAllowances, setAllAllowances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRow, setSelectedRow] = useState(null);

    const CurrentUserRoles = user?.employee_info?.roles;
    const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

    const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
        canCreateAndEdit.includes(role)
    );

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

            const resData = res?.data?.data;

            const formattedData = resData.map((item) => {
                return {
                    ...item,
                    allowanceDate: moment(item?.allowance?.date_processed)
                        .utc()
                        .format("YYYY-MM-DD (Do MMM.) - h:mma"),
                    allowanceType: item?.allowance_type[0].title
                        ?.replace(/_/g, " ")
                        ?.replace(/^./, (str) => str.toUpperCase())
                        ?.replace(/\b\w/g, (char) => char.toUpperCase()),

                    allowanceDescription:
                        item?.allowance?.category === "performance"
                            ? item?.allowance_type[0]?.description
                            : item?.allowance?.description ||
                            item?.allowance_type[0]?.description,

                    allowanceCategory: item?.allowance?.category?.replace(
                        /\b\w/g,
                        (char) => char.toUpperCase()
                    ),
                    allowanceStatus: item?.allowance?.status ? "Active" : "Inactive",
                    allowanceAmount: helper.handleMoneyFormat(item?.allowance?.amount)
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
            dataField: "allowanceDate",
            text: "Date Processed",
            sort: true,
            headerStyle: { width: "25%" }
        },
        {
            dataField: "allowanceType",
            text: "Title",
            sort: true,
            headerStyle: { width: "15%" }
        },
        {
            dataField: "allowanceDescription",
            text: "Description",
            sort: true,
            headerStyle: { width: "25%" }
        },
        {
            dataField: "allowanceCategory",
            text: "Category",
            sort: true,
            headerStyle: { width: "10%" }
        },
        {
            dataField: "allowanceAmount",
            text: "Amount",
            sort: true,
            headerStyle: { width: "10%" }
        },
        {
            dataField: "allowanceStatus",
            text: "Status",
            sort: true,
            headerStyle: { width: "10%" },
            formatter: (value, row) => (
                <>
                    {value === "Active" ? (
                        <span className="btn btn-gray btn-sm btn-rounded">
                            <i className="fa fa-dot-circle-o text-success"></i> {value}
                        </span>
                    ) : (
                        <span className="btn btn-gray btn-sm btn-rounded">
                            <i className="fa fa-dot-circle-o text-secondary"></i> {value}
                        </span>
                    )}
                </>
            )
        },
        // CurrentUserCanCreateAndEdit && {
        //   dataField: "",
        //   text: "Action",
        //   headerStyle: { width: "15%" },
        //   formatter: (value, row) => (
        //     <div className="text-center">
        //       {row?.allowanceStatus === "Active" ? (
        //         <div className="leave-user-action-btns">
        //           <button
        //             className="btn btn-sm btn-primary"
        //             data-toggle="modal"
        //             data-target="#AllowanceReversalFormModal"
        //             onClick={() => setSelectedRow(row)}
        //           >
        //             Reverse Allowance
        //           </button>
        //         </div>
        //       ) : null}
        //     </div>
        //   )
        // }
    ];

    return (
        <>
            {allAllowances.length ? (
                <div className="col" style={{ marginBottom: "50px" }}>
                    <h4 className="page-title">
                        {owner?.full_name} |{" "}
                        <span className="payroll_month_indicator">Allowance Breakdown</span>
                    </h4>
                    <ul className="breadcrumb">
                        <li className="">{owner?.ogid}</li>{" "}
                        <span style={{ marginLeft: "10px", marginRight: "10px" }}>|</span>
                        <li className="breadcrumb-item active">{owner?.designation}</li>
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
