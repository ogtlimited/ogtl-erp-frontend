
export const promotionFormJson = {
    title: 'Promotion Form',
    Fields: [
        {
            name:'employee' ,
            type:'text',
            title:'Employee',
            required:{
                value:true,
                message:'Employee is required'
            },

        },
        {
            name:'status' ,
            type:'text',
            title:'Status',

        },
        {
            name:'department' ,
            type:'text',
            title:'Department',

        },
        {
            name:'branch' ,
            type:'text',
            title:'Branch',

        },
        {
            name:'promotionDetails' ,
            type:'text',
            title:'Promotion Details',
        },
        {
            name:'promotionDate' ,
            type:'date',
            title:'Promotion Date Issued',

        },
    ]
};
