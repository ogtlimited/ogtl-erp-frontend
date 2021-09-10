export const client = {
    title: 'Clients',
    Fields: [
        {
            name:'client_name' ,
            type:'text',
            title:'Client Name',
            required:{
                value:true,
                message:'Client Name is required'
            }
        },
        {
            name:'email' ,
            type:'text',
            title:'Email',
            required:{
                value:true,
                message:'Email is required'
            }
        },
        {
            name:'address' ,
            type:'text',
            title:'Address'
        },
        {
            name:'contact_phone' ,
            type:'number',
            title:'Contact Phone',
            required:{
                value:true,
                message:'Contact Phone is required'
            },
        }
    ]
};