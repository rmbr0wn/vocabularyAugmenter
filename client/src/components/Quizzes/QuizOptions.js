import React from "react";
import PropTypes from "prop-types";

import ListSelection from "./ListSelection";
import "./quizoptions.css";

const QuizOptions = (props) => {
  return (
    <div className="quiz-options-overall-container">
      { props.optionsVisible ?
        <div className="quiz-options-container">
          <div className="inner-options-wrapper">
            <div className="inner-options-buttons-group">
              <button onClick={props.saveChanges} className="form-button inner-options-button"> Save Changes </button>
              <button onClick={props.toggleOptions} className="form-button inner-options-button"> Close </button>
            </div>
            <div className="options-selection-container-wrapper">
              <div className="quiz-option-selection-container">
                <label htmlFor="number-questions" className="quiz-option-label"> Choose the number of questions: </label>
                <select name="number-questions" id="number-questions" onChange={(e) => props.setNumberOfQuestions(e.target.value)} className="quiz-option-dropdown">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </div>
              <div className="quiz-option-selection-container">
                <label htmlFor="mode-selection" className="quiz-option-label"> Choose the quiz mode: </label>
                <select name="mode-selection" id="mode-selection" onChange={(e) => props.setQuizMode(e.target.value)} className="quiz-option-dropdown">
                  <option value="Word2Def">Match word to definition</option>
                  <option value="Def2Word">Match definition to word</option>
                </select>
              </div>
            </div>
          </div>
          <ListSelection
          leftLists={props.leftLists}
          rightLists={props.rightLists}
          addToRightList={props.addToRightList}
          removeFromRightList={props.removeFromRightList}
          />
        </div>
        :
        <div className="options-home-button-container">
          <button onClick={props.toggleOptions} className="form-button"> Options </button>
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
