import React, { Component } from "react";
import Question from "./components/Question";
import Header from "./components/Header";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      score: 0,
    };
  }

  getDataFromApi = async (url) => {
    const data = await fetch(url);
    const json = await data.json();
    this.setState((prev) => {
      return { ...prev, questions: json.results };
    });
  };
  componentDidMount() {
    this.getDataFromApi(
      "https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple"
    );
  }
  render() {
    return (
      <div className="container">
        <Header />
        {this.state.questions.length > 0 &&
          this.state.questions.map((item, idx) => (
            <Question
              key={idx}
              idx={idx}
              questionTxt={item.question}
              correct={item.correct_answer}
              choices={[...item.incorrect_answers, item.correct_answer]}
            />
          ))}
      </div>
    );
  }
}
