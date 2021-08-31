export const template = {
    title: 'Shift Assignment Form',
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
            name:'shift_type_id' ,
            type:'text',
            title:'Shift Type',
            required:{
                value:true,
                message:'Shift type is required'
            },
        },
        {
            name:'assignment_date' ,
            type:'date',
            title:'From Date',
            required:{
                value:true,
                message:'Assignment Date is required'
            },
        },

    ]
};
