import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { queryThesaurus, getListNames, addToList } from "../actions/wordExplorer.actions.js";

const initialState = {
  word: '',
  partOfSpeech: '',
  definition: '',
  exampleSentence: '',
  relatedWords: '',
  synonyms: '',
  antonyms: ''
};

export default function WordExplorer () {
  const[searchWord, setSearchWord] = useState('');
  const[queryResult, setQueryResult] = useState(initialState);
  const[wordSubmitted, setWordSubmitted] = useState(false);
  const[dropdownVisible, setDropdownVisible] = useState(false);
  const[listNames, setListNames] = useState('');
  const[dropdownButtonText, setDropdownButtonText] = useState('+ Add to list');
  const regularUser = JSON.parse(localStorage.getItem('account'));
  const googleUser = JSON.parse(localStorage.getItem('profile'));
  const userEmail = (googleUser) ? googleUser?.result.email : regularUser?.result.email;
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
    if(queryResult.word !== ""){
      dynamicListCreation(queryResult.relatedWords, "related words", "related-words-ul");
      dynamicListCreation(queryResult.synonyms, "synonyms", "synonyms-ul");
      dynamicListCreation(queryResult.antonyms, "antonyms", "antonyms-ul");
    }
  }, [queryResult]);

  async function dynamicListCreation(list, listType, htmlId){
    if(!list) return;

    document.getElementById(htmlId).innerHTML = "";

    if(list.length === 0) {
      let node = document.createElement("li");
      let notFound = document.createTextNode(`No ${listType} found.`);
      node.appendChild(notFound);
      document.getElementById(htmlId).appendChild(node);
      return;
    }

    for(let i = 0; i < list.length; i++){
      let node = document.createElement("li");
      let word = document.createTextNode(list[i]);
      node.appendChild(word);
      document.getElementById(htmlId).appendChild(node);
    }
  }

  const handleUnload = (e) => {
    if(localStorage.getItem('thesaurus')){
      localStorage.removeItem('thesaurus');
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  async function toggleDropdown(){
    setDropdownVisible(!dropdownVisible);

    if(!dropdownVisible){
      setDropdownButtonText('Close lists');
      return;
    }

    setDropdownButtonText('+ Add to list');
  }

  useEffect(() => {
    let unmounted = false;

    async function queryListNames(){
      let fetchUserLists = await dispatch(getListNames(userEmail));
      const fetchData = await fetchUserLists;

      if(!unmounted) setListNames(fetchData);
    }
    queryListNames();

    return () => { unmounted = true };
  }, [])

  function dynamicListDisplay(list) {
    let returnArr = [];

    if(!list || list.length === 0){
      returnArr.push("No lists to be found.");
      return returnArr;
    }

    for(let i = 0; i < list.length; i++){
      let listName = <a href='/' key={i} onClick={addNewWord} listid={list[i].id}>{list[i].name}</a>
      returnArr.push(listName);
    }

    return returnArr;
  }

  async function addNewWord(e){
    e.preventDefault();

    let listId = e.target.attributes.getNamedItem("listid").value;

    let wordResult = JSON.parse(localStorage.getItem('thesaurus')).result;
    let newWord = {
      wordName: wordResult.word,
      definition: wordResult.definition,
      partOfSpeech: wordResult.partOfSpeech,
      synonyms: wordResult.synonyms,
      relatedWords: wordResult.relatedWords
    };

    let addWordRequest = await dispatch(addToList(newWord, listId));
  }

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
            <div id="add-to-list-container">
                <h2> {queryResult.word} </h2>
                <div id="list-dropdown">
                  <button type="button" onClick={toggleDropdown}> {dropdownButtonText} </button>
                  {dropdownVisible ?
                    <div className="dropdown-content">
                      {dynamicListDisplay(listNames)}
                    </div>
                    :
                    null
                  }
                </div>
            </div>
            <h3> Definition <i>({queryResult.partOfSpeech})</i>: </h3>
            <p> {queryResult.definition} </p>
            <p> "{queryResult.exampleSentence ? queryResult.exampleSentence : "No example found." }" </p>
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
          :
          <div id="query-error-container">
            <h2> {queryResult.error} </h2>
          </div>
        }
      </div>
    );
}
