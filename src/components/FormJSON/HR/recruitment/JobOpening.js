export const jobOpeningFormJson = {
    title: 'Job Opening Form',
    Fields: [
        {
            name:'job_title' ,
            type:'text',
            title:'Job Title',
            required:{
                value:true,
                message:'Job title is required'
            },

        },
        {
            name:'designation_id' ,
            type:'text',
            title:'Designation',
            required:{
                value:true,
                message:'Designation is required'
            },
        },
        {
            name:'campaign_id' ,
            type:'text',
            title:'Campaign',
            required:{
                value:true,
                message:'Campaign is required'
            },
        },
        {
            name:'status' ,
            type:'select',
            title:'Status',
            options: [
                {
                    value: 'CLOSED',
                    label: 'Closed',
                },
                {
                    value: 'OPEN',
                    label: 'Open',
                },

            ]
        },
        {
            name:'description' ,
            type:'text',
            title:'Description',
            required:{
                value:true,
                message:'Description is required'
            },
        },
    ]
};
