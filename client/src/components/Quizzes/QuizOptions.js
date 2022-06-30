import React from "react";
import PropTypes from "prop-types";

import ListSelection from "./ListSelection";

const QuizOptions = (props) => {
  return (
    <div className="quiz-options-container">
      { props.optionsVisible ?
        <div>
          <label htmlFor="number-questions"> Choose the number of questions: </label>
          <select name="number-questions" id="number-questions" onChange={(e) => props.setNumberOfQuestions(e.target.value)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <label htmlFor="mode-selection"> Choose the quiz mode: </label>
          <select name="mode-selection" id="mode-selection" onChange={(e) => props.setQuizMode(e.target.value)}>
            <option value="Word2Def">Match word to definition</option>
            <option value="Def2Word">Match definition to word</option>
          </select>
          <button onClick={props.saveChanges}> Save Changes </button>
          <button onClick={props.toggleOptions}> Close </button>
          <ListSelection
            leftLists={props.leftLists}
            rightLists={props.rightLists}
            addToRightList={props.addToRightList}
            removeFromRightList={props.removeFromRightList}
          />
        </div>
        :
        <div>
          <button onClick={props.toggleOptions}> Options </button>
        </div>
      }
    </div>

  );
};

QuizOptions.propTypes = {
  leftLists: PropTypes.array,
  rightLists: PropTypes.array,
  toggleOptions: PropTypes.func,
  optionsVisible: PropTypes.bool,
  addToRightList: PropTypes.func,
  removeFromRightList: PropTypes.func,
  setNumberOfQuestions: PropTypes.func,
  setQuizMode: PropTypes.func,
  saveChanges: PropTypes.func
};

export default QuizOptions;
