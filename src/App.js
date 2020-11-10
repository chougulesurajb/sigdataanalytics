import React, { useState, useEffect } from "react";
import axios from "axios";

import Login from "./Login/Login";
import Queries from "./Queries/Queries";
import Chart from "./Chart/Chart";
import "./App.scss";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoggedIn = (value) => {
    setLoggedIn(value);
  };

  const getData = (start, end) => {
    setSelectedStartDate(start);
    setSelectedEndDate(end);
    const token = sessionStorage.getItem("appToken");
    const payloadTable = {
      _id: "dashboard1516252439345",
      emailId: "candidate@sigmoid.com",
      orgViewReq: { organization: "DemoTest", view: "Auction" },
      chartObject: {
        metadata: {
          title: "chartobject:1516252439345",
          img_thumbnail: "../img/chart.png",
          chartType: "table",
          dataLimit: 50,
        },
        requestParam: {
          granularity: "hour",
          timeZone: { name: "UTC (+00:00)", location: "UTC" },
          dateRange: {
            startDate: `${start.getTime()}`,
            endDate: `${end.getTime()}`,
          },
          xAxis: ["D044"],
          yAxis: ["M002"],
          approxCountDistinct: [],
          specialCalculation: [],
          filter: [],
          orderBy: { metricOrdByList: [{ id: "M002", desc: true }] },
          percentCalList: [],
        },
      },
    };

    const payloadChart = {
      _id: "dashboard1516252235693",
      emailId: "candidate@sigmoid.com",
      orgViewReq: { organization: "DemoTest", view: "Auction" },
      chartObject: {
        metadata: {
          title: "chartobject:1516252235693",
          img_thumbnail: "../img/chart.png",
          chartType: "table",
          dataLimit: 50,
        },
        requestParam: {
          granularity: "hour",
          timeZone: { name: "UTC (+00:00)", location: "UTC" },
          dateRange: {
            startDate: `${start.getTime()}`,
            endDate: `${end.getTime()}`,
          },
          xAxis: ["D017"],
          yAxis: ["M002"],
          approxCountDistinct: [],
          specialCalculation: [],
          filter: [],
          orderBy: { metricOrdByList: [{ id: "M002", desc: true }] },
          percentCalList: [],
        },
      },
    };

    if (token) {
      axios
        .post("https://sigviewauth.sigmoid.io/api/v1/getData", payloadChart, {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data) {
            console.log("res", res.data);
            setChartData(res.data.result.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError("Please log in ");
    }
  };

  return (
    <div className="App">
      <header className="App-header App-left">
        <Login handleLoggedIn={handleLoggedIn} />
        {loggedIn && <Queries getData={getData} />}
      </header>
      <div className="App-right">
        <Chart chartData={chartData} loggedIn={loggedIn} />
      </div>
      <p>{error || ""}</p>
    </div>
  );
}

export default App;
