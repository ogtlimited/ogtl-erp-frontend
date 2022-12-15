/** @format */

import React, { useState, useEffect } from 'react';
import { chartColors } from '../../components/charts/chart-colors';
import DashboardChart from '../../components/charts/dashboard-charts';
import DashboardStatistics from '../../components/charts/dashboard-statistics';
import { useAppContext } from '../../Context/AppContext';
import helper from '../../services/helper';
import axiosInstance from '../../services/api';

const HRDashboard = () => {
  const { combineRequest, showAlert } = useAppContext();
  const initialChartState = { labels: [], datasets: [] };
  const [data, setdata] = useState(initialChartState);
  const [dougnutData, setdougnutData] = useState(initialChartState);
  const [headACount, setheadACount] = useState(0);
  const [gender, setgender] = useState(initialChartState);
  const [loading, setLoading] = useState(true);
  const [employeeLabel, setEmployeeLabel] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [genderLabel, setGenderLabel] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [formattedGender, setFormattedGender] = useState([]);
  const [leaveStatusLabel, setLeaveStatusLabel] = useState([]);
  const [leaveStatusData, setLeaveStatusData] = useState([]);
  const [leaveTypeLabel, setLeaveTypeLabel] = useState([]);
  const [leaveTypeData, setLeaveTypeData] = useState([]);

  const [headCount, setheadCount] = useState(0);
  const [genderRatio, setGenderRatio] = useState(0);
  const [totalInvoice, setTotalInvoice] = useState(0);
  const [pendingInvoice, setPendingInvoice] = useState(0);
  const [processingTickets, setProcessingTickets] = useState(0);
  const [openTickets, setOpenTickets] = useState(0);
  const [closedTickets, setClosedTickets] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);

  const fetchHeadCount = async () => {
    try {
      const response = await axiosInstance.get('/employees/head-count');
      const resData = response.data.data.headCount;

      const count = resData.filter((data) => data._id === 'active');

      setheadCount(count[0].total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchEmployeeData = async () => {
    try {
      const response = await axiosInstance.get('/departments/employees/count');
      const resData = response.data.data.employeesByDepartment;

      const formatted = resData.map((e) => ({
        id: e._id === null ? "not_specified" : e._id['_id'],
        labels: e._id === null ? "Not Specified" : e._id['department'],
        data: e.total,
      }));

      const label = [...formatted.map((e) => e.labels)];
      const data = [...formatted.map((e) => e.data)];

      setFormattedData(formatted);
      setEmployeeLabel(label);
      setEmployeeData(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchEmployeeGender = async () => {
    try {
      const response = await axiosInstance.get('/employees/gender-count');
      const resData = response.data.data.genderCount;

      const formatted = resData.map((e) => ({
        labels: e._id,
        data: e.total,
      }));
      
      const label = [...formatted.map((e) => e.labels)];
      const data = [...formatted.map((e) => e.data)];

      setFormattedGender(formatted)
      setGenderLabel(label);
      setGenderData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchGenderDiversityRatio = async () => {
    try {
      const response = await axiosInstance.get('/employees/gender-ratio');
      const resData = response.data.data.genderRatio;

      setGenderRatio(resData)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchInvoice = async () => {
    try {
      const response = await axiosInstance.get('/api/invoice/status');
      const resData = response.data.data[0]["Invoice status"];

      const publishedCount = resData.filter((data) => data._id === 'Published');
      const pendingCount = resData.filter((data) => data._id === 'Draft');
      setPendingInvoice(pendingCount[0].total);

      const totalCount = publishedCount[0].total + pendingCount[0].total;
      setTotalInvoice(totalCount);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await axiosInstance.get('/api/ticketing/status');
      const resData = response.data.data[0]["Tickets status"];

      const closedCount = resData.filter((data) => data._id === 'Resolved');
      const openCount = resData.filter((data) => data._id === 'Open');
      const processingCount = resData.filter((data) => data._id === 'Processing');

      setOpenTickets(openCount[0].total);
      setClosedTickets(closedCount[0].total);
      setProcessingTickets(processingCount[0].total);

      const total = openCount[0].total + closedCount[0].total + processingCount[0].total;
      setTotalTickets(total);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get('/api/project/status');
      const resData = response.data.data[0]["Project status"];
      setCompletedProjects(resData[0].total)
      setTotalProjects(resData[0].total)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchLeaveStatusData = async () => {
    try {
      const response = await axiosInstance.get('/hr-leave-applications/hr-dashboard-analytics');
      const resData = response?.data?.data
      const label = Object.keys(resData);
      const data = Object.values(resData)
      setLeaveStatusLabel(label);
      setLeaveStatusData(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchLeaveTypeData = async () => {
    try {
      const response = await axiosInstance.get('/hr-leave-applications/leave-types-taken');
      const resData = response?.data?.data
      console.log("Leave Type Response", resData )

      const formatted = resData.map((e) => ({
        labels: e._id === null ? "Not Specified"  : e._id,
        data: e.total,
      }));
      

      const label = [...formatted.map((e) => e.labels)];
      const data = [...formatted.map((e) => e.data)];

      
      setLeaveTypeLabel(label);
      setLeaveTypeData(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchHeadCount();
    fetchEmployeeData();
    fetchEmployeeGender();
    fetchGenderDiversityRatio();
    fetchInvoice();
    fetchTickets();
    fetchProjects();
    fetchLeaveStatusData();
    fetchLeaveTypeData();
  }, []);

  // const fetchEmployeeData = async () => {
  //   try {
  //     const response = await axiosInstance.get("/combine-employee-form")
  //     console.log("this is the response", response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchEmployeeData();
  // }, [])

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="hr-dashboard-card-group">
        <div className="hr-dashboard-card">
          <div className="card-body">
            <span className="dash-widget-icon">
              <i className="las la-users"></i>
            </span>
            <div className="card-info">
              {loading ? <h3>-</h3> : <h3>{headCount}</h3>}
            </div>
          </div>
          <span>Head Count</span>
        </div>
        <div className="hr-dashboard-card">
          <div className="card-body">
            <span className="dash-widget-icon">
              <i className="las la-door-open"></i>
            </span>
            <div className="card-info">
              <h3>-</h3>
            </div>
          </div>
          <span>Month Attrition Rate</span>
        </div>
        {/* <div className="hr-dashboard-card">
          <div className="card-body">
            <span className="dash-widget-icon">
              <i className="fa fa-diamond"></i>
            </span>
            <div className="card-info">
              <h3>-</h3>
            </div>
          </div>
          <span>Absenteeism Per Month</span>
        </div> */}
        <div className="hr-dashboard-card">
          <div className="card-body">
            <span className="dash-widget-icon">
              <i className="las la-restroom" style={{transform: "scaleX(-1)"}}></i>
            </span>
            <div className="card-info">
              {loading ? <h3>-</h3> : <h3> {genderRatio} </h3>}
            </div>
          </div>
          <span>Gender Diversity Ratio (Females to Males)</span>
        </div>
      </div>

      <div className="row">
        <DashboardChart
          title="Employee By Department"
          employeeData={employeeData}
          employeeLabel={employeeLabel}
          genderLabel={genderLabel}
          genderData={genderData}
          formattedData={formattedData}
          formattedGender={formattedGender}
        />
      </div>

      <div className="row">
        <DashboardStatistics
          title="Employee By Department"
          data={data}
          chartTitle="Employee By Gender"
          chartData={gender}
          totalInvoice={totalInvoice}
          pendingInvoice={pendingInvoice}
          processingTickets={processingTickets}
          openTickets={openTickets}
          closedTickets={closedTickets}
          totalTickets={totalTickets}
          completedProjects={completedProjects}
          totalProjects={totalProjects}
          leaveStatusLabel={leaveStatusLabel}
          leaveStatusData={leaveStatusData}
          leaveTypeLabel={leaveTypeLabel}
          leaveTypeData={leaveTypeData}
        />
      </div>

    </div>
  );
};

export default HRDashboard;
