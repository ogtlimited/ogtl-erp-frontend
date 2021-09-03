export const ContactDetailJson = {
    title: 'Contact Details',
    Fields: [
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
        },
       {
           name:'permanentAddressIs' ,
           type:'select',
           title:'Permanent Address Type',
           options: [
               {
                   value: 'Rented',
                   label: 'Rented',
               },
               {
                   value: 'Owned',
                   label: 'Owned',
               },
               
           ],
        },

        {
           name:'permanentAddress' ,
           type:'text',
           title:'Permanent Address',
        },
        {
           name:'currentAddressIs' ,
           type:'select',
           title:'Current Address Type',
           options: [
               {
                   value: 'Rented',
                   label: 'Rented',
               },
               {
                   value: 'Owned',
                   label: 'Owned',
               },
               
           ],
        },

        {
           name:'currentAddress' ,
           type:'text',
           title:'Current Address',
        },
   ]
};