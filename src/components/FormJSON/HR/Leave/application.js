export const LeaveApplicationFormJSON = {
    title: 'Application Form',
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
            name:'leaveTypeId' ,
            type:'select',
            title:'Leave Type Id',
            options: [
                {
                    value: 'Casual',
                    label: 'Casual Leave',
                },
                {
                    value: 'Medical',
                    label: 'Medical Leave',
                },
                {
                    value: 'Maternity',
                    label: 'Maternity Leave',
                },
            ],
            required:{
                value:true,
                message:'Leave Type Id is required'
            },
            
        },
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
            name:'LeaveApprover' ,
            type:'text',
            title:'Leave Approver',
            required:{
                value:true,
                message:'To Date is required'
            },
         },

         {
            name:'postingDate' ,
            type:'date',
            title:'Posting Date',
         },
         {
            name:'reason' ,
            type:'text',
            title:'Reason',
         },
        
         {
            name:'status' ,
            type:'text',
            title:'Status',
         },
   
         
    ]
};
