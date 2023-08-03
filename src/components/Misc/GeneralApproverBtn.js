/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";

const GeneralApproverBtn = ({
  options,
  setStatus,
  setstatusRow,
  row,
  value,
}) => {
  const handleStatus = (status) => {
    setStatus(status);
    setstatusRow(row);
  };

  // console.log({
  //   options,
  //   setStatus,
  //   setstatusRow,
  //   row,
  //   value,
  // });

  return (
    <div>
      <div className="dropdown action-label text-center">
        <a
          className="btn btn-gray btn-sm btn-rounded dropdown-toggle"
          style={{ padding: "5px 10px" }}
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <i className={`fa fa-dot-circle-o  text-success`}></i> {value}
        </a>
        <div className="dropdown-menu dropdown-menu-right">
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
      </div>
    </div>
  );
};

export default GeneralApproverBtn;
