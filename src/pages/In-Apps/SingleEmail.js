import React from "react";
import { Link } from "react-router-dom";
import avater from '../../assets/img/male_avater.png'
const SingleEmail = () => {
  return (
    <div>
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h3 class="page-title">View Email</h3>
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li class="breadcrumb-item active">View Email</li>
            </ul>
          </div>
          <div class="col-auto float-right ml-auto">
            <a class="btn add-btn">
              <i class="fa fa-plus"></i> Compose
            </a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="card mb-0">
            <div class="card-body">
              <div class="mailview-content">
                <div class="mailview-header">
                  <div class="row">
                    <div class="col-sm-9">
                      <div class="text-ellipsis m-b-10">
                        <span class="mail-view-title">
                          OutSource Global Technologies
                        </span>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="mail-view-action">
                        <div class="btn-group">
                          <button
                            type="button"
                            class="btn btn-white btn-sm"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Delete"
                          >
                            {" "}
                            <i class="fa fa-trash-o"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-white btn-sm"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Print"
                          >
                            {" "}
                            <i class="fa fa-print"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="sender-info">
                    <div class="sender-img">
                      <img
                        width="40"
                        alt=""
                        src={avater}
                        class="rounded-circle"
                      />
                    </div>
                    <div class="receiver-details float-left">
                      <span class="sender-name">
                        Adawiyya Joseph (adawiyyajoseph@outsourceglobal.com)
                      </span>
                      <span class="2receiver-name">
                        to &nbsp;
                        <span>me</span>, <span>Anthony Potbelly</span>
                      </span>
                    </div>
                    <div class="mail-sent-time">
                      <span class="mail-time">{new Date().toUTCString()}</span>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
                <div class="mailview-inner">
                  <p>Hello Anthony Potbelly,</p>
                  <p>
                    This is to inform you that your contract with Outsource
                    Global has been terminated
                  </p>
                  <p>
                    This decision was reached following your lack of respect for
                    Sir Abubakar and his constituted authority
                  </p>
                  <p>
                    We hope sapa wouldnt kill you before you find your next job
                  </p>
                  <p>
                    Respectfully,
                    <br />
                    Adawiyya Joseph
                  </p>
                </div>
              </div>
              <div class="mail-attachments">
                <p>
                  <i class="fa fa-paperclip"></i> 2 Attachments -{" "}
                  <a href="#">View all</a> | <a href="#">Download all</a>
                </p>
                <ul class="attachments clearfix">
                  <li>
                    <div class="attach-file">
                      <i class="fa fa-file-pdf-o"></i>
                    </div>
                    <div class="attach-info">
                      {" "}
                      <a href="#" class="attach-filename">
                        doc.pdf
                      </a>{" "}
                      <div class="attach-fileize"> 842 KB</div>
                    </div>
                  </li>
                  <li>
                    <div class="attach-file">
                      <i class="fa fa-file-word-o"></i>
                    </div>
                    <div class="attach-info">
                      {" "}
                      <a href="#" class="attach-filename">
                        doc.docx
                      </a>{" "}
                      <div class="attach-fileize"> 2,305 KB</div>
                    </div>
                  </li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <div class="mailview-footer">
                <div class="row">
                  <div class="col-sm-6 left-action">
                    <button type="button" class="btn btn-white">
                      <i class="fa fa-reply"></i> Reply
                    </button>
                    <button type="button" class="btn btn-white">
                      <i class="fa fa-share"></i> Forward
                    </button>
                  </div>
                  <div class="col-sm-6 right-action">
                    <button type="button" class="btn btn-white">
                      <i class="fa fa-print"></i> Print
                    </button>
                    <button type="button" class="btn btn-white">
                      <i class="fa fa-trash-o"></i> Delete
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
