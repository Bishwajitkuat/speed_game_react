import React from "react";
import "../index.css";

const Option = (props) => {
  return (
    <div
      className={props.active ? "option active" : "option"}
      onClick={props.click}
    ></div>
  );
};
export default Option;
