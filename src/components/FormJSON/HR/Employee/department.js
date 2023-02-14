/** @format */

export const departmentFormJson = {
  department: {
    type: 'text',
    label: 'Department',
    required: {
      value: true,
      message: 'Department is required',
    },
  },
  leave_approval_level: {
    type: 'number',
    label: 'Highest Leave Approval Level',
    required: {
      value: true,
      message: 'Approval level is required',
    },
  },
  
  start_time: {
    type: 'date',
    label: 'Start Time',
    required: {
      value: true,
      message: 'Start time is required',
    },
  },
  end_time: {
    type: 'date',
    label: 'End Time',
    required: {
      value: true,
      message: 'End time is required',
    },
  },
  shift_name: {
    type: 'text',
    label: 'Shift Name',
    required: {
      value: true,
      message: 'Shift name is required',
    },
  },
};
