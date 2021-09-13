import React, {useState} from 'react'
import { salaryComponentsFormJson } from '../FormJSON/payroll/salary-component';
import FormModal from '../Modal/Modal';
import LeavesTable from '../Tables/EmployeeTables/Leaves/LeaveTable'

const SalaryComponents = ({setformType}) => {
    const handleChange = (type) =>{
        console.log(type)
        setformType(type)
      }
    const [editData, seteditData] = useState({})
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
        <>
            <div className="tab-pane show active" id="tab_components">
          <div className="text-right mb-4 clearfix">
            <button
              className="btn btn-primary add-btn"
              type="button"
              onClick={() => handleChange('components')}
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-plus"></i> Add  Components
            </button>
          </div>

        <LeavesTable data={[]} columns={columns} />
        
           </div>
        </>
    )
}

export default SalaryComponents
