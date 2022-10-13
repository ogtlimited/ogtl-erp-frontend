
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

const PayrollBatchesTable = ({
  data,
  setData,
  loading,
  setLoading,
  columns,
  context,
  clickToSelect = false,
  selected,
  handleOnSelect,
  handleOnSelectAll,
  statusInterview,
  processingStage
}) => {
  const { SearchBar, ClearSearchButton } = Search;
  const { ExportCSVButton } = CSVExport;
  const selectRow = {
    mode: 'checkbox',
    clickToSelect: clickToSelect,
    selected: selected,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
  };

  // const months = ["Not set","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const [mobileView, setmobileView] = useState(false);
  const [monthlyFilter, setMonthlyFilter] = useState('');
  const [intervieStatusFilter, setIntervieStatusFilter] = useState('');
  const [processingStageFilter, setprocessingStageFilter] = useState('');
  const [dataToFilter, setDataToFilter] = useState('');


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
    window.addEventListener('resize', () => {
      resizeTable();
    });
  }, [mobileView]);

  useEffect(() => {
    setDataToFilter(data);
    setTimeout(() => {
      setLoading(true);
    }, 7000);
  }, [data]);

  // useEffect(() => {
  //   setNewList(dataToFilter)
  // }, [dataToFilter,newList]);

  const imageUrl = 'https://erp.outsourceglobal.com';

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
                style={{ marginBottom: 15, paddingLeft: '12%' }}
                className="inputSearch"
              />

              <ExportCSVButton
                className="float-right btn export-csv"
                {...props.csvProps}
              >
                Export CSV
              </ExportCSVButton>

              <div class="filter">

              </div>

              <BootstrapTable
                {...props.baseProps}
                bordered={false}
                // selectRow={selectRow}
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

                // defaultSorted={defaultSorted}
              />
            </div>
          )}
        </ToolkitProvider>
      )}
    </>
  );
};

export default PayrollBatchesTable;
