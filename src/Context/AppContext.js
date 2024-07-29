// *IN USE

import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useMemo
} from "react";
import { createBrowserHistory } from "history";
import axiosInstance from "../services/api";
import tokenService from "../services/token.service";
import secureLocalStorage from "react-secure-storage";
import backgroundColors from "../components/Misc/BackgroundColors.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export default createBrowserHistory();
const AppContext = createContext();

const AppProvider = (props) => {
  const [user] = useState(tokenService.getUser());
  const [showProgress, setShowProgress] = useState({
    count: 25,
    state: false
  });
  const [showAlertMsg, setShowAlertMsg] = useState({
    state: false,
    msg: "",
    class: ""
  });
  const pause = (_) => new Promise((resolve) => setTimeout(resolve, _));
  const [userToken, setuserToken] = useState(null);
  const [userDp, setUserDp] = useState(null);
  const [count, setCount] = useState(0);

  const [isChecked, setIsChecked] = useState(true);
  const [isFromBiometrics, setIsFromBiometrics] = useState(false);
  const [isFromBiometricsClockIn, setIsFromBiometricsClockIn] = useState(false);
  const [dropDownClicked, setDropDownClicked] = useState(false);
  const [loadingUserResignation, setLoadingUserResignation] = useState(true);

  // Select API States:
  const [loadingSelect, setLoadingSelect] = useState(false);
  const [loadingEmployeeSelect, setLoadingEmployeeSelect] = useState(false);
  const [loadingJobAppIntOpts, setLoadingJobAppIntOpts] = useState(false);
  const [InterviewStatusOptions, setInterviewStatusOptions] = useState(false);
  const [InterviewProcessStageOptions, setInterviewProcessStageOptions] =
    useState(false);
  const [selectEmployees, setSelectEmployees] = useState([]);
  const [selectDepartments, setSelectDepartments] = useState([]);
  const [selectCampaigns, setSelectCampaigns] = useState([]);
  const [selectTeams, setSelectTeams] = useState([]);
  const [selectLeaders, setSelectLeaders] = useState([]);
  const [selectDesignations, setSelectDesignations] = useState([]);
  const [selectBranches, setSelectBranches] = useState([]);
  const [selectLeaveTypes, setSelectLeaveTypes] = useState([]);
  const [selectDeductionTypes, setSelectDeductionTypes] = useState([]);
  const [selectJobOpenings, setSelectJobOpenings] = useState([]);
  const [selectPublicHoliday, setSelectPublicHoliday] = useState([]);
  const [selectSurvey, setSelectSurvey] = useState([]);
  const [allPublicHolidayEvents, setAllPublicHolidayEvents] = useState([]);
  const [userResignations, setUserResignations] = useState(null);

  const currentMonth = moment().format("MMMM");
  const previousMonth = moment().subtract(1, "months").format("MMMM");

  const [allPayDates, setAllPayDates] = useState([]);
  const [payday, setPayday] = useState(null);
  const [loadingPayday, setLoadingPayday] = useState(false);
  const [currentPaydayData, setCurrentPaydayData] = useState([]);

  const deductionFrom = moment().startOf("month").format("yyyy-MM-DD");
  const deductionTo = moment().endOf("month").format("yyyy-MM-DD");
  const [deductionFromDate, setDeductionFromDate] = useState(deductionFrom);
  const [deductionToDate, setDeductionToDate] = useState(deductionTo);

  const isTeamLead = user?.employee_info?.is_lead;
  const isHr = user?.office?.title.toLowerCase() === "hr" ? true : false;
  const currentUserOgid = useMemo(
    () => user?.employee_info?.ogid,
    [user?.employee_info?.ogid]
  );
  const CurrentUserRoles = user?.employee_info?.roles;
  const isSecurity = CurrentUserRoles?.includes("security_attendance_team");
  const isPayrollProcessor = CurrentUserRoles?.includes("payroll_processor");

  const [announcement, setAnnouncement] = useState(null);
  const [loadingAnnouncement, setLoadingAnnouncement] = useState(false);
  const [announcementWatched, setAnnouncementWatched] = useState(false);

  const [pendingSurveys, setPendingSurveys] = useState([]);
  const [pendingSurveySubmitted, setPendingSurveySubmitted] = useState(false);

  const [newsletter, setNewsletter] = useState(null);
  const [loadingNewsletter, setLoadingNewsletter] = useState(false);
  const [newsletterRead, setNewsletterRead] = useState(false);

  const today_date = moment.utc().format("yyyy-MM-DD");

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const goToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  };

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
  ];

  const resignationStatusTypes = [
    {
      label: "Pending",
      value: "pending"
    },
    {
      label: "Approved",
      value: "approved"
    },
    {
      label: "Retracted",
      value: "retracted"
    }
  ];

  const selectOfficeTypes = [
    {
      label: "Department",
      value: "department"
    },
    {
      label: "Campaign",
      value: "campaign"
    }
  ];

  const officeTypeOptions = [
    {
      label: "Department",
      value: "department"
    },
    {
      label: "Campaign",
      value: "campaign"
    },
    {
      label: "Team",
      value: "team"
    }
  ];

  const categoryOptions = [
    {
      label: "Yes",
      value: true
    },
    {
      label: "No",
      value: false
    }
  ];

  const selectOutOfOfficeReasons = [
    {
      label: "Sick",
      value: "sick"
    },
    {
      label: "FAM/PER Emergency",
      value: "FAM/PER Emergency"
    },
    {
      label: "Holiday",
      value: "holiday"
    }
  ];

  const leadershipTypes = [
    {
      label: "Team Lead",
      value: 0
    },
    {
      label: "Supervisor",
      value: 1
    },
    {
      label: "Manager",
      value: 2
    }
  ];

  const salaryMode = [
    {
      value: "bank",
      label: "Bank"
    },
    {
      value: "cash",
      label: "Cash"
    },
    {
      value: "cheque",
      label: "Cheque"
    }
  ];

  const generateOrdinal = (day) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }

    const lastDigit = day % 10;
    const suffixes = ["st", "nd", "rd"];
    const suffix = suffixes[lastDigit - 1] || "th";

    return `${day}${suffix}`;
  };

  // Get Avatar Color Alphabetically:
  const getAvatarColor = (char) => {
    const charCode = char?.toLowerCase()?.charCodeAt(0) - 97;
    const colorIndex = charCode >= 0 && charCode <= 25 ? charCode : 0;
    return backgroundColors[colorIndex];
  };

  const handleProgress = ({ count, state }) => {
    console.log(count, state);
    setShowProgress({
      count: count,
      state: state
    });
  };

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
    setShowAlertMsg({
      state: state,
      msg: msg,
      class: className,
      icon,
      label
    });
    setTimeout(() => {
      setShowAlertMsg({
        state: "",
        msg: "",
        class: "",
        icon: "",
        label: ""
      });
    }, 5000);
  };

  // Employee Profile Pic:
  const fetchUserPic = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/employees/${currentUserOgid}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          }
        }
      );
      const pic = response?.data?.data?.employee?.profile_picture;

      setUserDp(pic);
    } catch (error) {
      console.error("Profile pic error:", error);
    }
  }, [currentUserOgid]);

  const fetchHRLeavesNotificationCount = () => {
    axiosInstance
      .get("/api/v1/hr_dashboard/leaves.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        params: {
          page: 1,
          limit: 1000
        }
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

  // Announcement:
  const fetchAnnouncement = useCallback(async () => {
    setLoadingAnnouncement(true);

    try {
      const response = await axiosInstance.get(
        `/api/v1/video_announcements.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          },
          params: {
            page: 1,
            limit: 10
          }
        }
      );

      const resData = response?.data?.data?.videos_record?.videos;
      if (resData.length > 0) {
        setAnnouncement(resData[0]);
      }
      setLoadingAnnouncement(false);
    } catch (error) {
      const component = "Announcement | ";
      ErrorHandler(error, component);
      setLoadingAnnouncement(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Newsletter
  const fetchNewsletter = useCallback(async () => {
    setLoadingNewsletter(true);

    try {
      const response = await axiosInstance.get(
        `/api/v1/text_announcements.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          },
          params: {
            page: 1,
            limit: 10
          }
        }
      );

      const resData = response?.data?.data?.announcements?.announcements;
      if (resData.length > 0) {
        setNewsletter(resData[0]);
      }
      setLoadingNewsletter(false);
    } catch (error) {
      const component = "Newsletter | ";
      ErrorHandler(error, component);
      setLoadingNewsletter(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // All Pending Surveys:
  const fetchPendingSurveys = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/pending_survey_responses.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          }
        }
      );

      const resData = response?.data?.data?.pending_surveys;
      setPendingSurveys(resData);
    } catch (error) {
      const component = "Survey Error | ";
      ErrorHandler(error, component);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // All Public Holidays
  const fetchPublicHolidays = useCallback(async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.get(
        `/api/v1/employee_holidays.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          }
        }
      );

      const { department_holidays, campaign_holidays } =
        response.data.data.employee_holidays;

      const formattedDepartmentHolidays = department_holidays.map((e) => ({
        ...e?.public_holiday,
        title: e?.public_holiday?.title.replace(/\b\w/g, (char) =>
          char.toUpperCase()
        ),
        status:
          moment(e?.public_holiday?.end_date).utc().format("yyyy-MM-DD") <
          today_date
            ? "past"
            : today_date <
                moment(e?.public_holiday?.start_date)
                  .utc()
                  .format("yyyy-MM-DD") &&
              moment(e?.public_holiday?.start_date)
                .utc()
                .format("yyyy-MM-DD") !== today_date
            ? "pending"
            : "happening"
      }));

      const formattedCampaignHolidays = campaign_holidays.map((e) => ({
        ...e?.public_holiday,
        title: e?.public_holiday?.title.replace(/\b\w/g, (char) =>
          char.toUpperCase()
        ),
        status:
          moment(e?.public_holiday?.end_date).utc().format("yyyy-MM-DD") <
          today_date
            ? "past"
            : today_date <
                moment(e?.public_holiday?.start_date)
                  .utc()
                  .format("yyyy-MM-DD") &&
              moment(e?.public_holiday?.start_date)
                .utc()
                .format("yyyy-MM-DD") !== today_date
            ? "pending"
            : "happening"
      }));

      const allOffice = [
        ...formattedDepartmentHolidays,
        ...formattedCampaignHolidays
      ];

      setAllPublicHolidayEvents(allOffice);
    } catch (error) {
      const component = "Public Holiday | ";
      ErrorHandler(error, component);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // All Paydays:
  const fetchAllPayrollDates = useCallback(async () => {
    setLoadingPayday(true);

    try {
      const response = await axiosInstance.get("/api/v1/payroll_configs.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        }
      });

      const resData = response?.data?.data?.payroll_config;

      const formatted = resData.map((data) => ({
        ...data,
        created_at: moment(data.created_at).format("ddd. MMM Do, YYYY"),
        paydayRange: `${generateOrdinal(
          data?.from_date
        )} ${previousMonth} - ${generateOrdinal(data?.to_date)} ${currentMonth}`
      }));

      const currentPaydayRange = formatted.slice(0, 1)[0]?.paydayRange;
      const currentPaydayData = formatted.slice(0, 1)[0];

      // For Deduction Table:
      const currentYear = new Date().getFullYear();
      const rangeParts = currentPaydayData?.paydayRange?.split(" - ") || "";
      const deductionFrom = moment(
        `${rangeParts[0]} ${currentYear}`,
        "Do MMMM YYYY"
      );
      const deductionTo = moment(
        `${rangeParts[1]} ${currentYear}`,
        "Do MMMM YYYY"
      );

      setDeductionFromDate(deductionFrom.format("yyyy-MM-DD"));
      setDeductionToDate(deductionTo.format("yyyy-MM-DD"));

      setAllPayDates(formatted);
      setPayday(currentPaydayRange);
      setCurrentPaydayData(currentPaydayData);
      setLoadingPayday(false);
    } catch (error) {
      const component = "Payroll Dates Error | ";
      ErrorHandler(error, component);
      setLoadingPayday(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, previousMonth]);

  // SELECT APIs
  // All Employees:
  const fetchAllEmployees = useCallback(async () => {
    setLoadingEmployeeSelect(true);
    try {
      const response = await axiosInstance.get("/api/v1/employees.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        params: {
          page: 1,
          limit: 5000
        }
      });
      const resData = response?.data?.data?.employees;

      const formattedEmployees = resData
        .map((e) => ({
          label: e?.full_name.toUpperCase(),
          value: e.ogid
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setSelectEmployees(formattedEmployees);
      setLoadingEmployeeSelect(false);
    } catch (error) {
      const component = "Staff Error | ";
      console.log(error, component);
      setLoadingEmployeeSelect(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // All Departments:
  const fetchAllDepartments = useCallback(async () => {
    setLoadingSelect(true);
    try {
      const response = await axiosInstance.get("/api/v1/departments.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        params: {
          pages: 1,
          limit: 1000
        }
      });
      const resData = response?.data?.data?.departments;
      // console.log("All Departments:", resData);

      const formattedDepartments = resData
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setSelectDepartments(formattedDepartments);
      // console.log("All Departments:", formattedDepartments);
      setLoadingSelect(false);
    } catch (error) {
      setLoadingSelect(false);
    }
  }, []);

  // All Campaigns:
  const fetchAllCampaigns = useCallback(async () => {
    setLoadingSelect(true);
    try {
      const response = await axiosInstance.get("/api/v1/campaigns.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        params: {
          pages: 1,
          limit: 1000
        }
      });
      const resData = response?.data?.data?.campaigns;
      // console.log("All Campaigns:", resData);

      const formattedCampaigns = resData
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setSelectCampaigns(formattedCampaigns);
      // console.log("All Campaigns:", formattedCampaigns);
      setLoadingSelect(false);
    } catch (error) {
      setLoadingSelect(false);
    }
  }, []);

  // All Teams:
  const fetchAllTeams = useCallback(async () => {
    setLoadingSelect(true);
    try {
      const response = await axiosInstance.get("/api/v1/teams.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        params: {
          pages: 1,
          limit: 1000
        }
      });
      const resData = response?.data?.data?.teams;

      const formattedTeams = resData
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setSelectTeams(formattedTeams);
      setLoadingSelect(false);
    } catch (error) {
      setLoadingSelect(false);
    }
  }, []);

  // All Designations:
  const fetchAllDesignations = useCallback(async () => {
    setLoadingSelect(true);
    try {
      const response = await axiosInstance.get("/api/v1/designations.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        params: {
          pages: 1,
          limit: 1000
        }
      });
      const resData = response?.data?.data?.designations;

      const formattedDesignation = resData
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e.id
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setSelectDesignations(formattedDesignation);
      setLoadingSelect(false);
    } catch (error) {
      setLoadingSelect(false);
    }
  }, []);

  // All Leaders:
  const fetchAllLeaders = useCallback(async () => {
    setLoadingSelect(true);
    try {
      const response = await axiosInstance.get("/api/v1/leaders.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        params: {
          pages: 1,
          limit: 1000
        }
      });
      const resData = response?.data?.data?.leaders;

      const formattedLeaders = resData
        .map((e) => ({
          label: e?.first_name + " " + e?.last_name,
          value: e?.ogid
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setSelectLeaders(formattedLeaders);
      setLoadingSelect(false);
    } catch (error) {
      setLoadingSelect(false);
    }
  }, []);

  // All Branches:
  const fetchAllBranches = async () => {
    setLoadingSelect(true);
    try {
      const response = await axiosInstance.get("/api/v1/branches.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        }
      });
      const resData = response?.data?.data?.branches;

      const formatted = resData.map((branch) => ({
        label: branch.title,
        value: branch.id
      }));

      setSelectBranches(formatted);
      setLoadingSelect(false);
    } catch (error) {
      setLoadingSelect(false);
    }
  };

  // All Survey Forms:
  const fetchAllSurveys = useCallback(async () => {
    setLoadingSelect(true);

    try {
      const response = await axiosInstance.get("/api/v1/hr_surveys.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        params: {
          page: 1,
          limit: 10000
        }
      });

      const resData = response?.data?.data?.survey_records?.surveys;

      const formatted = resData
        .map((survey) => ({
          label: survey?.title,
          value: survey?.id
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setSelectSurvey(formatted);
      setLoadingSelect(false);
    } catch (error) {
      setLoadingSelect(false);
    }
  }, []);

  // All Public Holidays
  const fetchAllPublicHolidays = useCallback(async () => {
    setLoadingSelect(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.get(`/api/v1/public_holidays.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        },
        params: {
          page: 1,
          limit: 10000
        }
      });

      const resData = response?.data?.data?.public_holidays;

      const formatted = resData
        .map((e) => ({
          label: e?.title.replace(/\b\w/g, (char) => char.toUpperCase()),
          value: e?.id,
          misc: e
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setSelectPublicHoliday(formatted);
      setLoadingSelect(false);
    } catch (error) {
      setLoadingSelect(false);
    }
  }, []);

  // All Job Application Interview Status & Interview Process Stage:
  const fetchAllJobApplicationISandIPS = useCallback(async () => {
    setLoadingJobAppIntOpts(true);

    try {
      const response = await axiosInstance.get(
        "/api/v1/job_application_statuses.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          }
        }
      );
      const resData = response?.data?.data?.statuses;

      const InterviewStatus = resData?.interview_status;
      const processStatus = resData?.process_status;

      const InterviewStatusOptions = InterviewStatus.map((status) => ({
        label: status,
        value: status
      }));

      const InterviewProcessStageOptions = processStatus.map((status) => ({
        label: status,
        value: status
      }));

      setInterviewStatusOptions(InterviewStatusOptions);
      setInterviewProcessStageOptions(InterviewProcessStageOptions);

      setLoadingJobAppIntOpts(false);
    } catch (error) {
      setLoadingJobAppIntOpts(false);
    }
  }, []);

  // All Leave Types:
  const fetchAllLeaveTypes = useCallback(async () => {
    setLoadingSelect(true);
    try {
      const response = await axiosInstance.get("/api/v1/leave_types.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        }
      });
      const resData = response?.data?.data?.types;

      const formattedLeaveTypes = resData
        .map((e) => ({
          label: e?.title.toUpperCase(),
          value: e?.id
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setSelectLeaveTypes(formattedLeaveTypes);
      setLoadingSelect(false);
    } catch (error) {
      setLoadingSelect(false);
    }
  }, []);

  // All Deduction Types:
  const fetchDeductionTypes = useCallback(async () => {
    setLoadingSelect(true);
    try {
      const response = await axiosInstance.get("/api/v1/deduction_types.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        }
      });

      const resData = response?.data?.data?.deduction_types;

      const formattedData = resData.map((item) => {
        const deductionValue =
          item?.deduction?.deduction_mode === "percentage"
            ? item?.deduction?.value + "%"
            : item?.deduction?.deduction_mode === "flat_rate"
            ? "₦" + Intl.NumberFormat("en-US").format(item?.deduction?.value)
            : "-";

        return {
          label:
            item?.deduction?.title
              .replace(/_/g, " ")
              .replace(/^./, (str) => str.toUpperCase())
              .replace(/\b\w/g, (char) => char.toUpperCase()) +
            " | " +
            item?.office?.title.toUpperCase() +
            " | " +
            deductionValue,
          value: item?.deduction?.id
        };
      });

      setSelectDeductionTypes(formattedData);
      setLoadingSelect(false);
    } catch (error) {
      setLoadingSelect(false);
    }
  }, []);

  // All Job Openings:
  const fetchJobOpenings = useCallback(async () => {
    setLoadingSelect(true);
    try {
      const response = await axiosInstance.get("/api/v1/job_openings.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420"
        }
      });
      const resData = response?.data?.data?.job_openings;

      const formattedData = resData
        .map((item) => {
          return {
            label: item?.job_title,
            value: item?.id
          };
        })
        .sort((a, b) => a.label.localeCompare(b.label));

      setSelectJobOpenings(formattedData);
      setLoadingSelect(false);
    } catch (error) {
      setLoadingSelect(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch HR Staff Resignation:
  const fetchStaffResignation = useCallback(async () => {
    try {
      const res = await axiosInstance.get(
        `/api/v1/resignations/${currentUserOgid}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420"
          }
        }
      );

      // console.log("Staff Resignation:", res?.data?.data);
      setUserResignations(res?.data?.data?.resignation);
      setLoadingUserResignation(false);
    } catch (error) {
      const component = "Resignations | ";
      console.log(error, component);
      setLoadingUserResignation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserOgid]);

  // Universal Error Handler:
  const ErrorHandler = (error, component) => {
    console.log("Route error:", error?.response);

    const errorMessage =
      error.response?.data?.errors || "Unable to process request";
    const errorStatus = error.response?.status || 0;

    // if (errorStatus === 500) {
    //   navigate("/500");
    //   return;
    // }

    const message =
      errorStatus >= 500
        ? "Unable to communicate with server"
        : errorMessage || "Unable to process request";

    const alertClass = "alert alert-warning";

    return showAlert(
      true,
      component ? `${component} ${message}` : message,
      alertClass
    );
  };

  useEffect(() => {
    const token = secureLocalStorage.getItem("token");
    if (token) {
      if (isHr) {
        fetchAllEmployees();
        fetchAllDepartments();
        fetchAllCampaigns();
        fetchAllTeams();
        fetchAllLeaders();
        fetchAllDesignations();
        fetchAllBranches();
        fetchDeductionTypes();
        fetchJobOpenings();
        fetchAllSurveys();
        fetchAllPublicHolidays();
        fetchHRLeavesNotificationCount();
      }

      if (isTeamLead && !isHr) {
        fetchAllEmployees();
        fetchAllDepartments();
        fetchAllCampaigns();
        fetchAllTeams();
        fetchAllLeaders();
        fetchAllDesignations();
        fetchAllPublicHolidays();
      }

      if (isSecurity) {
        fetchAllEmployees();
      }

      if (isPayrollProcessor) {
        fetchAllPayrollDates();
      }

      fetchUserPic();
      fetchAllLeaveTypes();
      fetchStaffResignation();
      fetchAnnouncement();
      fetchNewsletter();
      fetchPendingSurveys();
      fetchPublicHolidays();
    }
  }, [
    fetchUserPic,
    fetchAllEmployees,
    fetchAllCampaigns,
    fetchAllDepartments,
    fetchAllDesignations,
    fetchAllLeaders,
    fetchAllPublicHolidays,
    fetchAllLeaveTypes,
    fetchAllTeams,
    fetchDeductionTypes,
    fetchJobOpenings,
    fetchStaffResignation,
    fetchAnnouncement,
    fetchNewsletter,
    fetchAllSurveys,
    fetchPendingSurveys,
    fetchPublicHolidays,
    fetchAllPayrollDates,
    isHr,
    userToken,
    isTeamLead,
    isSecurity,
    isPayrollProcessor
  ]);

  return (
    <AppContext.Provider
      value={{
        loadingEmployeeSelect,
        selectEmployees,
        setSelectEmployees,
        fetchAllEmployees,

        resignationStatusTypes,
        selectOfficeTypes,

        selectDepartments,
        setSelectDepartments,
        fetchAllDepartments,

        selectCampaigns,
        setSelectCampaigns,
        fetchAllCampaigns,

        selectTeams,
        setSelectTeams,
        fetchAllTeams,

        selectLeaders,
        setSelectLeaders,
        fetchAllLeaders,

        selectDesignations,
        setSelectDesignations,
        fetchAllDesignations,

        selectBranches,
        setSelectBranches,
        fetchAllBranches,

        selectLeaveTypes,
        setSelectLeaveTypes,
        fetchAllLeaveTypes,

        selectDeductionTypes,
        setSelectDeductionTypes,
        fetchDeductionTypes,

        selectJobOpenings,
        setSelectJobOpenings,
        fetchJobOpenings,

        selectSurvey,
        setSelectSurvey,
        fetchAllSurveys,

        selectPublicHoliday,
        setSelectPublicHoliday,
        fetchAllPublicHolidays,

        loadingSelect,
        setLoadingSelect,

        dropDownClicked,
        setDropDownClicked,

        loadingUserResignation,
        userResignations,
        fetchStaffResignation,

        loadingJobAppIntOpts,
        InterviewStatusOptions,
        InterviewProcessStageOptions,
        fetchAllJobApplicationISandIPS,

        announcement,
        setAnnouncement,
        loadingAnnouncement,
        setLoadingAnnouncement,
        announcementWatched,
        setAnnouncementWatched,
        fetchAnnouncement,

        newsletter,
        setNewsletter,
        loadingNewsletter,
        setLoadingNewsletter,
        newsletterRead,
        setNewsletterRead,
        fetchNewsletter,

        pendingSurveys,
        fetchPendingSurveys,
        pendingSurveySubmitted,
        setPendingSurveySubmitted,

        allPublicHolidayEvents,
        setAllPublicHolidayEvents,
        fetchPublicHolidays,

        selectOutOfOfficeReasons,
        leadershipTypes,

        allPayDates,
        payday,
        loadingPayday,
        setLoadingPayday,
        currentPaydayData,
        fetchAllPayrollDates,
        deductionFromDate,
        setDeductionFromDate,
        deductionToDate,
        setDeductionToDate,

        userDp,
        generateOrdinal,
        getAvatarColor,
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
        ErrorHandler,
        status,
        officeTypeOptions,
        categoryOptions,
        salaryMode,
        goToTop,
        goToBottom,
        FontAwesomeIcon,
        faSpinner
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
