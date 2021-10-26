export const clientPaymentFormJson = {
  title: "Create Vendor Payment Form",
  Fields: [
    {
      name: "invoice",
      type: "select",
      title: "Invoice",
      options: [],
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
      name: "total_amount",
      type: "number",
      title: "Amount",
      required: {
        value: true,
        message: "Amount is required",
      },
    },

    {
      name: "paymentStatus",
      type: "select",
      title: "Payment Status",
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
