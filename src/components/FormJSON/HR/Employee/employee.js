export const employeeFormJson = {
    title: 'Employee Form',
    Fields: [
        {
            name:'first_name' ,
            type:'text',
            title:'First Name',
            required:{
                value:true,
                message:'Employee First Name is required'
            },
            validation:function(val){
                return val.length >=5 || 'Min Length is 5';
            }
        },
        {
            name:'last_name' ,
            type:'text',
            title:'Last Name',
            required:{
                value:true,
                message:'Employee Last Name is required'
            },
        },
        {
            name:'middle_name' ,
            type:'text',
            title:'Middle Name',
            required:{
                value:false,
            },
        },
        {
            name:'ogid' ,
            type:'text',
            title:'OGID',
            required:{
                value:false,
            },
        },
        {
            name:'password' ,
            type:'password',
            title:'Password',
            required:{
                value:true,
                message:'Password is required'
            },
            validation:function(val){
                return val.length >=5 || 'Min Length is 5';
            }
        },
        {
            name:'company_email' ,
            type:'email',
            title:'Email',
            required:{
                value:true,
                message:'Email is required'
            },
            validation:function(val){
                return val.length >=5 || 'Min Length is 5';
            }
        },
        {
            name:'isAdmin' ,
            type:'check',
            title:'Admin User',
            required:{
                value:true,
                message:'Email is required'
            },
        },
        {
            name:'date_of_joining' ,
            type:'date',
            title:'Date of joining',
            required:{
                value:true,
                message:'Date of joining is required'
            }
        },
        {
            name:'designation' ,
            type:'text',
            title:'Designation',
            required:{
                value:true,
                message:'designation is required'
            }
        },
        {
            name:'department' ,
            type:'text',
            title:'Department',
            required:{
                value:true,
                message:'department is required'
            }
        },
        {
            name:'default_shift' ,
            type:'text',
            title:'Shift',
            
        },
        {
            name:'employment_type' ,
            type:'text',
            title:'Employment type',
        },
        {
            name:'gender' ,
            type:'text',
            title:'Gender',
        },
        {
            name:'image' ,
            type:'file',
            title:'Image',
        },
        {
            name:'status' ,
            type:'text',
            title:'Status',
        },
        {
            name:'role' ,
            type:'role',
            title:'Role',
            roleList: [
                {
                  name: "HR",
                  abbrev: "HR",
                  nestedArray: [{ name: "HR_read"}, {name: "HR_write"},  {name: "HR_update"}, {name: "HR_delete" }]
                },
                {
                  name: "Accounting",
                  abbrev: "ACC",
                  nestedArray: [{ name: "ACC_read"}, {name: "ACC_write"},  {name: "ACC_update"}, {name: "ACC_delete" }]
                },
                {
                  name: "Facility",
                  abbrev: "FAC",
                  nestedArray: [{ name: "FAC_read"}, {name: "FAC_write"},  {name: "FAC_update"}, {name: "FAC_delete" }]
                },
                {
                  name: "IT",
                  abbrev: "IT",
                  nestedArray: [{ name: "IT_read"}, {name: "IT_write"},  {name: "IT_update"}, {name: "IT_delete" }]
                }
              ]
        },
       
    ]
};