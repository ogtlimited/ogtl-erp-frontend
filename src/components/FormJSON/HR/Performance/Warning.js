
export const warningLetterFormJson = {
    title: 'Warning Letter Form',
    Fields: [
        {
            name:'employee_id' ,
            type:'text',
            title:'Employee',
            required:{
                value:true,
                message:'Employee is required'
            },

        },
        {
            name:'hr_user_id' ,
            type:'text',
            title:'HR User',
            required:{
                value:true,
                message:'Hr user is required'
            },
        },
        {
            name:'reason' ,
            type:'text',
            title:'Reason',
            required:{
                value:true,
                message:'Reason is required'
            },
        },
        {
            name:'details' ,
            type:'text',
            title:'Details',
            required:{
                value:true,
                message:'Details is required'
            },
        },
        {
            name:'actions' ,
            type:'text',
            title:'Actions',
            required:{
                value:true,
                message:'Actions are required'
            },
        },
        {
            name:'date_issued' ,
            type:'date',
            title:'Date Issued',
            required:{
                value:true,
                message:'Date issued is required'
            },
        },
    ]
};
