/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import { DesignationFormModal } from "../../../components/Modal/DesignationFormModal";
import { DesignationForm } from "../../../components/FormJSON/CreateDesignation";
import moment from "moment";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";

const Designations = () => {
  const { user, ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [designations, setDesignations] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [mode, setMode] = useState("Create");

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreate = ["hr_manager", "hr_associate"];

  // All Designations:
  const fetchDesignations = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/designations.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          pages: page,
          limit: sizePerPage,
        },
      });
      const resData = response?.data?.data?.designations;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      const formattedDesignation = resData.map((e, index) => ({
        ...e,
        // index: index + 1,
        created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
      }));

      setDesignations(formattedDesignation);
      setLoading(false);
    } catch (error) {
      const component = "Designation Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchDesignations();
  }, [fetchDesignations]);

  const handleCreate = () => {
    setMode("Create");
    setDesignation(DesignationForm);
  };

  const handleEdit = (row) => {
    setDesignation(row);
    setMode("Edit");
  };

  const columns = [
    // {
    //   dataField: "index",
    //   text: "S/N",
    //   sort: true,
    //   headerStyle: { width: "5%" },
    // },
    {
      dataField: "title",
      text: "Designations",
      sort: true,
      headerStyle: { width: "50%" },
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "40%" },
    },
    {
      dataField: "",
      text: "Action",
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            <button
              className="btn btn-sm btn-primary"
              data-toggle="modal"
              data-target="#DesignationFormModal"
              onClick={() => handleEdit(row)}
            >
              Edit
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Designations</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Designations</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {canCreate.includes(...CurrentUserRoles) ? (
              <a
                href="/"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#DesignationFormModal"
                onClick={handleCreate}
              >
                <i className="fa fa-plus"></i> Create Designation
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="row  ">
        <UniversalPaginatedTable
          data={designations}
          columns={columns}
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

      <DesignationFormModal
        mode={mode}
        data={designation}
        fetchDesignations={fetchDesignations}
      />
    </>
  );
};

export default Designations;
