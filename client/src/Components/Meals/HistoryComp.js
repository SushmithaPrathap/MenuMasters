import React, { useState } from "react";
import "./styles.scss";
import Calendar from "react-calendar";
import "./calender.scss";
import moment from "moment";

const HistoryComp = ({ list, handleCall }) => {
  const [value, setValue] = useState(new Date());
  const onChange = (e) => {
    setValue(e);
    console.log("e", e);
  };
  console.log(list);

  return (
    <div className="history">
      <div className="calender-div">
        <Calendar
          onChange={onChange}
          value={value}
          tileContent={({ date, view }) => {
            let dat = moment(date).format("L");
            let show = false;
            let total = "na";
            list.map((item) => {
              let itemDate = moment(item.date).add(1, "days").format("L"); //to handle the 00(time) in the timestamp and not let moment to set it to the previous day
              if (itemDate === dat) {
                // console.log(dat, itemDate);
                show = true;
                total = item.total;
              }
            });
            return (
              <p className={total === "na" ? "blah-p" : "total-p"}>{total}</p>
            );
          }}
          onClickDay={(value, event) => {
            let date = moment(value).format("YYYY-MM-DD");
            // console.log(value, date, "value");
            handleCall(date);
          }}
        />
      </div>
    </div>
  );
};

export default HistoryComp;
