export const employeeFormJson = {
  title: "Employee Form",
  Fields: [
    // {
    //   name: "applicant",
    //   type: "text",
    //   title: "Applicant",
    //   required: {
    //     value: true,
    //     message: "applicant is required",
    //   },
    //   options: [],
    // },
    {
      name: "first_name",
      type: "text",
      title: "First Name",
      required: {
        value: true,
        message: "applicant first name is required",
      },
    },
    {
      name: "middle_name",
      type: "text",
      title: "Middle Name",
      required: {
        value: true,
        message: "applicant middle name is required",
      },
    },
    {
      name: "last_name",
      type: "text",
      title: "Last Name",
      required: {
        value: true,
        message: "applicant last name is required",
      },
    },
    // {
    //   name: "password",
    //   type: "text",
    //   disabled: true,
    //   title: "Password",
    //   required: {
    //     value: true,
    //     message: "Password is required",
    //   },
    //   validation: function (val) {
    //     return val.length >= 5 || "Min Length is 5";
    //   },
    // },
    {
      name: "company_email",
      type: "email",
      title: "Email",
      required: {
        value: true,
        message: "Email is required",
      },
      validation: function (val) {
        return val.length >= 5 || "Min Length is 5";
      },
    },
    {
      name: "gender",
      type: "select",
      title: "Gender",
      required: {
        value: true,
      },
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
      name: "date_of_joining",
      type: "date",
      title: "Date of joining",
      required: {
        value: true,
        message: "Date of joining is required",
      },
    },
    {
      name: "reports_to",
      type: "select",
      title: "Reports to",
      required: {
        value: true,
        message: "Reports to is required",
      },
      options: [],
    },
    {
      name: "designation",
      type: "select",
      title: "Designation",
      required: {
        value: true,
        message: "designation is required",
      },
      options: [],
    },
    {
      name: "projectId",
      type: "select",
      title: "Campaign",
      required: {
        value: true,
        message: "designation is required",
      },
      options: [],
    },
    {
      name: "department",
      type: "select",
      title: "Department",
      required: {
        value: true,
        message: "department is required",
      },
      options: [],
    },
    {
      name: "default_shift",
      type: "select",
      title: "Shift",
      required: {
        value: true,
        message: "shift is required",
      },
      options: [],
    },
    {
      name: "branch",
      type: "select",
      title: "Branch",
      options: [],
    },
    {
      name: "isAdmin",
      type: "check",
      title: "Admin User",
      required: {
        value: true,
        message: "Admin User is required",
      },
    },
    {
      name: "isExpatriate",
      type: "check",
      title: "Expatriate",
      required: {
        value: true,
        message: "Admin User is required",
      },
    },
    {
      name: "employeeType",
      type: "select",
      title: "Employment type",
      required: {
        value: false,
      },
      options: [
        {
          label: "Apprentice",
          value: "Apprentice",
        },
        {
          label: "Intern",
          value: "Intern",
        },
        {
          label: "Commission",
          value: "Commission",
        },
        {
          label: "Contract",
          value: "Contract",
        },
        {
          label: "Probation",
          value: "Probation",
        },
        {
          label: "PartTime",
          value: "PartTime",
        },
        {
          label: "FullTime",
          value: "FullTime",
        },
      ],
    },
    {
      name: "status",
      type: "select",
      title: "Status",
      options: [
        {
          label: "Active",
          value: "active",
        },
        {
          name: "projectId",
          type: "select",
          title: "Campaign",
          required: {
            value: true,
            message: "Campaign is required",
          },
          options: [],
        },
        {
          name: "default_shift",
          type: "select",
          title: "Shift",
          required: {
            value: true,
            message: "shift is required",
          },
          options: [],
        },
      ],
    },
    {
       name: "leaveCount",
      type: "number",
      title: "Leave Count",
      required: {
        value: false,
        message: "Password is required",
      },
      validation: function (val) {
        return val.length >= 5 || "Min Length is 5";
      },
    },
    // {
    //   name: "image",
    //   type: "file",
    //   title: "Employee Image",
    // },
    // {
    //     name:'role' ,
    //     type:'role',
    //     title:'Role',
    //     roleList: [
    //         {
    //           name: "HR",
    //           abbrev: "HR",
    //           nestedArray: [{ name: "HR_read"}, {name: "HR_write"},  {name: "HR_update"}, {name: "HR_delete" }]
    //         },
    //         {
    //           name: "Accounting",
    //           abbrev: "ACC",
    //           nestedArray: [{ name: "ACC_read"}, {name: "ACC_write"},  {name: "ACC_update"}, {name: "ACC_delete" }]
    //         },
    //         {
    //           name: "Facility",
    //           abbrev: "FAC",
    //           nestedArray: [{ name: "FAC_read"}, {name: "FAC_write"},  {name: "FAC_update"}, {name: "FAC_delete" }]
    //         },
    //         {
    //           name: "IT",
    //           abbrev: "IT",
    //           nestedArray: [{ name: "IT_read"}, {name: "IT_write"},  {name: "IT_update"}, {name: "IT_delete" }]
    //         }
    //       ]
    // },
  ],
};
