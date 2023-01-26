/** @format */

import React from 'react';
import background from '../../assets/img/Email-Signature-Image.png';
import logo from '../../assets/img/outsource.png';
import InstagramLogo from '../../assets/img/instagram-img.png';
import TwitterLogo from '../../assets/img/twitter-img.png';
import FacebookLogo from '../../assets/img/facebook-img.png';
import LinkedInLogo from '../../assets/img/linkedIn-img.png';
import YoutubeLogo from '../../assets/img/youtube-img.png';
import TelephoneLogo from '../../assets/img/telephone-img.png';
import EmailLogo from '../../assets/img/email-img.png';
import BrowserLogo from '../../assets/img/browser-img.png';
import LocationLogo from '../../assets/img/location-img.png';
import GBSAward from '../../assets/img/GBS.png';
import EEAward from '../../assets/img/Export-Excellence-Award-2021.png';
import SECAward from '../../assets/img/Service-Exporting-Company-of-the-Year-2022.png';
import PSEAward from '../../assets/img/Private-Sector-Excellence.png';
import BSEAward from '../../assets/img/Best-sectoral-exporter.png';
import SSAward from '../../assets/img/Services-Sector-Award.png';
import NTAward from '../../assets/img/Nigeria-Tech-Awards.png';

const Signature = (props) => {
  return (
    <>
      <div className="signature">
        <div className="signature-info">
          <div className="signature-info__upper">
            <div className="signature-info__upper-left">
              <div className="signature-info__upper-left-logo">
                <img
                  className="outsource-logo"
                  src={logo}
                  alt="Outsource Global logo"
                />
              </div>
              <div className="signature-info__upper-left-socials">
                <a href={'https://www.instagram.com/outsourcegbl/'}>
                  <img
                    style={{ width: '20px' }}
                    className="social-icon"
                    src={InstagramLogo}
                    alt="Instagram"
                  />
                </a>
                <a href={'https://twitter.com/OutSourceGbl'}>
                  <img
                    style={{ width: '25px' }}
                    className="social-icon-2"
                    src={TwitterLogo}
                    alt="Twitter"
                  />
                </a>
                <a href={'https://www.facebook.com/OutsourceGbl/'}>
                  <img
                    style={{ width: '20px' }}
                    className="social-icon"
                    src={FacebookLogo}
                    alt="Facebook"
                  />
                </a>
                <a
                  href={
                    'https://www.linkedin.com/company/outsourceglobal/mycompany/'
                  }
                >
                  <img
                    style={{ width: '20px' }}
                    className="social-icon"
                    src={LinkedInLogo}
                    alt="LinkedIn"
                  />
                </a>
                <a href={'https://www.youtube.com/watch?v=qEarHDoWvWs&t=3s'}>
                  <img
                    style={{ width: '25px' }}
                    className="social-icon-2"
                    src={YoutubeLogo}
                    alt="Youtube"
                  />
                </a>
              </div>
            </div>
            <div className="signature-info__upper-right">
              <div className="signature-info__upper-right-header">
                <h1 className="s-fullName">{props.fullName}</h1>
                <p className="s-position">{props.position}</p>
              </div>
              <div className="signature-info__upper-right-body">
                <tr className="phone-tr">
                  <td colSpan={3} className="phone-td-container">
                    <span>
                      <img
                        style={{ width: '15px' }}
                        src={TelephoneLogo}
                        alt="Telephone"
                      />
                    </span>
                    &nbsp;
                    <span className="phone-td"> {props.phone} </span>
                  </td>
                </tr>
                <tr className="phone-tr">
                  <td colSpan={3} className="phone-td-container">
                    <span>
                      <img
                        style={{ width: '15px' }}
                        src={EmailLogo}
                        alt="Email"
                      />
                    </span>
                    &nbsp;
                    <span className="phone-td"> {props.email} </span>
                  </td>
                </tr>
                <tr className="phone-tr">
                  <td colSpan={3} className="phone-td-container">
                    <span>
                      <img
                        style={{ width: '14px' }}
                        src={BrowserLogo}
                        alt="Website"
                      />
                    </span>
                    &nbsp;
                    <span className="phone-td">
                      <a href="https://www.outsourceglobal.com/">
                        www.outsourceglobal.com
                      </a>
                    </span>
                  </td>
                </tr>
                <tr className="phone-tr">
                  <td colSpan={3} className="phone-td-container">
                    <span>
                      <img
                        style={{ width: '14px' }}
                        src={LocationLogo}
                        alt="Location"
                      />
                    </span>
                    &nbsp;
                    <span className="phone-td">
                      2nd Floor, ASTA GALLERY Plot 1185, Parkway Road, Cadastral
                      Zone, Mabushi District, Abuja FCT, Nigeria
                    </span>
                  </td>
                </tr>
              </div>
            </div>
          </div>

          <div className="signature-info__lower">
            <div className="signature-info__lower-first">
              <a href={'https://gbs.world/profile/outsource-global/'}>
                <div className="signature-info__lower-awards">
                  <div className="signature-info__lower-awards-img">
                    <img
                      style={{ width: '40px' }}
                      src={GBSAward}
                      alt="Location"
                    />
                  </div>
                  <div className="signature-info__lower-awards-info">
                    <p>GBS Certified Service Provider</p>
                  </div>
                </div>
              </a>

              <div className="signature-info__lower-awards">
                <div className="signature-info__lower-awards-img">
                  <img style={{ width: '25px' }} src={EEAward} alt="Location" />
                </div>
                <div className="signature-info__lower-awards-info">
                  <p>Export Excellence Award 2021</p>
                </div>
              </div>

              <a
                href={
                  'https://guardian.ng/technology/outsource-global-wins-award/'
                }
              >
                <div className="signature-info__lower-awards">
                  <div className="signature-info__lower-awards-img">
                    <img
                      style={{ width: '20px' }}
                      src={SECAward}
                      alt="Location"
                    />
                  </div>
                  <div className="signature-info__lower-awards-info">
                    <p>Service Exporting Company of the Year Award 2019</p>
                  </div>
                </div>
              </a>

              <div className="signature-info__lower-awards">
                <div className="signature-info__lower-awards-img">
                  <img
                    style={{ width: '26px' }}
                    src={PSEAward}
                    alt="Location"
                  />
                </div>
                <div className="signature-info__lower-awards-info">
                  <p>UNDP's Private Sector Excellence Award</p>
                </div>
              </div>
            </div>
            <div className="signature-info__lower-second">
              <div className="signature-info__lower-awards">
                <div className="signature-info__lower-awards-img">
                  <img
                    style={{ width: '20px' }}
                    src={BSEAward}
                    alt="Location"
                  />
                </div>
                <div className="signature-info__lower-awards-info">
                  <p>Best sectoral exporter 2022</p>
                </div>
              </div>

              <div className="signature-info__lower-awards">
                <div className="signature-info__lower-awards-img">
                  <img style={{ width: '25px' }} src={SSAward} alt="Location" />
                </div>
                <div className="signature-info__lower-awards-info">
                  <p>Outstanding achievement in the services sector 2020</p>
                </div>
              </div>

              <a
                href={
                  'https://medium.com/outsourceglobal/outsource-global-wins-award-for-innovative-contact-centre-and-bpo-operator-of-the-year-355dcf7c29cb'
                }
              >
                <div className="signature-info__lower-awards">
                  <div className="signature-info__lower-awards-img">
                    <img
                      style={{ width: '18px' }}
                      src={NTAward}
                      alt="Location"
                    />
                  </div>
                  <div className="signature-info__lower-awards-info">
                    <p>2018 Innovative Contact Center and BPO Operator</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="signature-image">
          <div className="signature-image-inner">
            <img
              className="background-img"
              src={background}
              alt="Achieving the Impossible"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signature;
