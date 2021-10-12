export const vendorBillFormJson = {
  title: "Create Vendor Bill Form",
  Fields: [
    {
      name: "bill_no",
      type: "text",
      title: "Number",
      required: {
        value: true,
        message: "Bill number is required",
      },
    },
    {
      name: "vendor",
      type: "select",
      title: "Vendor",
      options: [],
      //   required: {
      //     value: true,
      //     message: "Customer is required",
      //   },
    },
    {
      name: "bill_date",
      type: "date",
      title: "Bill Date",
      required: {
        value: true,
        message: "Bill date  is required",
      },
    },
    {
      name: "due-date",
      type: "date",
      title: "Due Date",
      required: {
        value: true,
        message: "due date  is required",
      },
    },
    {
      name: "reference",
      type: "text",
      title: "Reference",
      // required: {
      //   value: true,
      //   message: "total is required",
      // },
    },
    {
      name: "total",
      type: "text",
      title: "Total",
      required: {
        value: true,
        message: "total is required",
      },
    },

    {
      name: "status",
      type: "text",
      title: "Status",
      required: {
        value: true,
        message: "status is required",
      },
    },
  ],
};
