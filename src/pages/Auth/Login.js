import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import tokenService from '../../services/token.service';
import { msalInstance, loginRequest } from '../../authConfig';
import config from '../../config.json';

const Login = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    msalInstance
      .ssoSilent(loginRequest)
      .then((e) => {
        // const activeUser = e?.account?.username;

        const obj = {
          email: data.company_email.trim(),
        };

        // if (obj.company_email !== activeUser) {
        //   return setErrorMsg(
        //     'There is an active user on this device'
        //   );
        // }

        setErrorMsg("")

        axios
          .post(config.ApiUrl + '/api/v1/auth/login.json', {
            headers: {          
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "ngrok-skip-browser-warning": "69420",
            }, email: obj.email
          })
          .then((res) => {
            console.log(res);
            tokenService.setUser(res.data.data);
            tokenService.setToken(res.data.data.token);
            window.location.href = '/dashboard/employee-dashboard';
          })
          .catch((err) => {
            console.log(err);
            setErrorMsg(err.message + ', please try again');
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((e) => {
        if (e.name === 'InteractionRequiredAuthError') {
          msalInstance
            .loginPopup(loginRequest)
            .then((e) => {
              // const activeUser = e?.account?.username;

              const obj = {
                email: data.company_email.trim(),
              };

              // if (obj.company_email !== activeUser) {
              //   return setErrorMsg(
              //     'Please login with your credentials'
              //   );
              // }

              setErrorMsg("")

              axios
              .post(config.ApiUrl + '/api/v1/auth/login.json', {
                headers: {          
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "ngrok-skip-browser-warning": "69420",
                }, email: obj.email
              })
                .catch((err) => {
                  console.log(err);
                })
                .finally(() => {
                  setLoading(false);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log(e);
          setCount(() => count + 1);
          if (count > 2) {
            return setErrorMsg('Unable to login. Please contact HR');
          }
          setErrorMsg('Unable to login. Please try again');
          console.log('error count', count);
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
                    placeholder='Enter your company email'
                    {...register('company_email', { required: true })}
                    className="form-control login-input"
                  />
                  {errors.company_email &&
                    errors.company_email.type === 'required' && (
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
                      'Login'
                    )}
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
