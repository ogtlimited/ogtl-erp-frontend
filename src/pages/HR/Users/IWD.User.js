import React, { useState, useEffect, useCallback, useMemo } from "react";
import axiosInstance from "../../../services/api";
import IWDSpinner from "../../../assets/img/IWD_loader-2.gif";
import profilePic from "../../../assets/img/Maryam.jpeg";
import { IWDFormModal } from "../../../components/Modal/IWDFormModal";

const IWDUser = () => {
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("");

  const colors = useMemo(
    () => [
      "#BD1877",
      "#7E77DD",
      "#5D48B8",
      "#9b59b6",
      "#6B2B63",
      "#8E3C64",

      "#FF91A4",
      "#FF69B4",
      "#FF00FF",
      "#FF66CC",
      "#C8A2C8",
      "#DA70D6",
      "#7851A9",
    ],
    []
  );

  // Fetch quotes from the API
  const fetchQuotes = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/womens_day_events.json",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      console.log(
        "IWD Messages:",
        response?.data?.data?.womens_day_event_records
      );

      const resData = response?.data?.data?.womens_day_event_records;

      setQuotes(resData || []);
      const color = colors[Math.floor(Math.random() * colors.length)];
      setBackgroundColor(color);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching quotes:", error);
    }
  };

  // Move to the next quote
  const nextQuote = useCallback(() => {
    setCurrentQuoteIndex((prevIndex) =>
      prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
    );
  }, [quotes.length]);

  useEffect(() => {
    fetchQuotes();
    const interval = setInterval(nextQuote, 3000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextQuote]);

  // Update background color when currentQuoteIndex changes
  useEffect(() => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(color);
  }, [currentQuoteIndex, colors]);

  return (
    <>
      <div className="IWD-page-wrapper">
        <div
          className="page-header"
          style={{ position: "absolute", width: "100%" }}
        >
          <div className="row align-items-center">
            <div className="col">
              <div className="IWD_styling_page">
                <h2>International Women's Day</h2>
                <span>#InspireInclusion</span>
              </div>
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
          ) : (
            <div
              id="IWD_card_wrapper"
              style={{ backgroundColor, color: backgroundColor }}
            >
              <div className="IWD_quote_box">
                <div className="IWD_quote_text">
                  <i className="fa fa-quote-left"></i>
                  <span id="IWD_text">
                    {console.log(quotes)}
                    {quotes[currentQuoteIndex]?.message}
                  </span>
                </div>
                <div className="IWD_quote_author"></div>

                <div className="IWD_button_div">
                  <div className="IWD_Profile_div">
                    <div className="IWD_Profile_image_div">
                      {quotes[currentQuoteIndex]?.image ? (
                        <img
                          src={quotes[currentQuoteIndex]?.image}
                          alt="Author"
                        />
                      ) : null}
                    </div>
                    <div className="IWD_Profile_info_div">
                      <p>{quotes[currentQuoteIndex]?.full_name}</p>
                      <p>{quotes[currentQuoteIndex]?.ogid}</p>
                      <p>{quotes[currentQuoteIndex]?.office}</p>
                    </div>
                  </div>

                  <button
                    className="new_IWD_button"
                    id="new-IWD-quote"
                    data-toggle="modal"
                    data-target="#IWDFormModal"
                  >
                    New Message
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <IWDFormModal fetchAllQuotes={fetchQuotes} />
    </>
  );
};

export default IWDUser;
