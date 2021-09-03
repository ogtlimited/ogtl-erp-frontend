export const PersonalDetailJson = {
    title: 'Personal Details',
    Fields: [
        
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
            title:'Place Of Issue',
         },
         {
            name:'maritalStatus' ,
            type:'select',
            title:'Marital Status',
            options: [
               {
                   value: 'single',
                   label: 'Single',
               },
               {
                   value: 'married',
                   label: 'Married',
               },
               {
                   value: 'divorced',
                   label: 'Divorced',
               },
               {
                  value: 'widowed',
                  label: 'Widowed',
              },

               
           ],  
            
         },
         {
            name:'bloodGroup' ,
            type:'select',
            title:'Blood Group',
            options: [
               {
                  value: 'A+',
                  label: 'A+',
              },
              {
               value: 'A-',
               label: 'A-',
             },
             {
               value: 'B+',
               label: 'B+',
             },
             {
               value: 'AB+',
               label: 'AB+',
             },
             {
               value: 'AB-',
               label: 'AB-',
             },
             {
               value: 'O+',
               label: 'O+',
             },
             {
               value: 'O-',
               label: 'O-',
             },

            ]
         },
         
        
         
    ]
};