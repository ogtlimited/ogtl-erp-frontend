export const template = {
    title: 'Test Form',
    Fields: [
        {
            name:'test_type' ,
            type:'text',
            title:'Test Type',
            required:{
                value:true,
                message:'Test type is required'
            },

        },
        {
            name:'job_applicant_id' ,
            type:'text',
            title:'Job Applicant',
            required:{
                value:true,
                message:'Job applicant is required'
            },
        },
        {
            name:'status' ,
            type:'text',
            title:'Status',
            // required:{
            //     value:true,
            //     message:'Status is required'
            // },
        },
        {
            name:'hr_user' ,
            type:'text',
            title:'HR User',
            required:{
                value:true,
                message:'Hr user is required'
            },
        },
        {
            name:'score' ,
            type:'text',
            title:'Score',
            // required:{
            //     value:false,
            //     message:'Score is required'
            // },
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
            type:'text',
            title:'Notes',
            // required:{
            //     value:false,
            //     message:'Notes is required'
            // },
        },
    ]
};
