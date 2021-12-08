import React from 'react'
import logo from '../../assets/img/OG-Logo.png'
const getIcon =  (name) => (<i class={"lab "+ name}></i> );

const Signature = (props) => {
    return (
        <table cellPadding={0} cellSpacing={0} className={"signature"}>
            <tbody>
            <tr>
                <td rowSpan={5}>
                    <img
                        className={"main-image"}
                        src={props.photo === "no-photo" ? logo : props.photo}
                        alt={""}
                    />
                </td>
                <td rowSpan={5}>
                    <div
                        className={"vertical-line"}
                    />
                </td>
                <td>{props.fullName}</td>
            </tr>
            <tr>
                <td colSpan={3}>{props.position}</td>
            </tr>
            <tr>
                <td colSpan={3}>Telephone: {props.phone}</td>
            </tr>
            <tr>
                <td colSpan={3}>Skype: {props.skype}</td>
            </tr>
            <tr>
                <td colSpan={3}>
                    <div className={"social-logos-frame"}>
                        <a href={"https://twitter.com/"}>
                            {getIcon("la-twitter")}
                        </a>
                        <a href={"https://www.linkedin.com/"}>
                            {getIcon("la-linkedin-in")}
                        </a>
                        <a href={"https://www.facebook.com/"}>
                            {getIcon("la-facebook")}
                        </a>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default Signature
