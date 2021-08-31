import React from "react";

const ProfileCards = () => {
  return (
    <>
      <div class="card tab-box">
        <div class="row user-tabs">
          <div class="col-lg-12 col-md-12 col-sm-12 line-tabs">
            <ul class="nav nav-tabs nav-tabs-bottom">
              <li class="nav-item">
                <a
                  href="#emp_profile"
                  data-toggle="tab"
                  class="nav-link active"
                >
                  Profile
                </a>
              </li>
              <li class="nav-item">
                <a href="#emp_projects" data-toggle="tab" class="nav-link">
                  Campaign
                </a>
              </li>
              <li class="nav-item">
                <a href="#bank_statutory" data-toggle="tab" class="nav-link">
                  Bank &amp; Statutory{" "}
                  <small class="text-danger">(Admin Only)</small>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="tab-content">
        <div id="emp_profile" class="pro-overview tab-pane fade active show">
          <div class="row">
            <div class="col-md-6 d-flex">
              <div class="card profile-box flex-fill">
                <div class="card-body">
                  <h3 class="card-title">
                    Personal Informations{" "}
                    <a
                      href="#"
                      class="edit-icon"
                      data-toggle="modal"
                      data-target="#personal_info_modal"
                    >
                      <i class="fa fa-pencil"></i>
                    </a>
                  </h3>
                  <ul class="personal-info">
                    <li>
                      <div class="title">Passport No.</div>
                      <div class="text">9876543210</div>
                    </li>
                    <li>
                      <div class="title">Passport Exp Date.</div>
                      <div class="text">9876543210</div>
                    </li>
                    <li>
                      <div class="title">Tel</div>
                      <div class="text">
                        <a href="">9876543210</a>
                      </div>
                    </li>
                    <li>
                      <div class="title">Nationality</div>
                      <div class="text">Nigerian</div>
                    </li>
                    <li>
                      <div class="title">Religion</div>
                      <div class="text">Christian</div>
                    </li>
                    <li>
                      <div class="title">Marital status</div>
                      <div class="text">Married</div>
                    </li>
                    <li>
                      <div class="title">Employment of spouse</div>
                      <div class="text">1 wife 700 concubines</div>
                    </li>
                    <li>
                      <div class="title">No. of children</div>
                      <div class="text">55</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-6 d-flex">
              <div class="card profile-box flex-fill">
                <div class="card-body">
                  <h3 class="card-title">
                    Emergency Contact{" "}
                    <a
                      href="#"
                      class="edit-icon"
                      data-toggle="modal"
                      data-target="#emergency_contact_modal"
                    >
                      <i class="fa fa-pencil"></i>
                    </a>
                  </h3>
                  <h5 class="section-title">Primary</h5>
                  <ul class="personal-info">
                    <li>
                      <div class="title">Name</div>
                      <div class="text">Tony Nta</div>
                    </li>
                    <li>
                      <div class="title">Relationship</div>
                      <div class="text">Father</div>
                    </li>
                    <li>
                      <div class="title">Phone </div>
                      <div class="text">+23470543210</div>
                    </li>
                  </ul>
                  <hr />
                  <h5 class="section-title">Secondary</h5>
                  <ul class="personal-info">
                    <li>
                      <div class="title">Name</div>
                      <div class="text">Mrs Tony</div>
                    </li>
                    <li>
                      <div class="title">Relationship</div>
                      <div class="text">Brother</div>
                    </li>
                    <li>
                      <div class="title">Phone </div>
                      <div class="text">+23480437375</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 d-flex">
              <div class="card profile-box flex-fill">
                <div class="card-body">
                  <h3 class="card-title">Bank information</h3>
                  <ul class="personal-info">
                    <li>
                      <div class="title">Bank name</div>
                      <div class="text">GT Bank</div>
                    </li>
                    <li>
                      <div class="title">Bank account No.</div>
                      <div class="text">159843014641</div>
                    </li>
                    <li>
                      <div class="title">Bank Code</div>
                      <div class="text">GT24504</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-6 d-flex">
              <div class="card profile-box flex-fill">
                <div class="card-body">
                  <h3 class="card-title">
                    Family Informations{" "}
                    <a
                      href="#"
                      class="edit-icon"
                      data-toggle="modal"
                      data-target="#family_info_modal"
                    >
                      <i class="fa fa-pencil"></i>
                    </a>
                  </h3>
                  <div class="table-responsive">
                    <table class="table table-nowrap">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Relationship</th>
                          <th>Date of Birth</th>
                          <th>Phone</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Leo</td>
                          <td>Brother</td>
                          <td>Feb 16th, 2019</td>
                          <td>9876543210</td>
                          <td class="text-right">
                            <div class="dropdown dropdown-action">
                              <a
                                aria-expanded="false"
                                data-toggle="dropdown"
                                class="action-icon dropdown-toggle"
                                href="#"
                              >
                                <i class="material-icons">more_vert</i>
                              </a>
                              <div class="dropdown-menu dropdown-menu-right">
                                <a href="#" class="dropdown-item">
                                  <i class="fa fa-pencil m-r-5"></i>
                                  Edit
                                </a>
                                <a href="#" class="dropdown-item">
                                  <i class="fa fa-trash-o m-r-5"></i>
                                  Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 d-flex">
              <div class="card profile-box flex-fill">
                <div class="card-body">
                  <h3 class="card-title">
                    Education Informations{" "}
                    <a
                      href="#"
                      class="edit-icon"
                      data-toggle="modal"
                      data-target="#education_info"
                    >
                      <i class="fa fa-pencil"></i>
                    </a>
                  </h3>
                  <div class="experience-box">
                    <ul class="experience-list">
                      <li>
                        <div class="experience-user">
                          <div class="before-circle"></div>
                        </div>
                        <div class="experience-content">
                          <div class="timeline-content">
                            <a href="#/" class="name">
                              University of Portharcourt (UP)
                            </a>
                            <div>Bsc Law</div>
                            <span class="time">2010 - 2014</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="experience-user">
                          <div class="before-circle"></div>
                        </div>
                        <div class="experience-content">
                          <div class="timeline-content">
                            <a href="#/" class="name">
                              Law School (PH)
                            </a>
                            <div>Bar</div>
                            <span class="time">2014 - 2017</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 d-flex">
              <div class="card profile-box flex-fill">
                <div class="card-body">
                  <h3 class="card-title">
                    Experience{" "}
                    <a
                      href="#"
                      class="edit-icon"
                      data-toggle="modal"
                      data-target="#experience_info"
                    >
                      <i class="fa fa-pencil"></i>
                    </a>
                  </h3>
                  <div class="experience-box">
                    <ul class="experience-list">
                      <li>
                        <div class="experience-user">
                          <div class="before-circle"></div>
                        </div>
                        <div class="experience-content">
                          <div class="timeline-content">
                            <a href="#/" class="name">
                              Lawyer
                            </a>
                            <span class="time">
                              Jan 2017 - 2019 ( 2 years)
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="experience-user">
                          <div class="before-circle"></div>
                        </div>
                        <div class="experience-content">
                          <div class="timeline-content">
                            <a href="#/" class="name">
                              Backend Engineer
                            </a>
                            <span class="time">
                              2019 - Present (2 years 2 months)
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="experience-user">
                          <div class="before-circle"></div>
                        </div>
                        <div class="experience-content">
                          <div class="timeline-content">
                            <a href="#/" class="name">
                              Web Designer at Dalt Technology
                            </a>
                            <span class="time">
                              Jan 2013 - Present (5 years 2 months)
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCards;
