/** @format */

import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit';
import filterFactory, {
  textFilter,
  selectFilter,
  dateFilter,
} from 'react-bootstrap-table2-filter';

import paginationFactory from 'react-bootstrap-table2-paginator';

const HrClientsTable = ({
  data,
  columns,
  context,
  clickToSelect = false,
  selected,
  handleOnSelect,
  handleOnSelectAll,
}) => {
  const { SearchBar, ClearSearchButton } = Search;
  const { ExportCSVButton } = CSVExport;
  const [loading, setLoading] = useState(true);
  const selectRow = {
    mode: 'checkbox',
    clickToSelect: clickToSelect,
    selected: selected,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
  };
  const [mobileView, setmobileView] = useState(false);
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
    setLoading(true);
    window.addEventListener('resize', () => {
      resizeTable();
    });
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, [mobileView]);

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
                    'No Record Found'
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

export default HrClientsTable;
