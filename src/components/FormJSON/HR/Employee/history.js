export const history = {
    title: 'History Form',
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
            name:'designationId' ,
            type:'text',
            title:'Designation Id',
            required:{
                value:true,
                message:'Designation Id is required'
            },
            
        },
        {
            name:'branchId' ,
            type:'text',
            title:'Branch Id',
            required:{
                value:true,
                message:'Branch Id is required'
            },
            
        },
        
        {
            name:'fromDate' ,
            type:'date',
            title:'From Date',
         },

         {
            name:'toDate' ,
            type:'date',
            title:'To Date',
         },
         
         
    ]
};
