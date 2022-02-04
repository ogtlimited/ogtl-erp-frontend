export const applicationTestFormJson = {
  title: "Interview Form",
  Fields: [
    {
      name: "test_type",
      type: "select",
      title: "Test Type",
      required: {
        value: true,
        message: "Test type is required",
      },
      options: [
        {
          value: "Phone Screening",
          label: "Phone Screening",
        },
        {
          value: "Typing Test",
          label: "Typing Test",
        },
        {
          value: "Excel Test",
          label: "Excel Test",
        },
        {
          value: "Formal Writing",
          label: "Formal Writing",
        },
        {
          value: "Soft Skills",
          label: "Soft Skills",
        },
      ],
    },
    {
      name: "job_applicant_id",
      type: "select",
      title: "Job Applicant",
      required: {
        value: true,
        message: "Job applicant is required",
      },
      options: [],
    },
    {
      name: "interview_date",
      type: "date",
      title: "Interview Date",
      required: {
        value: true,
        message: "Interview date is required",
      },
    },
    {
      name: "phone_number",
      type: "text",
      title: "Phone Number",
      required: {
        value: true,
        message: "Phone number is required",
      },
    },

    {
      name: "interviewer",
      type: "select",
      title: "Interviewer",
      options: [
        {
          value: "Joseph",
          label: "Joseph",
        },
        {
          value: "Cyril",
          label: "Cyril",
        },
      ],
    },
    {
      name: "email_address",
      type: "email",
      title: "Email Address",
      required: {
        value: true,
        message: "Email Address is required",
      },
    },
    {
      name: "typing_speed_score",
      type: "text",
      title: "Typing Speed Score",
      required: {
        value: true,
        message: "Typing Speed Score is required",
      },
    },
    {
      name: "typing_accuracy_score",
      type: "text",
      title: "Typing Accuracy Score/100 ",
      required: {
        value: true,
        message: "Typing Accuracy Score/100  is required",
      },
    },
    {
      name: "accent_test_score",
      type: "select",
      title: "Accent Test Score/100",
      options: [
        {
          value: "10",
          label: "10%",
        },
        {
          value: "20",
          label: "20%",
        },
        {
          value: "30",
          label: "30%",
        },
        {
          value: "40",
          label: "40%",
        },
        {
          value: "50",
          label: "50%",
        },
        {
          value: "60",
          label: "60%",
        },
        {
          value: "70",
          label: "70%",
        },
        {
          value: "80",
          label: "80%",
        },
        {
          value: "90",
          label: "90%",
        },
        {
          value: "100",
          label: "100%",
        },
        {
          value: "nil",
          label: "Nil",
        },
      ],
    },
    {
      name: "attention_to_details_test",
      type: "select",
      title: "Attention to Details Test/6",
      options: [
        {
          value: "1",
          label: "1",
        },
        {
          value: "2",
          label: "2",
        },
        {
          value: "3",
          label: "3",
        },
        {
          value: "4",
          label: "4",
        },
        {
          value: "5",
          label: "5",
        },
        {
          value: "6",
          label: "6",
        },
      ],
    },
    {
      name: "multitasking_skills_test",
      type: "select",
      title: "Multitasking Skills Test/6",
      options: [
        {
          value: "1",
          label: "1",
        },
        {
          value: "2",
          label: "2",
        },
        {
          value: "3",
          label: "3",
        },
        {
          value: "4",
          label: "4",
        },
        {
          value: "5",
          label: "5",
        },
        {
          value: "6",
          label: "6",
        },
      ],
    },
    {
      name: "dictation_test",
      type: "select",
      title: "Dictation Test/10",
      options: [
        {
          value: "1",
          label: "1",
        },
        {
          value: "2",
          label: "2",
        },
        {
          value: "3",
          label: "3",
        },
        {
          value: "4",
          label: "4",
        },
        {
          value: "5",
          label: "5",
        },
        {
          value: "6",
          label: "6",
        },
        {
          value: "7",
          label: "7",
        },
        {
          value: "8",
          label: "8",
        },
        {
          value: "9",
          label: "9",
        },
        {
          value: "10",
          label: "10",
        },
        {
          value: "Nil",
          label: "Nil",
        },
      ],
    },
    {
      name: "professional_writing_email_test",
      type: "select",
      title: "Professional Writing Email Test/10",
      options: [
        {
          value: "1",
          label: "1",
        },
        {
          value: "2",
          label: "2",
        },
        {
          value: "3",
          label: "3",
        },
        {
          value: "4",
          label: "4",
        },
        {
          value: "5",
          label: "5",
        },
        {
          value: "6",
          label: "6",
        },
        {
          value: "7",
          label: "7",
        },
        {
          value: "8",
          label: "8",
        },
        {
          value: "9",
          label: "9",
        },
        {
          value: "10",
          label: "10",
        },
        {
          value: "Nil",
          label: "Nil",
        },
      ],
    },
    {
      name: "send_for_testGorilla_skype_interview",
      type: "select",
      title: "Send for Testgorilla/Skype/Interview?",
      options: [
        {
          value: "Yes",
          label: "Yes",
        },
        {
          value: "No",
          label: "No",
        },
      ],
    },
    {
      name: "testGorilla_invitation_date",
      type: "date",
      title: "Testgorilla Invitation Date",
      required: {
        value: true,
        message: "Testgorilla Invitation Date is required",
      },
    },
    {
      name: "assessment_completion_date",
      type: "date",
      title: "Assessment Completion Date",
      required: {
        value: true,
        message: "Assessment Completion Date is required",
      },
    },
    {
      name: "status",
      type: "select",
      title: "Status",
      options: [
        {
          value: "Invitation Sent",
          label: "Invitation Sent",
        },
        {
          value: "Invitation Opened",
          label: "Invitation Opened",
        },
        {
          value: "Assessment Started",
          label: "Assessment Started",
        },
        {
          value: "Assessment Completed",
          label: "Assessment Completed",
        },
      ],
    },
    {
      name: "stage",
      type: "select",
      title: "Stage",
      options: [
        {
          value: "Not Yet Evaluated",
          label: "Not Yet Evaluated",
        },
        {
          value: "Evaluated",
          label: "Evaluated",
        },
        {
          value: "Invited for Interview",
          label: "Invited for Interview",
        },
        {
          value: "Interviewed",
          label: "Interviewed",
        },
        {
          value: "Invited To Take-Home Test",
          label: "Invited To Take-Home Test",
        },
        {
          value: "Take-Home Test Completed",
          label: "Take-Home Test Completed",
        },
        {
          value: "References Checked",
          label: "References Checked",
        },
        {
          value: "Offer Sent",
          label: "Offer Sent",
        },
        {
          value: "Offer Declined",
          label: "Offer Declined",
        },
        {
          value: "Candidate Withdrew",
          label: "Candidate Withdrew",
        },
        {
          value: "Candidate Unresponsive",
          label: "Candidate Unresponsive",
        },
        {
          value: "Rejected",
          label: "Rejected",
        },
        {
          value: "Hired",
          label: "Hired",
        },
      ],
    },
    {
      name: "average_score",
      type: "text",
      title: "Average Score",
      required: {
        value: true,
        message: "Average Score is required",
      },
    },
    {
      name: "personality_score",
      type: "text",
      title: "16 Types Personality Score",
      required: {
        value: true,
        message: "16 Types Personality Score is required",
      },
    },
    {
      name: "attention_to_detail_score",
      type: "text",
      title: "Attention to Detail (textual) Score",
      required: {
        value: true,
        message: "Attention to Detail (textual) Score is required",
      },
    },
    {
      name: "communication_score",
      type: "text",
      title: "Communication Score",
      required: {
        value: true,
        message: "Communication Score is required",
      },
    },
    {
      name: "disc_profile_score",
      type: "text",
      title: "DISC Profile Score",
      required: {
        value: true,
        message: "DISC Profile Score is required",
      },
    },
    {
      name: "english_score",
      type: "text",
      title: "English (intermediate/B1) Score",
      required: {
        value: true,
        message: "English (intermediate/B1) Score is required",
      },
    },
    {
      name: "filed_out_only_once_from_ip_address",
      type: "select",
      title: "Filled Out Only Once From IP Address?",
      options: [
        {
          value: "Yes",
          label: "Yes",
        },
        {
          value: "No",
          label: "No",
        },
      ],
    },
    {
      name: "webcam_enabled",
      type: "select",
      title: "Webcam Enabled?",
      options: [
        {
          value: "Yes",
          label: "Yes",
        },
        {
          value: "No",
          label: "No",
        },
      ],
    },
    {
      name: "full_screen_mode_always_active",
      type: "select",
      title: "Full-Screen Mode Always Active?",
      options: [
        {
          value: "Yes",
          label: "Yes",
        },
        {
          value: "No",
          label: "No",
        },
      ],
    },
    {
      name: "mouse_always_in_assessment_window",
      type: "select",
      title: "Mouse Always In Assessment Window?",
      options: [
        {
          value: "Yes",
          label: "Yes",
        },
        {
          value: "No",
          label: "No",
        },
      ],
    },
    {
      name: "interviewer_rating",
      type: "text",
      title: "Interviewer's Rating",
      required: {
        value: true,
        message: "Interviewer's Rating is required",
      },
    },
    {
      name: "notes",
      type: "textarea",
      title: "Notes",
    },
  ],
};
