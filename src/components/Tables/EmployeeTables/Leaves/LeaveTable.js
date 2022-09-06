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

const LeavesTable = ({
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
  const selectRow = {
    mode: 'checkbox',
    clickToSelect: clickToSelect,
    selected: selected,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll
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
    window.addEventListener("resize", () => {
      resizeTable();
    });
  }, [mobileView]);

  const imageUrl = "https://erp.outsourceglobal.com";

  //          }
  //          total.push(user)
  //         })
  //         // console.log(total)
  //         setunfiltered(total)
  //         setformatted(total)

  //     }, [data, allAttendance])
  // console.log(total)

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

              {/* <ClearSearchButton className="clear" { ...props.searchProps } /> */}
              {/* <Select
              defaultValue={selectedOption}
              onChange ={handleClick}
              options={departments}
              placeholder="Filter Department"
              isClearable={true}
              style={{display:"inline-block"}}
      // formatGroupLabel={formatGroupLabel}
              /> */}

              <ExportCSVButton
                className="float-right btn export-csv"
                {...props.csvProps}
              >
                Export CSV
              </ExportCSVButton>

              <BootstrapTable
                {...props.baseProps}
                bordered={false}
                selectRow={selectRow}
                filter={filterFactory()}
                headerClasses="header-class"
                classes={
                  !mobileView
                    ? "table "
                    : context
                    ? "table table-responsive"
                    : "table table-responsive"
                }
                noDataIndication="No Data..."
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

export default LeavesTable;
