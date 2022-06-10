import React from "react";
import PropTypes from "prop-types";

import AddToList from "./AddToList";

const ThesaurusContainer = ({ thesaurusResponse, onClick, buttonText, dropdownVisibility, listDisplay, lists, response }) => (
  <div id="thesaurus-response-container">
    <AddToList
    word={thesaurusResponse.word}
    onClick={onClick}
    buttonText={buttonText}
    dropdownVisibility={dropdownVisibility}
    listDisplay={listDisplay}
    lists={lists}
    response={response}
    />
    <h3> Definition <i>({thesaurusResponse.partOfSpeech})</i>: </h3>
    <p> {thesaurusResponse.definition} </p>
    <p> &apos{thesaurusResponse.exampleSentence ? thesaurusResponse.exampleSentence : "No example found." }&apos </p>
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
