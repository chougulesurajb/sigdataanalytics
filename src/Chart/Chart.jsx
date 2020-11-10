import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";
Exporting(Highcharts);

function Chart({ chartData, loggedIn }) {
  const [error, setError] = useState("");
  useEffect(() => {
    const x = chartData.map((e) => e.appSiteId);
    const y = chartData.map((e) => +e.impressions_offered);
    if (x && x.length) {
      setError("");
      console.log("x ", x);
      Highcharts.chart("container", {
        chart: {
          type: "column",
        },
        title: {
          text: "Sigmoid Chart",
        },
        subtitle: {
          text: " ",
        },
        xAxis: {
          categories: x,
          title: {
            text: "App Site Id",
          },
        },
        yAxis: {
          min: 0,
          title: {
            text: "impressions offered",
            align: "high",
          },
          labels: {
            overflow: "justify",
          },
        },
        tooltip: {
          valueSuffix: "",
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
          shadow: true,
        },
        credits: {
          enabled: false,
        },
        series: [{ name: "series1", data: y }],
      });
    } else {
      if (loggedIn) {
        setError("Please select date range and submit to view chart");
      }
    }
  }, [chartData, loggedIn]);

  return (
    <div className="chart">
      <h5>{error || ""}</h5>
      <figure className="highcharts-figure">
        <div id="container"></div>
      </figure>
    </div>
  );
}

export default Chart;
