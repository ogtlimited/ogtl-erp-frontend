
export const promotionFormJson = {
    title: 'Promotion Form',
    Fields: [
        {
            name:'employee' ,
            type:'select',
            title:'Employee',
            required:{
                value:true,
                message:'Employee is required'
            },

        },
        {
            name:'newDesignation' ,
            type:'select',
            title:'Designation',

        },
       
        {
            name:'promotionDate' ,
            type:'date',
            title:'Promotion Date Issued',

        },
    ]
};
