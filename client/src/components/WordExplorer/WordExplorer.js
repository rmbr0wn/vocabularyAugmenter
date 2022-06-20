import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { queryThesaurus, getListNames, addToList } from "../../actions/wordExplorer.actions.js";
import SearchBar from "./SearchBar";
import ThesaurusContainer from "./ThesaurusContainer";

const initialState = {
  word: "",
  partOfSpeech: "",
  definition: "",
  exampleSentence: "",
  relatedWords: "",
  synonyms: "",
  antonyms: ""
};

export default function WordExplorer () {
  const [searchWord, setSearchWord] = useState("");
  const [thesaurusResponse, setThesaurusResponse] = useState(initialState);
  const [listDropdownVisible, setListDropdownVisible] = useState(false);
  const [listNames, setListNames] = useState([]);
  const [listDropdownButtonText, setListDropdownButtonText] = useState("+ Add to list");
  const [addWordResponse, setAddWordResponse] = useState("");
  const regularUser = JSON.parse(localStorage.getItem("account"));
  const googleUser = JSON.parse(localStorage.getItem("profile"));
  const userEmail = (googleUser) ? googleUser?.result.email : regularUser?.result.email;
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (!regularUser && !googleUser) {
      navigate("/");
      return;
    }
  }, []);

  async function handleSubmit (e) {
    e.preventDefault();

    let thesaurusQuery = await dispatch(queryThesaurus(searchWord));

    setThesaurusResponse(thesaurusQuery);
  }

  function handleChange (e) {
    e.persist();

    setSearchWord(e.target.value);
  }

  useEffect(() => {
    if (thesaurusResponse.word !== "") {
      displayThesaurusResults(thesaurusResponse.relatedWords, "related words", "related-words-ul");
      displayThesaurusResults(thesaurusResponse.synonyms, "synonyms", "synonyms-ul");
      displayThesaurusResults(thesaurusResponse.antonyms, "antonyms", "antonyms-ul");
    }
  }, [thesaurusResponse]);

  async function displayThesaurusResults (propertyList, propertyType, htmlId) {
    if (!propertyList) return;

    document.getElementById(htmlId).innerHTML = "";

    if (propertyList.length === 0) {
      let node = document.createElement("li");
      let notFound = document.createTextNode(`No ${propertyType} found.`);

      node.appendChild(notFound);
      document.getElementById(htmlId).appendChild(node);

      return;
    }

    for (let i = 0; i < propertyList.length; i++) {
      let node = document.createElement("li");
      let word = document.createTextNode(propertyList[i]);

      node.appendChild(word);
      document.getElementById(htmlId).appendChild(node);
    }
  }

  const handleUnload = () => {
    if (localStorage.getItem("thesaurus")) {
      localStorage.removeItem("thesaurus");
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  async function toggleListDropdown () {
    setListDropdownVisible(!listDropdownVisible);

    if (!listDropdownVisible) {
      setListDropdownButtonText("Close lists");
      return;
    }

    setListDropdownButtonText("+ Add to list");
    setAddWordResponse("");
  }

  useEffect(() => {
    let unmounted = false;

    async function queryListNames () {
      let fetchUserLists = await dispatch(getListNames(userEmail));
      const fetchData = await fetchUserLists;

      if (!unmounted) setListNames(fetchData);
    }

    queryListNames();

    return () => {
      unmounted = true;
    };
  }, []);

  function userListDisplay (list) {
    let returnArr = [];

    if (!list || list.length === 0) {
      returnArr.push("No lists to be found.");
      return null;
    }

    for (let i = 0; i < list.length; i++) {
      let listName = <a href='/' key={i} onClick={addWordToList} listid={list[i].id}>{list[i].name}</a>;
      returnArr.push(listName);
    }

    return returnArr;
  }

  async function addWordToList (e) {
    e.preventDefault();

    let listId = e.target.attributes.getNamedItem("listid").value;
    let wordResult = JSON.parse(localStorage.getItem("thesaurus")).result;
    let newWord = {
      wordName: wordResult.word,
      definition: wordResult.definition,
      partOfSpeech: wordResult.partOfSpeech,
      synonyms: wordResult.synonyms,
      relatedWords: wordResult.relatedWords
    };
    let addWordRequest = await dispatch(addToList(newWord, listId));

    setAddWordResponse(addWordRequest.message);
  }

  return (
    <div id="word-explorer-container">
      <h1> You are on the Word Explorer component!</h1>
      <div id="search-bar-container">
        <SearchBar onSubmit={handleSubmit} onChange={handleChange} />
      </div>
      {(thesaurusResponse.word !== "" & !thesaurusResponse.error) ?
        <div>
          <ThesaurusContainer
            thesaurusResponse={thesaurusResponse}
            onClick={toggleListDropdown}
            buttonText={listDropdownButtonText}
            dropdownVisibility={listDropdownVisible}
            listDisplay={userListDisplay}
            lists={listNames}
            response={addWordResponse}
          />
        </div>
        :
        <div id="query-error-container">
          <h2> {thesaurusResponse.error} </h2>
        </div>
      }
    </div>
  );
}
