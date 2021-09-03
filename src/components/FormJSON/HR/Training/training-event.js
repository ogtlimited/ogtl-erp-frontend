export const trainingEvent = {
    title: 'Training event',
    Fields: [
        {
            name:'event_name' ,
            type:'text',
            title:'Event Name',
            required:{
                value:true,
                message:'Event name is required'
            }
        },
        {
            name:'event_type' ,
            type:'text',
            title:'Event type',
            required:{
                value:true,
                message:'Event type is required'
            }
        },
        {
            name:'training_program_id' ,
            type:'number',
            title:'Training Program',
            required:{
                value:true,
                message:'Training program is required'
            },
        },
        {
            name:'level' ,
            type:'text',
            title:'Level',
            required:{
                value:true,
                message:'Level is required'
            },
        },
        {
            name:'event_status' ,
            type:'text',
            title:'Event Status',
            required:{
                value:true,
                message:'Event status is required'
            },
        },
        {
            name:'company_id' ,
            type:'number',
            title:'Company',
            required:{
                value:true,
                message:'company is required'
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
        {
            name:'has_certificate' ,
            type:'checkbox',
            title:'Has certificate',
            required:{
                value:true,
                message:'Certificate is required'
            },
        },
        {
            name:'course' ,
            type:'text',
            title:'Course',
            required:{
                value:true,
                message:'course is required'
            },
        },
        {
            name:'start_time' ,
            type:'text',
            title:'Start time',
            required:{
                value:true,
                message:'start time is required'
            },
        },
        {
            name:'end_time' ,
            type:'text',
            title:'End time',
            required:{
                value:true,
                message:'End time is required'
            },
        },
        {
            name:'introduction' ,
            type:'text',
            title:'Introduction'
        },
        
    ]
};