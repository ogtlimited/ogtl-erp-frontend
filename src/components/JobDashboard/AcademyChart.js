/** @format */

import { isEmpty, merge } from 'lodash';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import BaseOptionChart from '../../utils/BaseOptionChart';
import axiosInstance from '../../services/api';
import moment from 'moment';
import { object } from 'prop-types';

// export default function AcademyChart({ data }) {
export default function AcademyChart() {
  const [data, setData] = useState([]);
  const [applicationDate, setApplicationDate] = useState([]);
  const [numbersOfApplicants, setNumbersOfApplicants] = useState([]);
  const [error, setError] = useState('');

  const fetchAcademyApplicants = () => {
    axiosInstance
      .get('/api/academy')
      .then((res) => {
        const resData = res.data.data;
        // console.log('data coming in', resData);
        setData(resData);
        if (resData.length === 0) {
          // console.log('No data available');
        }
        // console.log('use this for overview', res.data.data);
        setApplicationDate(res.data.data.map((item) => item.application_date));
        // console.log('this is app date', applicationDate);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAcademyApplicants();
  }, []);

  // All Created Unique Data
  const all_Unique_Dates = {};
  const all_Unique_AcknowledgmentsSent_Dates = {};

  if (data.length !== 0) {

    // All Created Dates
    const allCreatedDate = data.map((date) =>
      moment(date.application_date).format('MM/DD/YYYY')
    );
    // All Acknowledgments Sent
    const AcknowledgmentsSentData = data.filter(
      (data) => data.interview_status === 'Acknowledgment Sent'
    );
    // All Acknowledgments Sent Date
    const allApprovedDate = AcknowledgmentsSentData.map((date) =>
      moment(date.application_date).format('MM/DD/YYYY')
    );

    // Total Requests Received
    // eslint-disable-next-line no-unused-vars
    const created_at_count = allCreatedDate.forEach(() => {
      // All Dates
      all_Unique_Dates['dates'] = [
        ...new Set(
          data.map((item) => moment(item.application_date).format('MM/DD/YYYY'))
        ),
      ];
      // Total Request
      all_Unique_Dates['Applicants'] = [
        ...new Set(
          data.map((item) => moment(item.application_date).format('MM/DD/YYYY'))
        ),
      ].map((y) => allCreatedDate.filter((z) => z === y).length);
    });

    // All Acknowledgments Sent
    // eslint-disable-next-line no-unused-vars
    const allApprovedDate_count = allApprovedDate.forEach(() => {
      // All Dates
      all_Unique_AcknowledgmentsSent_Dates['dates'] = [
        ...new Set(
          data.map((item) => moment(item.application_date).format('MM/DD/YYYY'))
        ),
      ];
      // Total Acknowledgments Sent
      all_Unique_AcknowledgmentsSent_Dates['AcknowledgementsSent'] = [
        ...new Set(
          data.map((item) => moment(item.application_date).format('MM/DD/YYYY'))
        ),
      ].map((y) => allApprovedDate.filter((z) => z === y).length);
    });

  } else {
    all_Unique_Dates.Applicants = [0];
    all_Unique_AcknowledgmentsSent_Dates.AcknowledgementsSent = [0];
    all_Unique_Dates.dates = [new Date().toDateString()];
  }

  const CHART_DATA = [
    {
      name: 'Applicants',
      type: 'area',
      data: all_Unique_Dates.Applicants,
    },
    {
      name: 'Acknowledgements Sent',
      type: 'area',
      data: all_Unique_AcknowledgmentsSent_Dates.AcknowledgementsSent,
    },
  ];

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '14%' } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: all_Unique_Dates.dates,

    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} request`;
          }
          return y;
        },
      },
      x: {
        show: true,
        format: 'dd MMM yyyy',
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return new Date(value).toDateString();
        },
      },
    },
  });

  return (
    <>
      <ReactApexChart
        type="line"
        series={CHART_DATA}
        options={chartOptions}
        height={364}
      />
    </>
  );
}
