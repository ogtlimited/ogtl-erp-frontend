/** @format */
import './frontVirtualID.css'
import React from 'react';

const FrontVirtualID = React.forwardRef((employeeDetails, ref) => {
  const data = employeeDetails.employeeDetails;

  return (
    <>
      <div className="front-card" ref={ref}> 
        <div className="front-card-logo">
          <img src="https://res.cloudinary.com/dhantey/image/upload/v1676380670/OGTL/outsource_cdalod.png" alt="Outsource Global logo" />
        </div>

        <div className="front-card-image-container">
          <div className="front-card-image">
            {data?.personal_detail?.gender === "female" ? 
            <img src="https://res.cloudinary.com/dhantey/image/upload/v1679518841/female-placeholder-image_vbmnxe.webp" alt="Female Employee" />
            : data?.personal_detail?.gender === "male" ?
            <img src="https://res.cloudinary.com/dhantey/image/upload/v1679527521/male-placeholder-image_oirebb.webp" alt="Male Employee" />
            : 
            <img src="https://res.cloudinary.com/dhantey/image/upload/v1679528249/unknown-user-images_k0jjaq.png" alt="No Employee" />
          }
          </div>
        </div>

        <div className="front-card-employee-info-container">
          <div className="front-card-employee-info">
            {!data ? '' : <p>{data?.full_name}</p>}
            <p>{data?.designation}</p>
            <img src="https://res.cloudinary.com/dhantey/image/upload/v1679519740/signature-placeholder_xykxnx.png" alt="Employee Signature" />
            <p>Authorized Signature</p>
          </div>
        </div>

        <div className="front-card-contact-ogid-container">
          <div className="front-card-contact-ogid">
            <p>{data?.ogid}</p>
          </div>
        </div>
      </div>
    </>
  );
});

export default FrontVirtualID;
