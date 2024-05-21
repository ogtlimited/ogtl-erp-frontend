// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import { DocAnnouncementFormModal } from "../../components/Modal/DocAnnouncementFormModal";
// import { AnnouncementViewModal } from "../../components/Modal/VideoAnnouncementViewModal";
import { CgNotes } from "react-icons/cg";
import { HiDotsVertical } from "react-icons/hi";
import moment from "moment";
import axiosInstance from "../../services/api";
import usePagination from "../HR/Admin/JobApplicantsPagination.Admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import $ from "jquery";

const DocAnnouncement = () => {
  const { ErrorHandler, user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [allDocs, setAllDocs] = useState([]);
  const [doc, setDoc] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [mode, setMode] = useState("Create");

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");
  const [info, setInfo] = useState({
    sizePerPage: 10,
  });

  const CurrentUserRoles = user?.employee_info?.roles;
  const canUpload = ["hr_manager", "senior_hr_associate"];
  const CurrentUserCanUpload = CurrentUserRoles.some((role) =>
    canUpload.includes(role)
  );

  const fetchAllDocAnnouncement = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `/api/v1/text_announcements.json`,
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

      const resData = response?.data?.data?.announcements?.announcements;
      const totalPages = response?.data?.data?.announcements?.total_page;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      console.log("newsletter:", resData);

      setAllDocs(resData);
      setLoading(false);
    } catch (error) {
      const component = "All Newsletters | ";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage]);

  useEffect(() => {
    fetchAllDocAnnouncement();
  }, [fetchAllDocAnnouncement]);

  const count = totalPages;
  const _DATA = usePagination(allDocs, sizePerPage, totalPages);

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

  const handleViewDocAnnouncement = (announcement) => {
    $("#DocAnnouncementViewModal").modal("show");
    setSelectedDoc(announcement);
  };

  const handleCreate = () => {
    const newsletterModel = {
      title: "",
      content: "",
    };

    setDoc(newsletterModel);
    setMode("Create");
  };

  return (
    <div className="tab-pane" id="tab_announcement_docs">
      <div className="page-header">
        <div className="row align-items-center">
          {CurrentUserCanUpload ? (
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#DocAnnouncementFormModal"
                onClick={handleCreate}
              >
                <i className="las la-file"></i> New Newsletter
              </a>
            </div>
          ) : null}
        </div>
      </div>

      <div className="newsletter_container">
        {loading ? (
          <div className="no_annoucement">
            <lord-icon
              src="https://cdn.lordicon.com/xsqjakgm.json"
              trigger="loop"
              colors="primary:#00c5fb,secondary:#0253cc"
              style={{ width: "200px", height: "200px" }}
            ></lord-icon>
          </div>
        ) : allDocs?.length ? (
          <>
            <div className="custom-newsletter-field-div">
              {allDocs.map((announcement, index) => (
                <div
                  className="newsletter-field-div"
                  key={index}
                  onClick={() => handleViewDocAnnouncement(announcement)}
                >
                  <div
                    className="newsletter_reader"
                    dangerouslySetInnerHTML={{ __html: announcement?.body }}
                  />
                  <div className="newsletter_reader_info">
                    <h3>
                      {announcement?.entered_by} - {announcement?.title}
                    </h3>

                    <div className="newsletter_info_wrapper">
                      <div>
                        <CgNotes className="CgNotes" />
                        <p className="newsletter_span_indicator">
                          {moment(announcement?.created_at).format("LLL")}
                        </p>
                      </div>

                      <div>
                        <HiDotsVertical className="HiDotsVertical" />
                      </div>
                    </div>
                  </div>

                  <div className="newsletter_indicator_div">
                    <span className="newsletter_absolute_span_indicator">
                      {moment(announcement?.created_at).fromNow()}
                    </span>
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
          <div className="no_annoucement">
            <lord-icon
              src="https://cdn.lordicon.com/xsqjakgm.json"
              trigger="hover"
              colors="primary:#00c5fb,secondary:#0253cc"
              style={{ width: "200px", height: "200px" }}
            ></lord-icon>
            <h3>No Newsletter</h3>
          </div>
        )}
      </div>

      <DocAnnouncementFormModal
        mode={mode}
        data={doc}
        fetchDocs={fetchAllDocAnnouncement}
      />

      {/* <AnnouncementViewModal
        loading={loading}
        announcementContent={selectedVideo}
        setSelectedVideo={setSelectedVideo}
      /> */}
    </div>
  );
};

export default DocAnnouncement;
