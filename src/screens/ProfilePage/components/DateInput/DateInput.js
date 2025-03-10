import React, { useEffect, useState } from "react";
import '../Components.css';

const DateInput = ({ value, handleChange, width, height, style = {} }) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (value) {
      const [y, m, d] = value.split("/");
      setDay(d || "");
      setMonth(m || "");
      setYear(y || "");
    }
  }, [value]);

  const handleDayChange = (e) => {
    const newDay = e.target.value.slice(0, 2);
    setDay(newDay);
    handleChange({ day: newDay, month, year });
  };

  const handleMonthChange = (e) => {
    const newMonth = e.target.value.slice(0, 2);
    setMonth(newMonth);
    handleChange({ day, month: newMonth, year });
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value.slice(0, 4);
    setYear(newYear);
    handleChange({ day, month, year: newYear });
  };

  return (
    <div className="Input__Location defaultText" style={{ width: width || '100%', height: height || '100%', ...style }}>
      <input
        type="number"
        placeholder="DD"
        value={day}
        onChange={handleDayChange}
        style={{ width: '2em' }}
      />
      /
      <input
        type="number"
        placeholder="MM"
        value={month}
        onChange={handleMonthChange}
        style={{ width: '2em' }}
      />
      /
      <input
        type="number"
        placeholder="YYYY"
        value={year}
        onChange={handleYearChange}
        style={{ width: '4em' }}
      />
    </div>
  );
};

export default DateInput;
