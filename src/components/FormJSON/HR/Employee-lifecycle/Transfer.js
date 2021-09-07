
export const transferFormJson = {
    title: 'Transfer Form',
    Fields: [
        {
            name:'employeeId' ,
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
            name:'transferDetails' ,
            type:'text',
            title:'Transfer Details',
        },
        {
            name:'transferDate' ,
            type:'date',
            title:'Transfer Date Issued',

        },
    ]
};
