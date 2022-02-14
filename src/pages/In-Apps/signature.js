import React from 'react'
import logo from '../../assets/img/outsource.png'
import TwitterLogo from '../../assets/img/twitter.svg'
import LinkedInLogo from '../../assets/img/linkedin.svg'
import FacebookLogo from '../../assets/img/facebook.svg'
import LocationSvg from '../../assets/img/location.svg'
import PhoneSvg from '../../assets/img/phone.svg'
import AnchorSvg from '../../assets/img/anchor.svg'
import Mail from '../../assets/img/mail.svg'
import Iso from '../../assets/img/Skype_Picture_2021_06_03T10_49_47_206Z.jpeg'

const getIcon =  (name) => (<i className={"lab "+ name}></i> );
const tr = {bacground: 'aliceblue'}
const Signature = (props) => {
    return (
        <>
        <div className="row signature">
        <div className="col-md-12 title">
            <h1 className="s-title">{props.fullName}</h1>
            <p className="">{props.position}</p>
        </div>
        <table cellPadding={0} cellSpacing={0} >
            <tbody>
            <tr style={{background: 'aliceblue'}} className="pt-1">
                <td  style={{height: '30%', width: '35%'}} className="pl-5" rowSpan={8}>
                    <img
                        style={{width: '80%'}}
                        src="https://www.outsourceglobal.com/logo.png"
                        alt={""}
                    />
                    <div className="social-logos-frame mt-3">
                        <a className="mr-3" href={"https://twitter.com/OutSourceGbl"}>
                            <img src={TwitterLogo} alt={""}/>
                        </a>
                        <a  href={"https://www.linkedin.com/company/outsourceglobal/mycompany/"}>
                            <img src={LinkedInLogo} alt={""}/>
                        </a>
                        <a  href={"https://www.facebook.com/OutsourceGbl/"}>
                            <img src={FacebookLogo} alt={""}/>
                        </a>
                        
                    </div>
                   
                </td>
                <td>
                <h3><span className="blue">Outsource Global</span> Technologies Limited</h3>
                </td>
            </tr>
            
            <tr style={{background: 'aliceblue'}}>
           
                <td colSpan={3}>
                    <span><img style={{width: '15px'}}  src={Mail}  alt="" /></span>&nbsp;
                   <span> {props.email} </span>
                    </td>
            </tr>
            
            <tr style={{background: 'aliceblue'}}>
                <td colSpan={3}>
                <div className="detail-link">
                            <span><img  src={LocationSvg}  alt="" /></span>&nbsp;
                            <span>2nd Floor, ASTA GALLERY Plot 1185, Parkway Road, Cadastral Zone,Mabushi District, Abuja FCT</span>
                        </div>
                </td>
            </tr>
            <tr style={{background: 'aliceblue'}}>
                <td colSpan={3}>
                <div className="detail-link">
                <span><img  src={PhoneSvg}  alt="" /></span>&nbsp;
                            <span>{props.phone}</span>
                        </div>
                </td>
            </tr>
            <tr style={{background: 'aliceblue'}}>
                <td colSpan={3}>
                <div className="detail-link">
                            <span><img  src={AnchorSvg}  alt="" /> </span> &nbsp;
                            <span>
                                <a href="www.outsourceglobal.com">www.outsourceglobal.com</a>
                            </span>
                        </div>
                </td>
            </tr>
            
            </tbody>
        </table>
        {/* <div className="col-md-12 title">
            <h1 className="s-title">{props.fullName}</h1>
            <p className="">{props.position}</p>
        </div>
        <div className="col-md-12 bottom px-5">
            <div className="row">
                <div className="col-md-4 d-flex flex-column">
                    <img style={{width: '170px'}} src={logo} className="" alt="" />
                    <div className=" d-flex flex-row mt-3">
                        <a href="" className="mr-3" >{getIcon('la-twitter')}</a>
                        <a href="" className="mr-3" >{getIcon('la-facebook')}</a>
                        <a href="" className="mr-3" >{getIcon('la-linkedin-in')}</a>
                    </div>
                </div>
                <div className="col-md-6 offset-2  d-flex flex-column">
                <h2><span className="blue">Outsource Global</span> Technologies Limited</h2>
                    <div className="detail-links">
                        <div className="detail-link">
                            <span>{getIcon()}</span>
                            <span>2nd Floor, ASTA GALLERY Plot 1185, Parkway Road, Cadastral Zone,Mabushi District, Abuja FCT</span>
                        </div>
                        <div className="detail-link">
                            <span>{getIcon()}</span>
                            <span>{props.phone}</span>
                        </div>
                        <div className="detail-link">
                            <span>{getIcon()}</span>
                            <span>
                                <a href="www.outsourceglobal.com">www.outsourceglobal.com</a>
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div> */}

        </div>
       
        </>
    );
}

export default Signature
