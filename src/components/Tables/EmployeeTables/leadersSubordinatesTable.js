/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";
import { Link } from "react-router-dom";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useAppContext } from "../../../Context/AppContext";

const LeadersSubordinatesTable = ({
  data,
  setData,
  loading,
  setLoading,
  context,
}) => {
  const { getAvatarColor } = useAppContext();
  const { SearchBar } = Search;
  const { ExportCSVButton } = CSVExport;
  const [dataToFilter, setDataToFilter] = useState("");
  const [show, setShow] = React.useState(false);
  const [mobileView, setmobileView] = useState(false);

  const resizeTable = () => {
    if (window.innerWidth >= 768) {
      setmobileView(false);
    }
    if (columns.length >= 5) {
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

  const columns = [
    {
      dataField: "fullName",
      text: "Employee",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <span
            className="avatar-span"
            style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
          >
            {value?.charAt(0)}
          </span>
          <Link to={`/dashboard/user/profile/${row?.ogid}`}>
            {value} <span>{row?.designation}</span>
          </Link>
        </h2>
      ),
    },
    {
      dataField: "ogid",
      text: "OGID",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "office",
      text: "Office",
      sort: true,
      headerStyle: { width: "100%" },
      formatter: (val, row) => <span>{val?.toUpperCase()}</span>,
    },
    {
      dataField: "designation",
      text: "Designation",
      sort: true,
      headerStyle: { width: "100%" },
    },
    {
      dataField: "email",
      text: "Company Email",
      sort: true,
      headerStyle: { width: "100%" },
    },
  ];

  const showNullMessage = () => {
    setTimeout(() => {
      setShow(true);
    }, 10000);
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
              <SearchBar
                {...props.searchProps}
                style={{ marginBottom: 15, paddingLeft: "12%", width: "300px" }}
                className="inputSearch"
              />

              <ExportCSVButton
                className="float-right btn export-csv"
                {...props.csvProps}
              >
                Export CSV
              </ExportCSVButton>

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
                  pagination={paginationFactory()}
                />
              </div>
            </div>
          )}
        </ToolkitProvider>
      )}
    </>
  );
};

export default LeadersSubordinatesTable;
