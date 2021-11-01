import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../services/api";
import tokenService from "../../services/token.service";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

const Login = () => {
  const { instance } = useMsal();
  let history = useHistory();
  const [errorMsg, seterrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    instance
      .loginPopup(loginRequest)
      .then((e) => {
        console.log(e);
        const obj = {
          company_email: e.account.username,
        };
        localStorage.setItem("microsoftAccount", JSON.stringify(e.account));
        localStorage.setItem(
          "microsoftAccessToken",
          JSON.stringify(e.accessToken)
        );
        axios
          .post("https://erp-api.outsourceglobal.com/api/login", obj)
          .then((res) => {
            console.log(res);
            tokenService.setUser(res.data.employee);
            // fetchEmployee()
            // fetchEmployeeAttendance()
            tokenService.setToken(res.data.token.token);
            window.location.href = "/admin/employee-dashboard";
          })
          .catch((err) => {
            console.log(err);
            console.log(err.message?.message);
            seterrorMsg("Unable to login either ogid or password is incorrect");
            // setInterval(() => {
            //     seterrorMsg('')
            // }, 5000);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="main-wrapper">
      <div className="account-content">
        <div className="container">
          <div className="account-logo">
            <Link href="/">
              <img
                className="logo"
                src="/static/media/outsource.2499b5b3.png"
                alt="Outsource Global Technologies"
              />
            </Link>
          </div>
          <div className="account-box">
            <div className="account-wrapper">
              <h3 className="account-title">Login</h3>
              <p className="account-subtitle">Access to our dashboard</p>
              <h6 className="text-center">
                <small className="account-subtitle text-center error">
                  {errorMsg}
                </small>
              </h6>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="ogid">Email </label>
                  <input
                    type="text"
                    name="ogid"
                    id="ogid"
                    {...register("ogid", { required: true })}
                    className="form-control"
                  />
                  {errors.ogid && errors.ogid.type === "required" && (
                    <span className="error">Email is required</span>
                  )}
                </div>
                {/* <div className="form-group mt-2">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="col-auto">
                      <a className="text-muted" href="/">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    {...register("password", { required: true })}
                    className="form-control"
                  />
                  {errors.password && errors.password.type === "required" && (
                    <span className="error">Password is required</span>
                  )}
                </div> */}
                <div className="form-group text-center">
                  <button className="btn btn-primary account-btn" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
