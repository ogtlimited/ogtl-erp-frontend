/** @format */

export const departmentFormJson = {
  department: {
    type: 'text',
    label: 'Department',
    required: {
      value: true,
      message: 'Name is required',
    },
  },
  leave_approval_level: {
    type: 'number',
    label: 'Highest Leave Approval Level',
    required: {
      value: true,
      message: 'Level is required',
    },
  },
};
