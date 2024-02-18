/** @format */

import React from 'react';
const Signature = (props) => {
  return (
    <>
      <div className="signature">
        <table cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr className="pt-1" style={{backgroundColor: "#ffffff"}}>
              <td
                style={{
                  width: '35%',
                  borderRight: '1px solid #0A6D9199',
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
                className="pl-2"
                rowSpan={6}
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

            <tr className="phone-td-container-tr">
              <td
                rowSpan={1}
                className='phone-td-container-children'
              >
                <span>
                  <img
                    style={{ width: '22px' }}
                    src="https://res.cloudinary.com/dhantey/image/upload/v1676301699/OGTL/telephone_kxnkr1.png"
                    alt="Telephone"
                  />
                </span>
                <span className="phone-td"> {props.phone} </span>
              </td>
            </tr>

            <tr className="phone-td-container-tr">
              <td
                rowSpan={1}
                className='phone-td-container-children'
              >
                <span>
                  <img
                    style={{ width: '21px' }}
                    src="https://res.cloudinary.com/dhantey/image/upload/v1676301699/OGTL/email_v5uk8a.png"
                    alt="Email"
                  />
                </span>
                <span className="phone-td"> {props.email} </span>
              </td>
            </tr>

            <tr className="phone-td-container-tr">
              <td
                rowSpan={1}
                className='phone-td-container-children'
              >
                <span>
                  <img
                    style={{ width: '21px' }}
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

            <tr className="phone-td-container-tr">
              <td
                rowSpan={1}
                className='phone-td-container-children'
              >
                <span>
                  <img
                    style={{ width: '21px', marginTop: '-20px' }}
                    src="https://res.cloudinary.com/dhantey/image/upload/v1676301699/OGTL/location_suj6f8.png"
                    alt="Location"
                  />
                </span>
                <span className="phone-td" style={{paddingBottom: '5px'}}>
                  {' '}
                  2nd Floor, ASTA GALLERY Plot 1185, Parkway Road, Cadastral
                  Zone, Mabushi District, Abuja FCT, Nigeria
                </span>
              </td>
            </tr>
            
            <tr style={{ background: '#ffffff', borderTop: '1px solid #0A6D9199' }} >
              <td rowSpan={1} colSpan={2} >
                <div className="signature-info__lower-first">
                  <a href={'https://ogtl-awards.netlify.app/'}>
                    <div className="signature-info__lower-awards">
                      <div className="signature-info__lower-awards-img">
                        <img
                          style={{ width: '100%' }}
                          src="https://res.cloudinary.com/dhantey/image/upload/v1676382156/OGTL/list-of-awards_vjga7d.jpg"
                          alt="OGTL Awards"
                        />
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
