export const orientationFormJson = {
  title: "Orientation and Training Form",
  Fields: [
    {
      name: "department_id",
      type: "select",
      title: "Department",
      options: [],
    },
    {
      name: "employee_id",
      type: "select",
      title: "Candidates",
      options: [],
      isMulti: true,
    },
    {
      name: "start_date",
      type: "date",
      title: "Start Date",
    },
    {
      name: "end_date",
      type: "time",
      title: "Time",
    },
    {
      name: "type",
      type: "select",
      title: "Type",
      options: [
        {
          value: "training",
          label: "Customer Service Training",
        },
        {
          value: "orientation",
          label: "Orientation",
        },
      ],
    },
    {
      name: "attendance",
      type: "text",
      title: "Attendance",
    },
  ],
};
