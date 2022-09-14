/** @format */

import '../../assets/css/PublicHoliday.css';
import React, { useEffect } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';

function HolidayListModal({ closeModal, list }) {
  useEffect(() => {
    console.log("list going to view modal", list);
  }, [list]);

  return (
    <>
      <div className="public-holiday-view-modal">
        <div className="public-holiday-view-modal-container">
          <RiCloseCircleFill
            className="public-holiday-view-modal-close"
            onClick={() => closeModal(false)}
          />
          <div className="public-holiday-view-modal-info">
            <p className="ph-info">
              <strong>TITLE:</strong><span className="ph-span">{list.title}</span>
            </p>
            <p className="ph-info">
              <strong>DATE OF APPLICATION:</strong><span className="ph-span">{list.date_of_Application}</span>
            </p>
            <p className="ph-info">
              <strong>START DATE:</strong><span className="ph-span">{list.start_date}</span>
            </p>
            <p className="ph-info">
              <strong>END DATE:</strong><span className="ph-span">{list.end_date}</span>
            </p>
            <p className="ph-info">
              <strong>CAMPAIGNS:</strong>{list.campaign.map((item) => (
                <span className="ph-span" key={item.id}>{item.name}. {" "}</span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HolidayListModal;
