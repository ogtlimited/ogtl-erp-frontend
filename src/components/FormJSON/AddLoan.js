
export const HR_ADD_LOAN = {
    hr_user_id: "",
    hr_loan_type_id: "",
    start_date: "",
    end_date: "",
  
    officeName: "",
    employeeName: "",
    loanTitle: "",
    loanAmount: "",
    number_of_installment: "",
    duration: "",
    operation_office_id: "",
  };
  
  export const HR_ADD_DEDUCTION_TYPE = {
    operation_office_id: "",
    title: "",
    description: "",
    percentage: null,
    amount: null,
  
    officeName: "",
    deductionTitle: "",
  };
  
  export const officeTypeOptions = [
    {
      label: "Department",
      value: "department",
    },
    {
      label: "Campaign",
      value: "campaign",
    },
  ];
  
  export const deductionProcessOptions = [
    {
      label: "Percentage",
      value: "percentage",
    },
    {
      label: "Flat Rate",
      value: "flat_rate",
    },
  ];
  