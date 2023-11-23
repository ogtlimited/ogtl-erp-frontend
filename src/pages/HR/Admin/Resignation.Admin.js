/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ViewModal from "../../../components/Modal/ViewModal";
import ResignationContent from "../../../components/ModalContents/ResignationContent";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";

const ResignationAdmin = () => {
  const { ErrorHandler } = useAppContext();
  const [data, setData] = useState([]);
  const [modalType, setmodalType] = useState("");
  const [viewRow, setViewRow] = useState(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const fetchResignations = useCallback(async () => {
    try {
      const res = await axiosInstance.get("api/v1/resignations.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: page,
          limit: sizePerPage,
        },
      });

      let resData = res?.data?.data?.resignations;
      let totalPages = res?.data?.data?.total_pages;

      setSizePerPage(sizePerPage);
      setTotalPages(totalPages);

      // const map = resData.map((e) => {
      //   return {
      //     ...e,
      //     fullName: `${e?.employee_id?.first_name} ${e?.employee_id?.last_name}`,
      //     effective_date: new Date(e?.effective_date).toDateString(),
      //   };
      // });

      setData(resData);
      setLoading(false);
    } catch (error) {
      const component = "Employee Resignations | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchResignations();
  }, [fetchResignations]);

  const columns = [
    {
      dataField: "fullName",
      text: "Employee name",
      sort: true,
      headerStyle: { width: "300px" },
    },
    {
      dataField: "effective_date",
      text: "Effective Resignation Date",
      sort: true,
      headerStyle: { width: "250px" },
    },
    {
      dataField: "reason_for_resignation",
      text: "Reason for Resignation",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "status_action",
      text: "Action",
      csvExport: false,
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <div className="dropdown dropdown-action text-right">
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#generalModal"
              onClick={() => {
                setmodalType("view-details");
                setViewRow(row);
              }}
            >
              <i className="fa fa-eye m-r-5"></i> View
            </a>
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
            <h3 className="page-title">Resignations</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item">Exit Management</li>
              <li className="breadcrumb-item active">Resignations</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <UniversalPaginatedTable
          data={data}
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

      {modalType === "view-details" ? (
        <ViewModal
          title="Resignation Details"
          content={<ResignationContent Content={viewRow} />}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ResignationAdmin;
