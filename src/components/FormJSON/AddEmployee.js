export const CREATE_PROFILE = {
  first_name: '',
  middle_name: '',
  last_name: '',
  company_email: '',
  gender: '',
  date_of_joining: '',
  reports_to: '',
  designation: null,
  department: null,
  projectId: '',
  shifts: [],
  branch: null,
  isAdmin: false,
  isExpatriate: false,
  employeeType: '',
  status: 'active',
  leaveCount: 0,
  password: '',
  image: '',

  designationName: '',
  signature: '',
}


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

export const categoryOptions = [
  {
    label: "Yes",
    value: 'yes',
  },
  {
    label: "No",
    value: 'no',
  },
];