/** @format */

import React from 'react';
import LocationSvg from '../../assets/img/location.svg';
import PhoneSvg from '../../assets/img/phone.svg';
import AnchorSvg from '../../assets/img/anchor.svg';
import Mail from '../../assets/img/mail.svg';
const Signature = (props) => {
  return (
    <>
      <div className="row signature">
        <table cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr className="pt-1" style={{backgroundColor: "#fff"}}>
              <td
                style={{
                  height: '30%',
                  width: '35%',
                  borderRight: '2px solid #0A6D9199',
                }}
                className="pl-2"
                rowSpan={5}
              >
                <img
                  style={{ width: '100%' }}
                  src="https://www.outsourceglobal.com/logo.png"
                  alt="Outsource Global Logo"
                />
                <div className="social-logos-frame mt-3 ml-1">
                  <a
                    href={'https://www.instagram.com/outsourcegbl/'}
                  >
                    <img
                      src="https://res.cloudinary.com/dhantey/image/upload/v1676299735/OGTL/instagram_y9ynet.png"
                      style={{ width: '32px' }}
                      alt="instagram"
                    />
                  </a>

                  <a href={'https://twitter.com/OutSourceGbl'}>
                    <img
                      src="https://res.cloudinary.com/dhantey/image/upload/v1676299847/OGTL/twitter_ha6cpo.png"
                      style={{ width: '27px' }}
                      alt="twitter"
                    />
                  </a>

                  <a
                    href={'https://www.facebook.com/OutsourceGbl/'}
                  >
                    <img
                      src="https://res.cloudinary.com/dhantey/image/upload/v1676299914/OGTL/facebook_vjov6p.png"
                      style={{ width: '27px' }}
                      alt="facebook"
                    />
                  </a>

                  <a
                    href={
                      'https://www.linkedin.com/company/outsourceglobal/mycompany/'
                    }
                  >
                    <img
                      src="https://res.cloudinary.com/dhantey/image/upload/v1676299979/OGTL/linkedin_jpqiro.png"
                      style={{ width: '27px' }}
                      alt="linkedIn"
                    />
                  </a>

                  <a
                    className="mr-1"
                    href={'https://www.youtube.com/watch?v=qEarHDoWvWs&t=3s'}
                  >
                    <img
                      src="https://res.cloudinary.com/dhantey/image/upload/v1676300054/OGTL/youtube_a8hkfw.png"
                      style={{ width: '32px' }}
                      alt="youtube"
                    />
                  </a>
                </div>
              </td>
              <td>
                <div className="signature-info__upper-right-header">
                  <h1 className="s-fullName">{props.fullName}</h1>
                  <p className="s-position">{props.position}</p>
                </div>
              </td>

              <td
                style={{ height: '30%', width: '35%', background: 'rgb(10, 109, 145, 0.6)' }}
                className="pl-3"
                rowSpan={8}
              >
                <div className="email-signature-div">
                  <img
                    className="email-signature-img"
                    src="https://res.cloudinary.com/dhantey/image/upload/v1676297071/OGTL/Email-Signature-Image.png"
                    alt="Achieving the Impossible"
                  />
                </div>
              </td>
            </tr>

            <tr className="phone-td-container" style={{backgroundColor: "#fff"}}>
              <td
                rowSpan={1}
                style={{
                  padding: '0 10px 0 0',
                  display: 'flex',
                }}
              >
                <span>
                  <img
                    style={{ width: '27px' }}
                    src="https://res.cloudinary.com/dhantey/image/upload/v1676301699/OGTL/telephone_kxnkr1.png"
                    alt="Telephone"
                  />
                </span>
                <span className="phone-td"> {props.phone} </span>
              </td>
            </tr>

            <tr className="phone-td-container" style={{backgroundColor: "#fff"}}>
              <td
                rowSpan={1}
                style={{
                  padding: '0 10px 0 0',
                  display: 'flex',
                }}
              >
                <span>
                  <img
                    style={{ width: '26px' }}
                    src="https://res.cloudinary.com/dhantey/image/upload/v1676301699/OGTL/email_v5uk8a.png"
                    alt="Email"
                  />
                </span>
                <span className="phone-td"> {props.email} </span>
              </td>
            </tr>

            <tr className="phone-td-container" style={{backgroundColor: "#fff"}}>
              <td
                rowSpan={1}
                style={{
                  padding: '0 10px 0 0',
                  display: 'flex',
                }}
              >
                <span>
                  <img
                    style={{ width: '25px' }}
                    src="https://res.cloudinary.com/dhantey/image/upload/v1676301699/OGTL/browser_cth9w5.png"
                    alt="Browser"
                  />
                </span>
                <span className="phone-td">
                  {' '}
                  <a href="https://www.outsourceglobal.com/">
                    www.outsourceglobal.com
                  </a>{' '}
                </span>
              </td>
            </tr>

            <tr className="phone-td-container" style={{backgroundColor: "#fff"}}>
              <td
                rowSpan={1}
                style={{
                  padding: '0 10px 5px 0',
                  display: 'flex',
                }}
              >
                <span>
                  <img
                    style={{ width: '25px' }}
                    src="https://res.cloudinary.com/dhantey/image/upload/v1676301699/OGTL/location_suj6f8.png"
                    alt="Location"
                  />
                </span>
                <span className="phone-td">
                  {' '}
                  2nd Floor, ASTA GALLERY Plot 1185, Parkway Road, Cadastral
                  Zone, Mabushi District, Abuja FCT, Nigeria
                </span>
              </td>
            </tr>

            <tr style={{ background: '#fff', borderTop: '2px solid #0A6D9199' }} >
              <td rowSpan={1} colSpan={2} >
                <div className="signature-info__lower-first">
                  <a href={'https://gbs.world/profile/outsource-global/'}>
                    <div className="signature-info__lower-awards">
                      <div className="signature-info__lower-awards-img">
                        <img
                          style={{ width: '40px' }}
                          src="https://res.cloudinary.com/dhantey/image/upload/v1674758818/OGTL/GBS_jm0vps.png"
                          alt="GBS Certified Service Provider"
                        />
                      </div>
                      <div className="signature-info__lower-awards-info">
                        <p>GBS Certified Service Provider</p>
                      </div>
                    </div>
                  </a>

                  <div className="signature-info__lower-awards">
                    <div className="signature-info__lower-awards-img">
                      <img
                        style={{ width: '25px' }}
                        src="https://res.cloudinary.com/dhantey/image/upload/v1674758819/OGTL/Export-Excellence-Award-2021_llhpg0.png"
                        alt="Export Excellence Award 2021"
                      />
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
                          src="https://res.cloudinary.com/dhantey/image/upload/v1674758819/OGTL/Service-Exporting-Company-of-the-Year-2022_nfns1l.png"
                          alt="Service Exporting Company of the Year Award 2019"
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
                        src="https://res.cloudinary.com/dhantey/image/upload/v1674758819/OGTL/Private-Sector-Excellence_rlzqpu.png"
                        alt="UNDP's Private Sector Excellence Award"
                      />
                    </div>
                    <div className="signature-info__lower-awards-info">
                      <p>UNDP's Private Sector Excellence Award</p>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            <tr style={{backgroundColor: "#fff"}}>
              <td rowSpan={1} colSpan={2}>
                <div className="signature-info__lower-second">
                  <div className="signature-info__lower-awards">
                    <div className="signature-info__lower-awards-img">
                      <img
                        style={{ width: '20px' }}
                        src="https://res.cloudinary.com/dhantey/image/upload/v1674758819/OGTL/Best-sectoral-exporter_sicfob.png"
                        alt="Best sectoral exporter 2022"
                      />
                    </div>
                    <div className="signature-info__lower-awards-info">
                      <p>Best sectoral exporter 2022</p>
                    </div>
                  </div>

                  <div className="signature-info__lower-awards">
                    <div className="signature-info__lower-awards-img">
                      <img
                        style={{ width: '25px' }}
                        src="https://res.cloudinary.com/dhantey/image/upload/v1674758820/OGTL/Services-Sector-Award_gnn6km.png"
                        alt="Outstanding achievement in the services sector 2020"
                      />
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
                          src="https://res.cloudinary.com/dhantey/image/upload/v1674758819/OGTL/Nigeria-Tech-Awards_sd0tgm.png"
                          alt="2018 Innovative Contact Center and BPO Operator"
                        />
                      </div>
                      <div className="signature-info__lower-awards-info">
                        <p>2018 Innovative Contact Center and BPO Operator</p>
                      </div>
                    </div>
                  </a>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </>
  );
};

export default Signature;
