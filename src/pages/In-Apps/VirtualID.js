/** @format */
import './virtualID.css'
import React from 'react';
import moment from 'moment';

const VirtualID = (props) => {
  console.log("Virtual ID Props:", props)
  return (
    <>
      <div className="virtual-card">
        <div className="virtual-card-logo">
          <img src="https://res.cloudinary.com/dhantey/image/upload/v1676380670/OGTL/outsource_cdalod.png" alt="Outsource Global logo" />
        </div>

        <div className="virtual-card-image-container">
          <div className="virtual-card-image">
            {props.gender === "female" ? 
            <img src="https://res.cloudinary.com/dhantey/image/upload/v1679518841/female-placeholder-image_vbmnxe.webp" alt="Female Employee" />
            : props.gender === "male" ?
            <img src="https://res.cloudinary.com/dhantey/image/upload/v1679527521/male-placeholder-image_oirebb.webp" alt="Male Employee" />
            : 
            <img src="https://res.cloudinary.com/dhantey/image/upload/v1679528249/unknown-user-images_k0jjaq.png" alt="No Employee" />
          }
          </div>
        </div>

        <div className="virtual-card-employee-info-container">
          <div className="virtual-card-employee-info">
            <h3>{props.fullName}</h3>
            <p style={{color: '#00AEEF', fontSize: '13px', fontWeight: '500'}}>{props.designation}</p>
            <img src="https://res.cloudinary.com/dhantey/image/upload/v1679519740/signature-placeholder_xykxnx.png" alt="Employee Signature" />
            <p>Authorized Signature</p>
          </div>
        </div>

        <div className="virtual-card-contact-ogid-container">
          <div className="virtual-card-contact-ogid">
            {/* <p>OG000000</p> */}
            <p>OG{ props?.ogid ? moment(props?.ogid).format("YYMMDD") : ""}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VirtualID;
