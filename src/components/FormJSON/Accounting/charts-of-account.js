export const chartOfAccountsFormJson = {
  title: "Chart of Accounts Form",
  Fields: [
    {
      name: "parent",
      type: "select",
      title: "Type",
      options: []
    },
    {
      name: "account_name",
      type: "text",
      title: "Account Name",
      required: {
        value: true,
        message: "Account is required",
      },
    }
  ],
};
