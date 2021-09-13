import React from 'react'
import LeavesTable from '../../components/Tables/EmployeeTables/Leaves/LeaveTable'
import data from '../../db/payslip.json'
import avater from '../../assets/img/male_avater.png';
const PayslipReport = () => {
    const columns = [
        {
          dataField: "employee_name",
          text: "Employee name",
          sort: true,
          headerStyle: { width: "350px" },
          formatter: (val, row)=>(
            <h2 className="table-avatar">
            <a href="profile.html" className="avatar"><img alt="" src={avater} /></a>
            <a href="profile.html">{val} <span>{row.designation}</span></a>
            </h2>
          )
        },
        {
          dataField: "paid_amount",
          text: "Paid Amount",
          sort: true,
          headerStyle: { minWidth: "150px" },
        },
       
       
        {
          dataField: "month",
          text: "Payment Month",
          sort: true,
          headerStyle: { minWidth: "100px" },
          formatter: (value) =>(
            <span>{new Date(value).getMonth()}</span>
        )
        },
        {
          dataField: "month",
          text: "Payment Year",
          sort: true,
          headerStyle: { minWidth: "100px" },
          formatter: (value) =>(
            <span>{new Date(value).getFullYear()}</span>
        )
        },
        {
          dataField: "",
          text: "Action",
          sort: true,
          headerStyle: { minWidth: "150px" },
          formatter: () =>(
              <a href="#" className="btn btn-sm btn-primary">PDF</a>
          )
        
        },
      ];
    return (
        <>
          <div className="page-header">
<div className="row">
<div className="col-sm-12">
<h3 className="page-title">Payslip Reports</h3>
<ul className="breadcrumb">
<li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
<li className="breadcrumb-item active">Payslip Reports</li>
</ul>
</div>
</div>
</div>  
        <div className="row">
        <div className="col-md-12">
            <LeavesTable
                columns={columns}
                data={data}
            />
        </div>
        </div>
        </>
    )
}

export default PayslipReport
