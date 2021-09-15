export const salaryStructureFormJson = {
  title: "Salary Structure Form",
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
      name: "deductions",
      type: "select",
      title: "Deductions",
      multiple: true,
      required: {
        value: true,
        message: "deductions is required",
      },
    },
    {
      name: "earnings",
      type: "select",
      title: "Earnings",
      multiple: true,
      required: {
        value: true,
        message: "earnings is required",
      },
    },
  ],
};
