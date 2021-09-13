export const salaryComponentsFormJson = {
    title: 'Salary Components Form',
    Fields: [
        {
            name:'title' ,
            type:'text',
            title:'Title',
            required:{
                value:true,
                message:'title  is required'
            }
        },
        {
            name:'amount' ,
            type:'text',
            title:'Amount',
            required:{
                value:true,
                message:'amount  is required'
            }
        },
        {
            name:'type' ,
            type:'select',
            title:'Type',
            required:{
                value:true,
                message:'description  is required'
            }
        },
        {
            name:'status' ,
            type:'text',
            title:'Status',
            required:{
                value:true,
                message:'Status Name is required'
            }
        },
        {
            name:'description' ,
            type:'textarea',
            title:'Description',
        }

    ]
};
