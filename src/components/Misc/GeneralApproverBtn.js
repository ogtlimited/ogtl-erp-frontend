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
  return (
    <div>
      <div class="dropdown action-label text-center">
        <a
          class="btn btn-gray btn-sm btn-rounded dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fa fa-dot-circle-o text-success"></i> {value}
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          {options.map((opt) => (
            <a class="dropdown-item" onClick={() => handleStatus(opt.title)}>
              <i class={"fa fa-dot-circle-o " + opt.color}></i>
              {opt.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneralApproverBtn;
