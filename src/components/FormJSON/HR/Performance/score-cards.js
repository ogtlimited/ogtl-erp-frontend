export const scoreCardsJSON = {
    title: 'Score Card Form',
    Fields: [
       
        {
            name:'employee_id' ,
            type:'select',
            title:'Employee Id',
            required:{
                value:true,
                message:'Employee Id is required'
            },
            options: []
            
        },
        
        {
            name:'performance_score' ,
            type:'text',
            title:'Performance Score',
            required:{
                value:true,
                message:'Performance Score is required'
            },
         },

         {
            name:'company_values_score' ,
            type:'text',
            title:'Company Values Score',
            required:{
                value:true,
                message:'Company Values Score is required'
            },
         },

         
         
         
    ]
};
