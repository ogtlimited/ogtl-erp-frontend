
export const HR_ADD_DEDUCTION = {
  hr_user_id: "",
  hr_deduction_type_id: "",

  officeName: "",
  employeeName: "",
  deductionTitle: "",
  operation_office_id: "",
};

export const HR_ADD_DEDUCTION_TYPE = {
  operation_office_id: "",
  title: "",
  description: "",
  percentage: null,
  amount: null,

  officeName: "",
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
    label: "Amount",
    value: "amount",
  },
];
