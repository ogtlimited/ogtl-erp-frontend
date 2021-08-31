export const contactDetails = {
    title: 'ContactDetails Form',
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
            name:'mobile' ,
            type:'text',
            title:'mobile',
            required:{
                value:true,
                message:'Employee mobile is required'
            },
            validation:function(val){
                return val.length ==11 || 'Required Length is 11';
            }
        },
        {
            name:'personalEmail' ,
            type:'email',
            title:'Personal Email',
            required:{
                value:true,
                message:'Personal Email is required'
            },
            validation:function(val){
                return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) || 'Valid Email Required';
            }
        },
        {
            name:'permanentAddressIs' ,
            type:'text',
            title:'Permanent Address Type',
         },

         {
            name:'permanentAddress' ,
            type:'text',
            title:'Permanent Address',
         },
         {
            name:'currentAddressIs' ,
            type:'text',
            title:'Current Address Type',
         },

         {
            name:'currentAddress' ,
            type:'text',
            title:'Current Address',
         },
    ]
};
