export const LeaveApplicationFormJSON = {
    title: 'Application Form',
    Fields: [
       
        {
            name:'employee_id' ,
            type:'select',
            title:'Employee Id',
            options: [],
            required:{
                value:true,
                message:'Employee Id is required'
            },
        },
        {
            name:'leave_type_id' ,
            type:'select',
            title:'Leave Type Id',
            options: [
                {
                    value: 'Casual',
                    label: 'Casual Leave',
                },
                {
                    value: 'Sick',
                    label: 'Sick Leave',
                },
                {
                    value: 'Annual',
                    label: 'Annual Leave',
                },
                {
                    value: 'Maternity',
                    label: 'Maternity Leave',
                },
                {
                    value: 'Without Pay',
                    label: 'Leave Without Pay',
                },
            ],
            required:{
                value:true,
                message:'Leave Type Id is required'
            },
            
        },
        {
            name:'from_date' ,
            type:'date',
            title:'From Date',
            required:{
                value:true,
                message:'From Date is required'
            },
            
        },
        {
            name:'to_date' ,
            type:'date',
            title:'To Date',
            required:{
                value:true,
                message:'To Date is required'
            },
            
        },
        
        {
            name:'leave_approver' ,
            type:'text',
            title:'Leave Approver',
            required:{
                value:true,
                message:'To Date is required'
            },
         },

         {
            name:'posting_date' ,
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
