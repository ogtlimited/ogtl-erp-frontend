import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import avater from "../../assets/img/male_avater.png";
import axiosInstance from "../../services/api";

const SingleEmail = () => {
  const location = useParams();

  const [inbox, setinbox] = useState({})
  console.log(location)
  const fetchEmail = () => {
    axiosInstance
      .get(`api/email/single/${location.id}`)
      .then((res) => {
        console.log(res)
        setinbox(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchEmail()
  }, [])

  useEffect(() => {
    let data = {
      is_read: true,
    };
    if(Object.keys(inbox).length > 0){
      if (!inbox?.is_read) {
        axiosInstance
          .put(`api/email/${inbox?._id}`, data)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }

    }
  }, [inbox?.is_read, inbox?._id]);

  return (
    <div>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">View Email</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/email">Emails</Link>
              </li>
              <li className="breadcrumb-item active">View Email</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="card mb-0">
            <div className="card-body">
              <div className="mailview-content">
                <div className="mailview-header">
                  <div className="row">
                    <div className="col-sm-9">
                      <div className="text-ellipsis m-b-10">
                        <span className="mail-view-title">
                          {inbox?.subject}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="mail-view-action">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-white btn-sm"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Delete"
                          >
                            <i className="fa fa-trash-o"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-white btn-sm"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Print"
                          >
                            <i className="fa fa-print"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sender-info">
                    <div className="sender-img">
                      <img
                        width="40"
                        alt=""
                        src={avater}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="receiver-details float-left">
                      <span className="sender-name">{inbox?.sender}</span>
                      <span className="2receiver-name">
                        to &nbsp;
                        <span>{inbox?.email_id}</span>
                      </span>
                    </div>
                    <div className="mail-sent-time">
                      <span className="mail-time">
                        {moment(inbox?.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </span>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </div>
                <div className="mailview-inner">
                  <h4>{inbox?.subject} </h4>
                  <p>{inbox?.message}</p>
                </div>
              </div>
              {/* <div className="mail-attachments">
                <p>
                  <i className="fa fa-paperclip"></i> 2 Attachments -
                  <Link>View all</Link> | <Link>Download all</Link>
                </p>
                <ul className="attachments clearfix">
                  <li>
                    <div className="attach-file">
                      <i className="fa fa-file-pdf-o"></i>
                    </div>
                    <div className="attach-info">
                      <Link className="attach-filename">doc.pdf</Link>
                      <div className="attach-fileize"> 842 KB</div>
                    </div>
                  </li>
                  <li>
                    <div className="attach-file">
                      <i className="fa fa-file-word-o"></i>
                    </div>
                    <div className="attach-info">
                      <Link className="attach-filename">doc.docx</Link>
                      <div className="attach-fileize"> 2,305 KB</div>
                    </div>
                  </li>
                  <li></li>
                  <li></li>
                </ul>
              </div> */}
              <div className="mailview-footer">
                <div className="row">
                  <div className="col-sm-6 left-action">
                    {/* <button type="button" className="btn btn-white">
                      <i className="fa fa-reply"></i> Reply
                    </button>
                    <button type="button" className="btn btn-white">
                      <i className="fa fa-share"></i> Forward
                    </button> */}
                  </div>
                  <div className="col-sm-6 right-action">
                    <button type="button" className="btn btn-white mx-1">
                      <i className="fa fa-print"></i> Print
                    </button>
                    <button type="button" className="btn btn-white">
                      <i className="fa fa-trash-o"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEmail;
