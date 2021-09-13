export const historyJson = {
  title: "History Form",
  Fields: [
    {
      name: "designation_id",
      type: "select",
      title: "Designation Id",
      required: {
        value: true,
        message: "Designation Id is required",
      },
      options: [],
    },
    {
      name: "branch_id",
      type: "select",
      title: "Branch Id",
      required: {
        value: true,
        message: "Branch Id is required",
      },
      options: [],
    },

    {
      name: "from_date",
      type: "date",
      title: "From Date",
    },

    {
      name: "to_date",
      type: "date",
      title: "To Date",
    },
  ],
};
