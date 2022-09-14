/** @format */

import React, { useState, useEffect } from 'react';
import { chartColors } from '../../components/charts/chart-colors';
import AcademyStatistics from '../../components/charts/academy-statistics';
import { useAppContext } from '../../Context/AppContext';
import helper from '../../services/helper';

const AcademyRatio = () => {
  const { combineRequest, showAlert } = useAppContext();
  const initialChartState = { labels: [], datasets: [] };
  const [data, setdata] = useState(initialChartState);
  const [dougnutData, setdougnutData] = useState(initialChartState);
  const [headACount, setheadACount] = useState(0);
  const [gender, setgender] = useState(initialChartState);
  useEffect(() => {
    combineRequest().then((res) => {
      const { employees, projects, departments } =
        res.data.createEmployeeFormSelection;
      const deptHash = {};
      const campHash = {};
      const genderHash = { male: 0, female: 0 };
      projects.forEach((proj) => {
        campHash[proj.project_name] = 0;
      });
      departments.forEach((proj) => {
        deptHash[proj.department] = 0;
      });
      setheadACount(employees.length);
      employees?.forEach((e) => {
        if (e.department) {
          if (!deptHash[e.department.department]) {
            deptHash[e.department.department] = 1;
          } else {
            deptHash[e.department.department] =
              deptHash[e.department.department] + 1;
          }
        }
        if (e.projectId) {
          console.log(e);
          if (!campHash[e.projectId.project_name]) {
            campHash[e.projectId.project_name] = 1;
          } else {
            campHash[e.projectId.project_name] =
              campHash[e.projectId.project_name] + 1;
          }
        }
        if (e.gender === 'male') {
          genderHash.male += 1;
        } else if (e.gender === 'female') {
          genderHash.female += 1;
        }
      });
      const deptBg = helper.shuffle(chartColors.backgroundColor);
      setdata({
        ...data,
        labels: Object.keys(deptHash),
        datasets: [
          {
            backgroundColor: deptBg,
            borderColor: deptBg,
            borderWidth: 1,
            label: '# of Department',
            data: Object.values(deptHash),
          },
        ],
      });
      const campBg = helper.shuffle(chartColors.backgroundColor);
      setdougnutData({
        ...data,
        labels: Object.keys(campHash),
        datasets: [
          {
            backgroundColor: campBg,
            borderColor: campBg,
            borderWidth: 1,
            label: '# of Campaign',
            data: Object.values(campHash),
          },
        ],
      });
      const shuffleBg = helper.shuffle(chartColors.backgroundColor);
      setgender({
        ...data,
        labels: Object.keys(genderHash),
        datasets: [
          {
            backgroundColor: shuffleBg,
            borderColor: shuffleBg,
            borderWidth: 1,
            label: '# of Gender',
            data: Object.values(genderHash),
          },
        ],
      });
    });
  }, []);
  
  return (
    <>
      <div className="row">
        <AcademyStatistics
          title="Employee By Department"
          data={data}
          chartTitle="Members by Gender"
          chartData={gender}
        />
      </div>
    </>
  );
};

export default AcademyRatio;
