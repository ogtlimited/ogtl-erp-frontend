/* eslint-disable no-unused-vars */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import welcome from "../../../assets/img/welcome.png";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import holidays from "./holidays.json";
import ogids from "./allEmployeeOgid.json";

import personal from "./personal.json";

const ClientUser = () => {
  const date = new Date().toUTCString();
  const { notifications, user } = useAppContext();
  const [leaveTaken, setLeaveTaken] = useState(0);
  const [leaveRemaining, setLeaveRemaining] = useState(0);

  const [jobOpeningsLength, setJobOpeningsLength] = useState("");
  const [quotes, setQuotes] = useState(null);

  const getNextHoliday = () => {
    const year = new Date().getFullYear();
    const current = new Date().getTime();
    const mapHolidays = holidays.map((hol) =>
      new Date(hol.date + " " + year).getTime()
    );
    const greater = mapHolidays.filter((time) => time >= current);
    const index = mapHolidays.findIndex((idx) => idx === Math.min(...greater));

    return holidays[index];
  };

  const calcShift = (time) => {
    if (time) {
      let split = time.split(":");
      if (parseInt(split[0]) < 12) {
        return parseInt(split[0]) + ":" + split[1] + " AM";
      } else {
        return parseInt(split[0]) + ":" + split[1] + " PM";
      }
    } else {
      return "";
    }
  };
  useEffect(() => {
    axiosInstance.get("/leave-application").then((e) => {
      const leaves = e?.data?.data?.filter(
        (f) => f?.employee_id?._id === user._id
      );
      const open = leaves.filter((l) => l.status === "open").length;
      let count = 0;
      leaves.forEach((e) => {
        let a = moment(new Date(e.from_date));
        let b = moment(new Date(e.to_date));
        count += b.diff(a, "days") + 1;
      });
      setLeaveTaken(count);
      setLeaveRemaining(open);
    });
  }, [user._id]);

  useEffect(() => {
    axiosInstance
      .get("/api/jobOpening")
      .then((res) => {
        let newData = res.data.data.filter(
          (dt) =>
            moment(dt.createdAt).format("MMMM") === moment().format("MMMM")
        );
        setJobOpeningsLength(newData.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const result = await axiosInstance.get("https://favqs.com/api/qotd");
        setQuotes(result?.data?.quote);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuotes();
  }, []);
  
  return (
    <>
      <div className="row">
        <div className="col-lg-8 col-md-8">
          <div className="row welcome-card p-5">
            <div className="col-md-9 left-card">
              <h4 className="welcome-text">
                Client Dashboard
                {/* <br />{" "}
                {`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}{" "}
                ! */}
              </h4>
              {/* <p className="welcome-p">
                If you havent punched in today, you need to do it right away
              </p> */}
              <Link className="go" to="/dashboard/clients/all">
                View client list
              </Link>
            </div>
            <div className="col-md-3">
              <img style={{ width: "100%" }} className="mt-4" src={welcome} alt="welcome" />
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-4">
        <section>
              <h5 className="dash-title">Quote of the day</h5>

              <div className="card">
                <div className="card-body text-center">
                  <figure>
                    <blockquote>
                      <h4 className="holiday-title">{quotes?.body}</h4>
                    </blockquote>
                    <figcaption>—{quotes?.author}</figcaption>
                  </figure>
                </div>
              </div>
            </section>
        </div>
      </div>
    </>
  );
};

export default ClientUser;
