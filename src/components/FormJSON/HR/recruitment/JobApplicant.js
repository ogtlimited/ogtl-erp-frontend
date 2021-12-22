export const jobAApplicationFormJSON = {
    title: 'Job Applicant Form',
    Fields: [
        {
            name:'first_name' ,
            type:'text',
            title:'First Name',
            required:{
                value:true,
                message:'First Name is required'
            },

        },
        {
            name:'last_name' ,
            type:'text',
            title:'Last Name',
            required:{
                value:true,
                message:'Last Name is required'
            },

        },
        {
            name:'middle_name' ,
            type:'text',
            title:'Middle Name',
            required:{
                value:false,
                message:'Middle Name is required'
            },

        },
        {
            name:'email' ,
            type:'text',
            title:'Email',
            required:{
                value:true,
                message:'Email is required'
            },

        },
        {
            name:'resume_attachment' ,
            type:'file',
            title:'Resume',
            required:{
                value:true,
                message:'Resume is required'
            },

        },
        {
            name:'video_attachment' ,
            type:'text',
            title:'Video Attachment',
            required:{
                value:true,
                message:'video Aattachment is required'
            },
        },
        {
            name:'cover_letter' ,
            type:'file',
            title:'Cover Letter',
            required:{
                value:false,
                message:'Cover Letter is required'
            },
        },
       
    ]
};
