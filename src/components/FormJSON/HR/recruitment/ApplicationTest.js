export const applicationTestFormJson = {
  title: "Test Form",
  Fields: [
    {
      name: "test_type",
      type: "select",
      title: "Test Type",
      required: {
        value: true,
        message: "Test type is required",
      },
      options: [
        {
          value: "Phone Screening",
          label: "Phone Screening",
        },
        {
          value: "Typing Test",
          label: "Typing Test",
        },
        {
          value: "Excel Test",
          label: "Excel Test",
        },
        {
          value: "Formal Writing",
          label: "Formal Writing",
        },
        {
          value: "Soft Skills",
          label: "Soft Skills",
        },
      ],
    },
    {
      name: "job_applicant_id",
      type: "select",
      title: "Job Applicant",
      required: {
        value: true,
        message: "Job applicant is required",
      },
      options: [],
    },
    {
      name: "status",
      type: "select",
      title: "Status",
      options: [
        {
          value: "Passed",
          label: "Passed",
        },
        {
          value: "Failed",
          label: "Failed",
        },
      ],
    },

    {
      name: "score",
      type: "text",
      title: "Score",
    },
    {
      name: "interview_date",
      type: "date",
      title: "Interview Date",
      required: {
        value: true,
        message: "Interview date is required",
      },
    },
    {
      name: "phone_number",
      type: "text",
      title: "Phone Number",
      required: {
        value: true,
        message: "Phone number is required",
      },
    },
    {
      name: "notes",
      type: "textarea",
      title: "Notes",
    },
  ],
};
