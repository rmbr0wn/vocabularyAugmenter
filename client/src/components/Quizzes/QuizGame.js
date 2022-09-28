import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./quizgame.css";

const QuizGame = (props) => {
  const [nextQuestionAvailable, setNextQuestionAvailable] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [correctedAnswer, setCorrectedAnswer] = useState("");
  const [gamePrompt, setGamePrompt] = useState("");
  const [answerButtons, setAnswerButtons] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [alreadyAnswered, setAlreadyAnswered] = useState(false);

  function exitQuiz () {
    props.setQuizScore(0);
    props.navigate("/");
    return;
  }

  function replaceWithDisabledButtons (answerArray, correctKey, answer) {
    let buttonArray = [];

    for (let i = 0; i < answerArray.length; i++) {
      let answerType = (props.quizMode === "Word2Def") ? answerArray[i].word : answerArray[i].definition;
      let answerButton = React.createElement(
        "button",
        {
          key: answerArray[i].key,
          answernumber: answerArray[i].key,
          className: "quiz-game-answer-button form-button",
          disabled: (answer === answerArray[i].key) ? false : true
        },
        answerType);

      buttonArray.push(answerButton);
    }

    setAnswerButtons(null);
    setDisabledButtons(buttonArray);
  }

  function createPrompt (prompt, correctKey) {
    let questionPrompt = React.createElement(
      "h3",
      {
        key: "h3" + correctKey,
        className: "game-question-prompt"
      },
      prompt);

      setGamePrompt(questionPrompt);
  }

  function createAnswerButtons (answerArray, correctKey) {
    let buttonArray = [];

    function checkAnswer (e) {
      let answer = parseInt(e.target.attributes.answernumber.value);

      if (answer === correctKey) {
          e.target.style.color = "#73D216";
          props.setQuizScore(props.quizScore + 1);
      } else if (answer !== correctKey) {
          e.target.style.color = "#EF2929";
          setCorrectedAnswer((props.quizMode === "Word2Def") ? answerArray[correctKey].word : answerArray[correctKey].definition);
      }

        replaceWithDisabledButtons(answerArray, correctKey, answer);
        setAlreadyAnswered(true);
        setNextQuestionAvailable(true);
    }

    for (let i = 0; i < answerArray.length; i++) {
      let answerType = (props.quizMode === "Word2Def") ? answerArray[i].word : answerArray[i].definition;
      let answerButton = React.createElement(
        "button",
        {
          key: answerArray[i].key,
          answernumber: answerArray[i].key,
          onClick: checkAnswer,
          className: "quiz-game-answer-button form-button"
        },
        answerType);

      buttonArray.push(answerButton);
    }

    setAnswerButtons(buttonArray);
  }

  useEffect(() => {
    if (questionNumber >= props.quizQuestions.length) {
        setGameFinished(true);
    } else {
        createPrompt(props.quizQuestions[questionNumber].prompt, props.quizQuestions[questionNumber].correctKey);
        createAnswerButtons(props.quizQuestions[questionNumber].answers, props.quizQuestions[questionNumber].correctKey);
    }
  }, [questionNumber]);

  function displayNextQuestion () {
    setAlreadyAnswered(false);
    setCorrectedAnswer("");
    setQuestionNumber(questionNumber + 1);
    setNextQuestionAvailable(false);
  }

  return (
    <div className="quiz-game-wrapper">
      { gameFinished ?
        <div className="quiz-game-finished">
          <h1 className="quiz-game-h1"> All done! You got {props.quizScore}/{props.quizQuestions.length} correct. </h1>
        </div>
        :
        <div className="quiz-game-display">
          <div className="quiz-game-header-container">
            <h1 className="quiz-game-h1"> Question #{questionNumber + 1}/{props.quizQuestions.length} </h1>
            <hr className="quiz-question-number-hr"/>
          </div>
          <div className="quiz-game-panel-wrapper">
            <div className="quiz-answer-prompt-container">
                { correctedAnswer ?
                    <div className="quiz-correct-answer-container">
                      <h4 className="correct-answer-h4">
                        The correct answer is:
                      </h4>
                      <p className="correct-answer-p"> {correctedAnswer} </p>
                    </div>
                  : null}
                  { gamePrompt }
                  <div className="quiz-game-answer-div">
                    { alreadyAnswered ? disabledButtons : answerButtons}
                  </div>
                { nextQuestionAvailable ?
                  <div>
                    <button className="quiz-game-next-button form-button" onClick={displayNextQuestion}> Next </button>
                  </div>
                  : null
                }
              </div>
          </div>
        </div>
      }
      <button className="quiz-game-exit-button form-button" onClick={exitQuiz}> Exit Quiz </button>
    </div>
  );
};

QuizGame.propTypes = {
  navigate: PropTypes.func,
  quizQuestions: PropTypes.array,
  quizMode: PropTypes.string,
  quizScore: PropTypes.number,
  setQuizScore: PropTypes.func
};

export default QuizGame;
