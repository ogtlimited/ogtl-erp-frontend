export const invoiceFormJson = {
    title: "Create Invoice Form",
    Fields: [
      {
        name: "customer",
        type: "select",
        title: "Customer",
        options: [],
        required: {
          value: true,
          message: "title  is required",
        },
      },
      {
        name: "title",
        type: "text",
        title: "Title",
        required: {
            value: true,
            message: "title  is required",
          },
      },
      {
        name: "invoice_no",
        type: "text",
        title: "Invoice #",
        required: {
            value: true,
            message: "invoice number  is required",
          },
      },
  
      {
        name: "invoice_date",
        type: "text",
        title: "Invoice Date",
        required: {
            value: true,
            message: "date  is required",
          },
      },
      {
        name: "payment_terms",
        type: "text",
        title: "Payment Terms",
        multiple: true,
        required: {
          value: true,
          message: "payment term is required",
        },
      },
    ],
  };
  