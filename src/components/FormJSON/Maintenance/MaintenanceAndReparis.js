export const maintenanceAndRepairFormJson = {
  title: "Maintenance And Repair Form",
  Fields: [
    {
      name: "asset_id",
      type: "select",
      title: "Asset",

      options: [],
    },
    {
      name: "date_of_maintenance",
      type: "date",
      title: "Date of maintenance",
      required: {
        value: true,
        message: "Date of maintenance is required",
      },
    },
    {
      name: "amount",
      type: "number",
      title: "Amount",
    },
    {
      name: "type",
      type: "select",
      title: "Type",
      options: [
        {
          label: "Repairs",
          value: "Repairs",
        },
        {
          label: "Maintenance",
          value: "Maintenance",
        },
      ],
    },
    {
      name: "issue",
      type: "textarea",
      title: "Issue",
      required: {
        value: true,
        message: "Issue is required",
      },
    },
  ],
};
