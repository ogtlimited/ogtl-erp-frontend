export const AssetFormJson = {
  title: "Asset Form",
  Fields: [
    {
      name: "assetName",
      type: "select",
      title: "Asset Name",
      options: [],
    },
    {
      name: "serialNumber",
      type: "text",
      title: "Serial Number",
    },

    {
      name: "assetType",
      type: "select",
      title: "Asset Type",
      options: [
        {
          value: "Facility",
          label: "Facility",
        },

        {
          value: "IT",
          label: "IT",
        },
      ],
    },
  ],
};
