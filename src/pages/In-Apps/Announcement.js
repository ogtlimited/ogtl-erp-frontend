/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import { AnnouncementFormModal } from "../../components/Modal/AnnouncementFormModal";
import { BsDot } from "react-icons/bs";
import moment from "moment";
import axiosInstance from "../../services/api";
import usePagination from "../HR/Admin/JobApplicantsPagination.Admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { AnnouncementViewModal } from "./../../components/Modal/AnnouncementViewModal";
import $ from "jquery";

const Announcement = () => {
  const { ErrorHandler, user, getAvatarColor } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [allAnnouncement, setAllAnnouncement] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });

  const CurrentUserRoles = user?.employee_info?.roles;
  const canUpload = ["hr_manager"];
  const CurrentUserCanUpload = CurrentUserRoles.some((role) =>
    canUpload.includes(role)
  );

  const fetchAllAnnouncement = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `/api/v1/video_announcements.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          params: {
            page: page,
            limit: sizePerPage,
          },
        }
      );

      const resData = response?.data?.data?.videos_record?.videos;
      const totalPages = response?.data?.data?.videos_record?.total_page;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      setAllAnnouncement(resData);
      setLoading(false);
    } catch (error) {
      const component = "All Announcements | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchAllAnnouncement();
  }, [fetchAllAnnouncement]);

  const count = totalPages;
  const _DATA = usePagination(allAnnouncement, sizePerPage, totalPages);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleChangeSizePerPage = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo((prevState) => ({ ...prevState, [name]: value }));

    setSizePerPage(e.target.value);
    setPage(1);
  };

  const handleViewAnnouncement = (announcement) => {
    $("#AnnouncementViewModal").modal("show");
    setSelectedVideo(announcement);
  };

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Announcements</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Engage & Feedback</li>
              <li className="breadcrumb-item active">Announcement</li>
            </ul>
          </div>
          {CurrentUserCanUpload ? (
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#AnnouncementFormModal"
              >
                <i className="las la-file-video"></i> New Video
              </a>
            </div>
          ) : null}
        </div>
      </div>

      <div className="announcement_container">
        {loading ? (
          <div>
            <lord-icon
              src="https://cdn.lordicon.com/ilsmzilo.json"
              trigger="loop"
              colors="primary:#00c5fb,secondary:#0253cc"
              style={{ width: "250px", height: "250px" }}
            ></lord-icon>
          </div>
        ) : allAnnouncement?.length ? (
          <>
            <div className="custom-video-field-div">
              {allAnnouncement.map((announcement, index) => (
                <div
                  className="video-field-div"
                  key={index}
                  onClick={() => handleViewAnnouncement(announcement)}
                >
                  <video className="video_player">
                    <source src={announcement?.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="video_player_info">
                    <div className="video_info_wrapper">
                      <div
                        className="video-avatar-span"
                        style={{
                          backgroundColor: getAvatarColor(
                            announcement.uploaded_by?.charAt(0)
                          ),
                        }}
                      >
                        {announcement.uploaded_by?.charAt(0)}
                      </div>
                      <div>
                        <div>
                          <h4>
                            <strong>{announcement.uploaded_by}</strong>{" "}
                          </h4>
                          <BsDot className="BsDot span_indicator" />
                          <span className="span_indicator">
                            {moment(announcement.created_at).fromNow()}
                          </span>
                        </div>
                        <p className="span_indicator">
                          {moment(announcement.created_at).format("LLL")}
                        </p>
                      </div>
                    </div>
                    <h3>{announcement.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-12">
              <select
                className="application-table-sizePerPage"
                name="sizePerPage"
                value={info.sizePerPage}
                onChange={handleChangeSizePerPage}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
              <div className="application-table-pagination">
                <Stack className="application-table-pagination-stack">
                  <Pagination
                    className="job-applicant-pagination"
                    count={count}
                    page={page}
                    boundaryCount={4}
                    onChange={handleChange}
                    color="primary"
                    showFirstButton
                    showLastButton
                    variant="outlined"
                    shape="rounded"
                  />
                </Stack>
              </div>
            </div>
          </>
        ) : (
          <div>
            <lord-icon
              src="https://cdn.lordicon.com/ilsmzilo.json"
              trigger="hover"
              colors="primary:#00c5fb,secondary:#0253cc"
              style={{ width: "250px", height: "250px" }}
            ></lord-icon>
            <h3>No Video Announcement</h3>
          </div>
        )}
      </div>

      <AnnouncementFormModal fetchAllAnnouncement={fetchAllAnnouncement} />

      <AnnouncementViewModal
        loading={loading}
        announcementContent={selectedVideo}
        setSelectedVideo={setSelectedVideo}
      />
    </>
  );
};

export default Announcement;
