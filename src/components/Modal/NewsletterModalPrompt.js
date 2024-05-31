import React from "react";
import { useAppContext } from "../../Context/AppContext";
import secureLocalStorage from "react-secure-storage";
import moment from "moment";
import $ from "jquery";

export const NewsletterModalPrompt = () => {
  const { loadingNewsletter, newsletter, setNewsletterRead } = useAppContext();

  const closeModal = () => {
    $("#NewsletterModalPrompt").modal("hide");
    secureLocalStorage.setItem("seenNewsletter", true);
    setNewsletterRead(true);
  };

  return (
    <>
      <div
        className="modal fade"
        id="NewsletterModalPrompt"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
        data-backdrop="static"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4 className="modal-title" id="FormModalLabel">
                {newsletter?.title}
              </h4>
              <p className="modal_uploaded_by">
                By: {newsletter?.entered_by} |{" "}
                <span className="payroll_month_indicator">
                  {moment(newsletter?.created_at).format("LLL")}
                </span>
              </p>
            </div>

            <div className="modal-body">
              <div>
                {loadingNewsletter ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/xsqjakgm.json"
                      trigger="loop"
                      colors="primary:#00c5fb,secondary:#0253cc"
                      style={{ width: "200px", height: "200px" }}
                    ></lord-icon>
                  </div>
                ) : newsletter ? (
                  <div dangerouslySetInnerHTML={{ __html: newsletter?.body }} />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
