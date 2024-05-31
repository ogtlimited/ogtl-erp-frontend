// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import { DocAnnouncementFormModal } from "../../components/Modal/DocAnnouncementFormModal";
import { CgNotes } from "react-icons/cg";
import { HiDotsVertical } from "react-icons/hi";
import DocAnnouncementContent from "./../../components/ModalContents/DocAnnouncementContent";
import ViewModal from "../../components/Modal/ViewModal";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import moment from "moment";
import axiosInstance from "../../services/api";
import usePagination from "../HR/Admin/JobApplicantsPagination.Admin";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import $ from "jquery";

const DocAnnouncement = () => {
  const { goToTop, showAlert, ErrorHandler, user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [allDocs, setAllDocs] = useState([]);
  const [doc, setDoc] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [mode, setMode] = useState("Create");
  const [isDeleting, setIsDeleting] = useState(false);

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
    $("#generalModal").modal("show");
    setSelectedDoc(announcement);
  };

  const handleCreate = () => {
    const newsletterModel = {
      title: "",
      body: "",
    };

    setDoc(newsletterModel);
    setMode("Create");
  };

  const handleEdit = (newsletter) => {
    setDoc(newsletter);
    setMode("Edit");
  };

  const handleDeleteNewsletter = async () => {
    setIsDeleting(true);

    try {
      await axiosInstance.delete(
        `/api/v1/text_announcements/${selectedDoc.id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      goToTop();
      fetchAllDocAnnouncement();
      setIsDeleting(false);
      showAlert(true, "Newsletter deleted successfully!", "alert alert-info");
      $("#exampleModal").modal("toggle");
    } catch (error) {
      goToTop();
      const errorMsg = error.response?.data?.errors;
      showAlert(
        true,
        `${errorMsg || "Unable to Delete Newsletter"}`,
        "alert alert-warning"
      );
      $("#exampleModal").modal("toggle");
      setIsDeleting(false);
    }
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
                <div className="newsletter-field-div" key={index}>
                  <div
                    className="newsletter_reader"
                    dangerouslySetInnerHTML={{ __html: announcement?.body }}
                    onClick={() => handleViewDocAnnouncement(announcement)}
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

                      <div className="dropdown dropdown-action text-right">
                        <a
                          href="#"
                          className="action-icon dropdown-toggle"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <HiDotsVertical className="HiDotsVertical" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a
                            className="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#generalModal"
                            onClick={() => {
                              setSelectedDoc(announcement);
                            }}
                          >
                            <i className="fa fa-eye m-r-5"></i> View
                          </a>

                          {CurrentUserCanUpload ? (
                            <a
                              className="dropdown-item"
                              href="#"
                              data-toggle="modal"
                              data-target="#DocAnnouncementFormModal"
                              onClick={() => handleEdit(announcement)}
                            >
                              <i className="fa fa-pencil m-r-5"></i> Edit
                            </a>
                          ) : null}

                          {CurrentUserCanUpload ? (
                            <a
                              className="dropdown-item"
                              href="#"
                              data-toggle="modal"
                              data-target="#exampleModal"
                              onClick={() => setSelectedDoc(announcement)}
                            >
                              <i className="fa fa-trash m-r-5"></i> Delete
                            </a>
                          ) : null}
                        </div>
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

      <ViewModal
        title={selectedDoc?.title}
        expand={true}
        content={<DocAnnouncementContent content={selectedDoc} />}
      />

      <ConfirmModal
        title="Newsletter"
        selectedRow={selectedDoc}
        deleteFunction={handleDeleteNewsletter}
        message={`Are you sure you want to delete ${selectedDoc?.title.replace(
          /\b\w/g,
          (char) => char.toUpperCase()
        )} newsletter?`}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default DocAnnouncement;
