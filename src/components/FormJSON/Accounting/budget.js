export const budgetFormJson = {
  title: "Budget Form",
  Fields: [
    {
      name: "budget",
      type: "text",
      title: "Budget Amount",
      required: {
        value: true,
        message: "Budget is required",
      },
    },
    {
      name: "departmentId",
      type: "select",
      title: "Department",
      options: [],
      required: {

        message: "Description is required",
      },
    },
    {
      name: "startDate",
      type: "date",
      title: "Start Date",
    },
    {
      name: "endDate",
      type: "date",
      title: "End Date",
    },
  ],
};


