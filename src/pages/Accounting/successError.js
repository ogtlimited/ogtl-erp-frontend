import React from "react";
import success from "../../assets/img/success.svg";
import failed from "../../assets/img/info-danger.svg";


const SuccessError = ({ message,response }) => {
  return (
    <div className="d-flex row justify-content-center m-3">
      {" "}
      <img
        style={{ width: "100px", alignSelf: "center" }}
        src={message === "success" ? success : failed}
      />
      <p className="mt-3 text-center">{response}</p>
    </div>
  );
};

export default SuccessError;
