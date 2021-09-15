export const resignationFormJson = {
  title: "Resignation Form",
  Fields: [
    {
      name: "employee_id",
      type: "select",
      title: "Employee",
      required: {
        value: true,
        message: "Employee is required",
      },
    },

    {
      name: "resignation_letter_date",
      type: "date",
      title: " Date Resignation Submitted",
    },
    {
      name: "relieving_date",
      type: "date",
      title: "Effective Date of Resignation ",
    },
    {
      name: "reason_for_resignation",
      type: "text",
      title: "Reason for Resignation",
    },
  ],
};
