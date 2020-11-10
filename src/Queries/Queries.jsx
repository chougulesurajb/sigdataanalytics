import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

function Queries({ getData }) {
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [error, setError] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("appToken");
    const payload = { organization: "DemoTest", view: "Auction" };
    if (token) {
      axios
        .post("https://sigviewauth.sigmoid.io/api/v1/getDateRange", payload, {
          headers: { "x-auth-token": token },
        })
        .then((res) => {
          if (res.data.result) {
            console.log(
              "res.data.result.startDate",
              res.data.result.startDate,
              new Date(+res.data.result.startDate)
            );
            console.log(
              "res.data.result.endDate",
              res.data.result.endDate,
              new Date(+res.data.result.endDate)
            );
            console.log("res", res.data);
            setMinDate(new Date(+res.data.result.startDate));
            setMaxDate(new Date(+res.data.result.endDate));
            setSelectedStartDate(new Date(+res.data.result.startDate));
            setSelectedEndDate(new Date(+res.data.result.startDate));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError("Please log in ");
    }
  }, []);

  const handleGetData = () => {
    getData(selectedStartDate, selectedEndDate);
  };

  return (
    <div className="queries">
      <DatePicker
        selected={selectedStartDate}
        minDate={minDate}
        maxDate={maxDate}
        onChange={(date) => setSelectedStartDate(date)}
      />
      <DatePicker
        selected={selectedEndDate}
        minDate={minDate}
        maxDate={maxDate}
        onChange={(date) => setSelectedEndDate(date)}
      />
      <button onClick={handleGetData}>Submit</button>
      <p>{error || ""}</p>
    </div>
  );
}

export default Queries;
