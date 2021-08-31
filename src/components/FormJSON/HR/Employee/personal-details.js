export const personalDetails = {
    title: 'Personal Details Form',
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
            name:'passportNumber' ,
            type:'text',
            title:'Passport Number',
         },

         {
            name:'dateOfIssue' ,
            type:'date',
            title:'Date Of Issue',
         },
        {
            name:'validUpTo' ,
            type:'date',
            title:'Valid Up To',
         },

         {
            name:'placeOfIssue' ,
            type:'text',
            title:'Placee Of Issue',
         },
         {
            name:'maritalStatus' ,
            type:'text',
            title:'Marital Status',
         },
         {
            name:'bloodGroup' ,
            type:'text',
            title:'Blood Group',
         },
         
         
         
    ]
};
