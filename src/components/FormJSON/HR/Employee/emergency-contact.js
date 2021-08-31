export const emergencyContact = {
    title: 'emergencyContact Form',
    Fields: [
        {
            name:'employeeId' ,
            type:'text',
            title:'Employee Id',
            required:{
                value:true,
                message:'Employee Id is required'
            },
            
        },
        {
            name:'emergencyPhone' ,
            type:'text',
            title:'Emergency Phone',
            required:{
                value:true,
                message:'Employee Emergency Phone is required'
            },
            validation:function(val){
                return val.length ==11 || 'Required Length is 11';
            }
        },
        {
            name:'emergencyContactName' ,
            type:'text',
            title:'Emergency Contact Name',
            required:{
                value:true,
                message:'Emergency Contact Name is required'
            },
           
        },
        {
            name:'relation' ,
            type:'text',
            title:'relation',
            required:{
                value:true,
                message:'Emergency Contact relation is required'
            },
         },

         
    ]
};
