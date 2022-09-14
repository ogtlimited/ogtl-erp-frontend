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
    onSelectAll: handleOnSelectAll
  };

  // const months = ["Not set","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  
  const [mobileView, setmobileView] = useState(false);
  const [monthlyFilter, setMonthlyFilter] = useState("")
  const [intervieStatusFilter, setIntervieStatusFilter] = useState("")
  const [processingStageFilter, setprocessingStageFilter] = useState("")
  const [dataToFilter, setDataToFilter] = useState("")
  



  // const handleMonthlyFilter = (e)=>{
  //   setMonthlyFilter(e.target.value)
  //   const filterStatus = dataToFilter.map((item)=>item.interview_date)
  //   console.log("DB data", filterStatus)
  //   console.log("value", monthlyFilter)
  // }


  const handleIntervieStatusFilter = (e)=>{
    setIntervieStatusFilter(e.target.value)
    const filteredItems = data.filter((item)=>item.interview_status===e.target.value)
    // console.log("FilterStatus", filteredItems)
    // if(filteredItems.length===0) return
    // setDataToFilter(filteredItems)
    setData(filteredItems)
    setLoading(false)
  }

  const handleProcessingStageFilter = (e)=>{
    setprocessingStageFilter(e.target.value)
    const filteredItems = data.filter((item)=>item.process_stage===e.target.value)
    // if(filteredItems.length===0) return
    // setDataToFilter(filteredItems)
    setData(filteredItems)
    setLoading(false)
  }


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

  useEffect(() => {
    setDataToFilter(data)
    setTimeout(()=>{
      setLoading(true)
    },7000)
  }, [data]);

  // useEffect(() => {
  //   setNewList(dataToFilter)
  // }, [dataToFilter,newList]);

  const imageUrl = "https://erp.outsourceglobal.com";

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

              <ExportCSVButton
                className="float-right btn export-csv"
                {...props.csvProps}
              >
                Export CSV
              </ExportCSVButton>


              <div class="filter">
              {/* <div class="monthly_filter">
                <select 
                onChange={(e) => handleMonthlyFilter(e)}
                >
                <option value="" disabled selected hidden>Filter By Month</option>
                  {months.map((option, idx) => (
                        <option key={idx}>{option}</option>
                      ))}
                </select>
              </div> */}


             
              <div class="interview_status_filter">
                  <select 
                  onChange={(e) => handleIntervieStatusFilter(e)}
                  defaultValue={intervieStatusFilter}
                  >
                     <option value="" disabled selected hidden>Filter By Interview Status</option>
                     <option>All</option>
                    {statusInterview.map((option, idx) => (
                        <option key={idx}>{option.title}</option>
                      ))}
                  </select>
              </div>

              <div class="processing_stage_filter">
                  
                  <select 
                  onChange={(e) => handleProcessingStageFilter(e)}
                  defaultValue={processingStageFilter}
                  >
                    <option value="" disabled selected hidden>Filter By Processing Stage</option>
                    <option>All</option>
                    {processingStage.map((option, idx) => (
                        <option key={idx}>{option.title}</option>
                      ))}
                  </select>
              </div>
              </div>

              <BootstrapTable
                {...props.baseProps}
                bordered={false}
                // selectRow={selectRow}
                filter={filterFactory()}
                headerClasses="header-class"
                classes={
                  !mobileView
                    ? "table "
                    : context
                    ? "table table-responsive"
                    : "table table-responsive"
                }
                noDataIndication={loading ? "Fetching Data..." : "No Records or Check Your Internet Connection"}
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
