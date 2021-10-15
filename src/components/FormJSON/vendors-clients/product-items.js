export const productItemsFormJson = {
  title: "Create Product Items Form",
  Fields: [
    {
      name: "product",
      type: "text",
      title: "Product Name",
      required: {
        value: true,
        message: "Product is required",
      },
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "rate",
      type: "number",
      title: "Rate",
      required: {
        value: true,
        message: "Rate is required",
      },
    },
    {
      name: "price",
      type: "number",
      title: "Price",
      required: {
        value: true,
        message: "Price is required",
      },
    },
    {
      name: "units",
      type: "number",
      title: "Units",
      required: {
        value: true,
        message: "Units is required",
      },
    },
    {
      name: "tax",
      type: "number",
      title: "Tax",
      required: {
        value: true,
        message: "Tax is required",
      },
    },
  ],
};
