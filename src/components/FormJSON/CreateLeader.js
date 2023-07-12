export const LeaderForm = {
  operation_office_id: "",
  hr_employee_id: "",
  title: "",

  officeName: "",
  leaderName: "",
  leadershipType: "",
};
export const RoleUserForm = {
  operation_office_id: "",
  hr_user_id : "",
  admin_role_id: "",

  officeName: "",
  roleUserName: "",
};

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

export const leaderTypeOptions = [
  {
    label: "Supervisor",
    value: "supervisor",
  },
  {
    label: "Team Lead",
    value: "team_lead",
  },
];
