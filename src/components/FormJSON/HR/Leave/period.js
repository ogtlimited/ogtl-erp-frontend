export const period = {
    title: 'Period Form',
    Fields: [
       
        {
            name:'fromDate' ,
            type:'date',
            title:'From Date',
            required:{
                value:true,
                message:'From Date is required'
            },
            
        },
        {
            name:'toDate' ,
            type:'date',
            title:'To Date',
            required:{
                value:true,
                message:'To Date is required'
            },
            
        },
        
        {
            name:'isActive' ,
            type:'text',
            title:'isActive',
         },

         
        
         
         
    ]
};
