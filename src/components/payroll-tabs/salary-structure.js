import React, {useState} from 'react'
import { salaryComponentsFormJson } from '../FormJSON/payroll/salary-component'
import { salaryStructureFormJson } from '../FormJSON/payroll/salary-structure'
import FormModal from '../Modal/Modal'
import SalaryStructureModal from '../Modal/SalaryStructureModal'
import LeavesTable from '../Tables/EmployeeTables/Leaves/LeaveTable'


const SalaryStructure = ({setformType}) => {
    const handleChange = (type) =>{
        console.log(type)
        setformType(type)
      }
      const [type, settype] = useState(null)
    const [editData, seteditData] = useState({})
    const columns = [
        {
            dataField: "earnings",
            text: "Earnings",
            sort: true,
            headerStyle: { width: "200px" },
            style: {
              fontSize: "12px",
              lineHeight: "18px",
            },
            formatter: (val, row) => (
              <p>{val && new Date(val).toLocaleTimeString()}</p>
            ),
          },
        {
          dataField: "deductions",
          text: "Deductions",
          sort: true,
          headerStyle: { minWidth: "200px" },
          style: {
            fontSize: "12px",
            lineHeight: "18px",
          },
          formatter: (val, row) => <p>{new Date(val).toLocaleTimeString()}</p>,
        },
      
        {
            dataField: "status",
            text: "Status",
            sort: true,
            headerStyle: { minWidth: "300px" },
            style: {
              fontSize: "12px",
              lineHeight: "18px",
            },
            formatter: (val, row) => <p>{new Date(val).toLocaleDateString()}</p>,
          },
        {
          dataField: "netPay",
          text: "Net Pay",
          sort: true,
          headerStyle: { width: "300px" },
          style: {
            fontSize: "12px",
            lineHeight: "18px",
          },
        },
        {
          dataField: "",
          text: "",
          headerStyle: { minWidth: "200px" },
          style: {
            fontSize: "12px",
            lineHeight: "16px",
          },
        },
        // {
        //   dataField: "over_time",
        //   text: "Overtime",
        //   headerStyle: { minWidth: "100px" },
        //   sort: true,
        //   style: {
        //     fontSize: "12px",
        //     lineHeight: "16px",
        //   },
        //},
      ];
    return (
       <>
         <div className="tab-pane" id="tab_structure">
        <div className="text-right mb-4 clearfix">
        <div class="dropdown">
  <button class="btn btn-secondary btn-primary add-btn " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  Add Structure
  <i className="fa fa-plus px-1"></i> 
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" onClick={() => settype('Project')}  data-toggle="modal"
            data-target="#SalaryStructureModal" href="">Project</a>
    <a className="dropdown-item" onClick={() => settype('Department')}  data-toggle="modal"
            data-target="#SalaryStructureModal" href="">Department</a>
   
  </div>
</div>
         
        </div>
        <LeavesTable data={[]} columns={columns} />
        <SalaryStructureModal type={type} />
        
        </div>

       </>
    )
}

export default SalaryStructure
