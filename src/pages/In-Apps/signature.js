import React from 'react'
import logo from '../../assets/img/outsource.png'
const getIcon =  (name) => (<i class={"lab "+ name}></i> );

const Signature = (props) => {
    return (
        <>
        <div className="row signature">
        <div className="col-md-12 title">
            <h1 className="s-title">{props.fullName}</h1>
            <p className="">{props.position}</p>
        </div>
        <div className="col-md-12 bottom px-5">
            <div class="row">
                <div class="col-md-4 d-flex flex-column">
                    <img style={{width: '170px'}} src={logo} class="" alt="" />
                    <div class=" d-flex flex-row mt-3">
                        <a href="" className="mr-3" >{getIcon('la-twitter')}</a>
                        <a href="" className="mr-3" >{getIcon('la-facebook')}</a>
                        <a href="" className="mr-3" >{getIcon('la-linkedin-in')}</a>
                    </div>
                </div>
                <div class="col-md-6 offset-2  d-flex flex-column">
                <h2><span class="blue">Outsource Global</span> Technologies Limited</h2>
                    <div class="detail-links">
                        <div class="detail-link">
                            <span>{getIcon()}</span>
                            <span>2nd Floor, ASTA GALLERY Plot 1185, Parkway Road, Cadastral Zone,Mabushi District, Abuja FCT</span>
                        </div>
                        <div class="detail-link">
                            <span>{getIcon()}</span>
                            <span>{props.phone}</span>
                        </div>
                        <div class="detail-link">
                            <span>{getIcon()}</span>
                            <span>
                                <a href="www.outsourceglobal.com">www.outsourceglobal.com</a>
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        </div>
       
        </>
    );
}

export default Signature
