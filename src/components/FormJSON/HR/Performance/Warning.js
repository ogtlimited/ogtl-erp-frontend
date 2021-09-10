
export const warningLetterFormJson = {
    title: 'Warning Letter Form',
    Fields: [
        {
            name:'employee_id' ,
            type:'select',
            title:'Employee',
            required:{
                value:true,
                message:'Employee is required'
            },
            options: []

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
        {
            name:'reason' ,
            type:'textarea',
            title:'Reason',
            required:{
                value:true,
                message:'Reason is required'
            },
        },
        {
            name:'details' ,
            type:'textarea',
            title:'Details',
            required:{
                value:true,
                message:'Details is required'
            },
        },
        {
            name:'actions' ,
            type:'textarea',
            title:'Actions',
            required:{
                value:true,
                message:'Actions are required'
            },
        },

    ]
};
