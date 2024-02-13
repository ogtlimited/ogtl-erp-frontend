import React, { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import ValSpinner from "../../../assets/img/val-loader-1.gif";
import findingValSpinner from "../../../assets/img/val-loader-1.gif";
import Confetti from "./Confetti";

const ValentineUser = () => {
  const { showAlert } = useAppContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [findingVal, setFindingVal] = useState(false);
  const [valFound, setValFound] = useState(false);

  // Handle Get Val:
  const handleGetVal = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/api/v1/valentine_pairings.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const resData = res?.data?.data?.pair;

      setData(resData);
      setLoading(false);
    } catch (error) {
      const errorMsg = error.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-danger");
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetVal();
  }, [handleGetVal]);

  // Handle Find Val:
  const handleFindVal = async () => {
    setFindingVal(true);

    try {
      const res = await axiosInstance.post(`/api/v1/valentine_pairings.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      if (res?.status === 200) {
        const resData = res?.data?.data?.pair;
        setData(resData);
        setFindingVal(false);
        setValFound(true);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.errors;
      showAlert(true, `${errorMsg}`, "alert alert-danger");
      setFindingVal(false);
    }
  };

  return (
    <div className="page-wrapper-new">
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h2 className="page-title valentine_styling_page">Valentine</h2>
          </div>
        </div>
      </div>

      <div className="valentine_page">
        {loading ? (
          <div className="finding_Val_Spinner">
            <img
              src={ValSpinner}
              alt="Valentine"
              className="val_spinner_icon"
            />
          </div>
        ) : (
          <>
            {valFound ? (
              <>
                <div className="val_pair">
                  <Confetti />
                  <p>Your Val is</p>
                  <h1>{data?.full_name}</h1>
                  <h3>
                    {data?.office ? `(${data?.office?.toUpperCase()})` : ""}
                  </h3>
                  <lord-icon
                    src="https://cdn.lordicon.com/ppmqpdfo.json"
                    trigger="loop"
                    delay="2000"
                    style={{ width: "80px", height: "80px" }}
                  ></lord-icon>
                </div>
              </>
            ) : (
              <>
                {data?.message === "Not yet paired" ? (
                  <>
                    {!findingVal ? (
                      <button className="find_val_btn" onClick={handleFindVal}>
                        Find your Val.
                      </button>
                    ) : (
                      <div className="finding_Val_Spinner">
                        <img
                          src={findingValSpinner}
                          alt="Valentine"
                          className="val_spinner_icon"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {!findingVal && (
                      <div className="val_pair">
                        <p>Your Val is</p>
                        <h1>{data?.full_name}</h1>
                        <h3>
                          {data?.office
                            ? `(${data?.office?.toUpperCase()})`
                            : ""}
                        </h3>
                        <lord-icon
                          src="https://cdn.lordicon.com/ppmqpdfo.json"
                          trigger="loop"
                          delay="2000"
                          style={{ width: "80px", height: "80px" }}
                        ></lord-icon>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* <div className="valentine_page">
        {data && !findingVal ? (
          <>
            {loading ? (
              <div className="finding_Val_Spinner">
                <img
                  src={ValSpinner}
                  alt="Valentine"
                  className="val_spinner_icon"
                />
              </div>
            ) : (
              <div className="val_pair">
                <p>Your Val is</p>
                <h1>{data?.full_name}</h1>
                <lord-icon
                  src="https://cdn.lordicon.com/ppmqpdfo.json"
                  trigger="loop"
                  delay="2000"
                  style={{ width: "80px", height: "80px" }}
                ></lord-icon>
              </div>
            )}
          </>
        ) : (
          <>
            {!findingVal ? (
              <button className="find_val_btn" onClick={handleFindVal}>
                Find your Val.
              </button>
            ) : (
              <div className="finding_Val_Spinner">
                <img
                  src={findingValSpinner}
                  alt="Valentine"
                  className="val_spinner_icon"
                />
              </div>
            )}
          </>
        )}
      </div> */}
    </div>
  );
};

export default ValentineUser;
