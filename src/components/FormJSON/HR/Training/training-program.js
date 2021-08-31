export const trainingProgram = {
    title: 'Training program',
    Fields: [
        {
            name:'event_name' ,
            type:'text',
            title:'Program Name',
            required:{
                value:true,
                message:'Program name is required'
            }
        },
        {
            name:'company_id' ,
            type:'number',
            title:'Company',
            required:{
                value:true,
                message:'Company is required'
            }
        },
        {
            name:'status' ,
            type:'text',
            title:'Status',
            required:{
                value:true,
                message:'Status is required'
            },
        },
        {
            name:'trainer_name' ,
            type:'text',
            title:'Trainer name',
            required:{
                value:true,
                message:'Trainer name is required'
            },
        },
        {
            name:'trainer_email' ,
            type:'text',
            title:'Trainer email',
            required:{
                value:true,
                message:'Trainer email is required'
            },
        },
        {
            name:'supplier_id' ,
            type:'number',
            title:'Supplier',
            required:{
                value:true,
                message:'Supplier is required'
            },
        },
        {
            name:'contact_number' ,
            type:'number',
            title:'Contact Number',
            required:{
                value:true,
                message:'Contact number is required'
            },
        },
        {
            name:'description' ,
            type:'text',
            title:'Description'
        },
        
    ]
};