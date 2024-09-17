
export const HR_ADD_ALLOWANCE = {
    hr_user_id: "",
    hr_allowance_type_id: "",
    start_date: "",
    end_date: "",

    officeName: "",
    employeeName: "",
    hr_allowance_title: "",
    amount: "",
    operation_office_id: "",
};


export const HR_ADD_ALLOWANCE_TYPE = {
    operation_office_id: "",
    title: "",
    description: "",
    percentage: null,
    amount: null,

    officeName: "",
    allowanceTitle: "",
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

export const allowanceProcessOptions = [
    {
        label: "Percentage",
        value: "percentage",
    },
    {
        label: "Flat Rate",
        value: "flat_rate",
    },
];
