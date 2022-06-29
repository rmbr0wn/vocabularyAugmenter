import React from "react";
import PropTypes from "prop-types";

import AddToList from "./AddToList";

const ThesaurusContainer = (props) => (
  <div id="thesaurus-response-container">
    <AddToList
    word={props.thesaurusResponse.word}
    onClick={props.onClick}
    buttonText={props.buttonText}
    dropdownVisibility={props.dropdownVisibility}
    listDisplay={props.listDisplay}
    lists={props.lists}
    response={props.response}
    />
    <h3> Definition <i>({props.thesaurusResponse.partOfSpeech})</i>: </h3>
    <p> {props.thesaurusResponse.definition} </p>
    <p> &apos{props.thesaurusResponse.exampleSentence ? props.thesaurusResponse.exampleSentence : "No example found." }&apos </p>
    <h3> Related Words: </h3>
        <div>
          <ul id="related-words-ul"> </ul>
        </div>

    <h3> Synonyms: </h3>
      <div>
        <ul id="synonyms-ul"> </ul>
      </div>
    <h3> Antonyms: </h3>
      <div>
        <ul id="antonyms-ul"> </ul>
      </div>
  </div>
);

ThesaurusContainer.propTypes = {
  thesaurusResponse: PropTypes.object,
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
  dropdownVisibility: PropTypes.bool,
  listDisplay: PropTypes.func,
  lists: PropTypes.array,
  response: PropTypes.string
};

export default ThesaurusContainer;
