export const leaveType = {
    title: 'Leave Type Form',
    Fields: [
       
        {
            name:'leaveName' ,
            type:'text',
            title:'Leave Name',
            required:{
                value:true,
                message:'Leave Name is required'
            },
        },
        {
            name:'maxLeaves' ,
            type:'text',
            title:'Max Leaves',
            required:{
                value:true,
                message:'Max Leaves is required'
            },
            
        },
        
         {
            name:'applicableAfter' ,
            type:'text',
            title:'Applicable After',
         },
         {
            name:'maxContinousDays' ,
            type:'text',
            title:'Max Continous Days',
         },
        
         {
            name:'isCarryForward' ,
            type:'text',
            title:'Is Carry Forward',
         },

         {
            name:'isWithoutPay' ,
            type:'text',
            title:'Is Without Pay',
         },

         {
            name:'isOptional' ,
            type:'text',
            title:'Is Optional',
         },

         {
            name:'allowNegativeBalance' ,
            type:'text',
            title:'Allow Negative Balance',
         },

         {
            name:'includeHolidayLeaves' ,
            type:'text',
            title:'Include Holiday Leaves',
         },
   
         {
            name:'isCompensatory' ,
            type:'text',
            title:'Is Compensatory',
         },
         
    ]
};
