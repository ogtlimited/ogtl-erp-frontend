/** @format */
import './backVirtualID.css'
import React from 'react';

const BackVirtualID = React.forwardRef((props, ref) => {
 
  return (
    <>
      <div className="back-card" ref={ref}>
        <div className="back-card-logo">
          <img src="https://res.cloudinary.com/dhantey/image/upload/v1676380670/OGTL/outsource_cdalod.png" alt="Outsource Global logo" />
        </div>

        <div className="back-card-note-container">
          <img src="https://res.cloudinary.com/dhantey/image/upload/v1679696423/OGTL-VirtualID-Back_hstzti.png" alt="Outsource Global Info" />
        </div>

        <div className="back-card-contact-footer-container">
          <div className="back-card-contact-footer">
            <p>24/7 CALL CENTER</p>
          </div>
        </div>
      </div>
    </>
  );
});

export default BackVirtualID;
