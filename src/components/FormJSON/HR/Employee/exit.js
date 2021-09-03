export const exit = {
    title: 'exit Form',
    Fields: [
        {
            name:'employeeId' ,
            type:'text',
            title:'Employee Id',
            required:{
                value:true,
                message:'Employee Id is required'
            },
            
        },
        {
            name:'resignationLetterDate' ,
            type:'date',
            title:'Resignation Letter Date',
            
        },
        {
            name:'relievingDate' ,
            type:'date',
            title:'Relieving Date',
            
        },
        {
            name:'reasonForLeaving' ,
            type:'text',
            title:'Reason For Leaving',
            options: [
                {
                    value: 'better_prospects',
                    label: 'Better Prospects',
                },
                {
                    value: 'health_concern',
                    label: 'Health Concern',
                },
                
                
            ],  
            
        },
        {
            name:'leaveEnchashed' ,
            type:'text',
            title:'Reason For Leaving',
            options: [
                {
                    value: 'yes',
                    label: 'yes',
                },
                {
                    value: 'no',
                    label: 'no',
                },
                                
            ],  
            
        },
        {
            name:'encashmentDate' ,
            type:'date',
            title:'Encashment Date',
            
        },
        {
            name:'reasonForResignation' ,
            type:'text',
            title:'Reason For Resignation',
            
        },
        {
            name:'newWorkPlace' ,
            type:'text',
            title:'New Work Place',
            
        },
        {
            name:'feedback' ,
            type:'text',
            title:'Feedback',
            
        },


         
    ]
};
