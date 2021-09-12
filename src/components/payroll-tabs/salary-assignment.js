import React, {useState} from 'react'
import { salaryAssignmentFormJson } from '../FormJSON/payroll/salary-assignments'
import FormModal from '../Modal/Modal'
import LeavesTable from '../Tables/EmployeeTables/Leaves/LeaveTable'

const SalaryAssignment = ({setformType}) => {
    const [editData, seteditData] = useState({})
    const handleChange = (type) =>{
        console.log(type)
        setformType(type)
      }
    const columns = [
        {
          dataField: "title",
          text: "Title",
          sort: true,
          headerStyle: { minWidth: "300px" },
          style: {
            fontSize: "12px",
            lineHeight: "18px",
          },
          formatter: (val, row) => <p>{new Date(val).toLocaleDateString()}</p>,
        },
        {
          dataField: "amount",
          text: "Amount",
          sort: true,
          headerStyle: { minWidth: "200px" },
          style: {
            fontSize: "12px",
            lineHeight: "18px",
          },
          formatter: (val, row) => <p>{new Date(val).toLocaleTimeString()}</p>,
        },
        {
          dataField: "type",
          text: "Type",
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
          dataField: "description",
          text: "Description",
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
        <div className="tab-pane" id="tab_assignment">
        <div className="text-right mb-4 clearfix">
          <button
            className="btn btn-primary add-btn"
            type="button"
            onClick={() => handleChange('assignment')}
            data-toggle="modal"
            data-target="#FormModal"
          >
            <i className="fa fa-plus"></i> Add Assignment
          </button>
        </div>

        <LeavesTable data={[]} columns={columns} />
        </div>
    
    )
}

export default SalaryAssignment
