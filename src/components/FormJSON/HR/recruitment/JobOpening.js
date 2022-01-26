export const jobOpeningFormJson = {
  title: "Job Opening Form",
  Fields: [
    {
      name: "job_title",
      type: "text",
      title: "Job Title",
    },
    {
      name: "designation_id",
      type: "select",
      title: "Designation",
      options: [],
    },
    {
      name: "project_id",
      type: "select",
      title: "Project",
      options: [],
    },
    {
      name: "location",
      type: "select",
      title: "Job Location",
      options: [],
    },
    {
      name: "date",
      type: "date",
      title: "Date",
      options: [],
    },
    {
      name: "deadline",
      type: "date",
      title: "Deadline",
      options: [],
    },
    {
      name: "status",
      type: "select",
      title: "Status",
      options: [
        {
          value: "CLOSED",
          label: "Closed",
        },
        {
          value: "OPEN",
          label: "Open",
        },
      ],
    },
    {
      name: "type",
      type: "select",
      title: "Mode of engagement",
      options: [
        {
          value: "Full Time",
          label: "Full Time",
        },
        {
          value: "Part Time",
          label: "Part Time",
        },
      ],
    },
    {
      name: "salary",
      type: "select",
      title: "Salary",
      options: [
        {
          value: "50,000 - 100,000",
          label: "50,000 - 100,000",
        },
        {
          value: "100,000 - 150,000",
          label: "100,000 - 150,000",
        },
        {
          value: "150,000 - 200,000",
          label: "150,000 - 200,000",
        },
        {
          value: "200,000 - 250,000",
          label: "200,000 - 250,000",
        },
        {
          value: "300,000 - 350,000",
          label: "300,000 - 350,000",
        },
        {
          value: "350,000 - 400,000",
          label: "350,000 - 400,000",
        },
        {
          value: "400,000 - 450,000",
          label: "400,000 - 450,000",
        },
        {
          value: "> 500,000",
          label: "500,000",
        },
      ],
    },
    {
      name: "experience",
      type: "number",
      title: "Experience",
    },
    {
      name: "vacancy",
      type: "number",
      title: "No of Vacancies",
    },
    {
      name: "description",
      type: "richText",
      title: "Description",
    },
  ],
};
