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
      type: "text",
      title: "Client",
      required: { value: true, message: "Field is required" },
    },
    {
      name: "type",
      type: "text",
      title: "Type",
      required: { value: true, message: "Field is required" },
    },
    {
      name: "objectives",
      type: "text",
      title: "Objectives",
      required: { value: true, message: "Field is required" },
    },
    {
      name: "hours_of_operation",
      type: "text",
      title: "Hours of operation",
      required: { value: true, message: "Field is required" },
    },
    {
      name: "type_of_employees",
      type: "text",
      title: "Type of employees",
      required: { value: true, message: "Field is required" },
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
      required: { value: true, message: "Field is required" },
    },
    {
      name: "number_of_employees",
      type: "number",
      title: "Number of employees",
      required: { value: true, message: "Field is required" },
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
        }
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
        }
      ],
      required: { value: true, message: "Field is required" },
    },
    {
      name: "documents",
      type: "text",
      title: "Documents",
      required: { value: true, message: "Field is required" },
    },
    {
      name: "creator",
      type: "text",
      title: "Creator",
      required: { value: true, message: "Field is required" },
    },
    {
      name: "status",
      type: "select",
      title: "Status",
      options: [
        {
            label: "Open",
            value: "open",
        },
        {
            label: "Approved",
            value: "approved",
        },
        {
            label: "Rejected",
            value: "rejected",
        },
        {
            label: "Suspended",
            value: "suspended",
        },
      ],
      required: { value: true, message: "Field is required" },
    },
    {
      name: "manager",
      type: "text",
      title: "Manager",
      required: { value: true, message: "Field is required" },
    },
    {
      name: "quality_analyst",
      type: "text",
      title: "Quality analyst",
      required: { value: true, message: "Field is required" },
    },
  ],
};
