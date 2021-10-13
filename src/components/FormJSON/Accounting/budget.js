export const budgetFormJson = {
  title: "Budget Form",
  Fields: [
    {
      name: "budget",
      type: "text",
      title: "Budget",
      required: {
        value: true,
        message: "Budget is required",
      },
    },

    {
      name: "description",
      type: "text",
      title: "Description",
      required: {
        value: true,
        message: "Description is required",
      },
    },
    {
      name: "start-date",
      type: "date",
      title: "Start Date",
    },
    {
      name: "end-date",
      type: "date",
      title: "End Date",
    },
  ],
};
