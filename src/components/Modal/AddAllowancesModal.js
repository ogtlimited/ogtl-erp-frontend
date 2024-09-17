import React, { useState, useEffect, useRef } from "react";
import { HR_ADD_ALLOWANCE, officeTypeOptions } from "../FormJSON/AddAllowance";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import $ from "jquery";
import Select from "react-select";

export const AddAllowanceModal = ({ fetchAllowances }) => {
    const {
        selectDepartments,
        selectCampaigns,
        selectTeams,
        showAlert,
        loadingSelect,
    } = useAppContext();
    const selectAllowanceTypeRef = useRef();
    const [data, setData] = useState(HR_ADD_ALLOWANCE);
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const [isOfficeTypeSelected, setIsOfficeTypeSelected] = useState(false);
    const [isOfficeSelected, setIsOfficeSelected] = useState(false);
    const [officeType, setOfficeType] = useState("");
    const [allEmployees, setAllEmployees] = useState([]);

    // useEffect(() => {
    //     fetchAllowanceTypes();
    // }, [fetchAllowanceTypes]);

    useEffect(() => {
        if (data?.hr_user_id && data?.hr_allowance_title) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [data?.hr_allowance_title, data?.hr_user_id]);

    const cancelEvent = () => {
        setData(HR_ADD_ALLOWANCE);
        setOfficeType("");
        setIsOfficeTypeSelected(false);
        setIsOfficeSelected(false);
        selectAllowanceTypeRef.current.select.clearValue();
    };

    const handleDateChange = (e) => {
        e.preventDefault();
        const selectedDate = e.target.value;

        setData({ ...data, [e.target.name]: selectedDate });
    };

    const handleOfficeTypeChange = (e) => {
        setData({
            ...data,
            operation_office_id: "",
            officeName: "",
            hr_user_id: "",
            employeeName: ""
        });

        setOfficeType(e?.label);
        setIsOfficeTypeSelected(true);
    };

    const handleOfficeChange = (e) => {
        setData({
            ...data,
            operation_office_id: e?.value,
            officeName: e?.label,
            hr_user_id: "",
            employeeName: ""
        });
        setIsOfficeSelected(true);
        fetchAllEmployees(e?.value);
    };

    const fetchAllEmployees = async (officeId) => {
        try {
            if (officeType === "Department") {
                const response = await axiosInstance.get(
                    `/api/v1/departments_employees/${officeId}.json`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "ngrok-skip-browser-warning": "69420"
                        },
                        params: {
                            pages: 1,
                            limit: 1000
                        }
                    }
                );

                const resData = response?.data?.data?.employees;

                const formattedData = resData
                    .map((e) => ({
                        label: e?.name,
                        value: e.ogid
                    }))
                    .sort((a, b) => a.label.localeCompare(b.label));

                setAllEmployees(formattedData);
                setLoading(false);
                return;
            }

            if (officeType === "Campaign") {
                const response = await axiosInstance.get(
                    `/api/v1/campaign_employees/${officeId}.json`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "ngrok-skip-browser-warning": "69420"
                        },
                        params: {
                            pages: 1,
                            limit: 1000
                        }
                    }
                );

                const resData = response?.data?.data?.employees;

                const formattedData = resData
                    .map((e) => ({
                        label: e?.name,
                        value: e.ogid
                    }))
                    .sort((a, b) => a.label.localeCompare(b.label));

                setAllEmployees(formattedData);
                setLoading(false);
                return;
            }

            if (officeType === "Team") {
                const response = await axiosInstance.get(
                    `/api/v1/teams_employees/${officeId}.json`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "ngrok-skip-browser-warning": "69420"
                        },
                        params: {
                            pages: 1,
                            limit: 1000
                        }
                    }
                );

                const resData = response?.data?.data?.employees;

                const formattedData = resData
                    .map((e) => ({
                        label: e?.name,
                        value: e.ogid
                    }))
                    .sort((a, b) => a.label.localeCompare(b.label));

                setAllEmployees(formattedData);
                setLoading(false);
                return;
            }
        } catch (error) {
            console.log("All Employees error:", error);
            setLoading(false);
        }
    };

    const handleAddAllowance = async (e) => {
        e.preventDefault();

        const dataPayload = {
            og_id: data?.hr_user_id,
            allowance_type: data?.hr_allowance_title,
            effective_date: data?.start_date,
            amount: data?.amount,
        };

        setLoading(true);
        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axiosInstance.post("/api/v1/allowances.json", {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "ngrok-skip-browser-warning": "69420"
                },
                payload: {
                    allowances: [
                        dataPayload
                    ]
                }
            });
            showAlert(
                true,
                `${data?.employeeName} has been added to Allowances.`,
                "alert alert-success"
            );
            fetchAllowances();
            cancelEvent();
        } catch (error) {
            showAlert(true, error?.response?.data?.errors, "alert alert-warning");
        } finally {
            $("#AddAllowanceModal").modal("toggle");

            setLoading(false);
        }
    };

    return (
        <>
            <div
                className="modal fade"
                id="AddAllowanceModal"
                tabIndex="-1"
                aria-labelledby="FormModalModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="FormModalLabel">
                                Add Allowance
                            </h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            {!loadingSelect ? (
                                <form onSubmit={handleAddAllowance}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="">Start Date</label>
                                                <input
                                                    type="date"
                                                    name="start_date"
                                                    value={data?.start_date}
                                                    onChange={handleDateChange}
                                                    className="form-control "
                                                    id="dateInput"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="">End Date</label>
                                                <input
                                                    type="date"
                                                    name="end_date"
                                                    value={data?.end_date}
                                                    onChange={handleDateChange}
                                                    className="form-control "
                                                    id="dateInput"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Office Type */}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Office Type</label>
                                                <Select
                                                    options={officeTypeOptions}
                                                    value={{
                                                        label: officeType,
                                                        value: officeType
                                                    }}
                                                    style={{ display: "inline-block" }}
                                                    onChange={(e) => handleOfficeTypeChange(e)}
                                                />
                                            </div>
                                        </div>

                                        {isOfficeTypeSelected && (
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="employee_info.operation_office_id">
                                                        Office
                                                    </label>
                                                    <Select
                                                        options={
                                                            officeType === "Department"
                                                                ? selectDepartments
                                                                : officeType === "Campaign"
                                                                    ? selectCampaigns
                                                                    : selectTeams
                                                        }
                                                        isSearchable={true}
                                                        value={{
                                                            label: data?.officeName,
                                                            value: data?.operation_office_id
                                                        }}
                                                        onChange={(e) => handleOfficeChange(e)}
                                                        style={{ display: "inline-block" }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {isOfficeSelected && (
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="employee_info.operation_office_id">
                                                        Employee
                                                    </label>
                                                    <Select
                                                        isSearchable={true}
                                                        options={allEmployees}
                                                        value={{
                                                            label: data?.employeeName,
                                                            value: data?.hr_user_id
                                                        }}
                                                        onChange={(e) => {
                                                            setData({
                                                                ...data,
                                                                hr_user_id: e?.value,
                                                                employeeName: e?.label
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="hr_allowance_title">
                                                    Allowance Title
                                                </label>
                                                <input
                                                    name="hr_allowance_title"
                                                    type="text"
                                                    placeholder="enter allowance title"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        setData({
                                                            ...data,
                                                            hr_allowance_title: e?.target.value
                                                        })
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="hr_deduction_type_id">
                                                    Allowance Amount
                                                </label>
                                                <input
                                                    name="duration"
                                                    type="number"
                                                    placeholder="Enter Allowance Amount"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        setData({
                                                            ...data,
                                                            amount: e?.target.value
                                                        })
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Allowance Type */}
                                        {/* <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="employee_info.operation_office_id">
                                                    Allowance Type
                                                </label>
                                                <Select
                                                    ref={selectAllowanceTypeRef}
                                                    options={selectAllowanceTypes}
                                                    isSearchable={true}
                                                    value={{
                                                        label: data?.allowance_type,
                                                        value: data?.hr_allowance_type_id
                                                    }}
                                                    onChange={(e) => {
                                                        setData({
                                                            ...data,
                                                            hr_allowance_type_id: e?.value,
                                                            allowance_type: e?.label
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div> */}
                                    </div>

                                    <div className="form-group">
                                        <button
                                            disabled={loading || !isFormValid}
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            {loading ? (
                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm mr-1"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>
                                                    Loading...
                                                </>
                                            ) : (
                                                "Submit"
                                            )}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="d-flex justify-content-center">
                                    <div
                                        className="spinner-border text-secondary"
                                        role="status"
                                    ></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
