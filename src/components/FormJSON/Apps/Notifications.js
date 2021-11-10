export const NotificationFormJson = {
  title: "Notifications",
  Fields: [
    {
      name: "document_name",
      type: "select",
      title: "Document Name",
      options: [],
    },
    {
      name: "subject",
      type: "textarea",
      title: "Subject",
    },
    {
      name: "send_alert_on",
      type: "select",
      title: "Send Alert On",
      options: [
        {
          value: "SAVE",
          label: "SAVE",
        },
        {
          value: "UPDATE",
          label: "UPDATE",
        },
        {
          value: "DELETE",
          label: "DELETE",
        },
      ],
    },
    {
      name: "sender",
      type: "text",
      title: "Sender",
    },
    {
      name: "disabled",
      type: "select",
      title: "Status",
      options: [
        {
          value: false,
          label: "Not Active",
        },
        {
          value: true,
          label: "Active",
        },
      ],
    },
  ],
};
