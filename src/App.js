import React, { Component } from "react";
import Question from "./components/Question";
import Header from "./components/Header";
import Score from "./components/Score";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      score: 0,
      current: 0,
      answers: [],
    };
  }

  // showResult() {
  //   console.log("called");
  //   let correct = 0;
  //   for (let i = 0; i < 10; i++) {
  //     if (this.state.questions[i].correct_answer === this.state.answers[i]) {
  //       console.log(
  //         this.state.questions[i].correct_answer,
  //         this.state.answers[i]
  //       );
  //       correct += 1;
  //     }
  //   }
  //   this.setState((prev) => {
  //     return { ...prev, score: correct };
  //   });
  // }
  handleChoiceClick(idx, answer) {
    const mAnswer = [...this.state.answers];
    mAnswer[idx] = answer;
    let correct = this.state.correct;
    if (mAnswer[idx] === this.state.questions[idx].correct_answer) {
      correct = this.state.score + 1;
    } else {
      correct = this.state.score;
    }
    if (this.state.current < 10) {
      this.setState((prev) => {
        return {
          ...prev,
          answers: [...mAnswer],
          current: prev.current + 1,
          score: correct,
        };
      });
    }
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
        {this.state.questions.length > 0 && this.state.current < 10 && (
          <Question
            key={this.state.current}
            idx={this.state.current}
            questionTxt={this.state.questions[this.state.current].question}
            correct={this.state.questions[this.state.current].correct_answer}
            choices={[
              ...this.state.questions[this.state.current].incorrect_answers,
              this.state.questions[this.state.current].correct_answer,
            ]}
            hc={this.handleChoiceClick.bind(this)}
          />
        )}
        {this.state.current === 10 && <Score score={this.state.score} />}
      </div>
    );
  }
}
