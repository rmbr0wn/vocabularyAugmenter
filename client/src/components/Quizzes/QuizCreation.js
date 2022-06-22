import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

/* An infinite loop is thrown if the lists provided have a word total of less
 * than 4. This shouldn't happen since the input to this file will have been
 * sanitized (i.e.: ensuring that the total word count is >= 4 && no empty lists).
 */
const QuizCreation = (props) => {
  const [startDisabled, setStartDisabled] = useState(true);

  useEffect(() => {
    if (props.quizSettings.lists === undefined || props.quizSettings.lists.length === 0) {
      props.setErrorMessages("You need to add lists to start the Quiz.");
      setStartDisabled(true);
      return;
    }
  }, [props.quizSettings]);

  useEffect(() => {
    let wordTotal = getWordTotal(props.quizSettings.lists);

    if (wordTotal < 4) {
      setStartDisabled(true);
      props.setErrorMessages("You need to have at least 4 words in your lists in total.");
      return;
    } else {
      setStartDisabled(false);
      props.setErrorMessages("");
    }
  }, [props.quizSettings.lists]);

  function getWordTotal (lists) {
    let wordTotal = 0;
    for (let i = 0; i < lists.length; i++) {
      for (let j = 0; j < lists[i].words.length; j++) {
        wordTotal++;
      }
    }
    return wordTotal;
  }

  function populateAnswerBank () {
    let answerBank = [];

    if (props.quizSettings.length <= 0) {
      console.log("Need to add lists.");
      return;
    }

    for (let i = 0; i < props.quizSettings.lists.length; i++) {
      for (let j = 0; j < props.quizSettings.lists[i].words.length; j++) {
        let wordDefinitionPair = {
          word: props.quizSettings.lists[i].words[j].wordName,
          definition: props.quizSettings.lists[i].words[j].definition
         };
         answerBank.push(wordDefinitionPair);
      }
    }

    return answerBank;
  }

  function getRandomIndices (wordBankSize, numberOfChoices) {
    let indexSet = new Set();

    while (indexSet.size < numberOfChoices) {
      let newIndex = Math.floor(Math.random() * wordBankSize);

      if (indexSet.has(newIndex)) {
        continue;
      } else {
        indexSet.add(newIndex);
      }
    }

    return indexSet;
  }

  function createPossibleAnswers () {
    let answerBank = populateAnswerBank();
    let wordBankSize = answerBank.length;
    let numberOfChoices = 4;
    let questionArray = [];
    let randomIndices = Array.from(getRandomIndices(wordBankSize, numberOfChoices));

    for (let j = 0; j < numberOfChoices; j++) {
      let quizChoice = {
        word: answerBank[randomIndices[j]].word,
        key: j,
        definition: answerBank[randomIndices[j]].definition
      };
      questionArray.push(quizChoice);
    }

    return questionArray;
  }

  // If adding additional modes in the future, should change the prompt to be more robust.
  function createQuestion () {
    let possibleAnswers = createPossibleAnswers();
    let randomSelection = Math.floor(Math.random() * possibleAnswers.length);
    let correctAnswer = possibleAnswers[randomSelection];

    let quizQuestion = {
      answers: possibleAnswers,
      prompt: props.quizSettings.mode === "Word2Def" ? correctAnswer.definition : correctAnswer.word,
      correctKey: correctAnswer.key
    };

    return quizQuestion;
  }

  function generateQuiz () {
    let questionsRemaining = props.quizSettings.questionTotal;
    let questionArray = [];

    while (questionsRemaining > 0) {
      let question = createQuestion();
      questionArray.push(question);
      questionsRemaining--;
    }

    props.setQuizQuestions(questionArray);
    props.setQuizStarted(true);
  }

  return (
    <div>
      <button onClick={generateQuiz} disabled={startDisabled}> Start </button>
    </div>
  );
};

QuizCreation.propTypes = {
  quizSettings: PropTypes.object,
  setQuizQuestions: PropTypes.func,
  setQuizStarted: PropTypes.func,
  setErrorMessages: PropTypes.func
};

export default QuizCreation;
