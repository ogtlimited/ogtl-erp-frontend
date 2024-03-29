/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import Select from "react-select";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import female from "../../../assets/img/female_avatar.png";
import female2 from "../../../assets/img/female_avatar2.png";
import female3 from "../../../assets/img/female_avatar3.png";
import male from "../../../assets/img/male_avater.png";
import male2 from "../../../assets/img/male_avater2.png";
import male3 from "../../../assets/img/male_avater3.png";

const AdminAttendanceTable = ({
  data,
  defaultSorted,
  selectedOption,
  departments,
  columns,
  designation,
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
  

  useEffect(() => {
    const departmentOpts = departments.map((e) => {
      return {
        label: e.department,
        value: e._id,
      };
    });
    const designationOpts = designation.map((e) => {
      return {
        label: e.designation,
        value: e._id,
      };
    });
    setDepartmentsOpts(departmentOpts);
    setDesignationsOpts(designationOpts);
  }, [departments, designation]);

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
                style={{ marginBottom: 15, paddingLeft: "12%" }}
                className="inputSearch"
              />
              <ClearSearchButton className="clear" {...props.searchProps} />
              <div className="row mb-3">
                <div className="col-5">
                  <Select
                    defaultValue={selectedOption}
                    onChange={handleClick}
                    options={departmentsOpt}
                    placeholder="Filter Department"
                    isClearable={true}
                    style={{ display: "inline-block" }}
                    // formatGroupLabel={formatGroupLabel}
                  />
                </div>
                <div className="col-5">
                  <Select
                    defaultValue={selectedOption}
                    onChange={handleDesignation}
                    options={designationsOpt}
                    placeholder="Filter Designation"
                    isClearable={true}
                    style={{ display: "inline-block" }}
                    // formatGroupLabel={formatGroupLabel}
                  />
                </div>

                <div className="col-2 mt-3 mr-auto float-right">
                  <ExportCSVButton
                    className="float-right btn export-csv"
                    {...props.csvProps}
                  >
                    Export CSV
                  </ExportCSVButton>
                </div>
              </div>

              <BootstrapTable
                {...props.baseProps}
                bordered={false}
                filter={filterFactory()}
                headerClasses="header-class"
                classes={!mobileView ? "table" : "table table-responsive"}
                defaultSorted={defaultSorted}
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
    </>
  );
};

export default AdminAttendanceTable;
