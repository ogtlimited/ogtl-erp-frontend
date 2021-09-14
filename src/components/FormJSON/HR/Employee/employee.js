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
                value: false,
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
            name:'reports_to' ,
            type:'text',
            title:'Reports to',
            required:{
                value:true,
                message:'Reports to is required'
            },
        },
        {
            name:'isAdmin' ,
            type:'check',
            title:'Admin User',
            required:{
                value:true,
                message:'Admin User is required'
            },
        },
        {
            name:'employeeType' ,
            type:'select',
            title:'Employment Type',
            options: [
                {
                    label: "Apprentice",
                    value: "Apprentice"
                },
                {
                    label: "Intern",
                    value: "Intern"
                },
                {
                    label: "Commission",
                    value: "Commission"
                },
                {
                    label: "Contract",
                    value: "Contract"
                },
                {
                    label: "Probation",
                    value: "Probation"
                },
                {
                    label: "PartTime",
                    value: "PartTime"
                },
                {
                    label: "FullTime",
                    value: "FullTime"
                },
            ],
            required:{
                value:true,
                message:'Admin User is required'
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
            type:'select',
            title:'Designation',
            required:{
                value:true,
                message:'designation is required'
            },
            options: []
        },
        {
            name:'department' ,
            type:'select',
            title:'Department',
            required:{
                value:true,
                message:'department is required'
            },
            options: []
        },
        {
            name:'projectId' ,
            type:'select',
            title:'Campaign',
            required:{
                value:true,
                message:'Campaign is required'
            },
            options: []
        },
        {
            name:'default_shift' ,
            type:'select',
            title:'Shift',
            required:{
                value:true,
                message:'shift is required'
            },
            options: []
        },
        {
            name:'gender' ,
            type:'select',
            title:'Gender',
            options: [
                {
                    label: "Male",
                    value: "male"
                },
                {
                    label: "Female",
                    value: "female"
                }
            ]
        },
        {
            name:'status' ,
            type:'select',
            title:'Status',
            options: [
                {
                    label: "Active",
                    value: "active"
                },
                {
                    label: "Terminated",
                    value: "terminated"
                },
                {
                    label: "Left",
                    value: "left"
                },
            ]
        },
        {
            name:'image' ,
            type:'file',
            title:'Employee Image',
        },
        // {
        //     name:'role' ,
        //     type:'role',
        //     title:'Role',
        //     roleList: [
        //         {
        //           name: "HR",
        //           abbrev: "HR",
        //           nestedArray: [{ name: "HR_read"}, {name: "HR_write"},  {name: "HR_update"}, {name: "HR_delete" }]
        //         },
        //         {
        //           name: "Accounting",
        //           abbrev: "ACC",
        //           nestedArray: [{ name: "ACC_read"}, {name: "ACC_write"},  {name: "ACC_update"}, {name: "ACC_delete" }]
        //         },
        //         {
        //           name: "Facility",
        //           abbrev: "FAC",
        //           nestedArray: [{ name: "FAC_read"}, {name: "FAC_write"},  {name: "FAC_update"}, {name: "FAC_delete" }]
        //         },
        //         {
        //           name: "IT",
        //           abbrev: "IT",
        //           nestedArray: [{ name: "IT_read"}, {name: "IT_write"},  {name: "IT_update"}, {name: "IT_delete" }]
        //         }
        //       ]
        // },
       
    ]
};