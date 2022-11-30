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
import { useAppContext } from "../../../Context/AppContext";
// import ToggleTable from '../toggleTable';
// import EditEmployeeModal from '../modals/EditEmployeeModal';
const EmployeesDepartmentTable = ({
  data,
  defaultSorted,
  selectedOption,
  filters,
  seteditData,
  setmode,
  loadForm,
  loading,
}) => {
  const { SearchBar, ClearSearchButton } = Search;
  const males = [male, male2, male3];
  const females = [female, female2, female3];
  const { ExportCSVButton } = CSVExport;
  const [allEmployee, setAllEmployee] = useState([]);
  const [unfiltered, setunfiltered] = useState([]);
  const [mobileView, setmobileView] = useState(false);
  const imageUrl = "https://erp.outsourceglobal.com";
  const { user } = useAppContext();

  useEffect(() => {}, [filters, loadForm]);
  const handleClick = (i, type) => {
    if (i?.value === "All" || i == null) {
      setAllEmployee(unfiltered);
    } else {
      const filt = unfiltered.filter((e) => i.value == e[type]?._id);

      setAllEmployee(filt);
    }
  };
  const handleEdit = (row) => {
    let hash = {};
    seteditData(null);
    for (let d in row) {
      if (typeof row[d] == "object" && row[d] !== null) {
        hash[d] = row[d]._id;
      } else {
        hash[d] = row[d];
      }
    }
    setmode("edit");
    console.log(hash);
    seteditData(hash);
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

  const columns = [
    {
      dataField: "fullName",
      text: "Employee Name",
      sort: true,
      headerStyle: { minWidth: "250px" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <a href="" className="avatar">
            <img
              alt=""
              src={
                row.image
                  ? imageUrl + row.image
                  : row.gender === "male"
                  ? males[Math.floor(Math.random() * males.length)]
                  : females[Math.floor(Math.random() * females.length)]
              }
            />
          </a>
          <Link to={`/dashboard/user/profile/${row._id}`}>
            {value}{" "}
            <span>{row?.designation_name}</span>
          </Link>
        </h2>
      ),
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: { minWidth: "120px" },
      formatter: (value, row) => (
        <>
          {value === "active" ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-online"></span>{" "}
              <span className="ml-4 d-block">{value.toUpperCase()}</span>
            </a>
          ) : value === "left" ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-pending"></span>{" "}
              <span className="ml-4 d-block">{"RESIGNED"}</span>
            </a>
          ) : value === "terminated" ? (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-terminated"></span>{" "}
              <span className="ml-4 d-block">{value.toUpperCase()}</span>
            </a>
          ) : (
            <a href="" className="pos-relative">
              {" "}
              <span className="status-terminated"></span>{" "}
              <span className="ml-4 d-block">{value.toUpperCase()}</span>
            </a>
          )}
        </>
      ),
    },
    {
      dataField: "ogid",
      text: "Employee ID",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "designation_name",
      text: "Designation",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "company_email",
      text: "Company Email",
      sort: true,
      headerStyle: { minWidth: "100px" },
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "70px", textAlign: "left" },
      formatter: (value, row) => (
        <>
          {filters && user?.role?.hr?.update && (
            <div className="dropdown dropdown-action text-right">
              
            <button
                  className="dropdown-item btn-primary"
                  style={{borderRadius: '5px'}}
                  onClick={() => handleEdit(row)}
                  href="#"
                  data-toggle="modal"
                  data-target="#FormModal"
                >
                  <i className="fa fa-pencil m-r-5"></i> Edit
                </button>
              {/* <div className="dropdown-menu dropdown-menu-right">
              </div> */}
            </div>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      {allEmployee && (
        <ToolkitProvider
          keyField="id"
          data={allEmployee}
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
              <div className="d-flex row mb-3">
                {filters &&
                  filters.map((f) => (
                    <div className="col-md-3">
                      <Select
                        defaultValue={selectedOption}
                        onChange={(i) => handleClick(i, f.name)}
                        options={f.options}
                        placeholder={f.placeholder}
                        isClearable={true}
                        style={{ display: "inline-block" }}
                        // formatGroupLabel={formatGroupLabel}
                      />
                    </div>
                  ))}
                <div className="col-md-3 pt-3 float-right">
                  {filters && (
                    <ExportCSVButton
                      className="float-right btn export-csv"
                      {...props.csvProps}
                    >
                      Export CSV
                    </ExportCSVButton>
                  )}
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
                    'No Record Found'
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

export default EmployeesDepartmentTable;
