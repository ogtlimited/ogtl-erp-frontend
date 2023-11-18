/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import placeholder from "../../../assets/img/placeholder.jpg";
const CampaignLeftCard = ({ campaign_info }) => {
  const dummyImage = [placeholder, placeholder, placeholder, placeholder];
  const dummyFilee = [
    {
      title: "MR-client-requirements.xls",
      author: "Sir Abubakar",
      uploaded_on: "June 18th at 6:53 PM",
      size: "5.8Mb",
    },
    {
      title: "MR-client-specification.xls",
      author: "Oga Amed",
      uploaded_on: "September 15th at 6:53 PM",
      size: "14.3Mb",
    },
  ];
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="project-title">
            <h5 className="card-title">{campaign_info?.project_name} Campaign</h5>
            {/* <small className="block text-ellipsis m-b-15">
              <span className="text-xs">2</span>{" "}
              <span className="text-muted">open tasks, </span>
              <span className="text-xs">5</span>{" "}
              <span className="text-muted">tasks completed</span>
            </small> */}
          </div>

          <p>{campaign_info?.objectives}</p>
        </div>
      </div>
      {/* images */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title m-b-20">Uploaded image files</h5>
          <div className="row">
            {dummyImage.map((img) => (
              <div className="col-md-3 col-sm-4 col-lg-4 col-xl-3">
                <div className="uploaded-box">
                  <div className="uploaded-img">
                    <img src={img} className="img-fluid" alt="" />
                  </div>
                  <div className="uploaded-img-name">demo.png</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* files */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title m-b-20">Uploaded files</h5>
          <ul className="files-list">
            {dummyFilee.map((e) => (
              <li>
                <div className="files-cont">
                  <div className="file-type">
                    <span className="files-icon">
                      <i className="fa fa-file-pdf-o"></i>
                    </span>
                  </div>
                  <div className="files-info">
                    <span className="file-name text-ellipsis">
                      <a href="#">{e.title}</a>
                    </span>
                    <span className="file-author">
                      <a href="#">{e.author}</a>
                    </span>{" "}
                    <span className="file-date">{e.uploaded_on}</span>
                    <div className="file-size">Size: {e.size}</div>
                  </div>
                  <ul className="files-action">
                    <li className="dropdown dropdown-action">
                      <a
                        href=""
                        className="dropdown-toggle btn btn-link"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" >
                          Download
                        </a>
                        <a className="dropdown-item">
                          Delete
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CampaignLeftCard;
