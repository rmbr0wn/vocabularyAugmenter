import React, { useState } from "react";
import PropTypes from "prop-types";

const QuizGame = ({ quizSettings, wordBank, setWordBank, setQuizQuestions }) => {
  const [possibleAnswers, setPossibleAnswers] = useState([]);

  function populateWordBank () {
    let wordArray = [];

    if (quizSettings.length <= 0) {
      console.log("Need to add lists.");
      return;
    }

    for(let i = 0; i < quizSettings.lists.length; i++){
      for(let j = 0; j < quizSettings.lists[i].words.length; j++){
        let wordDefinitionPair = {
          word: quizSettings.lists[i].words[j].wordName,
          definition: quizSettings.lists[i].words[j].definition
         }
         wordArray.push(wordDefinitionPair);
      }
    }
    setWordBank(wordArray);
  }

  function getRandomIndices(wordBankSize, numberOfChoices) {
    let indexArray = [];

    while (indexArray.length < numberOfChoices) {
      let newIndex = Math.floor(Math.random() * wordBankSize);
      // console.log(newIndex);
      // console.log(indexArray.length);

      if (indexArray.includes(newIndex)) {
        continue;
      }
      // console.log(indexArray.length);
      indexArray.push(newIndex);
    }
    return indexArray;
  }

  async function createPossibleAnswers () {
    populateWordBank();
    // let temp = await wordBank;
    console.log(wordBank);
    //
    // let wordBankSize = wordBank.length;
    // let numberOfChoices = 4;
    // let questionArray = [];
    // let randomIndices = getRandomIndices(wordBankSize, numberOfChoices);
    //
    // for (let j = 0; j < numberOfChoices; j++){
    //   let quizChoice = {
    //     word: wordBank[randomIndices[j]].word,
    //     key: j,
    //     definition: wordBank[randomIndices[j]].definition
    //   };
    //   questionArray.push(quizChoice);
    // }
    //
    // console.log(questionArray);
    // console.log(possibleAnswers);
    // setPossibleAnswers(questionArray);
    // console.log(possibleAnswers);
    // return questionArray;
  }

  async function questionCreation () {
    createPossibleAnswers();
    // let wordChoices = await possibleAnswers;                      // THIS IS AN ISSUE
    // console.log(wordChoices);
    // let index = Math.floor(Math.random() * wordChoices.length);
    // let questionAnswer = wordChoices[index];
    //
    //
    // let quizQuestion = {
    //   answers: wordChoices,
    //   definition: questionAnswer.definition,
    //   correctKey: questionAnswer.key
    // }
    // console.log(wordChoices);
    // console.log(quizQuestion);

  }

  return (
    <div>
      <button onClick={questionCreation}> Start </button>
    </div>

  );
};

QuizGame.propTypes = {
  quizSettings: PropTypes.object,
  setWordBank: PropTypes.func,
  wordBank: PropTypes.array,
  setQuizQuestions: PropTypes.func,
  // optionsVisible: PropTypes.bool,
  // addToRight: PropTypes.func,
  // removeFromRight: PropTypes.func,
  // setNumberOfQuestions: PropTypes.func,
  // saveChanges: PropTypes.func,
  // setQuizMode: PropTypes.func
};

export default QuizGame;
