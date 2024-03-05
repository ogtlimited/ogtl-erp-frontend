import React, { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import axios from "axios";
import IWDSpinner from "../../../assets/img/IWD_loader-2.gif";

const IWDUser = () => {
  const { showAlert } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState(null);

  // Quotes:
  const fetchQuote = async () => {
    try {
      const result = await axios.get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      );
      const quotes = result?.data?.quotes;
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuotes(randomQuote);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(() => {
      fetchQuote();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // // Handle Get IWD Messages:
  // const handleGetIWDMessages = useCallback(async () => {
  //   try {
  //     const res = await axiosInstance.get(`/api/v1/valentine_pairings.json`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "ngrok-skip-browser-warning": "69420",
  //       },
  //     });

  //     const resData = res?.data?.data?.pair;

  //     setData(resData);
  //     setLoading(false);
  //   } catch (error) {
  //     const errorMsg = error.response?.data?.errors;
  //     showAlert(true, `${errorMsg}`, "alert alert-danger");
  //     setLoading(false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   handleGetIWDMessages();
  // }, [handleGetIWDMessages]);

  // // Handle Post Message:
  // const handlePostIWDMessage = async () => {
  //   setFindingVal(true);

  //   try {
  //     const res = await axiosInstance.post(`/api/v1/valentine_pairings.json`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "ngrok-skip-browser-warning": "69420",
  //       },
  //     });

  //     if (res?.status === 200) {
  //       const resData = res?.data?.data?.pair;
  //       setData(resData);
  //       setFindingVal(false);
  //     }
  //   } catch (error) {
  //     const errorMsg = error.response?.data?.errors;
  //     showAlert(true, `${errorMsg}`, "alert alert-danger");
  //     setFindingVal(false);
  //   }
  // };

  return (
    <div className="IWD-page-wrapper">
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h2 className="page-title IWD_styling_page">INTERNATIONAL</h2>
          </div>
        </div>
      </div>

      <div className="IWD_page">
        {loading ? (
          <div className="IWD_Spinner">
            <img
              src={IWDSpinner}
              alt="IWD Spinner"
              className="IWD_spinner_icon"
            />
            <p>loading...</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default IWDUser;
