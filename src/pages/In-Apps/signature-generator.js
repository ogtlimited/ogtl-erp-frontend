/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Signature from "./signature";
import "./signature.css";
import tokenService from "../../services/token.service";
const getIcon = (name) => <i className={"las " + name}></i>;

const SignatureGenerator = () => {
  const [user] = useState(tokenService.getUser());

  const initialState = {
    fullName:
      user?.employee_info?.personal_details?.first_name +
        " " +
        user?.employee_info?.personal_details?.last_name || "",
    position: user?.employee_info?.designation || "",
    email: user?.employee_info?.email || "",
    phone: "",
    copied: false,
  };
  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    if (event.target.name === "withPhoto") {
      setState((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };
  const enoughData = () => {
    let progress = 100;
    if (state.withPhoto) {
      if (state.fullName && state?.position && state.email) {
        return (
          <React.Fragment>
            <Signature
              fullName={state.fullName}
              position={state?.position}
              email={state.email}
              phone={state.phone}
            />
            <br />
            <button
              className="btn btn-primary"
              onClick={copyToClipboard}
              endIcon={state.copied ? getIcon("la-check") : getIcon("la-copy")}
            >
              {state.copied ? "Copied" : "Copy to clipboard"}
            </button>
          </React.Fragment>
        );
      } else {
        Object.entries(state).forEach(([key, value]) => {
          if (["fullName", "position", "email"].includes(key)) {
            if (value.length === 0) {
              progress = progress - 20;
            }
          }
        });
      }
    } else {
      if (state.fullName && state?.position && state.email) {
        return (
          <React.Fragment>
            <Signature
              fullName={state.fullName}
              position={state?.position}
              email={state.email}
              phone={state.phone}
            />
            <br />
            <button className="btn btn-primary" onClick={copyToClipboard}>
              {state.copied ? "Copied" : "Copy to clipboard"}{" "}
              {state.copied ? getIcon("la-check") : getIcon("la-copy")}
            </button>
          </React.Fragment>
        );
      } else {
        Object.entries(state).forEach(([key, value]) => {
          if (["fullName", "phone", "position", "email"].includes(key)) {
            if (value.length === 0) {
              progress = progress - 25;
            }
          }
        });
      }
    }
    if (progress > 0) {
      return (
        <React.Fragment>
          <Signature
            fullName={state.fullName}
            position={
              <>
                <p style={{ color: "red" }}>
                  <strong>Please enter your designation</strong>
                </p>
              </>
            }
            email={state.email}
            phone={state.phone}
          />
          <br />
          <button className="btn btn-primary" style={{ cursor: "not-allowed" }}>
            {state.copied ? "Copied" : "Copy to clipboard"}{" "}
            {state.copied ? getIcon("la-check") : getIcon("la-copy")}
          </button>
        </React.Fragment>
      );
    } else {
      return <div>Please, input your data</div>;
    }
  };

  const copyToClipboard = () => {
    const signatureElement = document.querySelector(".signature");
    if (signatureElement) {
      const range = document.createRange();
      range.selectNode(signatureElement);
      const windowSelection = window.getSelection();
      if (windowSelection) {
        windowSelection.removeAllRanges();
        windowSelection.addRange(range);
        try {
          document.execCommand("copy");
          setState((prevState) => ({
            ...prevState,
            copied: true,
          }));
        } catch (err) {
          console.error("Failed to Copy | ", err);
        }
        windowSelection.removeAllRanges();
      }
    }
  };

  const isStateChanged = () => {
    return JSON.stringify(state) === JSON.stringify(initialState);
  };

  const clearState = () => {
    setState(initialState);
  };

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Email Signature</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Apps</li>
              <li className="breadcrumb-item active">Email Signature</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-5 d-flex gfuSqG">
          <div className="flex-fill">
            <div className="card-body">
              <form action="#">
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">Full Name</label>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      value={state.fullName}
                      name={"fullName"}
                      onChange={handleChange}
                      autoFocus={true}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">Designation</label>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      label="Position"
                      value={state?.position}
                      name={"position"}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">
                    Email Address
                  </label>
                  <div className="col-lg-9">
                    <input
                      type="email"
                      value={state.email}
                      name={"email"}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">Phone</label>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      value={state.phone}
                      name={"phone"}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="text-right">
                  {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                  <button
                    disabled={isStateChanged()}
                    onClick={clearState}
                    className="btn btn-primary"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-xl-7 d-flex ">
          <div className="gfuSqG flex-fill">
            <div className="card-body">{enoughData()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignatureGenerator;
