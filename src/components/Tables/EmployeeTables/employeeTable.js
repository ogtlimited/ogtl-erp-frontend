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
// import ToggleTable from '../toggleTable';
// import EditEmployeeModal from '../modals/EditEmployeeModal';
const EmployeesTable = ({
  data,
  defaultSorted,
  selectedOption,
  departments,
}) => {
  const { SearchBar, ClearSearchButton } = Search;
  const males = [male, male2, male3];
  const females = [female, female2, female3];
  const { ExportCSVButton } = CSVExport;
  const [allEmployee, setAllEmployee] = useState([]);
  const [editEmployee, seteditEmployee] = useState({});
  const [showClear, setshowClear] = useState(false);
  const [unfiltered, setunfiltered] = useState([]);
  const imageUrl = "https://erp.outsourceglobal.com";
  const breadcrumb = "Admin Attendance";
  const total = [];
  let attendanceDateFilter;
  const handleClick = (i) => {
    console.log(i);
    if (i?.value == "All" || i == null) {
      setAllEmployee(unfiltered);
    } else {
      console.log(i);
      console.log(unfiltered);
      const filt = unfiltered.filter((e) => i.value.includes(e.department));
      console.log(filt);
      setAllEmployee(filt);
    }
  };
  const clearFilter = (e) => {
    e.preventDefault();
    // attendaceDateFilter('')
    setAllEmployee(unfiltered);
  };
  //    console.log(data)

        useEffect(() => {
            setAllEmployee(data)
            setunfiltered(data)
        }, [data])
    console.log(total)
    const columns = [
        {
          dataField: "",
          text: "Employee Name",
          sort: true,
          headerStyle: {minWidth: "250px"},
          formatter: (value, row) => (
            <h2 className="table-avatar"><a href="" className="avatar"><img alt=""
          src={ row.image ? imageUrl  + row.image : row.gender == 'Male' ?  males[Math.floor(Math.random() * males.length)] :  females[Math.floor(Math.random() * females.length)]} /></a><Link to="/admin/profile-dashboard">{row.first_name} {row.last_name} <span>{row?.designation?.designation}</span></Link></h2>
          )    ,
          
        },
        {
          dataField: "status",
          text: "Status",
          sort: true,
          headerStyle: {minWidth: "120px"},
          formatter: (value, row) => (
            <>
            {value == 'active' ?
            <a href="" className="pos-relative"> <span className="status-online"></span> <span className="ml-4 d-block">{value}</span></a>
            : value == 'left' ?
             <a href="" className="pos-relative"> <span className="status-pending"></span> <span className="ml-4 d-block">{value}</span></a>
             : value == 'terminated' ?
             <a href="" className="pos-relative"> <span className="status-terminated"></span> <span className="ml-4 d-block">{value}</span></a>
             :
             <a href="" className="pos-relative"> <span className="status-terminated"></span> <span className="ml-4 d-block">{value}</span></a>
            }

            </>
          )    ,
        },
        {
          dataField: "ogid",
          text: "Employee ID",
          sort: true,
          headerStyle: {minWidth: "150px"},
          
        },
        {
          dataField: "department",
          text: "Department",
          sort: true,
          headerStyle: {minWidth: "150px"},
          
        },
        {
          dataField: "designation.designation",
          text: "Designation",
          sort: true,
          headerStyle: {minWidth: "150px"},
          
        },
        {
          dataField: "company_email",
          text: "Company Email",
          sort: true,
          headerStyle: {minWidth: "100px"},
          
          
          
        },
               {
          dataField: "",
          text: "Action",
          sort: true,
          headerStyle: {minWidth: "70px", textAlign:"left"},
          formatter: (value, row) => (
            <div className="dropdown dropdown-action text-right"><a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"
      aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></a>
  <div className="dropdown-menu dropdown-menu-right"><a className="dropdown-item" onClick={() => seteditEmployee(row)} href="#" data-toggle="modal"
          data-target="#edit_employee"><i className="fa fa-pencil m-r-5"></i> Edit</a><a className="dropdown-item" href="#"
          data-toggle="modal" data-target="#delete_employee"><i className="fa fa-download m-r-5"></i> Download Attendance</a></div>
</div>
          )    ,
        },

        
      ];
    return (
        <>
        {allEmployee &&
        
            <ToolkitProvider keyField="id" data={allEmployee} columns={columns} search exportCSV>
        {(props) => (
          <div className="col-12">
            <SearchBar
              {...props.searchProps}
              style={{ marginBottom: 15, paddingLeft: "12%" }}
              className="inputSearch"
            />
          </a>
          <Link to={`/admin/profile-dashboard/${row._id}`}>
            {row.first_name} {row.last_name}{" "}
            <span>{row?.designation?.designation}</span>
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
          {value == "active" ? (
            <a href="" class="pos-relative">
              {" "}
              <span className="status-online"></span>{" "}
              <span className="ml-4 d-block">{value}</span>
            </a>
          ) : value == "left" ? (
            <a href="" class="pos-relative">
              {" "}
              <span className="status-pending"></span>{" "}
              <span className="ml-4 d-block">{value}</span>
            </a>
          ) : value == "terminated" ? (
            <a href="" class="pos-relative">
              {" "}
              <span className="status-terminated"></span>{" "}
              <span className="ml-4 d-block">{value}</span>
            </a>
          ) : (
            <a href="" class="pos-relative">
              {" "}
              <span className="status-terminated"></span>{" "}
              <span className="ml-4 d-block">{value}</span>
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
      dataField: "department",
      text: "Department",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },
    {
      dataField: "designation.designation",
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
        <div class="dropdown dropdown-action text-right">
          <a
            href="#"
            class="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a
              class="dropdown-item"
              onClick={() => seteditEmployee(row)}
              href="#"
              data-toggle="modal"
              data-target="#edit_employee"
            >
              <i class="fa fa-pencil m-r-5"></i> Edit
            </a>
            <a
              class="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#delete_employee"
            >
              <i class="fa fa-download m-r-5"></i> Download Attendance
            </a>
          </div>
        </div>
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
              <Select
                defaultValue={selectedOption}
                onChange={handleClick}
                options={departments}
                placeholder="Filter Department"
                isClearable={true}
                style={{ display: "inline-block" }}
                // formatGroupLabel={formatGroupLabel}
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
                filter={filterFactory()}
                headerClasses="header-class"
                classes="table table-responsive"
                defaultSorted={defaultSorted}
                pagination={paginationFactory()}
                noDataIndication="Fetching Data"
              />
            </div>
          )}
        </ToolkitProvider>
      )}
      {/* <EditEmployeeModal employee={editEmployee} /> */}
    </>
  );
};

export default EmployeesTable;
