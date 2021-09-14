export const SalaryDetailJson = {
  title: "Salary Details",
  Fields: [
    {
      name: "salary_mode",
      type: "select",
      title: "Salary Mode",
      options: [
        {
          value: "bank",
          label: "Bank",
        },
        {
          value: "cash",
          label: "Cash",
        },
        {
          value: "cheque",
          label: "Cheque",
        },
      ],
    },
    {
      name: "bank_name",
      type: "text",
      title: "Bank Name",
    },
    {
      name: "bank_code",
      type: "text",
      title: "Bank Code",
    },
    {
      name: "bank_account_number",
      type: "text",
      title: "Account Number",
    },
  ],
};
