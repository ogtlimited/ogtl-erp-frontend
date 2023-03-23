/** @format */
import './backVirtualID.css'
import React from 'react';

const BackVirtualID = React.forwardRef((props, ref) => {
 
  return (
    <>
      <div className="back-card" style={{margin: '10px'}} ref={ref}>
        <div className="back-card-logo">
          <img src="https://res.cloudinary.com/dhantey/image/upload/v1676380670/OGTL/outsource_cdalod.png" alt="Outsource Global logo" />
        </div>

        <div className="back-card-note-container">
          <p>
            This identity card is an official document and relates only to the
            identity of the person described.
          </p>

          <p>
            impersonation of the authorized holder or alteration, destruction or transfer to 
            another person, of this card are offenses that may lead to criminal liability.
          </p>

          <p>
            If found, please return to the Outsource Global
          </p>

          <span>Lagos:</span>
          <p>295 Herbert Macaulay Way, Algomeji-Yaba Lagos</p>

          <span>Abuja:</span>
          <p>Asta Gallery, Plot 1185, B06 Cadastral Zone, Mabushi District, Abuja</p>

          <span>Kaduna:</span>
          <p>47, Kanta Road, Unguwar Rima, Kaduna State</p>

          <p>Tel: 09083008059</p>
          <p>www.outsourceglobal.com</p>
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
