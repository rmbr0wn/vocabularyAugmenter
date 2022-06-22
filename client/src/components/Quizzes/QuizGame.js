import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const QuizGame = (props) => {
  const [currentQuestionDisplay, setCurrentQuestionDisplay] = useState(null);
  const [nextQuestionAvailable, setNextQuestionAvailable] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  function exitQuiz () {
    props.setQuizScore(0);
    props.navigate("/");
    return;
  }

  function createQuestionPanel (answerArray, prompt, correctKey) {
    setNextQuestionAvailable(false);

    let panelArray = [];
    let questionPrompt = React.createElement(
      "p",
      {
        key: "p" + correctKey
      },
      prompt);

    panelArray.push(questionPrompt);

    function checkAnswer (e) {
      let answer = parseInt(e.target.attributes.answernumber.value);

      if (answer === correctKey) {
        props.setQuizScore(props.quizScore + 1);
      }

      setNextQuestionAvailable(true);
    }

    for (let i = 0; i < answerArray.length; i++) {
      let answerType = (props.quizMode === "Word2Def") ? answerArray[i].word : answerArray[i].definition;
      let answerOption = React.createElement(
        "button",
        {
          key: answerArray[i].key,
          answernumber: answerArray[i].key,
          onClick: checkAnswer
        },
        answerType);

      panelArray.push(answerOption);
    }

    setCurrentQuestionDisplay(panelArray);
  }

  useEffect(() => {
    if (questionNumber >= props.quizQuestions.length) {
      setGameFinished(true);
    } else {
      createQuestionPanel(
        props.quizQuestions[questionNumber].answers,
        props.quizQuestions[questionNumber].prompt,
        props.quizQuestions[questionNumber].correctKey);
    }
  }, [questionNumber]);

  function displayNextQuestion () {
    setQuestionNumber(questionNumber + 1);
    setNextQuestionAvailable(false);
  }

  return (
    <div className="quiz-panel-container">
      { gameFinished ?
        <div className="quiz-game-finished">
          <p> All done! You got {props.quizScore}/{props.quizQuestions.length} correct. </p>
        </div>
        :
        <div className="quiz-game-display">
          { currentQuestionDisplay }
          { nextQuestionAvailable ?
            <div>
            <button onClick={displayNextQuestion}> Next </button>
            </div>
            : null
          }
        </div>
      }
      <button onClick={exitQuiz}> Exit Quiz </button>
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
