export const terminationFormJson = {
    title: 'Termination Form',
    Fields: [
        {
            name:'employee' ,
            type:'select',
            title:'Employee',
            required:{
                value:true,
                message:'Employee is required'
            },

        },
        {
            name:'reason' ,
            type:'text',
            title:'Reason',

        },
       
        {
            name:'terminationType' ,
            type:'select',
            title:'Termination Type ',
            options: [
                {
                    value: "misconduct",
                    label: "Misconduct",
                  },
                  {
                    value: "others",
                    label: "Others",
                  },
            ],

        },
        {
            name:'terminationDate' ,
            type:'date',
            title:'Termination Date ',

        },
    ]
};