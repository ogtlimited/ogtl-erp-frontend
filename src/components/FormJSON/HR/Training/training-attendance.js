export const trainingAttendance = {
    title: 'Training Attendance',
    Fields: [
        {
            name:'employee_id' ,
            type:'number',
            title:'Employee',
            required:{
                value:true,
                message:'Employee is required'
            }
        },
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
            name:'feedback' ,
            type:'text',
            title:'Feedback'
        },
        
    ]
};