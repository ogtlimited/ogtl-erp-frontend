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

const GeneralTable = ({ data, columns }) => {
  const { SearchBar, ClearSearchButton } = Search;

  const { ExportCSVButton } = CSVExport;
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
                style={{ marginBottom: 15, paddingLeft: "12%" }}
                className="inputSearch"
              />
              <ClearSearchButton className="clear" {...props.searchProps} />

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
                bootstrap4
                headerClasses="header-class"
                classes="table table-responsive"
                pagination={paginationFactory()}
                noDataIndication="Fetching Data"
              />
            </div>
          )}
        </ToolkitProvider>
      )}
    </>
  );
};

export default GeneralTable;
