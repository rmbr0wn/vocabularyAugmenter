import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { queryThesaurus, getListNames, addToList } from "../../actions/wordExplorer.actions.js";
import SearchBar from "./SearchBar";
import ThesaurusContainer from "./ThesaurusContainer";
import "./wordexplorer.css";

const initialResponseState = {
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
  const [thesaurusResponse, setThesaurusResponse] = useState(initialResponseState);
  const [listDropdownVisible, setListDropdownVisible] = useState(false);
  const [listNames, setListNames] = useState([]);
  const [listDropdownButtonText, setListDropdownButtonText] = useState("+ Add to list");
  const [addWordResponse, setAddWordResponse] = useState("");
  const regularUser = JSON.parse(localStorage.getItem("account"));
  const googleUser = JSON.parse(localStorage.getItem("profile"));
  const userEmail = (googleUser) ? googleUser?.result.email : regularUser?.result.email;
  const dispatch = useDispatch();
  const storedLists = useSelector((state) => state.listsReducer);
  let navigate = useNavigate();

  async function handleSubmit (e) {
    e.preventDefault();

    let thesaurusQuery = await dispatch(queryThesaurus(searchWord));

    setThesaurusResponse(thesaurusQuery);
    setAddWordResponse("");
  }

  function handleChange (e) {
    e.persist();

    setSearchWord(e.target.value);
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

    if (!regularUser && !googleUser) {
      navigate("/");
      return;
    }

    async function queryListNames () {
      if (!storedLists.listsData && userEmail) {
        let fetchUserLists = await dispatch(getListNames(userEmail));
        const fetchData = await fetchUserLists;
        let formattedNames = parseListNames(fetchData.result);

        if (!unmounted) setListNames(formattedNames);
      } else {
        setListNames(parseListNames(storedLists.listsData));
      }
    }

    queryListNames();

    return () => {
      unmounted = true;
    };
  }, []);

  function parseListNames (listsObject) {
    let returnArray = [];
    for(let i = 0; i < listsObject.length; i++){
      let userList = { id: listsObject[i]._id.toString(), name: listsObject[i].name};
      returnArray.push(userList);
    }

    return returnArray;
  }

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
      <h1 className="word-explorer-header"> Word Explorer </h1>
      <div id="search-bar-container">
        <SearchBar handleSubmit={handleSubmit} handleChange={handleChange} />
      </div>
      {(thesaurusResponse.word !== "" & !thesaurusResponse.error) ?
        <div>
          <ThesaurusContainer
            thesaurusResponse={thesaurusResponse}
            toggleListDropdown={toggleListDropdown}
            listDropdownButtonText={listDropdownButtonText}
            listDropdownVisible={listDropdownVisible}
            listDisplay={userListDisplay}
            listNames={listNames}
            addWordResponse={addWordResponse}
          />
        </div>
        :
        <div id="query-error-container">
          <h2 className="query-error-h2"> {thesaurusResponse.error} </h2>
        </div>
      }
    </div>
  );
}
