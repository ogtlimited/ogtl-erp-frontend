import React from 'react'
import helper from '../../services/helper';
import { formatter } from "../../services/numberFormatter";
const SalaryDeductionContent = ({deductionsBreakDown = []}) => {
    
  return (
    <div>
        <table className="table table-bordered">
                      <tbody>
                        {  deductionsBreakDown.map(
                          (deduction, index) => (
                            <tr key={index}>
                              <td> {deduction.description === 'incompleteHours' ? 'Incomplete Hours' :helper.capitalize(deduction.description)} </td>
                              <td> {formatter.format(deduction.amount)} </td>
                              <td> {new Date(deduction.createdAt).toUTCString()} </td>
                            </tr>
                          )
                        )}
                      </tbody>
                      </table>
    </div>
  )
}

export default SalaryDeductionContent
