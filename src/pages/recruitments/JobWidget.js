import React from 'react'

const JobWidget = ({state}) => {
    return (
        <>
            <div  className="job-info job-widget">
                <h3  className="job-title">{state?.job_title}</h3><span 
                    className="job-dept">{state?.designation_id?.designation}</span>
                <ul  className="job-post-det">
                    <li ><i  className="fa fa-calendar"></i> Post Date: <span
                            className="text-blue">{state?.date}</span></li>
                    <li ><i  className="fa fa-calendar"></i> Last Date: <span
                            className="text-blue">{state?.deadline}</span></li>
                   
                </ul>
            </div>
            <div  className="job-content job-widget">
            <div  className="job-desc-title">
                <h4 >Job Description</h4>
            </div>
            <div  className="job-description">
                <p  dangerouslySetInnerHTML={{
                                __html: state?.description,
                              }} ></p>
            </div>
           
        </div>
        
        </>
    )
}

export default JobWidget
