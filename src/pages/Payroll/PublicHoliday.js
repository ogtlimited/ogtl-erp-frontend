//* IN-USE

/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../Context/AppContext";
import UniversalPaginatedTable from "../../components/Tables/UniversalPaginatedTable";
import { PublicHolidayFormModal } from "../../components/Modal/PublicHolidayFormModal";
import axiosInstance from "../../services/api";
import moment from "moment";

const PublicHoliday = () => {
  const { getAvatarColor, user, ErrorHandler } = useAppContext();
  const [allHolidays, setAllHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("Create");
  const [holiday, setHoliday] = useState([]);
  const [viewRow, setViewRow] = useState(null);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const fetchHolidays = useCallback(async () => {
    setLoading(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.get(`/api/v1/public_holidays.json`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          page: page,
          limit: sizePerPage,
        },
      });

      const resData = response?.data?.data?.public_holidays;
      const totalPages = response?.data?.data?.pages;

      setSizePerPage(sizePerPage);
      setTotalPages(totalPages);

      const formatted = resData.map((e) => ({
        ...e,
        title: e?.public_holidays?.title,
        from: moment(e?.public_holidays?.start_date).format("Do MMMM, YYYY"),
        to: moment(e?.public_holidays?.end_date).format("Do MMMM, YYYY"),
      }));

      setAllHolidays(formatted);
      setLoading(false);
    } catch (error) {
      const component = "Public Holiday | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  const handleCreate = () => {
    const publicHolidayForm = {
      title: "",
      start_date: "",
      end_date: "",
      operation_department_id: "",
      operation_campaign_id: "",
    };

    setHoliday(publicHolidayForm);
    setMode("Create");
  };

  // const handleEdit = (row) => {
  //   setTicket(row);
  //   setMode("Edit");
  // };

  const columns = [
    {
      dataField: "title",
      text: "Public Holiday",
      sort: true,
      headerStyle: { width: "30%" },
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
    // {
    //   dataField: "",
    //   text: "Action",
    //   headerStyle: { width: "5%" },
    //   formatter: (value, row) => (
    //     <div className="dropdown dropdown-action text-right">
    //       <a
    //         href="#"
    //         className="action-icon dropdown-toggle"
    //         data-toggle="dropdown"
    //         aria-expanded="false"
    //       >
    //         <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
    //       </a>
    //       <div className="dropdown-menu dropdown-menu-right">
    //         <a
    //           className="dropdown-item"
    //           href="#"
    //           data-toggle="modal"
    //           data-target="#generalModal"
    //           onClick={() => {
    //             setViewRow(row);
    //           }}
    //         >
    //           <i className="fa fa-eye m-r-5"></i> View
    //         </a>
    //         {!row.resolved && (
    //           <>
    //             <a
    //               className="dropdown-item"
    //               href="#"
    //               data-toggle="modal"
    //               data-target="#TicketFormModal"
    //               onClick={() => handleEdit(row)}
    //             >
    //               <i className="fa fa-check m-r-5"></i> Edit
    //             </a>
    //           </>
    //         )}
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Public Holiday</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">HR</li>
              <li className="breadcrumb-item active">Attendance</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn"
              data-toggle="modal"
              data-target="#PublicHolidayFormModal"
              onClick={handleCreate}
            >
              <i className="las la-plus"></i> Create Public Holiday
            </a>
          </div>
        </div>
      </div>

      <div className="row">
        <UniversalPaginatedTable
          columns={columns}
          data={allHolidays}
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

      <PublicHolidayFormModal
        mode={mode}
        data={holiday}
        refetchData={fetchHolidays}
      />
    </>
  );
};

export default PublicHoliday;
