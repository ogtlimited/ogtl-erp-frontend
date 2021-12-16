export const salarySettingsFormJson = {
  title: "Salary Settings Form",
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
      name: "percentage",
      type: "number",
      title: "Percentage",
    },

    {
      name: "type",
      type: "select",
      title: "Type",
      options: [
        {
          label: "Earning",
          value: "earning",
        },
        {
          label: "Deduction",
          value: "deduction",
        },
      ],
    },
    {
      name: "startRange",
      type: "number",
      title: "Start Range",
    },
    {
      name: "endRange",
      type: "number",
      title: "End Range",
    },
  ],
};
