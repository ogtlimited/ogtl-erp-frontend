/** @format */
import './frontVirtualID.css'
import React from 'react';

const FrontVirtualID = React.forwardRef((employeeDetails, ref) => {
  const data = employeeDetails.employeeDetails;
  const fullName = `${data?.personal_detail?.first_name?.split(" ")[0]} ${data?.personal_detail?.last_name}`

  return (
    <>
      <div className="front-card" ref={ref}> 
        <div className="front-card-logo">
          <img src="https://res.cloudinary.com/dhantey/image/upload/v1676380670/OGTL/outsource_cdalod.png" alt="Outsource Global logo" />
        </div>

        <div className="front-card-image-container">
          <div className="front-card-image">
            {data?.personal_detail?.gender === "female" ? 
            <img src={data?.profile_picture || "https://res.cloudinary.com/dhantey/image/upload/v1679518841/female-placeholder-image_vbmnxe.webp"} alt="Female Employee" />
            : data?.personal_detail?.gender === "male" ?
            <img src={data?.profile_picture || "https://res.cloudinary.com/dhantey/image/upload/v1679527521/male-placeholder-image_oirebb.webp"} alt="Male Employee" />
            : 
            <img src="https://res.cloudinary.com/dhantey/image/upload/v1679528249/unknown-user-images_k0jjaq.png" alt="No Employee" />
          }
          </div>
        </div>

        <div className="front-card-employee-info-container">
          <div className="front-card-employee-info">
            {!data ? '' : <p>{fullName}</p>}
            <p>{data?.designation?.title}</p>
            <img src="https://res.cloudinary.com/dhantey/image/upload/tgmosztscjwd6fxtjvrw.jpg" alt="Employee Signature" />
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
