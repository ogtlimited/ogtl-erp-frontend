import React from "react";
import CampaignLeftCard from "./campaign-components/campaign-description";
import CampaignRightCard from "./campaign-components/project-details";
import CampaignHeader from "./CampaignHeader";

const CampaignInfo = () => {
  return (
    <>
     <CampaignHeader />
        <div class="row">
        <div class="col-lg-8 col-xl-9">
            <CampaignLeftCard />
            
        </div>
        <div class="col-lg-4 col-xl-3">
        <CampaignRightCard />

        </div>
            
        </div>
     </>
  );
};

export default CampaignInfo;
