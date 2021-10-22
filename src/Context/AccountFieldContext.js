import React, { createContext, useState, useEffect } from "react";
export const AccountFieldContext = createContext();

export const AccountFieldContextProvider = ({ children }) => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <AccountFieldContext.Provider value={{ isChecked }}>
      {children}
    </AccountFieldContext.Provider>
  );
};
