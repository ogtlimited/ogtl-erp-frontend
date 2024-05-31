/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./ModalContent.css";

const DocAnnouncementContent = ({ content }) => {
  const { body } = content || {};

  return (
    <div>
      <div className="well" dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
};

export default DocAnnouncementContent;
