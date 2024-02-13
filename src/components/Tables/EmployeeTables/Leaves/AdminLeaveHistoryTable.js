import React, { useState, useEffect, useCallback } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit";
import usePagination from "../../../../pages/HR/Admin/JobApplicantsPagination.Admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const AdminLeavesHistoryTable = ({
  data,
  setData,
  columns,
  context,
  loading,
  setLoading,

  page,
  setPage,
  sizePerPage,
  setSizePerPage,
  totalPages,
  setTotalPages,
  searchTerm,
  setSearchTerm,
}) => {
  // const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const [show, setShow] = useState(false);
  const [mobileView, setmobileView] = useState(false);
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });

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
    window.addEventListener("resize", () => {
      resizeTable();
    });
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileView]);

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

  // Search Name:
  const MySearch = useCallback(
    (props) => {
      let input;

      const handleKeydown = (e) => {
        setLoading(true);
        if (e.key === "Enter") {
          setPage(1);
          props.onSearch(input.value);
          const searchTerm = input.value;
          setSearchTerm(searchTerm);
        }
        setLoading(false);
      };

      return (
        <div className="custom-search">
          <input
            className="custom-search-input"
            style={{
              backgroundColor: "#f7e3e8",
              width: "33.5%",
              marginRight: "20px",
            }}
            ref={(n) => (input = n)}
            type="search"
            onKeyDown={handleKeydown}
          />
          <button
            className="btn btn-secondary custom-search-btn"
            onClick={() => {
              input.value = "";
              props.onSearch("");
              setSearchTerm("");
              setPage(1);
              setLoading(true);
            }}
          >
            Reset
          </button>
        </div>
      );
    },
    [setLoading, setPage, setSearchTerm]
  );

  const showNullMessage = () => {
    setTimeout(() => {
      setShow(true);
    }, 6000);
    return <>{show ? "No Data Available" : null}</>;
  };

  return (
    <>
      {data && (
        <ToolkitProvider
          keyField="id"
          data={loading ? [] : data}
          columns={columns}
          search
          exportCSV
        >
          {(props) => (
            <div className="col-12">
              <ExportCSVButton
                className="float-right btn export-csv"
                {...props.csvProps}
              >
                Export CSV
              </ExportCSVButton>

              <div className="col-12" style={{ marginTop: 30 }}>
                <MySearch {...props.searchProps} className="inputSearch" />
              </div>

              <div className="custom-table-div">
                <BootstrapTable
                  {...props.baseProps}
                  bordered={false}
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

export default AdminLeavesHistoryTable;
