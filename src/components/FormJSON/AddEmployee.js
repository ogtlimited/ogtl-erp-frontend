export const PROFILE = {
  user_info: {
    email: '',
  },
  employee_info: {
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
    remoteCategoryName: '',
  },
}

export const officeTypeOptions = [
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
    label: "NIN",
    value: "NIN",
  },
  {
    label: "Driver's License",
    value: "Drivers_License",
  },
  {
    label: "International Passport",
    value: "International_Passport",
  },
  {
    label: "Voters Card",
    value: "Voters_Card"
  },
  {
    label: "Student ID",
    value: "Student_ID"
  },
  {
    label: "National Youth Service",
    value: "National_Youth_Service"
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
