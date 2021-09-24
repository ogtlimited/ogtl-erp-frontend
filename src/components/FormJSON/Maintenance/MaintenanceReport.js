export const maintenanceReportFormJson = {
  title: "Maintenance Report Form",
  Fields: [
    {
      name: "date_of_report",
      type: "date",
      title: "Date of Report",
      required: {
        value: true,
        message: "Date of report is required",
      },
    },
    {
      name: "description",
      type: "textarea",
      title: "Description",
      required: {
        value: true,
        message: "Description is required",
      },
    },

    {
      name: "issues",
      type: "textarea",
      title: "Issues",
      required: {
        value: true,
        message: "Issues is required",
      },
    },
    {
      name: "recommendation",
      type: "textarea",
      title: "Recommendation",
      required: {
        value: true,
        message: "Recommendation is required",
      },
    },
  ],
};
