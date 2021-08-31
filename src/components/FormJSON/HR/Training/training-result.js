export const trainingResult = {
    title: 'Training Result',
    Fields: [
        {
            name:'training_event_id' ,
            type:'number',
            title:'Training event',
            required:{
                value:true,
                message:'Training event is required'
            }
        },
        {
            name:'training_result' ,
            type:'text',
            title:'Training result',
            required:{
                value:true,
                message:'Result is required'
            }
        },
        
    ]
};