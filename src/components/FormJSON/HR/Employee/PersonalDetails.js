export const PersonalDetailJson = {
  title: "Personal Details",
  Fields: [
    {
      name: "means_of_identification",
      type: "select",
      title: "Means of Identification",
      options: [
        {
          value: "NIN",
          label: "NIN",
        },
        {
          value: "International Passport",
          label: "International Passport",
        },
        {
          value: "Drivers License",
          label: "Drivers License",
        },
      ],
    },
    {
      name: "id_number",
      type: "text",
      title: "ID Number",
    },
    {
      name: "date_of_issue",
      type: "date",
      title: "Date Of Issue",
    },
    {
      name: "valid_upto",
      type: "date",
      title: "Valid Up To",
    },
    {
      name: "date_of_birth",
      type: "date",
      title: "Date of birth",
    },

    {
      name: "place_of_issue",
      type: "text",
      title: "Place Of Issue",
    },
    {
      name: "marital_status",
      type: "select",
      title: "Marital Status",
      options: [
        {
          value: "single",
          label: "Single",
        },
        {
          value: "married",
          label: "Married",
        },
        {
          value: "divorced",
          label: "Divorced",
        },
        {
          value: "widowed",
          label: "Widowed",
        },
      ],
    },
    {
      name: "blood_group",
      type: "select",
      title: "Blood Group",
      options: [
        {
          value: "A+",
          label: "A+",
        },
        {
          value: "A-",
          label: "A-",
        },
        {
          value: "B+",
          label: "B+",
        },
        {
          value: "AB+",
          label: "AB+",
        },
        {
          value: "AB-",
          label: "AB-",
        },
        {
          value: "O+",
          label: "O+",
        },
        {
          value: "O-",
          label: "O-",
        },
      ],
    },
  ],
};
