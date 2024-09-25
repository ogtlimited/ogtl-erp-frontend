// *IN USE

/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../../Context/AppContext";
import UniversalPaginatedTable from "../../../components/Tables/UniversalPaginatedTable";
import axiosInstance from "../../../services/api";
import moment from "moment";
import helper from "../../../services/helper";

const OutOfOffice = () => {
  const { user, ErrorHandler, getAvatarColor } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [allOutOfOffice, setAllOutOfOffice] = useState([]);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const firstDay = moment().startOf("month").format("YYYY-MM-DD");
  const lastDay = moment().endOf("month").format("YYYY-MM-DD");
  const [fromDate, setFromDate] = useState(firstDay);
  const [toDate, setToDate] = useState(lastDay);
  const [today, setToday] = useState(null);

  useEffect(() => {
    const time = new Date().toDateString();
    const today_date = moment(time).format("yyyy-MM-DD");
    setToday(today_date);
  }, []);

  const currentUserOgid = user?.employee_info?.ogid;

  // Out of Office:
  const fetchOutOfOffice = useCallback(async () => {
    setLoading(false);

    try {
      const response = await axiosInstance.get(
        `/api/v1/out_of_office/${currentUserOgid}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            pages: page,
            limit: sizePerPage,
            start_date: fromDate,
            end_date: toDate
          },
        }
      );
      const resData = response?.data?.data?.out_of_offices;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      const formattedOutOffOffice = resData.map((e) => ({
        ...e,
        enteredBy: e?.entered_by,
        dateCreated: moment(e?.created_at).format("Do MMMM, YYYY"),
        from: moment(e?.start_date).format("Do MMMM, YYYY"),
        to: moment(e?.end_date).format("Do MMMM, YYYY"),
        // deduction: helper.handleMoneyFormat(5000),
      }));

      setAllOutOfOffice(formattedOutOffOffice);
      setLoading(false);
    } catch (error) {
      const component = "Absence Error | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage, fromDate, toDate]);

  useEffect(() => {
    fetchOutOfOffice();
  }, [fetchOutOfOffice]);

  const columns = [
    {
      dataField: "enteredBy",
      text: "Entered By",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (value, row) => (
        <h2 className="table-avatar">
          <span
            className="avatar-span"
            style={{ backgroundColor: getAvatarColor(value?.charAt(0)) }}
          >
            {value?.charAt(0)}
          </span>
          {value?.toUpperCase()}
        </h2>
      ),
    },
    {
      dataField: "dateCreated",
      text: "Date Created",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "reason",
      text: "Reason",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (value, row) => (
        <span>{value?.replace(/\b\w/g, (char) => char.toUpperCase())}</span>
      ),
    },
    {
      dataField: "from",
      text: "From",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "to",
      text: "To",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "approved",
      text: "Approved",
      sort: true,
      headerStyle: { width: "10%" },
      formatter: (value, row) => (
        <>
          <span className="btn btn-gray btn-sm btn-rounded">
            <i
              className={`fa fa-dot-circle-o ${value ? "text-success" : "text-secondary"
                } `}
              style={{ marginRight: "10px" }}
            ></i>{" "}
            {value ? "Yes" : "No"}
          </span>
        </>
      ),
    },
    // {
    //   dataField: "deduction",
    //   text: "Deduction",
    //   sort: true,
    //   headerStyle: { width: "20%" },
    // },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Absence</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Main</li>
              <li className="breadcrumb-item active">Time Off</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="row col-md-6">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="fromDate">From</label>
              <input
                type="date"
                name="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="form-control "
                max={today}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="toDate">To</label>
              <input
                type="date"
                name="toDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="form-control "
                max={today}
              />
            </div>
          </div>
        </div>

        <UniversalPaginatedTable
          data={allOutOfOffice}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
          page={page}
          setPage={setPage}
          sizePerPage={sizePerPage}
          setSizePerPage={setSizePerPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
        />
      </div>
    </>
  );
};

export default OutOfOffice;
