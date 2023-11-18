/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const GeneralApproverBtn = ({
  options,
  options2,
  setStatus,
  setStatus2,
  value,
  row,
  setStatusRow,
  setStatusRow2,
  fetchAllJobApplicants,
}) => {
  // const handleStatus = (status) => {
  //   setStatus(status);
  //   setStatusRow(row);
  // };

  return (
    <div>
      {/* <div className="dropdown action-label text-center">
        <a
          className="btn btn-gray btn-sm btn-rounded dropdown-toggle" 
          style={{ padding: "5px 10px" }}
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <i className={`fa fa-dot-circle-o   ${options.find(opt => opt.title === value)?.color}`}></i> {value}
        </a>
        <div className="dropdown-menu dropdown-menu-right status-dropdown-menu">
          {options.map((opt, index) => (
            <a
              key={index}
              className="dropdown-item"
              onClick={() => handleStatus(opt.title)}
            >
              <i className={"fa fa-dot-circle-o " + opt.color}></i>
              {opt.title}
            </a>
          ))}
        </div>
      </div> */}

      <div className="dropdown action-label text-center">
        <a
          className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
          style={{ padding: "5px 10px" }}
          data-toggle="modal"
          data-target="#JobApplicationSieveModal"
        >
          <i
            className={`fa fa-dot-circle-o   ${
              options.find((opt) => opt.title === value)?.color
            }`}
          ></i>{" "}
          {value}
        </a>
      </div>
    </div>
  );
};

export default GeneralApproverBtn;
