export const salaryDeductionsFormJson = {
  title: "Salary Deductions Form",
  Fields: [
    {
      name: "deductionTypeId",
      type: "select",
      title: "Deduction Type",
      options: [],
      required: {
        value: true,
        message: "Deduction type  is required",
      },
    },

    {
      name: "employeeId",
      type: "select",
      title: "Employee",
      options: [],
      required: {
        value: true,
        message: "employee  is required",
      },
    },
    {
      name: "useDailyRate",
      type: "radio",
      title: "Use Daily Rate",
      
    },

    {
      name: "amount",
      type: "number",
      title: "Amount",
      required: {
        value: true,
        message: "amount  is required",
      },
    },
  ],
};
