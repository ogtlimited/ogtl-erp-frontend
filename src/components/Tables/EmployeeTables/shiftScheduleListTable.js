/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';


const ShiftScheduleListTable = ({
  loading,
  data,
  setdata,
  columns,

  page,
  setPage,
  sizePerPage,
  setSizePerPage,
  totalPages,
  setTotalPages,
  searchTerm,
  setSearchTerm,
  setLoading,
  context,
}) => {

  const { SearchBar, ClearSearchButton } = Search;
  const { ExportCSVButton } = CSVExport;
  const [dataToFilter, setDataToFilter] = useState('');
  const [unfiltered, setunfiltered] = useState([]);
  const [show, setShow] = React.useState(false);
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
    setunfiltered(data);
    window.addEventListener('resize', () => {
      resizeTable();
    });
  }, [mobileView]);

  useEffect(() => {
    setDataToFilter(data);
    // setTimeout(() => {
    //   setLoading(true);
    // }, 5000);
  }, [data]);

  const handleChangeSizePerPage = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo((prevState) => ({ ...prevState, [name]: value }));

    setSizePerPage(e.target.value);
    setPage(1);
  };

  // const MySearch = useCallback(
  //   (props) => {
  //     let input;
  //     const handleClick = () => {
  //       setPage(1);
  //       setLoading(true);
  //       props.onSearch(input.value);
  //       const searchTerm = input.value;
  //       setSearchTerm(searchTerm);

  //       if (page === 1) {
  //         axiosInstance
  //           .get('/employees/paginated-employees', {
  //             params: {
  //               search: searchTerm,
  //               page: page,
  //               limit: sizePerPage,
  //             },
  //           })
  //           .then((e) => {
  //             let resData = e?.data?.employees;
  //             let resOptions = e?.data?.pagination;

  //             const thisPageLimit = sizePerPage;
  //             const thisTotalPageSize = resOptions?.numberOfPages;

  //             setSizePerPage(thisPageLimit);
  //             setTotalPages(thisTotalPageSize);

  //             const mapp = resData.map((emp) => {
  //               return {
  //                 ...emp,
  //                 fullName:
  //                   emp.first_name + ' ' + emp.middle_name+ ' ' + emp?.last_name,
  //                 designation_name: emp?.designation?.designation,
  //                 department_name: emp?.department?.department,
  //                 project: emp?.projectId?.project_name,
  //               };
  //             });
  //             setData(mapp);
  //             setunfiltered(mapp);
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //             setLoading(false);
  //           });
  //       }
  //       setLoading(false);
  //     };

  //     return (
  //       <div className="job-app-search">
  //         <input
  //           className="form-control"
  //           style={{
  //             backgroundColor: '#fff',
  //             width: '33.5%',
  //             marginRight: '20px',
  //           }}
  //           ref={(n) => (input = n)}
  //           type="text"
  //         />
  //         <button className="btn btn-primary" onClick={handleClick}>
  //           Search
  //         </button>
  //       </div>
  //     );
  //   },
  //   [departmentFilter, designationFilter, ogidFilter, page, setData, setLoading, setPage, setSearchTerm, setSizePerPage, setTotalPages, sizePerPage, statusFilter]
  // );


  const showNullMessage = () => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
    return <>{show ? "No Data Available" : null}</>;
  };

  return (
    <>
      {data && (
        <ToolkitProvider
          keyField="id"
          data={data}
          columns={columns}
          search
          exportCSV
        >
          {(props) => (
            <div className="col-12">
              <SearchBar
                {...props.searchProps}
                style={{ marginBottom: 15, paddingLeft: '12%' }}
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
                filter={filterFactory()}
                headerClasses="header-class"
                classes={
                  !mobileView
                    ? 'table '
                    : context
                    ? 'table table-responsive'
                    : 'table table-responsive'
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
                pagination={paginationFactory()}
              />
            </div>
          )}
        </ToolkitProvider>
      )}
    </>
  );
};

export default ShiftScheduleListTable;
