export const CREATE_LEAVE = {
  hr_leave_type_id: '',
  start_date: "",
  end_date: "",
  reason: '',

  leaveTypeTitle: ''
}

export const EDIT_LEAVE = {
  hr_leave_type_id: '',
  start_date: "",
  end_date: "",
  reason: '',
}

export const HR_CREATE_LEAVE = {
  hr_user_id: '',
  hr_leave_type_id: '',
  start_date: "",
  end_date: "",
  reason: '',

  leaveTypeTitle: '',
  officeName: "",
  employeeName: "",
  operation_office_id: "",
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

export const REJECT_LEAVE = {
  rejection_reason: '',
}

export const REQUEST_EDIT = {
  reasons: '',
}

export const APPEAL_REJECTION = {
  reasons: '',
}

export const CREATE_LEAVE_TYPE = {
  leave_type: '',
}