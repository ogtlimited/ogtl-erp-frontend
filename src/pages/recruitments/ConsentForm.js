import React from 'react'

const ConsentForm = ({id, defaultVal}) => {
    return (
        <>
            <div className='card mt-3'>
                <div className="card-body">
                    <h5 className='rec-p pt-3 mb-2'>
                    Under the NDPR, GDPR, and other applicable regulations, we are legally obligated to protect any information we collect. Continuing to use this platform indicates your consent to the processing of your personal data by Outsource Global Technologies Limited, its subsidiaries, and partners.
            </h5>
            <p className='rec-p'>To view our complete Privacy and Data Policy, please visit  {" "}
        
        <a href="https://www.outsourceglobal.com/privacy-policy ">https://www.outsourceglobal.com/privacy-policy </a>
                </p>

                </div>
            </div>
            <div className='card mt-3'>
                <div className="card-body">
                    <h5 className='rec-p pt-3 mb-2'>Privacy Policy</h5>
            <p className='rec-p'>This Privacy Policy (“Policy”) and any other document referred to in this Policy sets out how Outsource Global Technologies Limited manages and process your Personal Data including any other information. Please read the following carefully to understand our views and practices regarding your Personal Data and how we will treat it. If you have any comments on this policy, please email them to 
        {" "}
        <a href="mailto:info@outsourceglobal.com">info@outsourceglobal.com</a>
                </p>

                </div>
            </div>
            <div className='card mt-3'>
                <div className="card-body">
                    <h5 className='rec-p pt-3 mb-2'>Consent</h5>
            <p className='rec-p'>You accept this Policy and hereby give us consent to save, process and use your Personal Data to the extent as allowed by the Nigeria Data Protection Regulation (NDPR) when you provide us with details of your Personal Data or by clicking on “Accept”, "Next", "Submit", or any other button. You may withdraw your consent at any time before, during and after we process your Personal Data. Personal Data is information that can be directly used to identify you and includes but is not limited to your name, address, telephone number, email address and any other information of like nature.
        {" "}
       
                </p>

                </div>
            </div>
            <button className="nav-button btn btn-primary submit-btn" type="button" data-toggle="collapse"
                data-target={"#collapse2"} aria-expanded={defaultVal} aria-controls={"collapse2"}>
               Accept
            </button>
        </>
    )
}

export default ConsentForm
