
export const onBoardingFormJson = {
    title: 'On-boarding Form',
    Fields: [
        {
            name:'jobApplicant' ,
            type:'text',
            title:'Job Applicant',
            required:{
                value:true,
                message:'Job Applicant is required'
            },

        },
        {
            name:'status' ,
            type:'text',
            title:'Status',

        },
        {
            name:'employeeOnboardingTemplate' ,
            type:'text',
            title:'Employee On-boarding Template',
            required:{
                value:true,
                message:'Employee On-boarding Template is required'
            },
        },
        {
            name:'department' ,
            type:'text',
            title:'Department',
            required:{
                value:true,
                message:'Actions are required'
            },
        },
        {
            name:'designation' ,
            type:'text',
            title:'Designation',
            required:{
                value:true,
                message:'Designation is required'
            },
        },
        {
            name:'employee_grade' ,
            type:'text',
            title:'Employee Grade',
        },
        {
            name:'campaign' ,
            type:'text',
            title:'Campaign',
        },
        {
            name:'branch' ,
            type:'text',
            title:'Branch',
        },
        {
            name:'dateOfJoining' ,
            type:'date',
            title:'Date Of Joining',
        },

    ]
};
