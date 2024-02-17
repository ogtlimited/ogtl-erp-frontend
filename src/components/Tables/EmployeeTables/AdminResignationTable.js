/* eslint-disable no-unused-vars */
/** @format */

import React, { useState, useEffect, useCallback } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axiosInstance from "../../../services/api";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import filterFactory, {
  textFilter,
  selectFilter,
  dateFilter,
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import usePagination from "../../../pages/HR/Admin/JobApplicantsPagination.Admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const AdminResignationTable = ({
  data,
  setData,
  columns,
  context,
  loading,
  page,
  setPage,
  sizePerPage,
  setSizePerPage,
  totalPages,
  setTotalPages,
  searchTerm,
  setSearchTerm,
  setLoading,
}) => {
  // const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const [dataToFilter, setDataToFilter] = useState("");
  const [mobileView, setmobileView] = useState(false);
  const [unfiltered, setunfiltered] = useState([]);
  const [show, setShow] = React.useState(false);
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });

  const showNullMessage = () => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
    return (
      <>
        {show ? (
          "No Data Available"
        ) : (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </>
    );
  };

  const resizeTable = () => {
    if (window.innerWidth >= 768) {
      setmobileView(false);
    }
    if (columns.length > 8) {
      setmobileView(true);
    } else if (window.innerWidth <= 768) {
      setmobileView(true);
    }
  };

  useEffect(() => {
    resizeTable();
    setunfiltered(data);
    window.addEventListener("resize", () => {
      resizeTable();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileView]);

  useEffect(() => {
    setDataToFilter(data);
  }, [data]);

  const MySearch = useCallback(
    (props) => {
      let input;
      const handleClick = () => {
        setLoading(true);
        setPage(1);
        props.onSearch(input.value);
        const searchTerm = input.value;
        setSearchTerm(searchTerm);

        if (page === 1) {
          axiosInstance
            .get("/Exit/paginated", {
              params: {
                search: searchTerm,
                page: page,
                limit: sizePerPage,
              },
            })
            .then((res) => {
              let resData = res?.data?.data?.employees;
              let resOptions = res?.data?.data?.pagination;

              const thisPageLimit = sizePerPage;
              const thisTotalPageSize = resOptions?.numberOfPages;

              setSizePerPage(thisPageLimit);
              setTotalPages(thisTotalPageSize);

              const map = resData.map((e) => {
                return {
                  ...e,
                  fullName: `${e?.employee_id?.first_name} ${e?.employee_id?.last_name}`,
                  effective_date: new Date(e?.effective_date).toDateString(),
                };
              });

              setData(map);
              setunfiltered(map);
            });
        }
        setLoading(false);
      };

      return (
        <div className="job-app-search">
          <input
            className="form-control"
            style={{
              backgroundColor: "#ffffff",
              width: "33.5%",
              marginRight: "20px",
            }}
            ref={(n) => (input = n)}
            type="text"
          />
          <button className="btn btn-primary" onClick={handleClick}>
            Search
          </button>
        </div>
      );
    },
    [
      page,
      setData,
      setLoading,
      setPage,
      setSearchTerm,
      setSizePerPage,
      setTotalPages,
      sizePerPage,
    ]
  );

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
              <MySearch
                {...props.searchProps}
                style={{ marginBottom: 15, paddingLeft: "12%" }}
                className="inputSearch"
              />

              <ExportCSVButton
                className="float-right btn export-csv"
                {...props.csvProps}
              >
                Export CSV
              </ExportCSVButton>

              <BootstrapTable
                {...props.baseProps}
                bordered={false}
                // selectRow={selectRow}
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
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    showNullMessage()
                  )
                }
              />

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

export default AdminResignationTable;
