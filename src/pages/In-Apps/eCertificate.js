import "./frontVirtualID.css";
import React from "react";
import eCertificate from "../../assets/img/Certificate of Appreciation.jpg";

const ECertificate = React.forwardRef((employeeDetails, ref) => {
  const { first_name, last_name } = employeeDetails?.employeeDetails;

  return (
    <>
      <div className="eCertificate_img_wrapper" ref={ref}>
        <div className="eCertificate_p_wrapper">
          <p>
            <strong>
              {first_name
                ?.toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
              {last_name
                ?.toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </strong>
          </p>
        </div>
        <img src={eCertificate} alt="Certificate of Appreciation" />
      </div>
    </>
  );
});

export default ECertificate;
