import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../Context/AppContext";
import axios from "axios";
import IWDSpinner from "../../../assets/img/IWD_loader-2.gif";

const IWDUser = () => {
  const { showAlert } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Fetch quotes from the API
  const fetchQuotes = async () => {
    try {
      const result = await axios.get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      );
      setQuotes(result?.data?.quotes || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching quotes:", error);
    }
  };

  // Move to the next quote
  const nextQuote = () => {
    setCurrentQuoteIndex((prevIndex) =>
      prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    fetchQuotes();
    const interval = setInterval(nextQuote, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
        ) : (
          <div className="quote-card">
            <div className="quote-content">
              <h3>{quotes[currentQuoteIndex]?.quote}</h3>
              <p>{quotes[currentQuoteIndex]?.author}</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .quote-card {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          margin-bottom: 20px;
        }

        .quote-content {
          text-align: center;
        }

        .quote-content h3 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .quote-content p {
          font-size: 16px;
          color: #888;
        }
      `}</style>
    </div>
  );
};

export default IWDUser;
