export const applicationTestFormJson = {
    title: 'Test Form',
    Fields: [
        {
            name:'test_type' ,
            type:'select',
            title:'Test Type',
            required:{
                value:true,
                message:'Test type is required'
            },
            options: [
                {
                    value: 'PHONE_SCREENING',
                    label: 'Phone Screening'
                },
                {
                    value: 'TYPING_TEST',
                    label: 'Typing Test'
                },
                {
                    value: 'EXCEL_TEST',
                    label: 'Excel Test'
                },
                {
                    value: 'FORMAL_WRITING',
                    label: 'Formal Writing'
                },
                {
                    value: 'SOFT_SKILLS',
                    label: 'Soft Skills'
                },

            ]

        },
        {
            name:'job_applicant_id' ,
            type:'select',
            title:'Job Applicant',
            required:{
                value:true,
                message:'Job applicant is required'
            },
            options: []
        },
        {
            name:'status' ,
            type:'select',
            title:'Status',
            options: [
                {
                    value: 'PASSED',
                    label: 'Passed'
                },
                {
                    value: 'FAILED',
                    label: 'Failed'
                },
            ]
        },
        {
            name:'hr_user' ,
            type:'select',
            title:'HR User',
            required:{
                value:true,
                message:'Hr user is required'
            },
            options: []
        },
        {
            name:'score' ,
            type:'text',
            title:'Score',
        },
        {
            name:'interview_date' ,
            type:'date',
            title:'Interview Date',
            required:{
                value:true,
                message:'Interview date is required'
            },
        },
        {
            name:'phone_number' ,
            type:'text',
            title:'Phone Number',
            required:{
                value:true,
                message:'Phone number is required'
            },
        },
        {
            name:'notes' ,
            type:'textarea',
            title:'Notes',
        },
    ]
};
