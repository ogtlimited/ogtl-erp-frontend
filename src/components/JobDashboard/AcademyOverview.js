/** @format */

import React from 'react';
import AcademyChart from './AcademyChart';
import AcademyRatio from '../../pages/Dashboard/AcademyRatio';

const AcademyOverview = ({ data, empStats }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6 text-center d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <div className="chartjs-size-monitor">
                  <div className="chartjs-size-monitor-expand">
                    <div className=""></div>
                  </div>
                  <div className="chartjs-size-monitor-shrink">
                    <div className=""></div>
                  </div>
                </div>
                <h3 className="card-title">Overview</h3>
                <AcademyChart data={empStats} />
              </div>
            </div>
          </div>
                <AcademyRatio />
        </div>
      </div>
    </div>
  );
};

export default AcademyOverview;
