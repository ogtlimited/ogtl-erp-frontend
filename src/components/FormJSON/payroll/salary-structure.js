export const salaryStructureFormJson = {
    title: 'Salary Structure Form',
    Fields: [
        {
            name:'deductions' ,
            type:'select',
            title:'Deductions',
            required:{
                value:true,
                message:'deductions is required'
            },
            validation:function(val){
                return val.length >=5 || 'Min Length is 5';
            }
        },
        {
            name:'earnings' ,
            type:'select',
            title:'Earnings',
            required:{
                value:true,
                message:'earnings is required'
            }
        },
        {
            name:'status' ,
            type:'select',
            title:'Status',
            required:{
                value:true,
                message:'status is required'
            }
        },
    ]
};
