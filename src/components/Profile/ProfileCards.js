import React from "react";

const ProfileCards = ({setformType}) => {
    const handleChange = (type) =>{
        console.log(type)
        setformType(type)
    }
  return (
    <>
      <div className="card tab-box">
        <div className="row user-tabs">
          <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a
                  href="#emp_profile"
                  data-toggle="tab"
                  className="nav-link active"
                >
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a href="#emp_projects" data-toggle="tab" className="nav-link">
                  Campaign
                </a>
              </li>
              <li className="nav-item">
                <a href="#bank_statutory" data-toggle="tab" className="nav-link">
                  Bank &amp; Statutory{" "}
                  <small className="text-danger">(Admin Only)</small>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="tab-content">
        <div id="emp_profile" className="pro-overview tab-pane fade active show">
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Personal Informations{" "}
                    <a
                      href="#"
                      onClick={() => handleChange('PersonalDetails')}
                      className="edit-icon"
                      data-toggle="modal"
                      data-target="#FormModal"
                    >
                      <i className="fa fa-pencil"></i>
                    </a>
                  </h3>
                  <ul className="personal-info">
                    <li>
                      <div className="title">Passport No.</div>
                      <div className="text">9876543210</div>
                    </li>
                    <li>
                      <div className="title">Passport Exp Date.</div>
                      <div className="text">9876543210</div>
                    </li>
                    <li>
                      <div className="title">Tel</div>
                      <div className="text">
                        <a href="">9876543210</a>
                      </div>
                    </li>
                    <li>
                      <div className="title">Nationality</div>
                      <div className="text">Nigerian</div>
                    </li>
                    <li>
                      <div className="title">Religion</div>
                      <div className="text">Christian</div>
                    </li>
                    <li>
                      <div className="title">Marital status</div>
                      <div className="text">Married</div>
                    </li>
                    <li>
                      <div className="title">Employment of spouse</div>
                      <div className="text">1 wife 700 concubines</div>
                    </li>
                    <li>
                      <div className="title">No. of children</div>
                      <div className="text">55</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Emergency Contact{" "}
                    <a
                      href="#"
                      className="edit-icon"
                      onClick={() => handleChange('EmergencyContact')}
                      data-toggle="modal"
                      data-target="#FormModal"
                    >
                      <i className="fa fa-pencil"></i>
                    </a>
                  </h3>
                  <h5 className="section-title">Primary</h5>
                  <ul className="personal-info">
                    <li>
                      <div className="title">Name</div>
                      <div className="text">Tony Nta</div>
                    </li>
                    <li>
                      <div className="title">Relationship</div>
                      <div className="text">Father</div>
                    </li>
                    <li>
                      <div className="title">Phone </div>
                      <div className="text">+23470543210</div>
                    </li>
                  </ul>
                  <hr />
                  <h5 className="section-title">Secondary</h5>
                  <ul className="personal-info">
                    <li>
                      <div className="title">Name</div>
                      <div className="text">Mrs Tony</div>
                    </li>
                    <li>
                      <div className="title">Relationship</div>
                      <div className="text">Brother</div>
                    </li>
                    <li>
                      <div className="title">Phone </div>
                      <div className="text">+23480437375</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">Bank information</h3>
                  <ul className="personal-info">
                    <li>
                      <div className="title">Bank name</div>
                      <div className="text">GT Bank</div>
                    </li>
                    <li>
                      <div className="title">Bank account No.</div>
                      <div className="text">159843014641</div>
                    </li>
                    <li>
                      <div className="title">Bank Code</div>
                      <div className="text">GT24504</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Family Informations{" "}
                    <a
                      href="#"
                      className="edit-icon"
                      onClick={() => handleChange('ContactDetails')}
                      data-toggle="modal"
                      data-target="#FormModal"
                    >
                      <i className="fa fa-pencil"></i>
                    </a>
                  </h3>
                  <div className="table-responsive">
                    <table className="table table-nowrap">
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
                          <td className="text-right">
                            <div className="dropdown dropdown-action">
                              <a
                                aria-expanded="false"
                                data-toggle="dropdown"
                                className="action-icon dropdown-toggle"
                                href="#"
                              >
                                <i className="material-icons">more_vert</i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a href="#" className="dropdown-item">
                                  <i className="fa fa-pencil m-r-5"></i>
                                  Edit
                                </a>
                                <a href="#" className="dropdown-item">
                                  <i className="fa fa-trash-o m-r-5"></i>
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
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Education Informations{" "}
                    <a
                      href="#"
                      className="edit-icon"
                      data-toggle="modal"
                      onClick={() => handleChange('EmployeeEducation')}
                      data-target="#FormModal"
                    >
                      <i className="fa fa-pencil"></i>
                    </a>
                  </h3>
                  <div className="experience-box">
                    <ul className="experience-list">
                      <li>
                        <div className="experience-user">
                          <div className="before-circle"></div>
                        </div>
                        <div className="experience-content">
                          <div className="timeline-content">
                            <a href="#/" className="name">
                              University of Portharcourt (UP)
                            </a>
                            <div>Bsc Law</div>
                            <span className="time">2010 - 2014</span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="experience-user">
                          <div className="before-circle"></div>
                        </div>
                        <div className="experience-content">
                          <div className="timeline-content">
                            <a href="#/" className="name">
                              Law School (PH)
                            </a>
                            <div>Bar</div>
                            <span className="time">2014 - 2017</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="card profile-box flex-fill">
                <div className="card-body">
                  <h3 className="card-title">
                    Experience{" "}
                    <a
                      href="#"
                      className="edit-icon"
                      data-toggle="modal"
                      onClick={() => handleChange('WorkExperience')}
                      data-target="#FormModal"
                    >
                      <i className="fa fa-pencil"></i>
                    </a>
                  </h3>
                  <div className="experience-box">
                    <ul className="experience-list">
                      <li>
                        <div className="experience-user">
                          <div className="before-circle"></div>
                        </div>
                        <div className="experience-content">
                          <div className="timeline-content">
                            <a href="#/" className="name">
                              Lawyer
                            </a>
                            <span className="time">
                              Jan 2017 - 2019 ( 2 years)
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="experience-user">
                          <div className="before-circle"></div>
                        </div>
                        <div className="experience-content">
                          <div className="timeline-content">
                            <a href="#/" className="name">
                              Backend Engineer
                            </a>
                            <span className="time">
                              2019 - Present (2 years 2 months)
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="experience-user">
                          <div className="before-circle"></div>
                        </div>
                        <div className="experience-content">
                          <div className="timeline-content">
                            <a href="#/" className="name">
                              Web Designer at Dalt Technology
                            </a>
                            <span className="time">
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
