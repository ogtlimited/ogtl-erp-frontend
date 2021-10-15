export const clientPaymentFormJson = {
  title: "Create Vendor Payment Form",
  Fields: [
    {
      name: "payment_no",
      type: "text",
      title: "Number",
      required: {
        value: true,
        message: "Payment number is required",
      },
    },
    {
      name: "date",
      type: "date",
      title: "Date",
      required: {
        value: true,
        message: "payment date  is required",
      },
    },
    {
      name: "journal",
      type: "text",
      title: "Journal",
      required: {
        value: true,
        message: "Journal is required",
      },
    },

    {
      name: "payment method",
      type: "select",
      title: "Payment method",
      options: [
        {
          value: "cash-cheque",
          label: "Cash/Cheque",
        },
        {
          value: "bank-transfer",
          label: "Bank Transfer",
        },
        {
          value: "pos",
          label: "POS",
        },
      ],
      //   required: {
      //     value: true,
      //     message: "Payment method required",
      //   },
    },
    {
      name: "client",
      type: "select",
      title: "Client",
      options: [],
      //   required: {
      //     value: true,
      //     message: "Customer is required",
      //   },
    },

    {
      name: "amount",
      type: "text",
      title: "Amount",
      required: {
        value: true,
        message: "Amount is required",
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
