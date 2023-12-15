import React, {useCallback, useEffect, useState} from 'react'
import axiosInstance from "../../../../services/api";
import EmployeeSalaryTable from '../EmployeeSalaryTable';
import { useAppContext } from "../../../../Context/AppContext";


const ShowSalaryTable = ({

  columns,

  viewAction,
  regenerate,
  actionTitle,

  page,
  setPage,
  sizePerPage,
  setSizePerPage,
  totalPages,
  setTotalPages,

  //   fetchEmployeeSalarySlip,
  setGenerating,
  context,

}) => {
  const {  ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [dol, setDol] = useState([]);
  




    // const handleBackToBatchTable = () => {
    //     setShowBatchTable(true);
    //   };
    const fetchEmployeeSalarySlip = useCallback(() => {
        setLoading(true);
        axiosInstance
          .get("/api/v1/salary_slips.json?limit=3&batch_id=7", {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "ngrok-skip-browser-warning": "69420",
            },
            params: {
              page: page,
              limit: sizePerPage,
            },
          })
          .then((res) => {
           
            const AllEmployeeSlips = res?.data?.data?.slips;
            console.log(AllEmployeeSlips, "yy");
            const totalPages = res?.data?.data?.pages;
    
            const thisPageLimit = sizePerPage;
            const thisTotalPageSize = totalPages;
    
            setSizePerPage(thisPageLimit);
            setTotalPages(thisTotalPageSize);
    
            const formattedData = AllEmployeeSlips?.map((e) => ({
              ...e,
              id: e?.slip?.id,
              employee: e?.user?.first_name + " " + e?.user?.last_name,
              ogid: e?.user?.ogid,
              email: e?.user?.email,
    
              basic: e?.slip?.basic,
              medical: e?.slip?.medical,
              housing: e?.slip?.housing,
              transport: e?.slip?.transport,
              otherAllowances: e?.slip?.other_allowances,
              monthlySalary: e?.slip?.monthly_salary,
    
              tax: e?.slip?.monthly_income_tax,
              pension: e?.slip?.monthly_pension,
              disciplinary_deductions: e?.slip?.disciplinary_deductions,
              totalDeductions: e?.slip?.total_deductions,
              netPay: e?.slip?.net_pay,
            }));
            console.log(formattedData,"fo")
            setDol(formattedData);
            
            setLoading(false);
          })
          .catch((error) => {
            const component = "Employee Salary Slip Error | ";
            ErrorHandler(error, component);
            setLoading(false);
          });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [page, sizePerPage]);
    
      useEffect(() => {
        fetchEmployeeSalarySlip();
      }, [fetchEmployeeSalarySlip]);

    const slipcolumns = [
        {
          dataField: "employee",
          text: "Employee",
          idDataField: "ogid",
        },
        {
          dataField: "email",
          text: "Email",
        },
        {
          dataField: "basic",
          text: "Basic",
        },
        {
          dataField: "medical",
          text: "Medical",
        },
        {
          dataField: "housing",
          text: "Housing",
        },
        {
          dataField: "transport",
          text: "Transport",
        },
        {
          dataField: "otherAllowances",
          text: "Other Allowances",
        },
        {
          dataField: "monthlySalary",
          text: "Gross Salary",
        },
        {
          dataField: "tax",
          text: "Tax",
        },
        {
          dataField: "pension",
          text: "Pension",
        },
        {
          dataField: "disciplinary_deductions",
          text: "Disciplinary Deduction",
        },
        {
          dataField: "totalDeductions",
          text: "Total Deductions",
        },
        {
          dataField: "netPay",
          text: "Net Salary",
        },
      ];
  
  return (
    <div>
<div>
        <div className="row">
          <div className="col-md-12">
            <EmployeeSalaryTable
              employeeData={dol}
              setEmployeeData={setDol} 
              loading={loading}
              setLoading={setLoading}
              slipcolumns={slipcolumns}
              viewAction={true}
              regenerate={true}
              actionTitle="View"
              page={page}
              setPage={setPage}
              sizePerPage={sizePerPage}
              setSizePerPage={setSizePerPage}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
              fetchEmployeeSalarySlip={fetchEmployeeSalarySlip}
            //   setGenerating={setGenerating}
            />
          </div>
        </div>

        {/* Button to go back to the batch table */}
        {/* <button onClick={handleBackToBatchTable}>Back to Batch Table</button> */}
      </div>
    </div>
  )
}

export default ShowSalaryTable