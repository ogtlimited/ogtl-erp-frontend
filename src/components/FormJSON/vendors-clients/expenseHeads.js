export const expenseHeadsFormJson = {
    title: "Create Expense Head Form",
    Fields: [
      {
        name: "title",
        type: "text",
        title: "Title",
        required: {
          value: true,
          message: "Product is required",
        },
      },
      {
        name: "departmentId",
        type: "select",
        options: [],
        title: "Department",
        // required: {
        //   value: true,
        //   message: "department is required",
        // },
      },
      {
        name: "flagAlert",
        type: "number",
        title: "Flat Alert",
        required: {
          value: true,
          message: "flag alert is required",
        },
      },
    ],
  };
