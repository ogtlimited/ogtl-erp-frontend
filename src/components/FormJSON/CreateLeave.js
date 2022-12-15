export const CREATE_LEAVE = {
  employee_id: '',
  department_id: '',
  leave_type_id: '',
  from_date: new Date(),
  to_date: new Date(),
  leave_approver: '',
  reason_for_application: '',
}

export const EDIT_LEAVE = {
  leave_type_id: '',
  from_date: new Date(),
  to_date: new Date(),
  reason_for_application: '',
}

export const REJECT_LEAVE = {
  rejection_reason: '',
}