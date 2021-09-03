export const loanType = {
    title: 'Loan Type',
    Fields: [
        {
            name:'loan_name' ,
            type:'text',
            title:'Loan Name',
            required:{
                value:true,
                message:'Loan name is required'
            }
        },
        {
            name:'maximum_loan_amount' ,
            type:'number',
            title:'Maximum loan amount',
            required:{
                value:true,
                message:'Maximum loan amount is required'
            }
        },
        {
            name:'rate_of_interest' ,
            type:'number',
            title:'Rate of Interest',
            required:{
                value:true,
                message:'Rate of interest is required'
            },
        },
        {
            name:'description' ,
            type:'text',
            title:'Description'
        },
        {
            name:'disabled' ,
            type:'checkbox',
            title:'Disable'
        }
        
    ]
};