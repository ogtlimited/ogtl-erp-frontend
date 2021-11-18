import React from "react";
import { Link } from "react-router-dom";

const CampaignHeader = ({ campaign_name }) => {
  return (
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="page-title">{campaign_name} Campaign</h3>
          <ul class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/admin/campaigns">Campaigns</Link>
            </li>
            <li class="breadcrumb-item active">Campaign</li>
          </ul>
        </div>
        <div class="col-auto float-right ml-auto">
          <a
            href="#"
            class="btn add-btn"
            data-toggle="modal"
            data-target="#CampaignModal"
          >
            <i class="fa fa-plus"></i> Edit Campaign
          </a>
          <a
            href="task-board.html"
            class="btn btn-white float-right m-r-10"
            data-toggle="tooltip"
            title=""
            data-original-title="Task Board"
          >
            <i class="fa fa-bars"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CampaignHeader;
