import React, {useState, useEffect} from 'react'
import { chartColors } from '../../components/charts/chart-colors';
import DashboardChart from '../../components/charts/dashboard-charts'
import DashboardStatistics from '../../components/charts/dashboard-statistics';
import { useAppContext } from '../../Context/AppContext';
import helper from '../../services/helper';

const HRDashboard = () => {
    const { combineRequest, showAlert } = useAppContext();
    const initialChartState = {labels: [], datasets: [],}
    const [data, setdata] = useState(initialChartState)
    const [dougnutData, setdougnutData] =useState(initialChartState)
    const [headACount, setheadACount] = useState(0)
    const [gender, setgender] = useState(initialChartState)
      useEffect(() => {
        combineRequest().then((res) => {
          console.log(res);
          const { employees, projects, departments } = res.data.createEmployeeFormSelection;
          const deptHash = {}
          const campHash =  {}
          const genderHash =  {male:0, female:0}
          projects.forEach(proj =>{
              campHash[proj.project_name] = 0
          })
          departments.forEach(proj =>{
              deptHash[proj.department] = 0
          })
          setheadACount(employees.length)
           employees?.forEach((e) => {
              //  console.log(e.projectId)
               if(e.department){
                   if(!deptHash[e.department.department]){
                       deptHash[e.department.department] = 1
                   }else{
                       deptHash[e.department.department] = deptHash[e.department.department] + 1
                   }
               } if(e.projectId){
                   console.log(e)
                   if(!campHash[e.projectId.project_name]){
                       campHash[e.projectId.project_name] = 1
                   }else{
                       campHash[e.projectId.project_name] = campHash[e.projectId.project_name] + 1
                   }
               }
               if(e.gender === "male"){
                genderHash.male += 1
                }else if(e.gender === "female"){
                    genderHash.female += 1

                }
          });
          const deptBg = helper.shuffle(chartColors.backgroundColor)
          setdata({
              ...data,
              labels:Object.keys(deptHash),
              datasets: [{
                backgroundColor: deptBg,
                borderColor: deptBg,
                borderWidth: 1,
                  label: '# of Department',
                  data: Object.values(deptHash),
              }]
          })
          const campBg = helper.shuffle(chartColors.backgroundColor)
          setdougnutData({
              ...data,
              labels:Object.keys(campHash),
              datasets: [{
                backgroundColor: campBg,
                borderColor: campBg,
                borderWidth: 1,
                  label: '# of Campaign',
                  data: Object.values(campHash),
              }] 
          })
          const shuffleBg = helper.shuffle(chartColors.backgroundColor)
          setgender({
              ...data,
              labels:Object.keys(genderHash),
              datasets: [{
                  backgroundColor: shuffleBg,
                  borderColor: shuffleBg,
                  borderWidth: 1,
                  label: '# of Gender',
                  data: Object.values(genderHash),
              }] 
          })
          
          // console.log(deptHash)
          // console.log(genderHash)
          // console.log(gender)
        });
      }, []);
    return (
        <div>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Welcome Admin!</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active">Dashboard</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div className="card dash-widget">
            <div className="card-body">
              <span className="dash-widget-icon">
              <i class="las la-users"></i>
              </span>
              <div className="dash-widget-info">
                <h3>{headACount}</h3>
                <span>Head Count</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div className="card dash-widget">
            <div className="card-body">
              <span className="dash-widget-icon">
              <i class="las la-door-open"></i>
              </span>
              <div className="dash-widget-info">
                <h3>44 %</h3>
                <span>Month Attrition Rate</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div className="card dash-widget">
            <div className="card-body">
              <span className="dash-widget-icon">
                <i className="fa fa-diamond"></i>
              </span>
              <div className="dash-widget-info">
                <h3>37</h3>
                <span>Absenteeism Per Month</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
          <div className="card dash-widget">
            <div className="card-body">
              <span className="dash-widget-icon">
              <i class="las la-percent"></i>
              </span>
              <div className="dash-widget-info">
                <h3>218</h3>
                <span>Gender Diversity Ratio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <DashboardChart title="Employee By Department" data={data} dougnutTitle="Employee By Campaign" dougnutData={dougnutData}  />
          
      </div>
      <div className="row">
        <DashboardStatistics title="Employee By Department" data={data} chartTitle="Employee By Gender" chartData={gender}  />
          
      </div>
      
      <>
      {/* <AdminCards /> */}</>
    </div>
    )
}

export default HRDashboard
