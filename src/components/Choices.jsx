import React from "react";
import Choice from "./Choice";
export default function Choices(props) {
  return (
    <div className="choices">
      {props.choices.map((item, idx) => {
        return <Choice txt={item} key={idx} />;
      })}
    </div>
  );
}
