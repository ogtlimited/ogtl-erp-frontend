import React, {useState, useEffect} from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
    Search,
    CSVExport,
  } from "react-bootstrap-table2-toolkit";
  import Select from 'react-select';
  import filterFactory, { textFilter, selectFilter, dateFilter } from "react-bootstrap-table2-filter";
import LeaveApproverBtn from './LeaveApproverBtn';

const LeavesTable = ({data, columns}) => {
  
    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;
    // const [formatted, setformatted] = useState([])
    // const [showClear, setshowClear] = useState(false)
    // const [unfiltered, setunfiltered] = useState([])
    const imageUrl = 'https://erp.outsourceglobal.com'
    // const breadcrumb = "Admin Attendance"
    // const total = []
    // let attendanceDateFilter;
    // const handleClick = (i) => {
    //     console.log(i)
    //     if(i?.value =='All' || i == null){
    //       setformatted(unfiltered)
    //     }else{
    //         console.log(i)
    //         console.log(unfiltered)
    //       const filt = unfiltered.filter(e => i.value.includes(e.designation))
    //       setformatted(filt)
    //     }
    // };
    // const clearFilter = (e) =>{
    //     e.preventDefault();
    //     // attendaceDateFilter('')
    //     setformatted(unfiltered)
    // }
    //     //    console.log(data)
    //      console.log(allAttendance)
    //     useEffect(() => {
    //         const  format = allAttendance.map( e => {
    //            //  console.log(e)
    //          const filt = data?.filter( att => att.employee_name == e.employee_name)
    //        //   console.log(filt)
    //          let user = {
    //              ...e
    //          }
    //          for(let i = 0; i < filt.length; i++){
    //            let current = filt[i]
    //            user.profile_image = current.profile_image
    //            user.employee_id = current.employee_id
    //            user.designation = current.designation
    //            user.department = current.department
    //         //    user.break = current.break
    //         //    user.date = current.date
    //         //    user.over_time = current.over_time
    //         //    user.punch_in_time = current.punch_in_time
    //         //    user.punch_out_time = current.punch_out_time
    //         //    user.total_hours_worked = current.total_hours_worked
               
   
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
        {data &&
        
            <ToolkitProvider keyField="id" data={data} columns={columns} search exportCSV>
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
             
              <ExportCSVButton className="float-right btn export-csv" { ...props.csvProps }>Export CSV</ExportCSVButton>
              
              <BootstrapTable
                {...props.baseProps}
                bordered={false}
                filter={filterFactory()}
                headerClasses="header-class"
                classes="table  w-100"
                noDataIndication="Fetching Data..."
                // defaultSorted={defaultSorted}
              />
              
              
            
          </div>
        )}
      </ToolkitProvider>  
          
        }
        </>
    )
}

export default LeavesTable
