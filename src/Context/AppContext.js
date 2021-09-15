import React, { createContext, useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import axiosInstance from "../services/api";
import tokenService from "../services/token.service";

export default createBrowserHistory();
const baseURL = "http://localhost:3000";
const AppContext = createContext();

const AppProvider = (props) => {
  const [allEmployees, setallEmployees] = useState([]);
  const [loggedIn, setloggedIn] = useState(false)
  const [formUpdate, setformUpdate] = useState(null)
  const [showAlertMsg, setshowAlertMsg] = useState({
    state: false,
    msg: "",
    class: "",
  });
  const [employeeAttendance, setemployeeAttendance] = useState([]);
  const [user, setuser] = useState(tokenService.getUser());
  useEffect(() => {
    console.log("alert message");
  }, [showAlertMsg]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (loggedIn ) {
      // fetchEmployee();
      fetchEmployeeAttendance()
    }
  }, []);

  const fetchEmployee = (employee) => {
    axiosInstance.get("/employees").then((e) => {
      setallEmployees(e?.data?.employees);
      setloggedIn(false)
    });
  };
  const showAlert = (state, msg, className) => {
    setshowAlertMsg({
      state: state,
      msg: msg,
      class: className,
    });
    setTimeout(() => {
      setshowAlertMsg({
        state: "",
        msg: "",
        class: "",
      });
    }, 5000);
  };
  const fetchTypesShift = () => {
    return axiosInstance.get("/api/shiftType");
  };

  const combineRequest = () => {
    return axiosInstance.get("/combine-employee-form");
  };
  const adminDashboardData = () => {
    return axiosInstance.get("/admin-dashboard");
  };
  const fetchEmployeeAttendance = () => {
    const date = new Date();
    const firstDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).toLocaleDateString();
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).toLocaleDateString();

    const params = `?startOfMonth=${firstDay}&endOfMonth=${lastDay}`;
    return axiosInstance
      .get("/api/attendance/employee/" + user.ogid + params)
      .then((e) => {
        console.log(e.data.data);
        setemployeeAttendance(e.data.data);
      });
  };

  return (
    <AppContext.Provider
      value={{
        fetchTypesShift,
        combineRequest,
        employeeAttendance,
        adminDashboardData,
        setallEmployees,
        allEmployees,
        showAlert,
        showAlertMsg,
        fetchEmployeeAttendance,
        fetchEmployee,
        setloggedIn,
        formUpdate, 
        setformUpdate
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be within an AppProvider");
  }
  return context;
}

export { AppProvider, useAppContext };
