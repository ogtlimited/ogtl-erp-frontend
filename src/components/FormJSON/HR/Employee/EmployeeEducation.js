export const EmployeeEducationJson = {
    title: 'Employee Education',
    Fields: [
        {
            name:'school' ,
            type:'text',
            title:'School',
         },

         {
            name:'qualification' ,
            type:'text',
            title:'Qualification',
         },
         {
            name:'level' ,
            type:'select',
            title:'Level',
            options: [
                {
                    value: 'Graduate',
                    label: 'Graduate',
                },
                {
                    value: 'Post Graduate',
                    label: 'Post Graduate',
                },
                {
                    value: 'Under Graduate',
                    label: 'Under Graduate',
                },

                
            ],  
         },

        {
            name:'year_of_passing' ,
            type:'text',
            title:'Graduation Year',

        }
    ]
};