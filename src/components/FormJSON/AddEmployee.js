export const PROFILE = {
  user_info: {
    email: '',
  },
  Employee_info: {
    ogid: '',
    date_of_joining: '',
    operation_branch_id: '',
    operation_office_id: '',
    hr_designation_id: '',
    remote: false,
  },
  personal_details: {
      first_name: '',
      middle_name: '',
      last_name: '',
      gender: '',
      DOB: '',
      marital_status: '',
      blood_group: '',
      id_issue_date: '',
      id_number: '',
      means_of_identification: '',
  },
  misc : {
    branchName: '',
    officeName: '',
    designationName: '',
    staffGender: '',
    maritalStatus: '',
  },
}

export const officeOptions = [
  {
    label: "Department",
    value: 'department',
  },
  {
    label: "Campaign",
    value: 'campaign',
  },
];

export const genderOptions = [
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Male",
    value: "male",
  },
];

export const categoryOptions = [
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];

export const maritalStatusOptions = [
  {
    label: "Single",
    value: "single",
  },
  {
    label: "Married",
    value: "married",
  },
  {
    label: "Divorced",
    value: "divorced",
  },
  {
    label: "Widowed",
    value: "widowed",
  },
];

export const bloodGroupOptions = [
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
];

export const meansOfIdentificationOptions = [
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
];

export const employmentTypesOptions = [
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
];


export const OFFICEOptions = [
  {
    label: "HR",
    value: 1,
  },
  {
    label: "Operations",
    value: 2,
  },
  {
    label: "Finance",
    value: 3,
  },
  {
    label: "IT",
    value: 4,
  },
  {
    label: "Admin",
    value: 5,
  },
];


export const BRANCHOptions = [
  {
    label: "Abuja",
    value: 1,
  },
  {
    label: "Kaduna",
    value: 2,
  },
  {
    label: "Kano",
    value: 3,
  },
  {
    label: "Lagos",
    value: 4,
  },
  {
    label: "South Africa",
    value: 5,
  },
];


export const DESIGNATIONOptions = [
  {
    label: "Software Engineer",
    value: 1,
  },
  {
    label: "Senior Software Engineer",
    value: 2,
  },
  {
    label: "Agent",
    value: 3,
  },
  {
    label: "HR Manager",
    value: 4,
  },
  {
    label: "HR Assistant",
    value: 5,
  },
];