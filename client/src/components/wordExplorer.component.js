import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { queryThesaurus } from "../actions/wordExplorer.actions.js";

const initialState = {
  word: '',
  partOfSpeech: '',
  definition: '',
  exampleSentence: '',
  relatedWords: '',
  synonyms: '',
  antonyms: ''
};


/* Need to reset localStorage for thesaurus on navigation/page refresh, as well
 * as setting the handleSubmit var thing to false
 *
 */
export default function WordExplorer () {
  const regularUser = JSON.parse(localStorage.getItem('account'));
  const googleUser = JSON.parse(localStorage.getItem('profile'));
  const[searchWord, setSearchWord] = useState('');
  const[queryResult, setQueryResult] = useState(initialState);
  const[wordSubmitted, setWordSubmitted] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if(!regularUser && !googleUser){
      navigate("/");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e){
    e.preventDefault();

    let thesaurusQuery = await dispatch(queryThesaurus(searchWord));
    setQueryResult(thesaurusQuery);
    setWordSubmitted(true);
  }

  function handleChange(e){
    e.persist();

    setSearchWord(e.target.value);
  }

  useEffect(() => {
    if(queryResult){
      console.log(queryResult);
    }
  }, [queryResult]);

    return (
      <div id="word-explorer-container">
        <h1> You are on the Word Explorer component!</h1>
        <form onSubmit={handleSubmit}>
          <label> Enter a word: </label>
          <input type="text"
          id="word-query-input"
          name="queryBox"
          onChange={handleChange}
          />
          <input type="submit" value="Submit"/>
        </form>
        {(queryResult.word !== "" & !queryResult.error) ?
          <div id="proper-query-container">
            <h2> {queryResult.word} </h2>
            <h3> Definition <i>({queryResult.partOfSpeech})</i>: </h3>
            <p> {queryResult.definition} </p>
            <p> "{queryResult.exampleSentence}" </p>
            <h3> Related Words: </h3>
              <ul>
              </ul>
            <h3> Synonyms: </h3>
              <ul>
              </ul>
            <h3> Antonyms: </h3>
              <ul>
              </ul>
          </div>
          :
          <div id="query-error-container">
            <h2> {queryResult.error} </h2>
          </div>
        }
      </div>
    );
}
