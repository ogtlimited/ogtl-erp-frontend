/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import Select from "react-select";
import filterFactory, {
  textFilter,
  selectFilter,
  dateFilter,
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import female from "../../../assets/img/female_avatar.png";
import female2 from "../../../assets/img/female_avatar2.png";
import female3 from "../../../assets/img/female_avatar3.png";
import male from "../../../assets/img/male_avater.png";
import male2 from "../../../assets/img/male_avater2.png";
import male3 from "../../../assets/img/male_avater3.png";
import { Link } from "react-router-dom";

const SupervisorAttendanceTable = ({
  data,
  columns,
  loading,
  setLoading,
}) => {
  const { SearchBar, ClearSearchButton } = Search;

  const males = [male, male2, male3];
  const females = [female, female2, female3];
  const [show, setShow] = React.useState(false);
  const { ExportCSVButton } = CSVExport;
  const [allEmployee, setAllEmployee] = useState([]);
  const [editEmployee, seteditEmployee] = useState({});
  const [showClear, setshowClear] = useState(false);
  const [unfiltered, setunfiltered] = useState([]);
  const [mobileView, setmobileView] = useState(false);
  const [departmentsOpt, setDepartmentsOpts] = useState([]);
  const [designationsOpt, setDesignationsOpts] = useState([]);
  const [dataToFilter, setDataToFilter] = useState('');

  useEffect(() => {
    setDataToFilter(data);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [data, setLoading]);

  const handleClick = (i) => {
    if (i?.value === "All" || i === null) {
      setAllEmployee(unfiltered);
    } else {
      const filt = unfiltered.filter((e) =>
        i.value.includes(e.department.department)
      );

      setAllEmployee(filt);
    }
  };

  const handleDesignation = (i) => {
    if (i?.value === "All" || i === null) {
      setAllEmployee(unfiltered);
    } else {
      const filt = unfiltered.filter((e) =>
        i.value.includes(e.designation.designation)
      );

      setAllEmployee(filt);
    }
  };

  const clearFilter = (e) => {
    e.preventDefault();
    // attendaceDateFilter('')
    setAllEmployee(unfiltered);
  };

  useEffect(() => {
    setAllEmployee(data);
    setunfiltered(data);
  }, [data]);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        setmobileView(false);
      } else {
        setmobileView(true);
      }
    });
  }, [mobileView]);

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
                style={{ marginBottom: 15, paddingLeft: "12%", width: "250px"}}
                className="inputSearch"
              />
              <ClearSearchButton className="clear" {...props.searchProps} />
              
                <div className="col-2 mt-3 mr-auto float-right">
                  <ExportCSVButton
                    className="float-right btn export-csv"
                    {...props.csvProps}
                  >
                    Export CSV
                  </ExportCSVButton>
                </div>

              <BootstrapTable
                {...props.baseProps}
                bordered={false}
                filter={filterFactory()}
                headerClasses="header-class"
                classes={!mobileView ? "table" : "table table-responsive"}
                pagination={paginationFactory()}
                noDataIndication={
                  loading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "No Data Found"
                  )
                }
              />
            </div>
          )}
        </ToolkitProvider>
      )}
      {/* <EditEmployeeModal employee={editEmployee} /> */}
    </>
  );
};

export default SupervisorAttendanceTable;
