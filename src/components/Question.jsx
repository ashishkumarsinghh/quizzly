import React from "react";
import Choices from "./Choices";
function Question(props) {
  return (
    <div className="question">
      <div className="questionTxt">
        <span className="num"> &nbsp;{props.idx + 1}. </span>
        &nbsp;{props.questionTxt}
      </div>
      <Choices choices={props.choices} hc={props.hc} qId={props.idx} />
    </div>
  );
}

export default Question;
