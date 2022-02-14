import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/api";
import CampaignLeftCard from "./campaign-components/campaign-description";
import CampaignRightCard from "./campaign-components/project-details";
import CampaignHeader from "./CampaignHeader";

const CampaignInfo = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const fetchProjects = () => {
    axiosInstance
      .get(`/api/project/${id}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchProjects();
  }, [id]);

  return (
    <>
      <CampaignHeader campaign_info={data} fetchProjects={fetchProjects} />
      <div className="row">
        <div className="col-lg-8 col-xl-9">
          <CampaignLeftCard campaign_info={data} />
        </div>
        <div className="col-lg-4 col-xl-3">
          <CampaignRightCard campaign_info={data} />
        </div>
      </div>
    </>
  );
};

export default CampaignInfo;
