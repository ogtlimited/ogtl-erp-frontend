export const campaignFormJson = {
  title: "Create Campaign Form",
  Fields: [
    {
      name: "project_name",
      type: "text",
      title: "Project name",
      required: { value: true, message: "Field is required" },
    },
    {
      name: "client_id",
      type: "select",
      options: [],
      title: "Client",
      required: { value: true, message: "Field is required" },
    },
    {
      name: "type",
      type: "select",
      title: "Type",
      options: [
        {
          label: "Domestic",
          value: "domestic",
        },
        {
          label: "Foreign",
          value: "foreign",
        },
      ],
      required: { value: true, message: "Field is required" },
    },
    {
      name: "diallers",
      type: "select",
      title: "Diallers",
      options: [
        {
          label: "In House",
          value: "inhouse",
        },
        {
          label: "External",
          value: "external",
        },
        {
          label: "Others",
          value: "others",
        },
      ],
    },
    {
      name: "number_of_employees",
      type: "text",
      title: "Number of employees",
    },
    {
      name: "billing_structure",
      type: "select",
      title: "Billing structure",
      options: [
        {
          label: "Standard",
          value: "standard",
        },
        {
          label: "Hourly",
          value: "per_hour",
        },
        {
          label: "Seat",
          value: "seat",
        },
        {
          label: "Per Hour /Seat",
          value: "per_hour/seat",
        },
      ],
    },
    {
      name: "start_date",
      type: "date",
      title: "Start date",
      required: { value: true, message: "Field is required" },
    },
    {
      name: "end_date",
      type: "date",
      title: "End date",
    },
    // {
    //   name: "status",
    //   type: "select",
    //   title: "Status",
    //   options: [
    //     {
    //       label: "Open",
    //       value: "open",
    //     },
    //     {
    //       label: "Approved",
    //       value: "approved",
    //     },
    //     {
    //       label: "Rejected",
    //       value: "rejected",
    //     },
    //     {
    //       label: "Suspended",
    //       value: "suspended",
    //     },
    //   ],
    //   required: { value: true, message: "Field is required" },
    // },
    {
      name: "manager",
      type: "select",
      options: [],
      title: "Manager",
    },
    {
      name: "quality_analyst",
      type: "select",
      options: [],
      title: "Quality analyst",
    },
    {
      name: "shift_start",
      type: "time",
      title: "Shift Start",
      required: { value: true, message: "Field is required" },
    },
    {
      name: "shift_end",
      type: "time",
      title: "Shift End",
      required: { value: true, message: "Field is required" },
    },
    {
      name: "shift_name",
      type: "text",
      title: "Shift Name",
      required: { value: true, message: "Field is required" },
    },

    {
      name: "objectives",
      type: "textarea",
      title: "Objectives",
    },
  ],
};
