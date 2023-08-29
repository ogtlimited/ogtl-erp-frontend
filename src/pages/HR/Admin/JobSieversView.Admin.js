// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import female from "../../../assets/img/female_avatar.png";
import female2 from "../../../assets/img/female_avatar2.png";
import female3 from "../../../assets/img/female_avatar3.png";
import male from "../../../assets/img/male_avater.png";
import male2 from "../../../assets/img/male_avater2.png";
import male3 from "../../../assets/img/male_avater3.png";
import { ReassignRepSieverModal } from "../../../components/Modal/ReassignRepSieverModal";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import { AddJobSieverModal } from "../../../components/Modal/AddJobSieverModal";

const JobSieversViewAdmin = () => {
  const [allRepSievers, setAllRepSievers] = useState([]);
  const { user, ErrorHandler } = useAppContext();
  const [selectedRow, setSelectedRow] = useState(null);
  const [loadingRep, setLoadingRep] = useState(false);

  const imageUrl = "https://erp.outsourceglobal.com";
  const males = [male, male2, male3];
  const females = [female, female2, female3];

  const [repPage, setRepPage] = useState(1);
  const [repSizePerPage, setRepSizePerPage] = useState(10);
  const [repTotalPages, setRepTotalPages] = useState("");

  const canEdit = ["hr_manager", "senior_hr_associate"];
  const CurrentUserRoles = user?.employee_info?.roles;

  const CurrentUserCanEdit = CurrentUserRoles.some((role) =>
    canEdit.includes(role)
  );

  // Rep Sievers:
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
    fetchAllRepSievers();
  }, [fetchAllRepSievers]);

  const repColumns = [
    {
      dataField: "full_name",
      text: "Employee Name",
      sort: true,
      headerStyle: { width: "40%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <a href="" className="avatar">
            <img
              alt=""
              src={
                row.image
                  ? imageUrl + row.image
                  : row?.gender === "male"
                  ? males[Math.floor(Math.random() * males.length)]
                  : females[Math.floor(Math.random() * females.length)]
              }
            />
          </a>
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
      formatter: (val, row) => <span>{val || "-"}</span>,
    },
    CurrentUserCanEdit && {
      dataField: "",
      text: "Action",
      csvExport: false,
      headerStyle: { width: "10%" },
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
    </div>
  );
};

export default JobSieversViewAdmin;
