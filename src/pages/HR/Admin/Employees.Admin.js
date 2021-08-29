import React, { useState } from 'react'
import PageHeader from '../../../components/Misc/PageHeader'
import EmployeesTable from '../../../components/Tables/EmployeeTables/employeeTable'
import GeneralTable from '../../../components/Tables/Table'

import designation from '../../../db/designation.json'
import { employeeList } from '../../../db/employee'
const AllEmployeesAdmin = () => {
    const breadcrumb = "All Employees"
    const [selectedOption, setSelectedOption] = useState(null);
    const defaultSorted = [
        {
          dataField: "designation",
          order: "desc",
        },
      ];
    return (
        <>
           <PageHeader breadcrumb={breadcrumb} />
           <EmployeesTable
            data={employeeList} 
            departments={designation} 
            defaultSorted={defaultSorted}
            selectedOption={selectedOption}
           />
        </>
    )
}

export default AllEmployeesAdmin
