export const CREATE_LEAVE = {
  hr_leave_type_id: "",
  start_date: "",
  end_date: "",
  reason: "",
  proofs: null,

  leaveTypeTitle: "",
};

export const HR_CREATE_LEAVE = {
  hr_user_id: "",
  hr_leave_type_id: "",
  start_date: "",
  end_date: "",
  reason: "",
  proofs: null,

  leaveTypeTitle: "",
  officeName: "",
  employeeName: "",
  operation_office_id: "",
};


export const EDIT_LEAVE = {
  hr_leave_type_id: "",
  start_date: "",
  end_date: "",
  reason: "",
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

export const REJECT_LEAVE = {
  rejection_reason: "",
};

export const HR_CANCEL_LEAVE = {
  reason_for_cancellation: "",
};

export const HR_UPDATE_LEAVE = {
  start_date: "",
  end_date: "",
  reasons_for_update: "",
};


export const REQUEST_EDIT = {
  reasons: "",
};

export const APPEAL_REJECTION = {
  reasons: "",
};

export const CREATE_LEAVE_TYPE = {
  leave_type: "",
};
