export const scoreCards = {
    title: 'Score Card Form',
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
            name:'performanceScore' ,
            type:'text',
            title:'Performance Score',
            required:{
                value:true,
                message:'Performance Score is required'
            },
         },

         {
            name:'companyValuesScore' ,
            type:'text',
            title:'Company Values Score',
            required:{
                value:true,
                message:'Company Values Score is required'
            },
         },

         
         
         
    ]
};
