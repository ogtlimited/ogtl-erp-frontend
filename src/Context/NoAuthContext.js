import React, { createContext, useState, useEffect } from "react";
const NoAuthContext = createContext();

const NoAuthContextProvider = ({ children }) => {
  const [jobApplication, setJobApplication] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    mobile_number: "",
    email: "",
    highest_qualification: "",
    certifications: "",
    languages_spoken: [],
    hr_job_opening_id: "",
    resume_attachment: null,
  });

  const [jobReview, setJobReview] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    mobile_number: "",
    email: "",
    highest_qualification: "",
    certifications: "",
    languages_spoken: [],
    job_title: "",
    resume_attachment: "",
  });

  useEffect(() => {}, [jobApplication, jobReview]);

  return (
    <NoAuthContext.Provider
      value={{ setJobApplication, jobApplication, setJobReview, jobReview }}
    >
      {children}
    </NoAuthContext.Provider>
  );
};

function useNoAuthContext() {
  const context = React.useContext(NoAuthContext);
  if (context === undefined) {
    throw new Error("useNoAuthContext must be within an NoAuthContextProvider");
  }
  return context;
}

export { NoAuthContextProvider, useNoAuthContext };
