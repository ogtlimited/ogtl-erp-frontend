import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useAppContext } from "../../../Context/AppContext";
import axios from "axios";
import IWDSpinner from "../../../assets/img/IWD_loader-2.gif";

const IWDUser = () => {
  const { showAlert } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("");

  const colors = useMemo(
    () => [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857",
      "#000000",
      "#426871",
      "#F64F5C",
      "#002050",
      "#843629",
      "#558390",
      "#12989E",
      "#6B2B63",
      "#8E3C64",
    ],
    []
  );

  // Fetch quotes from the API
  const fetchQuotes = useCallback(async () => {
    try {
      const result = await axios.get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      );
      setQuotes(result?.data?.quotes || []);
      const color = colors[Math.floor(Math.random() * colors.length)];
      setBackgroundColor(color);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching quotes:", error);
    }
  }, [colors]);

  // Move to the next quote
  const nextQuote = useCallback(() => {
    setCurrentQuoteIndex((prevIndex) =>
      prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
    );
  }, [quotes.length]);

  useEffect(() => {
    fetchQuotes();
    const interval = setInterval(nextQuote, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchQuotes, nextQuote]);

  // Update background color when currentQuoteIndex changes
  useEffect(() => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(color);
  }, [currentQuoteIndex, colors]);

  return (
    <div className="IWD-page-wrapper">
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
                <span id="IWD_text">{quotes[currentQuoteIndex]?.quote}</span>
              </div>
              <div className="IWD_quote_author"></div>

              <div className="IWD_button_div">
                <div className="IWD_Profile_div">
                  <div className="IWD_Profile_image_div">
                    <img src={IWDSpinner} alt="Author" />
                  </div>
                  <div className="IWD_Profile_info_div">
                    <p>{quotes[currentQuoteIndex]?.author}</p>
                    <p>OGid</p>
                    <p>Office</p>
                  </div>
                </div>

                <button
                  className="new_IWD_button"
                  id="new-IWD-quote"
                  // onClick={getQuote}
                >
                  New Message
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IWDUser;
