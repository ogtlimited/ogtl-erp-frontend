export const ticketFormJson = {
  title: {
    type: "text",
    title: "Title",
    label:'Title',
    required:{
        value:true,
        message:'Title is required'
    },
  },
  department: {
    type: "select",
    title: "Department",
    label:'Department',
    required:{
        value:true,
        message:'Department is required'
    },
    options: [],
  },
  content: {
    type: "richText",
    title: "Description",
    label:'Description',
    required:{
        value:true,
        message:'Content is required'
    },
  },
};
