import React from "react";
import PropTypes from "prop-types";

import AddToList from "./AddToList";

const ThesaurusContainer = (props) => (
  <div id="thesaurus-response-container">
    <AddToList
      word={props.thesaurusResponse.word}
      toggleListDropdown={props.toggleListDropdown}
      listDropdownButtonText={props.listDropdownButtonText}
      listDropdownVisible={props.listDropdownVisible}
      listDisplay={props.listDisplay}
      listNames={props.listNames}
      addWordResponse={props.addWordResponse}
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
  toggleListDropdown: PropTypes.func,
  listDropdownButtonText: PropTypes.string,
  listDropdownVisible: PropTypes.bool,
  listDisplay: PropTypes.func,
  listNames: PropTypes.array,
  addWordResponse: PropTypes.string
};

export default ThesaurusContainer;
