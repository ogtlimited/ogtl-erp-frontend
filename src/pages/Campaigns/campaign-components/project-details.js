import React from "react";
import male from '../../../assets/img/male_avater.png'
import female from '../../../assets/img/female_avatar.png'
import male2 from '../../../assets/img/male_avater2.png'
const CampaignRightCard = () => {
    const lead = [
        {
        employee_name: 'Oga Ahmed',
        designation: 'Software Engineer',
        img: male
        },
        {
        employee_name: 'Margaret Iman',
        designation: 'Software Engineer',
        img: female
        },
    ]
    const users = [{
        employee_name: 'Anthony Potbelly',
        designation: 'Software Engineer',
        img: male
        },
        {
        employee_name: 'Mazi Ogundu',
        designation: 'Software Engineer',
        img: male
        },]
  return (
    <>
      <div class="card">
        <div class="card-body">
          <h6 class="card-title m-b-15">Campaign details</h6>
          <table class="table table-striped table-border">
            <tbody>
              <tr>
                <td>Cost:</td>
                <td class="text-right">$1200</td>
              </tr>
              <tr>
                <td>Total Hours:</td>
                <td class="text-right">100 Hours</td>
              </tr>
              <tr>
                <td>Created:</td>
                <td class="text-right">22 Sept, 2021</td>
              </tr>
              <tr>
                <td>End Date:</td>
                <td class="text-right">22 Sept, 2023</td>
              </tr>
              <tr>
                <td>Status:</td>
                <td class="text-right">
                  <div class="btn-group">
                    <a
                      href="#"
                      class="badge badge-success dropdown-toggle"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Approved{" "}
                    </a>
                    <div
                      class="dropdown-menu dropdown-menu-right"
                      x-placement="bottom-end"
                    >
                      <a class="dropdown-item" href="#">
                        <i class="fa fa-dot-circle-o text-danger"></i> Rejected
                        
                      </a>
                      <a class="dropdown-item" href="#">
                        <i class="fa fa-dot-circle-o text-info"></i> Suspended 
                        
                      </a>
                      <a class="dropdown-item" href="#">
                        <i class="fa fa-dot-circle-o text-primary"></i> Open
                        
                      </a>
                      <a class="dropdown-item" href="#">
                        <i class="fa fa-dot-circle-o text-success"></i> Approved
                        
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Created by:</td>
                <td class="text-right">
                  <a href="/">Amal Hassan</a>
                </td>
              </tr>
              <tr>
                <td>Status:</td>
                <td class="text-right">Active</td>
              </tr>
            </tbody>
          </table>
          <p class="m-b-5">
            Progress <span class="text-success float-right">40%</span>
          </p>
          <div class="progress progress-xs mb-0">
            <div
              class="progress-bar bg-success"
              role="progressbar"
              data-toggle="tooltip"
              title=""
              style={{ width: "40%" }}
              data-original-title="40%"
            ></div>
          </div>
        </div>
      </div>
      <div class="card project-user">
        <div class="card-body">
          <h6 class="card-title m-b-20">
            Assigned Leader{" "}
            <button
              type="button"
              class="float-right btn btn-primary btn-sm"
              data-toggle="modal"
              data-target="#assign_leader"
            >
              <i class="fa fa-plus"></i> Add
            </button>
          </h6>
          <ul class="list-box">
              {lead.map(e =>(
                  <li>
                    <a href="profile.html">
                      <div class="list-item">
                        <div class="list-left">
                          <span class="avatar">
                            <img alt="" src={e.img} />
                          </span>
                        </div>
                        <div class="list-body">
                          <span class="message-author">{e.employee_name}</span>
                          <div class="clearfix"></div>
                          <span class="message-content">Team Leader</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  

              ))}
           
          </ul>
        </div>
      </div>
    
      <div class="card project-user">
        <div class="card-body">
          <h6 class="card-title m-b-20">
            Assigned Members{" "}
            <button
              type="button"
              class="float-right btn btn-primary btn-sm"
              data-toggle="modal"
              data-target="#assign_leader"
            >
              <i class="fa fa-plus"></i> Add
            </button>
          </h6>
          <ul class="list-box">
              {users.map(e =>(
                  <li>
                    <a href="profile.html">
                      <div class="list-item">
                        <div class="list-left">
                          <span class="avatar">
                            <img alt="" src={e.img} />
                          </span>
                        </div>
                        <div class="list-body">
                          <span class="message-author">{e.employee_name}</span>
                          <div class="clearfix"></div>
                          <span class="message-content">{e.designation}</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  

              ))}
           
          </ul>
        </div>
      </div>
    
    </>
  );
};

export default CampaignRightCard;
