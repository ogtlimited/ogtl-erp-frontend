export const PersonalDetailJson = {
  title: "Personal Details",
  Fields: [
    {
      name: "first_name",
      type: "text",
      title: "First Name",
    },
    {
      name: "middle_name",
      type: "text",
      title: "Middle Name",
    },
    {
      name: "last_name",
      type: "text",
      title: "Last Name",
    },
    {
      name: "gender",
      type: "select",
      title: "Gender",
      options: [
        {
          label: "Female",
          value: "female",
        },
        {
          label: "Male",
          value: "male",
        },
      ],
    },
    {
      name: "DOB",
      type: "date",
      title: "Date of birth",
    },
    {
      name: "blood_group",
      type: "select",
      title: "Blood Group",
      options: [
        {
          label: "A+",
          value: "A+",
        },
        {
          label: "A-",
          value: "A-",
        },
        {
          label: "B+",
          value: "B+",
        },
        {
          label: "B-",
          value: "B-",
        },
        {
          label: "AB+",
          value: "AB+",
        },
        {
          label: "AB-",
          value: "AB-",
        },
        {
          label: "O+",
          value: "O+",
        },
        {
          label: "O-",
          value: "O-",
        },
      ],
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
      name: "means_of_identification",
      type: "select",
      title: "Means of Identification",
      options: [
        {
          label: "National ID",
          value: "National ID",
        },
        {
          label: "Driver's License",
          value: "Driver's License",
        },
        {
          label: "International Passport",
          value: "International Passport",
        },
        {
          label: "Voters Card",
          value: "Voters Card",
        },
      ],
    },
    {
      name: "id_number",
      type: "text",
      title: "ID Number",
    },
    {
      name: "id_issue_date",
      type: "date",
      title: "ID Issue date",
    },
  ],
};
