export const education = {
    title: 'Education Form',
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
            type:'text',
            title:'Level',
         },

         {
            name:'yearOfPassing' ,
            type:'text',
            title:'Year Of Passing',

            validation:function(val){
                return val.length ==4 || 'Enter a Valid Year';
            }
         },
    ]
};
