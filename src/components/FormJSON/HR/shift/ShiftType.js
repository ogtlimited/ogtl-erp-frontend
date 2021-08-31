export const template = {
    title: 'Shift Type Form',
    Fields: [
        {
            name:'shift_name' ,
            type:'text',
            title:'Shift Name',
            required:{
                value:true,
                message:'Shift name is required'
            },

        },
        {
            name:'start_time' ,
            type:'date',
            title:'Start Time',
            required:{
                value:true,
                message:'Start time is required'
            },
        },
        {
            name:'end_time' ,
            type:'date',
            title:'End Time',
            required:{
                value:true,
                message:'End time is required'
            },
        },
    ]
};
