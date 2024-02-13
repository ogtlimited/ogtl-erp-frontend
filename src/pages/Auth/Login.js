// *IN-USE FIXED!

import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import tokenService from "../../services/token.service";
import { msalInstance, loginRequest, graphConfig } from "../../authConfig";
import config from "../../config.json";

const Login = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

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

      // const activeUser = e?.account?.username;

      const obj = {
        company_email: data.company_email.trim(),
      };

      // if (obj.company_email !== activeUser) {
      //   setErrorMsg("There is an active user on this device");
      //   return;
      // }

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

          // const activeUser = e?.account?.username;

          const obj = {
            company_email: data.company_email.trim(),
          };

          // if (obj.company_email !== activeUser) {
          //   setErrorMsg("Please login with your credentials");
          //   return;
          // }

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

  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="container">
          <div className="account-logo">
            <a href="https://www.outsourceglobal.com/">
              <img
                className="logo"
                src="/static/media/outsource.2499b5b3.png"
                alt="Outsource Global Technologies"
              />
              <span className="val_icons">
                <lord-icon
                  src="https://cdn.lordicon.com/ppmqpdfo.json"
                  trigger="loop"
                  delay="2000"
                  style={{ width: "35px", height: "35px" }}
                ></lord-icon>
                <span className="hearts_icon">💕</span>
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
      </div>
    </div>
  );
};

export default Login;
