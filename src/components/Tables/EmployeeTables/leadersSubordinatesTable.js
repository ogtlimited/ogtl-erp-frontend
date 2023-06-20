/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory from 'react-bootstrap-table2-filter';
import female from '../../../assets/img/female_avatar.png';
import female2 from '../../../assets/img/female_avatar2.png';
import female3 from '../../../assets/img/female_avatar3.png';
import male from '../../../assets/img/male_avater.png';
import male2 from '../../../assets/img/male_avater2.png';
import male3 from '../../../assets/img/male_avater3.png';
import { Link } from 'react-router-dom';
import paginationFactory from 'react-bootstrap-table2-paginator';

const LeadersSubordinatesTable = ({
  data,
  setData,
  loading,
  setLoading,
  context,
}) => {

  const { SearchBar } = Search;
  const males = [male, male2, male3];
  const females = [female, female2, female3];
  const { ExportCSVButton } = CSVExport;
  const [dataToFilter, setDataToFilter] = useState('');;
  const [show, setShow] = React.useState(false);
  const [mobileView, setmobileView] = useState(false);
  const imageUrl = 'https://erp.outsourceglobal.com';

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
    window.addEventListener('resize', () => {
      resizeTable();
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileView]);

  useEffect(() => {
    setDataToFilter(data);
  }, [data]);

  const columns = [
    {
      dataField: 'fullName',
      text: 'Employee Name',
      sort: true,
      headerStyle: { minWidth: '250px' },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <a href="" className="avatar">
            <img
              alt=""
              src={
                row.image
                  ? imageUrl + row.image
                  : row.gender === 'male'
                  ? males[Math.floor(Math.random() * males.length)]
                  : females[Math.floor(Math.random() * females.length)]
              }
            />
          </a>
          <Link to={`/dashboard/user/profile/${row?.ogid}`}>
            {value} <span>{row?.designation}</span>
          </Link>
        </h2>
      ),
    },
    {
      dataField: 'ogid',
      text: 'Employee ID',
      sort: true,
      headerStyle: { minWidth: '150px' },
    },
    {
      dataField: 'office',
      text: 'Office',
      sort: true,
      headerStyle: { minWidth: '150px' },
      formatter: (val, row) => <span>{val?.toUpperCase()}</span>,
    },
    {
      dataField: 'designation',
      text: 'Designation',
      sort: true,
      headerStyle: { minWidth: '150px' },
    },
    {
      dataField: 'email',
      text: 'Company Email',
      sort: true,
      headerStyle: { minWidth: '100px' },
    },
    // {
    //   dataField: '',
    //   text: 'Action',
    //   sort: true,
    //   headerStyle: { minWidth: '100px', textAlign: 'left' },
    //   formatter: (value, row) => (
    //     <>
    //       <div className="text-center">
    //         <div className="leave-user-action-btns">
    //           <button
    //             className="btn btn-sm btn-primary"
    //             data-toggle="modal"
    //             onClick={() => navigate(`/dashboard/hr/all-employees/employee/update/${row._id}`)}
    //           >
    //             Edit
    //           </button>
    //         </div>
    //       </div>
    //     </>
    //   ),
    // },
  ];

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
            <SearchBar
              {...props.searchProps}
              style={{ marginBottom: 15, paddingLeft: '12%', width: '300px' }}
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

export default LeadersSubordinatesTable;
