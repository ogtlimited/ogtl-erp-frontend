/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import usePagination from "../../../pages/HR/Admin/JobApplicantsPagination.Admin";
import filterFactory from "react-bootstrap-table2-filter";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";

const LeadersTable = ({
  data,
  setData,
  loading,
  setLoading,

  departments,
  campaigns,

  page,
  setPage,
  sizePerPage,
  setSizePerPage,
  totalPages,
  setTotalPages,

  departmentFilter,
  setDepartmentFilter,
  campaignFilter,
  setCampaignFilter,
  officeFilter,
  setOfficeFilter,

  columns,
  context,
}) => {
  const { user } = useAppContext();
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const [dataToFilter, setDataToFilter] = useState("");
  const [show, setShow] = useState(false);
  const [mobileView, setmobileView] = useState(false);
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });

  const resizeTable = () => {
    if (window.innerWidth >= 768) {
      setmobileView(false);
    }
    if (columns.length >= 7) {
      setmobileView(true);
    } else if (window.innerWidth <= 768) {
      setmobileView(true);
    }
  };

  useEffect(() => {
    resizeTable();
    window.addEventListener("resize", () => {
      resizeTable();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileView]);

  useEffect(() => {
    setDataToFilter(data);
  }, [data]);

  // Pagination
  const count = totalPages;
  const _DATA = usePagination(data, sizePerPage, totalPages);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleChangeSizePerPage = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo((prevState) => ({ ...prevState, [name]: value }));

    setSizePerPage(e.target.value);
    setPage(1);
  };

  const handleDepartmentFilter = (e) => {
    setCampaignFilter("");
    setDepartmentFilter(e.target.value);
    setOfficeFilter(e.target.value);
    setPage(1);
    setLoading(true);

    axiosInstance
      .get("/api/v1/leaders.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },

        params: {
          page: page,
          limit: sizePerPage,
          operation_office_id: e.target.value,
        },
      })
      .then((e) => {
        const resData = e?.data?.data?.employees;
        const totalPages = e?.data?.data?.pages;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const mapp = resData.map((emp) => {
          return {
            ...emp,
            fullName: emp?.full_name,
            office: emp?.office?.office_type,
            officeName: emp?.office?.title,
            designation: emp?.designation,
            company_email: emp?.email,
          };
        });

        setData(mapp);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
  };

  const handleCampaignFilter = (e) => {
    setDepartmentFilter("");
    setCampaignFilter(e.target.value);
    setOfficeFilter(e.target.value);
    setPage(1);
    setLoading(true);

    axiosInstance
      .get("/api/v1/leaders.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },

        params: {
          page: page,
          limit: sizePerPage,
          operation_office_id: e.target.value,
        },
      })
      .then((e) => {
        const resData = e?.data?.data?.employees;
        const totalPages = e?.data?.data?.pages;

        const thisPageLimit = sizePerPage;
        const thisTotalPageSize = totalPages;

        setSizePerPage(thisPageLimit);
        setTotalPages(thisTotalPageSize);

        const mapp = resData.map((emp) => {
          return {
            ...emp,
            fullName: emp?.full_name,
            office: emp?.office?.office_type,
            officeName: emp?.office?.title,
            designation: emp?.designation,
            company_email: emp?.email,
          };
        });

        setData(mapp);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
  };

  const showNullMessage = () => {
    setTimeout(() => {
      setShow(true);
    }, 10000);
    return <>{show ? "No Data Available" : null}</>;
  };

  return (
    <>
      {dataToFilter && (
        <ToolkitProvider
          keyField="id"
          data={dataToFilter}
          columns={columns}
          search
          exportCSV
        >
          {(props) => (
            <div className="col-12">
              <ExportCSVButton
                className="float-right btn export-csv"
                style={{ margin: "15px 0" }}
                {...props.csvProps}
              >
                Export CSV
              </ExportCSVButton>

              {/* <div className="hr-filter-select col-12">
                <div className="col-md-3">
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleDepartmentFilter(e)}
                    defaultValue={departmentFilter}
                    value={departmentFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter by Department
                    </option>
                    {departments.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <select
                    className="leave-filter-control"
                    onChange={(e) => handleCampaignFilter(e)}
                    defaultValue={campaignFilter}
                    value={campaignFilter}
                  >
                    <option value="" disabled selected hidden>
                      Filter by Campaign
                    </option>
                    {campaigns.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div> */}

              <div className="hr-filter-select col-12"></div>

              <div className="custom-table-div">
                <BootstrapTable
                  {...props.baseProps}
                  bordered={false}
                  filter={filterFactory()}
                  headerClasses="header-class"
                  classes={
                    !mobileView
                      ? "table "
                      : context
                      ? "table table-responsive"
                      : "table table-responsive"
                  }
                  noDataIndication={
                    loading ? (
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      showNullMessage()
                    )
                  }
                />
              </div>

              <select
                className="application-table-sizePerPage"
                name="sizePerPage"
                value={info.sizePerPage}
                onChange={handleChangeSizePerPage}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
              <div className="application-table-pagination">
                <Stack className="application-table-pagination-stack">
                  <Pagination
                    className="job-applicant-pagination"
                    count={count}
                    page={page}
                    boundaryCount={4}
                    onChange={handleChange}
                    color="primary"
                    showFirstButton
                    showLastButton
                    variant="outlined"
                    shape="rounded"
                  />
                </Stack>
              </div>
            </div>
          )}
        </ToolkitProvider>
      )}
    </>
  );
};

export default LeadersTable;
