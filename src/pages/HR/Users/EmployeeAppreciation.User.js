//* IN USE

import React from "react";
import { useAppContext } from "../../../Context/AppContext";
import eCertificate from "../../../assets/img/Certificate of Appreciation.jpg";

const EmployeeAppreciation = () => {
  const { user } = useAppContext();

  const employeeName = user?.employee_info?.personal_details
  const {first_name, last_name} = employeeName;

  console.log(employeeName)

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Employee Appreciation eCertificate</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Main</li>
              <li className="breadcrumb-item active">Employee Appreciation</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <button className="btn add-btn m-r-5">Download</button>
          </div>
        </div>

        <div className="eCertificate_container">
          <div className="eCertificate_img_wrapper">
            <p>{first_name} {last_name}</p>
            <img src={eCertificate} alt="Certificate of Appreciation" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeAppreciation;
