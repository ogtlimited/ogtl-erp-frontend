export const ContactDetailJson = {
  title: "Contact Details",
  Fields: [
    {
      name: "mobile",
      type: "text",
      title: "mobile",
      required: {
        value: true,
        message: "Employee mobile is required",
      },
      validation: function (val) {
        return val.length === 11 || "Required Length is 11";
      },
    },
    {
      name: "personal_email",
      type: "email",
      title: "Personal Email",
      required: {
        value: true,
        message: "Personal Email is required",
      },
    },
    {
      name: "permanent_address_is",
      type: "select",
      title: "Permanent Address Type",
      options: [
        {
          value: "rented",
          label: "Rented",
        },
        {
          value: "owned",
          label: "Owned",
        },
      ],
    },

    {
      name: "permanent_address",
      type: "text",
      title: "Permanent Address",
    },
    {
      name: "current_address_is",
      type: "select",
      title: "Current Address Type",
      options: [
        {
          value: "rented",
          label: "Rented",
        },
        {
          value: "owned",
          label: "Owned",
        },
      ],
    },

    {
      name: "current_address",
      type: "text",
      title: "Current Address",
    },
  ],
};
