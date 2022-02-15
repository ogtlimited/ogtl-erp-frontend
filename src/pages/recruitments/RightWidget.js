import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const RightWidget = ({state}) => {
    const [id, setid] = useState(useParams())
    return (
        <>
          <div  className="job-det-info job-widget">
              {/* <a
                 data-toggle="modal"
                 data-target="#apply_job" className="btn job-btn">Apply For This Job</a> */}
              <Link
                className="btn job-btn"
                 to={"/recruitment/apply/" + id.id}>Apply For This Job</Link>
            <div  className="info-list"><span ><i 
                        className="fa fa-bar-chart"></i></span>
                <h5 >Mode of Engagement</h5>
                <p> {state?.type}</p>
            </div>
            <div  className="info-list"><span ><i 
                        className="fa fa-money"></i></span>
                <h5 >Salary</h5>
                <p > {state?.salary ? '₦ ' + state.salary + 'k' : 'Not available'}</p>
            </div>
            <div  className="info-list"><span ><i 
                        className="fa fa-suitcase"></i></span>
                <h5 >Experience</h5>
                <p >{state?.experience ? state.experience : 0} Years</p>
            </div>
            <div  className="info-list"><span ><i 
                        className="fa fa-ticket"></i></span>
                <h5 >Number of Vacancies</h5>
                <p >{state?.vacancy}</p>
            </div>
            <div  className="info-list"><span ><i 
                        className="fa fa-map-signs"></i></span>
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
            <div  className="info-list">
                <p > NG: +234 7006 8876 8723 <br /> info@outsourceglobal.com <br/> https://www.outsourceglobal.com </p>
            </div>
            <div  className="info-list text-center">
                {state.deadline ?<a 
                    className="app-ends">Application ends on {new Date(state?.deadline).toDateString()}</a> : ''}</div>
        </div>   
        </>
    )
}

export default RightWidget
