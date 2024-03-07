import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import axiosInstance from "../../../services/api";
import IWDSpinner from "../../../assets/img/IWD_loader-2.gif";
import { IWDFormModal } from "../../../components/Modal/IWDFormModal";
import { MdArrowForwardIos } from "react-icons/md";

const initialState = {
  loading: true,
  quotes: [],
  currentQuoteIndex: 0,
  backgroundColor: "",
  errorMsg: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_QUOTES":
      return { ...state, quotes: action.payload, loading: false };
    case "SET_CURRENT_QUOTE_INDEX":
      return { ...state, currentQuoteIndex: action.payload };
    case "SET_BACKGROUND_COLOR":
      return { ...state, backgroundColor: action.payload };
    case "SET_ERROR_MSG":
      return { ...state, errorMsg: action.payload, loading: false };
    default:
      return state;
  }
};

const Countdown = ({ currentQuoteIndex }) => {
  const [seconds, setSeconds] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          return 20;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuoteIndex]);

  useEffect(() => {
    setSeconds(20);
  }, [currentQuoteIndex]);

  return <div className="IWD_countdown">{seconds}</div>;
};

const IWDUser = () => {
  const [
    { loading, quotes, currentQuoteIndex, backgroundColor, errorMsg },
    dispatch,
  ] = useReducer(reducer, initialState);

  const colors = useMemo(
    () => [
      "#BD1877",
      "#7E77DD",
      "#5D48B8",
      "#9b59b6",
      "#6B2B63",
      "#8E3C64",
      "#FF69B4",
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

      const resData = response?.data?.data?.womens_day_event_records;

      dispatch({ type: "SET_QUOTES", payload: resData || [] });
    } catch (error) {
      dispatch({ type: "SET_ERROR_MSG", payload: true });
      console.error("Error fetching quotes:", error);
    }
  };

  // Move to the previous quote
  const prevQuote = useCallback(() => {
    dispatch({
      type: "SET_CURRENT_QUOTE_INDEX",
      payload:
        currentQuoteIndex === 0 ? quotes.length - 1 : currentQuoteIndex - 1,
    });
  }, [currentQuoteIndex, quotes.length]);

  // Move to the next quote
  const nextQuote = useCallback(() => {
    dispatch({
      type: "SET_CURRENT_QUOTE_INDEX",
      payload:
        currentQuoteIndex === quotes.length - 1 ? 0 : currentQuoteIndex + 1,
    });
  }, [currentQuoteIndex, quotes.length]);

  useEffect(() => {
    fetchQuotes();
    const interval = setInterval(nextQuote, 20000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextQuote]);

  // Update background color when currentQuoteIndex changes
  useEffect(() => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    dispatch({ type: "SET_BACKGROUND_COLOR", payload: color });
  }, [currentQuoteIndex, colors]);

  return (
    <>
      <div className="IWD-page-wrapper">
        <div
          className="IWD_page-header"
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

        {errorMsg ? null : (
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
                <div className="scroll_IWD_div">
                  <MdArrowForwardIos
                    className="scroll_IWD_button back"
                    onClick={prevQuote}
                  />
                </div>

                <div className="IWD_quote_box">
                  <div className="IWD_quote_text">
                    <i className="fa fa-quote-left"></i>
                    <span id="IWD_text">
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
                            alt={quotes[currentQuoteIndex]?.full_name}
                            // loading="lazy"
                          />
                        ) : null}
                      </div>
                      <div className="IWD_Profile_info_div">
                        <p>
                          {quotes[currentQuoteIndex]?.full_name &&
                            quotes[currentQuoteIndex]?.full_name?.toUpperCase()}
                        </p>
                        <p>{quotes[currentQuoteIndex]?.ogid}</p>
                        <p>
                          {quotes[currentQuoteIndex]?.office &&
                            quotes[currentQuoteIndex]?.office?.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    {quotes?.length ? (
                      <Countdown currentQuoteIndex={currentQuoteIndex} />
                    ) : null}

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

                <div className="scroll_IWD_div">
                  <MdArrowForwardIos
                    className="scroll_IWD_button"
                    onClick={nextQuote}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <IWDFormModal fetchAllQuotes={fetchQuotes} />
    </>
  );
};

export default IWDUser;
