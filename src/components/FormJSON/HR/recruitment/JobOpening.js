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
          value: "Full Time: Remote",
          label: "Full Time: Remote",
        },
        {
          value: "Full Time: Onsite",
          label: "Full Time: Onsite",
        },
        {
          value: "Part Time: Remote",
          label: "Part Time: Remote",
        },
        {
          value: "Part Time: Onsite",
          label: "Part Time: Onsite",
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

export const DefaultjobOpeningFormJson = {
  title: "Job Opening Form",
  Fields: [
    {
      name: "job_title",
      type: "text",
      title: "Job Title",
    }
  ],
};
