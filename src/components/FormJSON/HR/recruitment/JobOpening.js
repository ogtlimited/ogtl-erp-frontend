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
      title: "Location",
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
      name: "description",
      type: "richText",
      title: "Description",
    },
  ],
};
