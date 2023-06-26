import React, { createContext, useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import axiosInstance from "../services/api";
import tokenService from "../services/token.service";

export default createBrowserHistory();
const AppContext = createContext();

const AppProvider = (props) => {
  const [user] = useState(tokenService.getUser());
  const [showProgress, setshowProgress] = useState({
    count: 25,
    state: false
  });
  const [showAlertMsg, setshowAlertMsg] = useState({
    state: false,
    msg: "",
    class: "",
  });
  const pause = (_) => new Promise((resolve) => setTimeout(resolve, _));
  const [userToken, setuserToken] = useState(null);
  const [count, setCount] = useState(0);

  const [isChecked, setIsChecked] = useState(true);
  const [isFromBiometrics, setIsFromBiometrics] = useState(false);
  const [dropDownClicked, setDropDownClicked] = useState(false);
  
  const status = [
    {
        _id: "active",
        status: "ACTIVE"
    },
    {
        _id: "left",
        status: "RESIGNED"
    },
    {
        _id: "terminated",
        status: "TERMINATED"
    }
  ]

  // Select API States:
  const [loadingSelect, setLoadingSelect] = useState(false);
  const [allEmployees, setAllEmployees] = useState([]);
  const [allOffices, setAllOffices] = useState([]);
  const [selectDesignations, setSelectDesignations] = useState([]);
  const [selectBranches, setSelectBranches] = useState([]);
  const [allLeaveTypes, setAllLeaveTypes] = useState([]);

  const fetchHRLeavesNotificationCount = () => {
    axiosInstance.get("/api/v1/hr_dashboard/leaves.json", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": "69420",
      },
      params: {
        page: 1,
        limit: 1000,
      },
    })
      .then((res) => {
        let resData = res?.data?.data?.leaves;
        const dataCount = resData.length;
        setCount(dataCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleProgress = ({count, state}) => {
    console.log(count, state)
    setshowProgress({
      count: count,
      state: state
    })
  }

  const uploadProgress = async () => {
    await pause(800);
    handleProgress({
      state: true,
      count: 35
    });

    await pause(900);
    handleProgress({
      state: true,
      count: 65
    });

    await pause(1000);
    handleProgress({
      state: true,
      count: 85
    });
  };

  // Show Alert:
  const showAlert = (state, msg, className) => {
    let icon = className?.includes("alert-success")
      ? "#check-circle-fill"
      : "#exclamation-triangle-fill";
    let label = className?.includes("alert-success") ? "Success:" : "Warning:";
    setshowAlertMsg({
      state: state,
      msg: msg,
      class: className,
      icon,
      label,
    });
    setTimeout(() => {
      setshowAlertMsg({
        state: "",
        msg: "",
        class: "",
        icon: "",
        label: "",
      });
    }, 5000);
  };


  //for anything relating to role assignment
  const createRoleAssignment = () => {
    return axiosInstance.get("/create-role-form");
  };

  const adminDashboardData = () => {
    return axiosInstance.get("/admin-dashboard");
  };

  // ! - EVERYTHING ABOVE IS FROM OLD API!!!

  // SELECT APIs
  // All Employees:
  const fetchAllEmployees = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/employees.json', {
        headers: {          
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data;
      // console.log("All Employees:", resData)
  
    // const mapp = resData.map(emp => {
    //   return {
    //     ...emp,
    //     fullName: emp.first_name + ' ' + emp.last_name + ' ' + emp?.middle_name,
    //     designation_name: emp?.designation?.designation,
    //     department_name: emp?.department?.department
    //   }
    // })
    // setAllEmployees(mapp);
    // console.log("All Employees:", mapp)
    } catch (error) {
      // console.log("All employees error:", error)
    }
  };

  // All Offices:
  const fetchAllOffices = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/offices.json', {
        headers: {          
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data;
      // console.log("All Offices:", resData)

      // const formatted = resData.map((e) => ({
      //   department: e.department,
      // })).sort((a, b) => a.department.localeCompare(b.department));

      // setAllOffices(formatted);
    } catch (error) {
      console.log("All Offices error:", error);
    }
  };
  
  // All Designations:
  const fetchAllDesignations = async () => {
    setLoadingSelect(true);
    try {
      const response = await axiosInstance.get("/api/v1/designations.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data?.designations;

      const formattedDesignation = resData
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setSelectDesignations(formattedDesignation);
      setLoadingSelect(false);
    } catch (error) {
      console.log("Get All Designations error:", error);
      setLoadingSelect(false);
    }
  };

  // All Branches:
  const fetchAllBranches = async () => {
    setLoadingSelect(true);
    try {
      const response = await axiosInstance.get("/api/v1/branches.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data?.branches;
      console.log("branches", resData);

      const formatted = resData.map((branch) => ({
        label: branch.title,
        value: branch.id,
      }));

      setSelectBranches(formatted);
      setLoadingSelect(false);
    } catch (error) {
      console.log("All Branches error:", error);
      setLoadingSelect(false);
    }
  };

  // All Leave Types:
  const fetchAllLeaveTypes = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/leave_types.json', {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data;
      // console.log("All Leave Types:", resData)

      // const formatted = resData.map((e) => ({
      //   leaveType: e.leaveType,
      // })).sort((a, b) => a.leaveType.localeCompare(b.leaveType));

      // setAllLeaveTypes(formatted);
    } catch (error) {
      console.log("All Leave Types error:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchAllEmployees();
      fetchAllOffices();
      fetchAllDesignations();
      fetchAllBranches();
      fetchAllLeaveTypes();
    }
  }, [userToken]);

  return (
    <AppContext.Provider
      value={{
        allEmployees,
        setAllEmployees,
        fetchAllEmployees,

        allOffices,
        setAllOffices,
        fetchAllOffices,

        selectDesignations,
        setSelectDesignations,
        fetchAllDesignations,

        selectBranches,
        setSelectBranches,
        fetchAllBranches,

        allLeaveTypes,
        setAllLeaveTypes,
        fetchAllLeaveTypes,

        loadingSelect,
        setLoadingSelect,

        dropDownClicked,
        setDropDownClicked,


        showProgress,
        uploadProgress,
        handleProgress,
        adminDashboardData,
        count,
        setCount,
        showAlert,
        showAlertMsg,
        isChecked,
        setIsChecked,
        isFromBiometrics,
        setIsFromBiometrics,
        user,
        setuserToken,
        createRoleAssignment,
        fetchHRLeavesNotificationCount,
        status
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
