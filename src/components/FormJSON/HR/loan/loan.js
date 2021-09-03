export const loan = {
    title: 'Loans',
    Fields: [
        {
            name:'applicant_type_id' ,
            type:'number',
            title:'Applicant Type',
            required:{
                value:true,
                message:'Applicant type is required'
            }
        },
        {
            name:'applicant_id' ,
            type:'number',
            title:'Applicant',
            required:{
                value:true,
                message:'Applicant is required'
            }
        },
        {
            name:'loan_type_id' ,
            type:'text',
            title:'Loan Type',
            required:{
                value:true,
                message:'Loan type is required'
            },
        },
        {
            name:'loan_application_id' ,
            type:'text',
            title:'Loan Application',
            required:{
                value:true,
                message:'Loan application is required'
            },
        },
        {
            name:'repay_from_salary' ,
            type:'checkbox',
            title:'Repay from salary'
        },
        {
            name:'loan_amount' ,
            type:'number',
            title:'Loan Amount',
            required:{
                value:true,
                message:'Loan amount is required'
            },
        },
        {
            name:'repayment_start_date' ,
            type:'text',
            title:'Repayment start date',
            required:{
                value:true,
                message:'start date is required'
            },
        },
        {
            name:'repayment_method' ,
            type:'text',
            title:'Repayment Method',
            required:{
                value:true,
                message:'Repayment Method is required'
            },
        },
        {
            name:'mode_of_payment_id' ,
            type:'number',
            title:'Mode of payment',
            required:{
                value:true,
                message:'Mode of payment is required'
            },
        },
        {
            name:'loan_account_id' ,
            type:'number',
            title:'Loan account',
            required:{
                value:true,
                message:'Loan account is required'
            },
        },
        {
            name:'payment_account_id' ,
            type:'number',
            title:'payment account',
            required:{
                value:true,
                message:'payment account is required'
            },
        },
        {
            name:'interest_income_account_id' ,
            type:'number',
            title:'payment income account',
            required:{
                value:true,
                message:'payment income account is required'
            },
        },
        {
            name:'status_id' ,
            type:'number',
            title:'Status'
        },
        
    ]
};