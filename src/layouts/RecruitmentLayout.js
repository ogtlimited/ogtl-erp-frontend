import React from 'react'
import RecruitmentHeader from '../pages/recruitments/recruitmentHeader'
import { Outlet } from "react-router-dom";
const RecruitmentLayout = () => {
    return (
        <>
      <RecruitmentHeader   />
      <div className="page-wrapper">
        <div className="content container-fluid">

          <Outlet />

        </div>
      </div>
      </>
    )
}

export default RecruitmentLayout
