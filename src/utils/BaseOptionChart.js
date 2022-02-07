export default function BaseOptionChart() {

  
    const LABEL_TOTAL = {
      show: true,
      label: 'Total',
      color: '#888',
      fontSize: "13px"
    };
  
    const LABEL_VALUE = {
      offsetY: 8,
      color: '#111',
      fontSize: "30px",
    };
  
    return {
      // Colors
      colors: [
          '#00AB55',
          '#FFE700',
          '#2D99FF',
          '#826AF9',
          '#00AB55',
          '#DF3E30',
          '#FFFDEB',
      ],
  
      // Chart
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
        // animations: { enabled: false },
        foreColor: '#919EAB',
        fontFamily: 'Open Sans", sans-serif'
      },
  
      // States
      states: {
        hover: {
          filter: {
            type: 'lighten',
            value: 0.04
          }
        },
        active: {
          filter: {
            type: 'darken',
            value: 0.88
          }
        }
      },
  
      // Fill
      fill: {
        opacity: 1,
        gradient: {
          type: 'vertical',
          shadeIntensity: 0,
          opacityFrom: 0.4,
          opacityTo: 0,
          stops: [0, 100]
        }
      },
  
      // Datalabels
      dataLabels: { enabled: false },
  
      // Stroke
      stroke: {
        width: 3,
        curve: 'smooth',
        lineCap: 'round'
      },
  
      // Grid
      grid: {
        strokeDashArray: 3,
        borderColor: '#D4D9DE'
      },
  
      // Xaxis
      xaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
  
      // Markers
      markers: {
        size: 0,
        strokeColors: '#fff'
      },
  
      // Tooltip
      tooltip: {
        x: {
          show: false
        }
      },
  
      // Legend
      legend: {
        show: true,
        fontSize: 13,
        position: 'top',
        horizontalAlign: 'right',
        markers: {
          radius: 12
        },
        fontWeight: 500,
        itemMargin: { horizontal: 12, vertical: 12 },
        labels: {
          colors: '#5E656D'
        }
      },
  
      // plotOptions
      plotOptions: {
        // Bar
        bar: {
          columnWidth: '28%',
          borderRadius: 4
        },
        // Pie + Donut
        pie: {
          donut: {
            labels: {
              show: true,
              value: LABEL_VALUE,
              total: LABEL_TOTAL
            }
          }
        },
        // Radialbar
        radialBar: {
          track: {
            strokeWidth: '100%',
            background: '#EDEFF1'
          },
          dataLabels: {
            value: LABEL_VALUE,
            total: LABEL_TOTAL
          }
        },
        // Radar
        radar: {
          polygons: {
            fill: { colors: ['transparent'] },
            strokeColors: '#D4D9DE',
            connectorColors: '#D4D9DE'
          }
        },
        // polarArea
        polarArea: {
          rings: {
            strokeColor: '#D4D9DE'
          },
          spokes: {
            connectorColors: '#D4D9DE'
          }
        }
      },
  
      // Responsive
      responsive: [
        {
          // sm
          breakpoint: 560,
          options: {
            plotOptions: { bar: { columnWidth: '40%' } }
          }
        },
        {
          // md
          breakpoint: 768,
          options: {
            plotOptions: { bar: { columnWidth: '32%' } }
          }
        }
      ]
    };
  }
