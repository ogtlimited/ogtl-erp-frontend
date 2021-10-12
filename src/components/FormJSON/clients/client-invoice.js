export const clientInvoiceFormJson = {
  title: "Create Client Invoice Form",
  Fields: [
    {
      name: "invoice_no",
      type: "text",
      title: "Number",
      required: {
        value: true,
        message: "Invoice number is required",
      },
    },
    {
      name: "customer",
      type: "select",
      title: "Customer",
      options: [],
      //   required: {
      //     value: true,
      //     message: "Customer is required",
      //   },
    },
    {
      name: "invoice_date",
      type: "date",
      title: "Invoice Date",
      required: {
        value: true,
        message: "Invoice date  is required",
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

    {
      name: "payment-status",
      type: "text",
      title: "Payment Status",
      required: {
        value: true,
        message: "payment status is required",
      },
    },
  ],
};
