export const loanApplication = {
    title: 'Loan Application',
    Fields: [
        {
            name:'applicant_name_id' ,
            type:'number',
            title:'Application Name',
            required:{
                value:true,
                message:'Loan application name is required'
            }
        },
        {
            name:'status' ,
            type:'text',
            title:'Status',
            required:{
                value:true,
                message:'Status is required'
            }
        },
        {
            name:'loan_type_id' ,
            type:'number',
            title:'Loan type',
            required:{
                value:true,
                message:'Loan type is required'
            },
        },
        {
            name:'loan_amount' ,
            type:'number',
            title:'Loan amount',
            required:{
                value:true,
                message:'Loan amount is required'
            },
        },
        {
            name:'reason' ,
            type:'text',
            title:'Reason'
        },
        {
            name:'repayment_method' ,
            type:'text',
            title:'Repayment method',
            required:{
                value:true,
                message:'Repayment method is required'
            },
        }
        
    ]
};