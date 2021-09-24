import React from "react";
import placeholder from '../../../assets/img/placeholder.jpg'
const CampaignLeftCard = () => {
    const dummyImage = [placeholder, placeholder, placeholder, placeholder]
    const dummyFilee = [
        {
            title: 'MR-client-requirements.xls',
            author: 'Sir Abubakar',
            uploaded_on: 'June 18th at 6:53 PM',
            size: '5.8Mb',
        },
        {
            title: 'MR-client-specification.xls',
            author: 'Oga Amed',
            uploaded_on: 'September 15th at 6:53 PM',
            size: '14.3Mb',
        }
]
  return (
    <>
      <div class="card">
        <div class="card-body">
          <div class="project-title">
            <h5 class="card-title">MR Campaign</h5>
            <small class="block text-ellipsis m-b-15">
              <span class="text-xs">2</span>{" "}
              <span class="text-muted">open tasks, </span>
              <span class="text-xs">5</span>{" "}
              <span class="text-muted">tasks completed</span>
            </small>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
            elit neque. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Vestibulum sollicitudin
            libero vitae est consectetur, a molestie tortor consectetur. Aenean
            tincidunt interdum ipsum, id pellentesque diam suscipit ut. Vivamus
            massa mi, fermentum eget neque eget, imperdiet tristique lectus.
            Proin at purus ut sem pellentesque tempor sit amet ut lectus. Sed
            orci augue, placerat et pretium ac, hendrerit in felis. Integer
            scelerisque libero non metus commodo, et hendrerit diam aliquet.
            Proin tincidunt porttitor ligula, a tincidunt orci pellentesque nec.
            Ut ultricies maximus nulla id consequat. Fusce eu consequat mi, eu
            euismod ligula. Aliquam porttitor neque id massa porttitor, a
            pretium velit vehicula. Morbi volutpat tincidunt urna, vel
            ullamcorper ligula fermentum at.{" "}
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
            elit neque. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Vestibulum sollicitudin
            libero vitae est consectetur, a molestie tortor consectetur. Aenean
            tincidunt interdum ipsum, id pellentesque diam suscipit ut. Vivamus
            massa mi, fermentum eget neque eget, imperdiet tristique lectus.
            Proin at purus ut sem pellentesque tempor sit amet ut lectus. Sed
            orci augue, placerat et pretium ac, hendrerit in felis. Integer
            scelerisque libero non metus commodo, et hendrerit diam aliquet.
            Proin tincidunt porttitor ligula, a tincidunt orci pellentesque nec.
            Ut ultricies maximus nulla id consequat. Fusce eu consequat mi, eu
            euismod ligula. Aliquam porttitor neque id massa porttitor, a
            pretium velit vehicula. Morbi volutpat tincidunt urna, vel
            ullamcorper ligula fermentum at.{" "}
          </p>
        </div>
      </div>
      {/* images */}
      <div class="card">
        <div class="card-body">
          <h5 class="card-title m-b-20">Uploaded image files</h5>
          <div class="row">
            {dummyImage.map(img =>(
            <div class="col-md-3 col-sm-4 col-lg-4 col-xl-3">
              <div class="uploaded-box">
                <div class="uploaded-img">
                  <img
                    src={img}
                    class="img-fluid"
                    alt=""
                  />
                </div>
                <div class="uploaded-img-name">demo.png</div>
              </div>
            </div>

            ))}
          </div>
        </div>
      </div>
      {/* files */}
      <div class="card">
        <div class="card-body">
          <h5 class="card-title m-b-20">Uploaded files</h5>
          <ul class="files-list">
              {dummyFilee.map(e =>(
                  <li>
                    <div class="files-cont">
                      <div class="file-type">
                        <span class="files-icon">
                          <i class="fa fa-file-pdf-o"></i>
                        </span>
                      </div>
                      <div class="files-info">
                        <span class="file-name text-ellipsis">
                          <a href="#">
                            {e.title}
                          </a>
                        </span>
                        <span class="file-author">
                          <a href="#">{e.author}</a>
                        </span>{" "}
                        <span class="file-date">{e.uploaded_on}</span>
                        <div class="file-size">Size: {e.size}</div>
                      </div>
                      <ul class="files-action">
                        <li class="dropdown dropdown-action">
                          <a
                            href=""
                            class="dropdown-toggle btn btn-link"
                            data-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" onClick={"javascript:void(0)"}>
                              Download
                            </a>
                            <a class="dropdown-item" onClick={"javascript:void(0)"}>
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
