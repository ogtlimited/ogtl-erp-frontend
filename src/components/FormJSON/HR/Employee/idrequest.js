export const idRequestJson = {
  title: "Id Request Form",
  Fields: [
    {
      name: "employee_id",
      type: "select",
      title: "Employee",
      required: {
        value: true,
        message: "Designation Id is required",
      },
      options: [],
    },

    {
      name: "date",
      type: "date",
      title: "Effective Date",
    },
    {
      name: "notes",
      type: "text",
      title: "Notes",
    },
  ],
};
