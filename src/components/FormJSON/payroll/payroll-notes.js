export const salaryPayrollNotesFormJson = {
  title: "Payroll Notes Form",
  Fields: [
    {
      name: "title",
      type: "text",
      title: "Title",
    },

    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "employeeId",
      type: "select",
      title: "Employee",
      options: [],
    },

    // {
    //   name: "status",
    //   type: "select",
    //   title: "Status",
    //   options: [
    //     {
    //       value: "Pending",
    //       label: "Pending",
    //     },
    //     {
    //       value: "Seen by accounts",
    //       label: "Seen by accounts",
    //     },
    //     {
    //       value: "In progress",
    //       label: "In progress",
    //     },
    //     {
    //       value: "Completed",
    //       label: "Completed",
    //     },
    //   ],
    // },
  ],
};
