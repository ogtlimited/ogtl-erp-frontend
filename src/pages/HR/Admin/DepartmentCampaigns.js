/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import { useParams } from "react-router-dom";
import moment from "moment";

const DepartmentCampaigns = () => {
  const { id } = useParams();
  const { title } = useParams();
  const { ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [departmentCampaigns, setDepartmentCampaigns] = useState([]);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  // All Campaign:
  const fetchAllDepartmentCampaigns = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: "campaign",
          pages: page,
          limit: sizePerPage,
        },
      });
      // console.log("All campaigns.", response?.data);
      const resData = response?.data?.data?.offices;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      const formattedCampaign = resData.map((e, index) => ({
        ...e,
        created_at: moment(e?.created_at).format("Do MMMM, YYYY"),
      }));

      setDepartmentCampaigns(formattedCampaign);
      setLoading(false);
    } catch (error) {
      const component = "Campaign Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchAllDepartmentCampaigns();
  }, [fetchAllDepartmentCampaigns]);

  const columns = [
    {
      dataField: "title",
      text: "Office",
      sort: true,
      headerStyle: { width: "40%" },
      formatter: (val, row) => <span>{val?.toUpperCase()}</span>,
    },
    {
      dataField: "created_at",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "30%" },
    },
    {
      dataField: "leave_approval_level",
      text: "Leave Approval Level",
      sort: true,
      headerStyle: { width: "20%" },
    },
  ];

  return (
    <div className="tab-pane" id="tab_campaigns">
      <div className="row">
        <UniversalPaginatedTable
          columns={columns}
          data={departmentCampaigns}
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
    </div>
  );
};

export default DepartmentCampaigns;
