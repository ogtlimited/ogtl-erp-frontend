export const AssetAssignmentForm = {
  title: " Asset Assignment Form",
  Fields: [
    {
      name: "assetId",
      type: "select",
      title: "Asset Name",
      options: [],
    },
    {
      name: "assigned_to",
      type: "select",
      title: "Assigned To",
      options: [],
    },

    {
      name: "condition",
      type: "select",
      title: "Condition",
      options: [
        {
          value: "Fair",
          label: "Fair",
        },
        {
          value: "Terrible",
          label: "Terrible",
        },
        {
          value: "Excellent",
          label: "Excellent",
        },
      ],
    },

    {
      name: "warranty",
      type: "select",
      title: "Warranty",
      options: [
        {
          value: "6 Months",
          label: "6 Months",
        },
        {
          value: "1 year",
          label: "1 year",
        },
        {
          value: "More than 1 year",
          label: "More than 1 year",
        },
      ],
    },

    {
      name: "description",
      type: "textarea",
      title: "Description",
    },
  ],
};
