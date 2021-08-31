export const shiftRequestFormJson = {
    title: 'Shift Request Form',
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
            name:'from_date' ,
            type:'date',
            title:'From Date',
            required:{
                value:true,
                message:'From Date is required'
            },
        },
        {
            name:'to_date' ,
            type:'date',
            title:'To Date',
            required:{
                value:true,
                message:'To Date is required'
            },
        },
    ]
};
