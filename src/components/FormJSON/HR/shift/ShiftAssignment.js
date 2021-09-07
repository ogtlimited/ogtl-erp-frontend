export const shiftAssignmentFormJson = {
    title: 'Shift Assignment Form',
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
            name:'shift_type_id' ,
            type:'select',
            title:'Shift Type',
            required:{
                value:true,
                message:'Shift type is required'
            },
            options: []
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
