import React from "react";
import sample from './recruitment-supervision.json'
const RecruitmentSupervision = () => {
  return (
    <div class="row">
      <div class="col-md-12">
        <div class="card card-table">
          <div class="card-header d-flex justify-content-between">
            <h3 class="card-title mb-1s">Recruitment Supervision Sheet</h3>
            <span class=" mb-0">Target: CV Sieving 50 | Phone Screening: 30 | Interview Schedule : 20</span>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-nowrap custom-table mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Employee Name</th>
                    <th>CV Sieving</th>
                    <th>Phone Screening</th>
                    <th>Interview Schedule</th>
                    <th class="text-center">Date</th>

                  </tr>
                  
                  
                </thead>
                <tbody>
                    {sample.map((s, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td>
                            <h2 class="table-avatar">
                                <a href="" class="avatar">
                                <img
                                    alt=""
                                    src="avater.jpg"
                                />
                                </a>
                                <a href="" class="">
                                {s.full_name} <span>HR In House Agent</span>
                                </a>
                            </h2>
                            </td>
                            <td className={s.cv_sieving < 50 ? "text-danger" : s.cv_sieving >= 50 ? "text-success" : ""} >
                            {s.cv_sieving}
                            </td>
                            <td className={s.phone_screening < 30 ? "text-danger" : s.phone_screening >= 30 ? "text-success" : ""}>
                                {s.phone_screening}
                                </td>
                            <td className={s.interview_schedule < 20 ? "text-danger" : s.interview_schedule >= 20 ? "text-success" : ""}>
                                {s.interview_schedule}</td>
                            <td>31 May 2019</td>
                        
                        
                        </tr>

                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentSupervision;
