const chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)"
};

let seed = Date.now();

const rand = (min: number, max: number) => {
  min = min === undefined ? 0 : min;
  max = max === undefined ? 1 : max;
  seed = (seed * 9301 + 49297) % 233280;
  return min + (seed / 233280) * (max - min);
};

const randomScalingFactor = () => Math.round(rand(-100, 100));

export const config = {
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Unfilled",
        fill: false,
        backgroundColor: chartColors.blue,
        borderColor: chartColors.blue,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ]
      },
      {
        label: "Dashed",
        fill: false,
        backgroundColor: chartColors.green,
        borderColor: chartColors.green,
        borderDash: [5, 5],
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ]
      },
      {
        label: "Filled",
        backgroundColor: chartColors.red,
        borderColor: chartColors.red,
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor()
        ],
        fill: true
      }
    ]
  },
  options: {
    legend: {
      labels: {
        // This more specific font property overrides the global property
        fontColor: "white"
      }
    },
    responsive: true,
    title: {
      display: true,
      text: "Chart.js Line Chart",
      fontColor: "white"
    },
    tooltips: {
      mode: "index",
      intersect: false
    },
    hover: {
      mode: "nearest",
      intersect: true
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Month",
            fontColor: "white"
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Value",
            fontColor: "white"
          }
        }
      ]
    }
  }
};
