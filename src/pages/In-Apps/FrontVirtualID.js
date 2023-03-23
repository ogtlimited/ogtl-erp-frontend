/** @format */
import './virtualID.css'
import React from 'react';

const FrontVirtualID = ({ employeeDetails }) => {
  const data = employeeDetails;
  return (
    <>
      <div className="virtual-card" style={{margin: '10px'}}>
        <div className="virtual-card-logo">
          <img src="https://res.cloudinary.com/dhantey/image/upload/v1676380670/OGTL/outsource_cdalod.png" alt="Outsource Global logo" />
        </div>

        <div className="virtual-card-image-container">
          <div className="virtual-card-image">
            {data?.gender === "female" ? 
            <img src="https://res.cloudinary.com/dhantey/image/upload/v1679518841/female-placeholder-image_vbmnxe.webp" alt="Female Employee" />
            : data?.gender === "male" ?
            <img src="https://res.cloudinary.com/dhantey/image/upload/v1679527521/male-placeholder-image_oirebb.webp" alt="Male Employee" />
            : 
            <img src="https://res.cloudinary.com/dhantey/image/upload/v1679528249/unknown-user-images_k0jjaq.png" alt="No Employee" />
          }
          </div>
        </div>

        <div className="virtual-card-employee-info-container">
          <div className="virtual-card-employee-info">
            {!data ? '' : <h3 style={{fontSize: "18px"}}>{data?.first_name + " " + data?.middle_name + " " + data?.last_name}</h3>}
            <p style={{color: '#00AEEF', fontSize: '13px', fontWeight: '500'}}>{data?.designation?.designation}</p>
            <img src="https://res.cloudinary.com/dhantey/image/upload/v1679519740/signature-placeholder_xykxnx.png" alt="Employee Signature" />
            <p>Authorized Signature</p>
          </div>
        </div>

        <div className="virtual-card-contact-ogid-container">
          <div className="virtual-card-contact-ogid">
            <p>{data?.ogid}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrontVirtualID;
