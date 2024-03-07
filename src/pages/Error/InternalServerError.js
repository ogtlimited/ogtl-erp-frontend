import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import LegalDebugger from "../../assets/img/legal-debugger.jpg";
import SnowdenMoses from "../../assets/img/SnowdenMoses.jpeg";
import UD from "../../assets/img/undefined.jpg";
import Maryam from "../../assets/img/Maryam.jpeg";
import Muazat from "../../assets/img/Muazat.webp";
import Crown from "../../assets/img/crown.gif";
import axiosInstance from "../../services/api";
import Skeleton from "@material-ui/lab/Skeleton";
import AlertSvg from "./AlertSvg";

const ERPDevs = [
  {
    id: "OG202036",
    name: "Maryam",
    image: `${Maryam}`,
  },
  {
    id: "OG220233",
    name: "SnowdenMoses",
    image: `${SnowdenMoses}`,
  },
  {
    id: "OG172422",
    name: "Legal Debugger",
    image: `${LegalDebugger}`,
  },
  {
    id: "OG220133",
    name: "UD",
    image: `${UD}`,
  },
  {
    id: "OG220848",
    name: "Muazat (Illegal Debugger)",
    image: `${Muazat}`,
  },
];

const InternalServerError = () => {
  const [erpTeam, setErpTeam] = useState([]);
  const [showAlertMsg, setShowAlertMsg] = useState({
    state: false,
    msg: "",
    class: "",
  });

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
      label,
    });
    setTimeout(() => {
      setShowAlertMsg({
        state: "",
        msg: "",
        class: "",
        icon: "",
        label: "",
      });
    }, 5000);
  };

  const fetchWhoToFire = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/who_to_fire.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const resData = response?.data?.data?.who_to_fire;

      resData.forEach((item) => {
        const foundDev = ERPDevs.find((dev) => dev.id === item.ogid);
        if (foundDev) {
          item.name = foundDev.name;
          item.image = foundDev.image;
        }
      });

      setErpTeam(resData);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
    }
  }, []);

  useEffect(() => {
    fetchWhoToFire();
  }, [fetchWhoToFire]);

  const EmployeeCard = ({ id, voteCount, name, image, onClick }) => (
    <div className="wtf">
      <div className="wtf_crown_wrapper">
        {voteCount === getMaxVoteCount() && (
          <img src={Crown} alt="Crown" className="crown-icon" />
        )}
      </div>
      <div className="wtf_wrapper data" onClick={() => onClick(id, name)}>
        <div className="wtf_img_wrapper">
          <img src={image} alt={name} />
        </div>
        <div className="wtf_p_wrapper">
          <p>
            <span>{voteCount}</span> {voteCount > 1 ? " votes" : " vote"}
          </p>
          <p>{name}</p>
        </div>
      </div>
    </div>
  );

  const getMaxVoteCount = () => {
    let maxVoteCount = 0;
    erpTeam.forEach((employee) => {
      if (employee.vote_count > maxVoteCount) {
        maxVoteCount = employee.vote_count;
      }
    });

    return maxVoteCount;
  };

  const handleVoteWhoToFire = async (data) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(
        `/api/v1/who_to_fire/${data?.ogid}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      showAlert(
        true,
        `You have successfully voted for ${data?.name} 😈`,
        "alert alert-success"
      );

      fetchWhoToFire();
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-warning");
    }
  };

  return (
    <div id="app">
      <AlertSvg />
      {showAlertMsg.state === true ? (
        <div
          className={"alert d-flex align-items-center" + showAlertMsg.class}
          style={{
            zIndex: 100,
            position: "absolute",
            right: "2%",
            top: "1.5rem",
          }}
          role="alert"
        >
          <svg
            className="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label={showAlertMsg.label}
          >
            <use xlinkHref={showAlertMsg.icon} />
          </svg>
          <div className="pl-3">{showAlertMsg.msg}</div>
        </div>
      ) : null}

      <div className="error404 error-page internal_server_error_page">
        <div className="main-wrapper">
          <div className="wtf_box">
            <h3>Who should we fire?</h3>
            {erpTeam.length ? (
              <div className="wtf_container">
                {erpTeam.map((employee) => (
                  <EmployeeCard
                    key={employee.ogid}
                    id={employee.ogid}
                    voteCount={employee.vote_count}
                    name={employee.name}
                    image={employee.image}
                    onClick={() => handleVoteWhoToFire(employee)}
                  />
                ))}
              </div>
            ) : (
              <div className="wtf_container">
                <div className="wtf">
                  <div className="wtf_wrapper skeleton">
                    <div className="wtf_img_wrapper">
                      <Skeleton
                        variant="rect"
                        width="100%"
                        height="100%"
                        animation="wave"
                      />
                    </div>

                    <div className="wtf_p_wrapper">
                      <p>
                        <Skeleton
                          variant="text"
                          width="100px"
                          animation="wave"
                        />
                      </p>
                      <p>
                        <Skeleton
                          variant="text"
                          width="100px"
                          animation="wave"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Link to="/dashboard/employee-dashboard" className="back_btn">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalServerError;
