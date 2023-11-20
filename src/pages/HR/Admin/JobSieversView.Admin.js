// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import { ReassignRepSieverModal } from "../../../components/Modal/ReassignRepSieverModal";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import { AddJobSieverModal } from "../../../components/Modal/AddJobSieverModal";
import ConfirmModal from "../../../components/Modal/ConfirmModal";

const JobSieversViewAdmin = ({
  setIsJobSieverDeactivated,
  isJobSieverActivated,
  setIsJobSieverActivated,
}) => {
  const [allRepSievers, setAllRepSievers] = useState([]);
  const { showAlert, user, ErrorHandler, goToTop, getAvatarColor } =
    useAppContext();
  const [selectedRow, setSelectedRow] = useState(null);
  const [loadingRep, setLoadingRep] = useState(false);

  const [repPage, setRepPage] = useState(1);
  const [repSizePerPage, setRepSizePerPage] = useState(10);
  const [repTotalPages, setRepTotalPages] = useState("");

  const canEdit = ["hr_manager", "senior_hr_associate"];
  const CurrentUserRoles = user?.employee_info?.roles;

  const CurrentUserCanEdit = CurrentUserRoles.some((role) =>
    canEdit.includes(role)
  );

  // Job Sievers:
  const fetchAllRepSievers = useCallback(async () => {
    setLoadingRep(true);
    try {
      const response = await axiosInstance.get(
        "/api/v1/job_applications_sievers.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            page: repPage,
            limit: repSizePerPage,
          },
        }
      );

      const resData = response?.data?.data?.job_application_sievers;
      const totalPages = response?.data?.data?.total_pages;

      setRepSizePerPage(repSizePerPage);
      setRepTotalPages(totalPages);

      setAllRepSievers(resData);
      setLoadingRep(false);
    } catch (error) {
      const component = "All Rep Sievers:";
      ErrorHandler(error, component);
      setLoadingRep(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repPage, repSizePerPage]);

  useEffect(() => {
    if (isJobSieverActivated) {
      fetchAllRepSievers();
    }
    setIsJobSieverActivated(false);
  }, [fetchAllRepSievers, isJobSieverActivated, setIsJobSieverActivated]);

  useEffect(() => {
    fetchAllRepSievers();
  }, [fetchAllRepSievers]);

  //Remove Job Siever
  const handleRemoveJobSiever = async (selectedRow) => {
    const fullName = selectedRow?.full_name;
    const userId = selectedRow?.ogid;

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(
        `/api/v1/remove_rep_sievers/${userId}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      showAlert(
        true,
        fullName + ` has been removed from job sievers`,
        "alert alert-info"
      );

      fetchAllRepSievers();
      setIsJobSieverDeactivated(true);
      goToTop();
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      goToTop();
    }
  };

  const repColumns = [
    {
      dataField: "full_name",
      text: "Employee",
      sort: true,
      headerStyle: { width: "50%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <span
            className="avatar-span"
            style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
          >
            {value?.charAt(0)}
          </span>
          <Link
            to={`/dashboard/recruitment/rep-siever/${row.full_name}/${row.ogid}`}
          >
            {value} <span>{row?.ogid}</span>
          </Link>
        </h2>
      ),
    },
    {
      dataField: "assigned_records",
      text: "Assigned Records",
      sort: true,
      headerStyle: { width: "30%" },
      formatter: (val, row) => <span>{val}</span>,
    },
    CurrentUserCanEdit && {
      dataField: "",
      text: "Action",
      csvExport: false,
      headerStyle: { width: "20%" },
      formatter: (value, row) => (
        <div className="text-center">
          <div className="leave-user-action-btns">
            <button
              className="btn btn-sm btn-primary"
              data-toggle="modal"
              data-target="#ReassignRepSieverFormModal"
              onClick={() => setSelectedRow(row)}
            >
              Reassign
            </button>

            <div className="leave-user-action-btns">
              <button
                className="btn btn-sm btn-danger"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => setSelectedRow(row)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="tab-pane" id="tab_rep-sievers">
      <div style={{ marginBottom: "50px" }}>
        <div className="row">
          {CurrentUserCanEdit && (
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#AddJobSieverModal"
              >
                Add Job Siever
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <UniversalPaginatedTable
          columns={repColumns}
          data={allRepSievers}
          setData={setAllRepSievers}
          loading={loadingRep}
          setLoading={setLoadingRep}
          page={repPage}
          setPage={setRepPage}
          sizePerPage={repSizePerPage}
          setSizePerPage={setRepSizePerPage}
          totalPages={repTotalPages}
          setTotalPages={setRepTotalPages}
        />
      </div>

      <ReassignRepSieverModal
        fetchRepSievers={fetchAllRepSievers}
        selectedRow={selectedRow}
      />

      <AddJobSieverModal fetchJobSievers={fetchAllRepSievers} />

      <ConfirmModal
        title="Job Siever"
        selectedRow={selectedRow}
        deleteFunction={handleRemoveJobSiever}
        message={`Are you sure you want to remove ${selectedRow?.full_name} from job sievers?`}
      />
    </div>
  );
};

export default JobSieversViewAdmin;
