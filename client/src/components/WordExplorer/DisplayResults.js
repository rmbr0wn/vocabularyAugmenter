import React from "react";
import PropTypes from "prop-types";

const DisplayResults = (props) => {
  let uniqueKeyNum = 0;

  const DisplayWordProperties = (propertyType, propertyList) => {
    let propertyArray = [];

    if (!propertyList || propertyList.length === 0) {
      propertyArray.push(`No ${propertyType} found.`);
      return propertyArray;
    }

    propertyList.forEach((item) => {
      let arrayElement = React.createElement(
        "p",
        {
          key: propertyType + (uniqueKeyNum+=1)
        },
        item);

      propertyArray.push(arrayElement);
    });

    return propertyArray;
  };

  return (
    <div className="word-results-container">
      <h3> Definition <i>({props.thesaurusResponse.partOfSpeech})</i>: </h3>
      <p> {props.thesaurusResponse.definition} </p>
      <p> {props.thesaurusResponse.exampleSentence ? props.thesaurusResponse.exampleSentence : "No example found." } </p>
      <h3> Related Words: </h3>
        <div className="word-property-container">
          {DisplayWordProperties("related-words", props.thesaurusResponse.relatedWords)}
        </div>
      <h3> Synonyms: </h3>
        <div className="word-property-container">
          {DisplayWordProperties("synonyms", props.thesaurusResponse.synonyms)}
        </div>
      <h3> Antonyms: </h3>
        <div className="word-property-container">
          {DisplayWordProperties("antonyms", props.thesaurusResponse.antonyms)}
        </div>
    </div>

  );
};

DisplayResults.propTypes = {
  thesaurusResponse: PropTypes.object
};

export default DisplayResults;
