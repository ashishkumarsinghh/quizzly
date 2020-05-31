import React from "react";

export default function Choice(props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.hc(props.qId, e.target.textContent);
  };
  return (
    <div className="choice" onClick={handleClick}>
      {props.txt}
    </div>
  );
}
