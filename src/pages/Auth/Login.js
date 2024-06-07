//* IN-USE FIXED!

import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import tokenService from "../../services/token.service";
import { msalInstance, loginRequest, graphConfig } from "../../authConfig";
import { TicketForm } from "../../components/FormJSON/CreateTicket";
import config from "../../config.json";
import { ExternalTicketFormModal } from "../../components/Modal/ExternalTicketFormModal";
import AlertSvg from "./AlertSvg";
import sportLogo from "../../assets/img/themed/sport5.png"

const Login = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState([]);
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

  const userData = {
    userId: null,
    email: "",
    userGroup: [],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchMsGraph = async (accessToken) => {
    const response = await fetch(graphConfig.graphMeEndpoint + "/memberOf", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user groups from Microsoft Graph");
    }

    const data = await response.json();
    const groups = data.value.map((group) => group?.displayName || group?.id);

    userData.userGroup = groups;
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const e = await msalInstance.ssoSilent(loginRequest);
      userData.email = e.account.username;

      await fetchMsGraph(e.accessToken, userData);

      const activeUser = e?.account?.username;

      const obj = {
        company_email: data.company_email.trim(),
      };

      if (obj.company_email !== activeUser) {
        setErrorMsg("There is an active user on this device");
        return;
      }

      setErrorMsg("");

      const res = await axios.post(
        config.ApiUrl + "/api/v1/auth/login.json",
        {
          email: obj.company_email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      tokenService.setUser(res.data.data);
      tokenService.setToken(res.data.data.token);

      userData.userId = res?.data?.data?.employee_info?.personal_details?.id;

      tokenService.setKpiUser(userData);

      if (res.data.data.token) {
        window.location.href = "/dashboard/employee-dashboard";
      } else {
        setErrorMsg("Network Error. Please try again");
      }
    } catch (e) {
      if (e.name === "InteractionRequiredAuthError") {
        try {
          const e = await msalInstance.loginPopup(loginRequest);
          userData.email = e.account.username;

          await fetchMsGraph(e.accessToken);

          const activeUser = e?.account?.username;

          const obj = {
            company_email: data.company_email.trim(),
          };

          if (obj.company_email !== activeUser) {
            setErrorMsg("Please login with your credentials");
            return;
          }

          setErrorMsg("");

          const res = await axios.post(
            config.ApiUrl + "/api/v1/auth/login.json",
            {
              email: obj.company_email,
            },
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "ngrok-skip-browser-warning": "69420",
              },
            }
          );

          tokenService.setUser(res.data.data);
          tokenService.setToken(res.data.data.token);

          userData.userId =
            res?.data?.data?.employee_info?.personal_details?.id;

          tokenService.setKpiUser(userData);

          if (res.data.data.token) {
            window.location.href = "/dashboard/employee-dashboard";
          } else {
            setErrorMsg("Network Error. Please try again");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        if (e?.response?.status <= 400) {
          setErrorMsg("Unable to login. Please try again");
        } else if (e?.response?.status === 404) {
          setErrorMsg("Invalid email. Please double-check and try again");
        } else if (e?.response?.status >= 500 || !e?.response) {
          setErrorMsg(
            "Unable to communicate with the server. Please try again later."
          );
        } else {
          setErrorMsg(
            e?.response?.data?.errors ||
              "Error accessing the server, please try again later."
          );
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEndSession = (e) => {
    e.preventDefault();
    tokenService.clearStorage();
    navigate("/auth/login");
    msalInstance
      .logoutPopup()
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.error(e);
      });

    setErrorMsg("");
  };

  const handleCreate = () => {
    setTicket(TicketForm);
  };

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <AlertSvg />
        {showAlertMsg.state === true ? (
          <div
            className={"alert d-flex align-items-center" + showAlertMsg.class}
            style={{ zIndex: 100, position: "absolute", right: "2%" }}
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

        <div className="container">
          <div className="account-logo">
            <a href="https://www.outsourceglobal.com/">
              <img
                className="logo"
                src="/static/media/outsource.2499b5b3.png"
                alt="Outsource Global Technologies"
              />
              <span className="login_logo_icons">
                {/* <lord-icon
                  src="https://cdn.lordicon.com/pyarizrk.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:#121331,secondary:#f8b9d4,tertiary:#0253CC,quaternary:#00C5FB"
                  style={{ width: "40px", height: "40px" }}
                ></lord-icon> */}

                <img src={sportLogo} alt="sport logo" />
              </span>
            </a>
          </div>
          <div className="account-box">
            <div className="account-wrapper">
              <h3 className="account-title">Login</h3>
              <p className="account-subtitle">Access your dashboard</p>
              <h6 className="text-center">
                <small className="account-subtitle text-center error">
                  {errorMsg}
                </small>
              </h6>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="company_email">Email </label>
                  <input
                    type="text"
                    name="company_email"
                    id="company_email"
                    placeholder="Enter your company email"
                    {...register("company_email", { required: true })}
                    className="form-control login-input"
                  />
                  {errors.company_email &&
                    errors.company_email.type === "required" && (
                      <span className="error">Email is required</span>
                    )}
                </div>
                <div className="form-group text-center">
                  <button
                    className="btn btn-primary account-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {errorMsg === "There is an active user on this device" && (
          <button
            className="btn btn-secondary close-account-btn"
            onClick={(e) => handleEndSession(e)}
          >
            End Current Session
          </button>
        )}

        <div
          className="create_ticket_div"
          data-toggle="modal"
          data-target="#TicketFormModal"
          onClick={handleCreate}
        >
          <lord-icon
            src="https://cdn.lordicon.com/amjaykqd.json"
            trigger="hover"
            state="hover-conversation-alt"
            colors="primary:#0253CC,secondary:#00C5FB"
            style={{ width: "100px", height: "100px" }}
          ></lord-icon>
          <span className="create_ticket_text">Submit a Ticket</span>
        </div>
      </div>

      <ExternalTicketFormModal
        data={ticket}
        loggedIn={false}
        showAlert={showAlert}
      />
    </div>
  );
};

export default Login;
