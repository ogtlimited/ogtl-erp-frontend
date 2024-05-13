// *IN USE

import "../../../assets/css/PublicHoliday.css";
import React, { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../../Context/AppContext";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import icon from "../../../assets/img/favicon.ico";

const PublicHolidayUser = () => {
  const { allPublicHolidayEvents } = useAppContext();
  const [PUBLICHOLIDAY, setPUBLICHOLIDAY] = useState([]);
  const [allPublicHolidays, setAllPublicHolidays] = useState([]);

  const [currentPublicHoliday, setCurrentPublicHoliday] = useState([]);

  const [statusFilter] = useState("all");

  // eslint-disable-next-line no-unused-vars
  const [calendarDate, setCalendarDate] = useState([]);

  const [currentTimeZoneOffset, setCurrentTimeZoneOffset] = useState("");
  const [currentTimeZone, setCurrentTimeZone] = useState("");

  // Get Time Zone Info:
  const getTimeZoneInfo = () => {
    const timeZoneAbbr = new Date()
      .toLocaleTimeString("en-us", { timeZoneName: "short" })
      .split(" ")[2];
    const offset = new Date()
      .toLocaleTimeString("en-us", { timeZoneName: "long" })
      .split(" ")[4];

    setCurrentTimeZoneOffset(offset);
    setCurrentTimeZone(timeZoneAbbr);
  };

  // Fetch all Public Holiday
  const getAllPublicHoliday = useCallback(async () => {
    try {
      setAllPublicHolidays(allPublicHolidayEvents);
      const publicHoliday = allPublicHolidayEvents.map((item) => {
        return {
          id: item?.id,
          title: item?.title,
          start: moment.utc(item?.startTime).format("YYYY-MM-DDTHH:mm:ss"),
          end: moment.utc(item?.endTime).format("YYYY-MM-DDTHH:mm:ss"),
        };
      });
      setPUBLICHOLIDAY(publicHoliday);
    } catch (error) {
      console.log(error);
    }
  }, [allPublicHolidayEvents]);

  useEffect(() => {
    getAllPublicHoliday();
    getTimeZoneInfo();
  }, [getAllPublicHoliday]);

  // Handle Date Selection
  const handleDateSelect = (selectInfo) => {
    setCalendarDate(selectInfo);
  };

  // Handle Modal Event | View Event:
  const handleEventClick = (clickInfo, allEvents) => {
    const eventId = clickInfo?.event?._def?.publicId;
    const event = allEvents;
    const thisEvent = event.find((event) => event?.id === eventId);

    // handleViewEvent(thisEvent);
    console.log(thisEvent);
  };

  const handleEvents = () => {
    setCurrentPublicHoliday(currentPublicHoliday);
  };

  // Render Event Content:
  const renderEventContent = (eventInfo) => {
    const dataStatus = allPublicHolidayEvents.find(
      (item) => item?.id === +eventInfo?.event?._def?.publicId
    );

    if (dataStatus) {
      return (
        <div
          className={`calendar_event_indicator ${dataStatus?.status || "past"}`}
        >
          <b>
            {moment.utc(dataStatus?.startTime).format("h:mm A")}{" "}
            <img src={icon} alt="OG Icon" />
          </b>
          <i>{eventInfo?.event?.title}</i>
        </div>
      );
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Public Holiday</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Main</li>
              <li className="breadcrumb-item active">Time Off</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="event_list_content_headers_event_indicator">
        <div>
          <span
            className={`event_list_past_indicator ${
              statusFilter === "past" || statusFilter === "all"
                ? "active_status"
                : ""
            }`}
          >
            Past Holidays
          </span>

          <span
            className={`event_list_happening_indicator ${
              statusFilter === "happening" || statusFilter === "all"
                ? "active_status"
                : ""
            }`}
          >
            Happening
          </span>

          <span
            className={`event_list_pending_indicator ${
              statusFilter === "pending" || statusFilter === "all"
                ? "active_status"
                : ""
            }`}
          >
            Upcoming Holidays
          </span>
        </div>
      </div>

      <div className="calendar_section">
        <div className="calendar_content">
          {currentTimeZone && (
            <div className="timezone-info">
              <span>{currentTimeZoneOffset}</span>
              <span>{currentTimeZone}</span>
            </div>
          )}
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev today next",
              center: "title",
              right: "timeGridDay,timeGridWeek,dayGridMonth,listWeek",
            }}
            initialView="timeGridWeek"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEventRows={1}
            weekends={true}
            events={PUBLICHOLIDAY}
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={(clickInfo) =>
              handleEventClick(clickInfo, allPublicHolidays)
            }
            eventsSet={handleEvents}
            dayHeaderContent={(args) => {
              const date = args?.date;
              const day = date?.toLocaleString("default", {
                weekday: "short",
              });
              const dayNumber = date?.getDate();
              return (
                <div className="calendar_header">
                  {args?.view?.type === "timeGridWeek" ? (
                    <span className="calendar_header_day">{day}</span>
                  ) : (
                    <span className="calendar_header_day">
                      {args?.text}
                    </span>
                  )}
                  {args?.view?.type === "timeGridWeek" && (
                    <span className="calendar_header_dayNumber">
                      {dayNumber}
                    </span>
                  )}
                </div>
              );
            }}
            slotLabelFormat={{
              hour: "numeric",
              minute: "2-digit",
              omitZeroMinute: true,
              hour12: true,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default PublicHolidayUser;
