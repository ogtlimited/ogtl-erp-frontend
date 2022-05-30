export const salaryDeductionTypesFormJson = {
  title: "Salary Deduction Types Form",
  Fields: [
    {
      name: "title",
      type: "text",
      title: "Title",
      required: {
        value: true,
        message: "title  is required",
      },
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },

    {
      name: "departmentId",
      type: "select",
      title: "Department",
      options: [],
    },
    {
      name: "amount",
      type: "text",
      title: "Amount",
    },
    {
      name: "amount",
      type: "number",
      title: "Amount",
    },
    // {
    //   name: "percentage",
    //   type: "number",
    //   title: "Percentage",
    // },
  ],
};
/*Draft = 'Draft',
  Pending = 'Pending',
  Approved = 'Approved',
  Cancelled = 'Cancelled' */
