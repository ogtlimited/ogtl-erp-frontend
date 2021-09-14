export const AssetFormJson = {
    title: ' Asset Form',
    Fields: [
        {
            name:'assetName' ,
            type:'text',
            title:'Asset Name',
            required:{
                value:true,
                message:'Asset Name is required'
            }
        },
        {
            name:'assigned_to' ,
            type:'select',
            title:'Assigned To',
            required:{
                value:true,
                message:'Assigned To is required'
            }
        },

        {
            name:'purchaseDate' ,
            type:'date',
            title:'Purchase Date',
            required:{
                value:true,
                message:'Purchase Date is required'
            }
        },
        
        {
            name:'manufacturer' ,
            type:'text',
            title:'Manufacturer',
            required:{
                value:true,
                message:'Manufacturer is required'
            }
        },

        {
            name:'supplier' ,
            type:'text',
            title:'Supplier',
            required:{
                value:true,
                message:'Supplier is required'
            }
        },

        {
            name:'model' ,
            type:'text',
            title:'Model',
            required:{
                value:true,
                message:'Model is required'
            }
        },

        {
            name:'serialNumber' ,
            type:'text',
            title:'Serial Number',
            required:{
                value:true,
                message:'serialNumber is required'
            }
        },
        {
            name:'condition' ,
            type:'select',
            full: false,
            title:'Condition',
            options: [
               {
                   value: 'Fair',
                   label: 'Fair',
               },
               {
                   value: 'Terrible',
                   label: 'Terrible',
               },
               {
                value: 'Excellent',
                label: 'Excellent',
            },
               
           ],
            required:{
                value:true,
                message:'Condition is required'
            }
        },

        {
            name:'warranty' ,
            type:'select',
            title:'Warranty',
            options: [
                {
                    value: '6 Months',
                    label: '6 Months',
                },
                {
                    value: '1 year',
                    label: '1 year',
                },
                {
                 value: 'More than 1 year',
                 label: 'More than 1 year',
             },
                
            ],
            required:{
                value:true,
                message:'warranty is required'
            }
        },

        {
            name:'value' ,
            type:'text',
            title:'Value',
            required:{
                value:true,
                message:'value is required'
            }
        },
        {
            name:'description' ,
            type:'textarea',
            title:'Description',
        
        },
        
    ]
};