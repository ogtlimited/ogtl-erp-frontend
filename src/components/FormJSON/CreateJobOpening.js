export const JobOpeningForm = {
  job_title: "",
  operation_office_id: null,
  operation_branch_id: null,
  start_date: "",
  end_date: "",
  status: "",
  experience: 0,
  vacancy: 0,
  description: "",
  position_type: "",
  admin_role: false,

  officeName: "",
  branchName: "",
  statusName: "",
  adminRole: "",
};

export const officeTypeOptions = [
  {
    label: "Department",
    value: "department",
  },
  {
    label: "Campaign",
    value: "campaign",
  },
];

export const jobOpeningStatus = [
  {
    label: "CLOSED",
    value: "closed",
  },
  {
    label: "OPEN",
    value: "open",
  },
];

export const positionType = [
  {
    label: "Full Time: Remote",
    value: "Full Time: Remote",
  },
  {
    label: "Full Time: Onsite",
    value: "Full Time: Onsite",
  },
  {
    value: "Part Time: Remote",
    label: "Part Time: Remote",
  },
  {
    value: "Part Time: Onsite",
    label: "Part Time: Onsite",
  },
];

export const adminRole = [
  {
    label: "YES",
    value: true,
  },
  {
    label: "NO",
    value: false,
  },
];
