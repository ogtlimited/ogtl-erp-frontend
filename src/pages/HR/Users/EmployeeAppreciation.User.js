//* IN USE

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useAppContext } from "../../../Context/AppContext";
import ECertificate from "../../In-Apps/eCertificate";

const EmployeeAppreciation = () => {
  const { user } = useAppContext();

  const employeeName = user?.employee_info?.personal_details;

  const eCertificateRef = useRef();
  const handlePrintCertificate = useReactToPrint({
    content: () => eCertificateRef.current,
  });

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Employee Appreciation eCertificate</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Apps</li>
              <li className="breadcrumb-item active">Employee Appreciation</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <button
              className="btn add-btn m-r-5"
              onClick={handlePrintCertificate}
            >
              Download
            </button>
          </div>
        </div>

        <div className="eCertificate_container">
          {employeeName && (
            <ECertificate
              employeeDetails={employeeName}
              ref={eCertificateRef}
            />
          )}
          <div className="">
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeAppreciation;
