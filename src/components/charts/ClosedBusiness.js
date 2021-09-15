import React from "react";
import { Bar } from "react-chartjs-2";

const ClosedBusiness = ({ monthValues }) => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "#Closed business",
        data: monthValues,
        backgroundColor: [
          "rgba(26, 188, 156, 0.4)",
          "rgba(46, 204, 113, 0.4)",
          "rgba(52, 152, 219, 0.4)",
          "rgba(155, 89, 182, 0.4)",
          "rgba(52, 73, 94, 0.4)",
          "rgba(241, 196, 15, 0.4)",
          "rgba(230, 126, 34, 0.4)",
          "rgba(231, 76, 60, 0.4)",
          "rgba(44, 62, 80, 0.4)",
          "rgba(192, 205, 209, 0.4)",
          "rgba(192, 57, 43, 0.4)",
          "rgba(243, 18, 105, 0.4)",
        ],
        borderColor: [
          "rgba(26, 188, 156, 1)",
          "rgba(46, 204, 113, 1)",
          "rgba(52, 152, 219, 1)",
          "rgba(155, 89, 182, 1)",
          "rgba(52, 73, 94, 1)",
          "rgba(241, 196, 15, 1)",
          "rgba(230, 126, 34, 1)",
          "rgba(231, 76, 60, 1)",
          "rgba(44, 62, 80, 1)",
          "rgba(192, 205, 209, 1)",
          "rgba(192, 57, 43, 1)",
          "rgba(243, 18, 105, 1)",
        ],
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
    },
    legend: {
      display: true,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  return (
    <div className="the-bar-chart">
      <Bar height={500} data={data} options={options} />
    </div>
  );
};

export default ClosedBusiness;
