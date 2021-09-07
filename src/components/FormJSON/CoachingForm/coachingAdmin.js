export const coachingFormJSON = {
    title: 'Coaching Form',
    Fields: [
       
        {
            name:'employeeId' ,
            type:'select',
            title:'Employee',
            options: [],
            required:{
                value:true,
                message:'Employee Id is required'
            },
        },
        
        {
            name:'incident_date' ,
            type:'date',
            title:'Incident Date',
            required:{
                value:true,
                message:'Incident Date is required'
            },
            
        },
        {
            name:'supervisor' ,
            type:'text',
            title:'Supervisor ',
            required:{
                value:true,
                message:'Supervisor is required'
            },
            
        },
        
        {
            name:'coaching_type' ,
            type:'text',
            title:'Coaching Type',
         },

         {
            name:'goals' ,
            type:'textarea',
            title:'Goals',
         },
         {
            name:'reality' ,
            type:'textarea',
            title:'Reality',
         },
         {
            name:'opportunities' ,
            type:'textarea',
            title:'Opportunities/Options',
         },
         {
            name:'way_forward' ,
            type:'textarea',
            title:'Way Forward',
         },
         {
            name:'status' ,
            type:'select',
            title:'Status',
            options: [
                {
                    label: "Draft",
                    value: "draft"
                },
                {
                    label: "Submitted",
                    value: "submitted"
                }
            ]
         },
         
         
    ]
};
