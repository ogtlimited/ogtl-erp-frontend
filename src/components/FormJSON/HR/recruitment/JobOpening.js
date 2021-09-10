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
            type:'select',
            title:'Designation',
            required:{
                value:true,
                message:'Designation is required'
            },
            options:[]
        },
        {
            name:'project_id' ,
            type:'select',
            title:'Project',
            required:{
                value:true,
                message:'Project is required'
            },
            options:[]
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
            type:'textarea',
            title:'Description',
            required:{
                value:true,
                message:'Description is required'
            },
        },
    ]
};
