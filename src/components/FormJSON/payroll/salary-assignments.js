export const salaryAssignmentFormJson = {
    title: 'Salary Assignment Form',
    Fields: [
        {
            name:'employeeId' ,
            type:'text',
            title:'Employee',
            required:{
                value:true,
                message:'employeeId  is required'
            }
        },
        {
            name:'salaryStructure' ,
            type:'text',
            title:'Salary Structure',
            required:{
                value:true,
                message:'salary structure  is required'
            }
        },
        {
            name:'fromDate' ,
            type:'date',
            title:'Assignment Date',
            required:{
                value:true,
                message:'Assignment Date  is required'
            }
        },
        {
            name:'status' ,
            type:'text',
            title:'Status',
            required:{
                value:true,
                message:'Status Name is required'
            }
        },

    ]
};
