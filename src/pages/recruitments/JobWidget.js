import React from 'react'

const JobWidget = ({state}) => {
    return (
        <>
            <div  class="job-info job-widget">
                <h3  class="job-title">{state?.job_title}</h3><span 
                    class="job-dept">{state?.designation_id?.designation}</span>
                <ul  class="job-post-det">
                    <li ><i  class="fa fa-calendar"></i> Post Date: <span
                            class="text-blue">{state?.date}</span></li>
                    <li ><i  class="fa fa-calendar"></i> Last Date: <span
                            class="text-blue">{state?.deadline}</span></li>
                   
                </ul>
            </div>
            <div  class="job-content job-widget">
            <div  class="job-desc-title">
                <h4 >Job Description</h4>
            </div>
            <div  class="job-description">
                <p  dangerouslySetInnerHTML={{
                                __html: state?.description,
                              }} ></p>
            </div>
           
        </div>
        
        </>
    )
}

export default JobWidget
