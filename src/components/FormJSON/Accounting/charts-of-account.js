export const chartOfAccountsFormJson = {
  title: "Chart of Accounts Form",
  Fields: [
    {
      name: "type",
      type: "text",
      title: "Type",
      required: {
        value: true,
        message: "Type is required",
      },
    },
    {
      name: "account",
      type: "text",
      title: "Account",
      required: {
        value: true,
        message: "Account is required",
      },
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "balance",
      type: "text",
      title: "Balance",
    },
  ],
};
