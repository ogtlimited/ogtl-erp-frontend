export const vendorPaymentFormJson = {
  title: "Create Vendor Payment Form",
  Fields: [
    {
      name: "bill",
      type: "select",
      title: "Bill",
      options: [],
    },
    {
      name: "amount",
      type: "number",
      title: "Amount",
      required: {
        value: true,
        message: "Amount is required",
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
      name: "paymentMethod",
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
      name: "status",
      type: "select",
      title: "Status",
      options: [
        {
          value: "Partial Payment",
          label: "Partial Payment",
        },
        {
          value: "Full Payment",
          label: "Full Payment",
        },
      ],
    },
  ],
};
