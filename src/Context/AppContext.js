import React, { createContext, useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import axiosInstance from "../services/api";
import tokenService from "../services/token.service";
import secureLocalStorage from "react-secure-storage";

export default createBrowserHistory();
const AppContext = createContext();

const AppProvider = (props) => {
  const [user] = useState(tokenService.getUser());
  const [showProgress, setshowProgress] = useState({
    count: 25,
    state: false,
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
  const [isFromBiometricsClockIn, setIsFromBiometricsClockIn] = useState(false);
  const [dropDownClicked, setDropDownClicked] = useState(false);

  const isTeamLead = user?.employee_info?.is_lead;
  const isHr = user?.office?.title === "hr" ? true : false;

  const status = [
    {
      _id: "active",
      status: "ACTIVE",
    },
    {
      _id: "left",
      status: "RESIGNED",
    },
    {
      _id: "terminated",
      status: "TERMINATED",
    },
  ];

  // Select API States:
  const [loadingSelect, setLoadingSelect] = useState(false);
  const [selectEmployees, setSelectEmployees] = useState([]);
  const [selectCampaigns, setSelectCampaigns] = useState([]);
  const [selectDepartments, setSelectDepartments] = useState([]);
  const [selectDesignations, setSelectDesignations] = useState([]);
  const [selectBranches, setSelectBranches] = useState([]);
  const [selectLeaveTypes, setSelectLeaveTypes] = useState([]);

  const fetchHRLeavesNotificationCount = () => {
    axiosInstance
      .get("/api/v1/hr_dashboard/leaves.json", {
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
      .catch((error) => {});
  };

  const handleProgress = ({ count, state }) => {
    console.log(count, state);
    setshowProgress({
      count: count,
      state: state,
    });
  };

  const uploadProgress = async () => {
    await pause(800);
    handleProgress({
      state: true,
      count: 35,
    });

    await pause(900);
    handleProgress({
      state: true,
      count: 65,
    });

    await pause(1000);
    handleProgress({
      state: true,
      count: 85,
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

  // ! - EVERYTHING ABOVE IS FROM OLD API!!!

  // SELECT APIs
  // All Employees:
  const fetchAllEmployees = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/employees.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: 1,
          limit: 1000,
        },
      });
      const resData = response?.data?.data?.employees;

      const formattedEmployees = resData
        .map((e) => ({
          label: e?.full_name.toUpperCase(),
          value: e.ogid,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setSelectEmployees(formattedEmployees);
    } catch (error) {}
  };

  // All Campaigns:
  const fetchAllCampaigns = async () => {
    setLoadingSelect(true);
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: "campaign",
          pages: 1,
          limit: 1000,
        },
      });
      const resData = response?.data?.data?.offices;

      const formattedCampaigns = resData
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setSelectCampaigns(formattedCampaigns);
      setLoadingSelect(false);
    } catch (error) {
      setLoadingSelect(false);
    }
  };

  // All Departments:
  const fetchAllDepartments = async () => {
    setLoadingSelect(true);
    try {
      const response = await axiosInstance.get("/api/v1/offices.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          office_type: "department",
          pages: 1,
          limit: 1000,
        },
      });
      const resData = response?.data?.data?.offices;

      const formattedDepartments = resData
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setSelectDepartments(formattedDepartments);
      setLoadingSelect(false);
    } catch (error) {
      setLoadingSelect(false);
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
        params: {
          pages: 1,
          limit: 1000,
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

      const formatted = resData.map((branch) => ({
        label: branch.title,
        value: branch.id,
      }));

      setSelectBranches(formatted);
      setLoadingSelect(false);
    } catch (error) {
      setLoadingSelect(false);
    }
  };

  // All Leave Types:
  const fetchAllLeaveTypes = async () => {
    setLoadingSelect(true);
    try {
      const response = await axiosInstance.get("/api/v1/leave_types.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const resData = response?.data?.data?.types;

      const formattedLeaveTypes = resData
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e?.id,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setSelectLeaveTypes(formattedLeaveTypes);
      setLoadingSelect(false);
    } catch (error) {}
  };

  useEffect(() => {
    const token = secureLocalStorage.getItem("token");
    if (token) {
      if (isHr) {
        fetchAllEmployees();
        fetchAllCampaigns();
        fetchAllDepartments();
        fetchAllDesignations();
        fetchAllBranches();
        fetchAllLeaveTypes();
        fetchHRLeavesNotificationCount();
      }

      fetchAllLeaveTypes();
    }
  }, [isHr, isTeamLead, userToken]);

  return (
    <AppContext.Provider
      value={{
        selectEmployees,
        setSelectEmployees,
        fetchAllEmployees,

        selectCampaigns,
        setSelectCampaigns,
        fetchAllCampaigns,

        selectDepartments,
        setSelectDepartments,
        fetchAllDepartments,

        selectDesignations,
        setSelectDesignations,
        fetchAllDesignations,

        selectBranches,
        setSelectBranches,
        fetchAllBranches,

        selectLeaveTypes,
        setSelectLeaveTypes,
        fetchAllLeaveTypes,

        loadingSelect,
        setLoadingSelect,

        dropDownClicked,
        setDropDownClicked,

        showProgress,
        uploadProgress,
        handleProgress,
        count,
        setCount,
        showAlert,
        showAlertMsg,
        isChecked,
        setIsChecked,
        isFromBiometrics,
        setIsFromBiometrics,
        isFromBiometricsClockIn,
        setIsFromBiometricsClockIn,
        user,
        setuserToken,
        fetchHRLeavesNotificationCount,
        status,
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
