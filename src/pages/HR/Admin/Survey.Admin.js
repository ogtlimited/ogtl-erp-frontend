/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import { BranchForm } from "../../../components/FormJSON/CreateBranch";
import SurveyTable from "../../../components/Tables/SurveyTable";
import { BranchFormModal } from "../../../components/Modal/BranchFormModal";
import moment from "moment";

const SurveyAdmin = () => {
  const navigate = useNavigate();
  const { user, ErrorHandler } = useAppContext();
  const [allSurveys, setAllSurveys] = useState([]);
  const [loading, setLoading] = useState(false);

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  // All Surveys:
  const fetchAllSurveyForms = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get("/api/v1/hr_surveys.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data;

      console.log(resData, "All Survey Forms");

      // const formatted = resData.map((branch, index) => ({
      //   ...branch,
      //   index: index + 1,
      //   title: branch?.title.toUpperCase(),
      //   state: branch?.state,
      //   country: branch?.country,
      //   created_at: moment(branch?.created_at).format("Do MMMM, YYYY"),
      //   value: branch.id,
      // }));

      // setallBranch(formatted);
      setLoading(false);
    } catch (error) {
      const component = "Survey Form Error | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllSurveyForms();
  }, [fetchAllSurveyForms]);

  const columns = [
    {
      dataField: "title",
      text: "Title",
      sort: true,
      headerStyle: { width: "15%" },
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "15%" },
    },
    // CurrentUserCanCreateAndEdit && {
    //   dataField: "",
    //   text: "Action",
    //   headerStyle: { width: "10%" },
    //   formatter: (value, row) => (
    //     <div className="text-center">
    //       <div className="leave-user-action-btns">
    //         <button
    //           className="btn btn-sm btn-primary"
    //           data-toggle="modal"
    //           data-target="#BranchFormModal"
    //           onClick={() => handleEdit(row)}
    //         >
    //           Edit
    //         </button>
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Survey</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Survey</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {CurrentUserCanCreateAndEdit ? (
              <button
                className="btn add-btn"
                onClick={() => navigate("/dashboard/hr/survey/create")}
              >
                <i className="fa fa-plus"></i> Create Survey
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="row  ">
        <SurveyTable
          columns={columns}
          data={allSurveys}
          loading={loading}
          setLoading={setLoading}
          page={page}
          setPage={setPage}
          sizePerPage={sizePerPage}
          setSizePerPage={setSizePerPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
        />
      </div>
    </>
  );
};

export default SurveyAdmin;
