// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from "react";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import { useParams, Link } from "react-router-dom";

const DepartmentEmployees = () => {
  const { id } = useParams();
  const { title } = useParams();
  const { ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [departmentEmployees, setDepartmentEmployees] = useState([]);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  // // All Department Employees:
  // const fetchAllDepartmentEmployees = useCallback(async () => {
  //   try {
  //     const response = await axiosInstance.get("/api/v1/leaders.json", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "ngrok-skip-browser-warning": "69420",
  //       },
  //       params: {
  //         page: page,
  //         limit: sizePerPage,
  //       },
  //     });

  //     const resData = response?.data?.data?.leaders;
  //     const totalPages = response?.data?.data?.total_pages;

  //     const thisPageLimit = sizePerPage;
  //     const thisTotalPageSize = totalPages;

  //     setSizePerPage(thisPageLimit);
  //     setTotalPages(thisTotalPageSize);

  //     const mapp = resData.map((e) => {
  //       return {
  //         ...e,
  //         fullName: e?.first_name + " " + e?.last_name,
  //       };
  //     });

  //     setDepartmentEmployees(mapp);
  //     setLoading(false);
  //   } catch (error) {
  //     const component = "All Leaders:";
  //     ErrorHandler(error, component);
  //     setLoading(false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page, sizePerPage]);

  // useEffect(() => {
  //   fetchAllDepartmentEmployees();
  // }, [fetchAllDepartmentEmployees]);

  const columns = [
    {
      dataField: "fullName",
      text: "Employee Name",
      sort: true,
      headerStyle: { width: "30%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <Link to={`/dashboard/user/profile/${row.ogid}`}>
            {value} <span>{row?.designation}</span>
          </Link>
        </h2>
      ),
    },
    {
      dataField: "ogid",
      text: "Employee ID",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "email",
      text: "Company Email",
      sort: true,
      headerStyle: { width: "20%" },
    },
  ];

  return (
    <div className="tab-pane" id="tab_department_employees">
      <div className="row">
        <UniversalPaginatedTable
          columns={columns}
          data={departmentEmployees}
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

export default DepartmentEmployees;
