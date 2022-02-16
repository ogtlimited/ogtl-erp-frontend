import React, { createContext, useState, useEffect } from "react";
const NoAuthContext = createContext();

const NoAuthContextProvider = ({ children }) => {
  const [jobApplication, setjobApplication] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    email_address: "",
    mobile: "",
    alternate_mobile: "",
    resume_attachment: "",
    highest_qualification: "",
    certifications: "",
    languages_spoken: [],
    referred: "",
    referal_name: "",
    job_opening_id: "",
  });
  useEffect(() => {}, [jobApplication]);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <NoAuthContext.Provider value={{ setjobApplication, jobApplication }}>
      {children}
    </NoAuthContext.Provider>
  );
};

function useNoAuthContext() {
  const context = React.useContext(NoAuthContext);
  if (context === undefined) {
    throw new Error(
      "useNoAauthContext must be within an NoAuthContextProvider"
    );
  }
  return context;
}

export { NoAuthContextProvider, useNoAuthContext };
