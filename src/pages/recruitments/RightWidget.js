import React from 'react'

const RightWidget = ({state}) => {
    
    return (
        <>
          <div  class="job-det-info job-widget">
              <a
                 data-toggle="modal"
                 data-target="#apply_job" class="btn job-btn">Apply For This Job</a>
            <div  class="info-list"><span ><i 
                        class="fa fa-bar-chart"></i></span>
                <h5 >Job Type</h5>
                <p> {state?.type}</p>
            </div>
            <div  class="info-list"><span ><i 
                        class="fa fa-money"></i></span>
                <h5 >Salary</h5>
                <p > {state?.salary ? '₦ ' + state.salary + 'k' : 'Not available'}</p>
            </div>
            <div  class="info-list"><span ><i 
                        class="fa fa-suitcase"></i></span>
                <h5 >Experience</h5>
                <p >{state?.experience} Years</p>
            </div>
            <div  class="info-list"><span ><i 
                        class="fa fa-ticket"></i></span>
                <h5 >Number of Vacancies</h5>
                <p >{state?.vacancy}</p>
            </div>
            <div  class="info-list"><span ><i 
                        class="fa fa-map-signs"></i></span>
                <h5 >Location</h5>
                {state?.location?.branch === 'Abuja' ?
                     <p > Outsource Global Technologies <br /> 2nd Floor, ASTA GALLERY,
                     <br /> Plot 1185, Parkway Road, <br /> Cadastral Zone,Mabushi
                     <br /> District, Abuja FCT, Nigeria
                     </p> :
                      <p > Outsource Global Technologies <br /> 47, Kanta Road, Unguwar,
                      <br /> Rimi, Kaduna State</p>
                }
               
            </div>
            <div  class="info-list">
                <p > NG: +234 7006 8876 8723 <br /> info@outsourceglobal.com <br/> https://www.outsourceglobal.com </p>
            </div>
            <div  class="info-list text-center"><a 
                    class="app-ends">Application ends in 2d 7h 6m</a></div>
        </div>   
        </>
    )
}

export default RightWidget
