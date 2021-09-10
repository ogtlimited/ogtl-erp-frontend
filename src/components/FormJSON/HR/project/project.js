export const project = {
    title: 'Projects',
    Fields: [
        {
            name:'project_name' ,
            type:'text',
            title:'Project Name',
            required:{
                value:true,
                message:'Project Name is required'
            }
        },
        {
            name:'client_id' ,
            type:'number',
            title:'Client',
            required:{
                value:true,
                message:'Client is required'
            }
        },
        {
            name:'type' ,
            type:'text',
            title:'Loan Type',
            required:{
                value:true,
                message:'type is required'
            },
        },
        {
            name:'objectives' ,
            type:'text',
            title:'Objectives',
            required:{
                value:true,
                message:'objectives is required'
            },
        },
        {
            name:'hours_of_operation' ,
            type:'text',
            title:'Hours of operation',
            required:{
                value:true,
                message:'Hours of operation is required'
            },
        },
        {
            name:'type_of_employees' ,
            type:'text',
            title:'Employee Types',
            required:{
                value:true,
                message:'Employee Types is required'
            },
        },
        {
            name:'start_date' ,
            type:'text',
            title:'start date',
            required:{
                value:true,
                message:'start date is required'
            },
        },
        {
            name:'end_date' ,
            type:'text',
            title:'End date',
            required:{
                value:true,
                message:'End date is required'
            },
        },
        {
            name:'number_of_employees' ,
            type:'number',
            title:'Number of employees',
            required:{
                value:true,
                message:'Number of employees is required'
            },
        },
        {
            name:'billing_structure' ,
            type:'text',
            title:'Billing Structure',
            required:{
                value:true,
                message:'Billing Structure is required'
            },
        },
        {
            name:'diallers' ,
            type:'text',
            title:'Diallers',
            required:{
                value:true,
                message:'Diallers is required'
            },
        },
        {
            name:'documents' ,
            type:'text',
            title:'Documents'
        },
        {
            name:'creator' ,
            type:'number',
            title:'Creator'
        },
        {
            name:'approved' ,
            type:'string',
            title:'Approved'
        },
        {
            name:'manager' ,
            type:'number',
            title:'Manager'
        },
        {
            name:'quality_analyst' ,
            type:'number',
            title:'Quality Analyst'
        },
    ]
};