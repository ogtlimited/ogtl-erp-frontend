export const salaryComponentsFormJson = {
  title: "Salary Components Form",
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
      name: "projectId",
      type: "select",
      title: "Project",
      options: [],
    },

    {
      name: "departmentId",
      type: "select",
      title: "Department",
      options: [],
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
    {
      name: "type",
      type: "select",
      title: "Type",
      required: {
        value: true,
        message: "description  is required",
      },
      options: [
        {
          value: "deduction",
          label: "Deduction",
        },
        {
          value: "earning",
          label: "Earning",
        },
      ],
    },
    // {
    //   name: "status",
    //   type: "select",
    //   title: "Status",
    //   options: [
    //     {
    //       value: "Open",
    //       label: "Open",
    //     },

    //     {
    //       value: "Pending",
    //       label: "Pending",
    //     },
    //     {
    //       value: "Rejected",
    //       label: "Rejected",
    //     },
    //     {
    //       value: "Accepted",
    //       label: "Accepted",
    //     },
    //   ],
    // },
    {
      name: "description",
      type: "textarea",
      title: "Description",
    },
  ],
};
