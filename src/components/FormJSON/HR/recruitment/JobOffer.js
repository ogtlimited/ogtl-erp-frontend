export const jobOfferFormJson = {
    title: 'Job Offer Form',
    Fields: [
        {
            name:'job_applicant_id' ,
            type:'select',
            title:'Job Applicant',
            required:{
                value:true,
                message:'Job applicant is required'
            },
            options: []

        },
        {
            name:'status' ,
            type:'select',
            title:'Status',
            options: [
                {
                    value: 'AWAITING_RESPONSE',
                    label: 'Awaiting Response',
                },
                {
                    value: 'ACCEPTED',
                    label: 'Accepted',
                },
                {
                    value: 'REJECTED',
                    label: 'Rejected',
                },
            ],
        },
        {
            name:'offer_date' ,
            type:'date',
            title:'Offer Date',
            required:{
                value:true,
                message:'Offer date is required'
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
            options: []
        },
        {
            name:'job_offer_terms' ,
            type:'textarea',
            title:'Job Offer Terms',
            required:{
                value:true,
                message:'Job offer terms is required'
            },
        },
        {
            name:'terms_and_conditions' ,
            type:'textarea',
            title:'Terms and Conditions',
            required:{
                value:true,
                message:'Terms and conditions is required'
            },
        },
    ]
};
