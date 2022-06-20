import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ListSelection from "./ListSelection";

const QuizOptions = ({ leftLists, rightLists, possibleWords,
  toggleOptions, optionsVisible, addToRight, removeFromRight,
  setNumberOfQuestions, saveChanges, setQuizMode }) => {

  return (
    <div className="quiz-options-container">
      { optionsVisible ?
        <div>
          <label htmlFor="number-questions"> Choose the number of questions: </label>
          <select name="number-questions" id="number-questions" onChange={(e) => setNumberOfQuestions(e.target.value)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <label htmlFor="mode-selection"> Choose the quiz mode: </label>
          <select name="mode-selection" id="mode-selection" onChange={(e) => setQuizMode(e.target.value)}>
            <option value="Def2Word">Match definition to word</option>
            <option value="Word2Def">Match word to definition</option>
          </select>
          <button onClick={saveChanges}> Save Changes </button>
          <button onClick={toggleOptions}> Close </button>
          <ListSelection
            leftLists={leftLists}
            rightLists={rightLists}
            addToRight={addToRight}
            removeFromRight={removeFromRight}
          />
        </div>
        :
        <div>
          <button onClick={toggleOptions}> Options </button>
        </div>
      }
    </div>

  );
};

QuizOptions.propTypes = {
  leftLists: PropTypes.array,
  rightLists: PropTypes.array,
  possibleWords: PropTypes.array,
  toggleOptions: PropTypes.func,
  optionsVisible: PropTypes.bool,
  addToRight: PropTypes.func,
  removeFromRight: PropTypes.func,
  setNumberOfQuestions: PropTypes.func,
  saveChanges: PropTypes.func,
  setQuizMode: PropTypes.func
};

export default QuizOptions;
