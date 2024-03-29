import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createList, getUserLists, changeListName, deleteList, deleteWord } from "../../actions/lists.actions.js";
import ListPanel from "./ListPanel.js";
import ListCreation from "./ListCreation.js";
import "./listspage.css";

const initialResponseState = {
  word: "",
  deleteList: "",
  createList: ""
};

export default function ListsPage () {
  const [createListPrompt, setCreateListPrompt] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [editingPayload, setEditingPayload] = useState({ beingEdited: false, id: "" });
  const [viewingPayload, setViewingPayload] = useState({ beingViewed: false, id: " " });
  const [updatedListName, setUpdatedListName] = useState("");
  const [responseMessages, setResponseMessages] = useState(initialResponseState);
  const regularUser = JSON.parse(localStorage.getItem("account"));
  const googleUser = JSON.parse(localStorage.getItem("profile"));
  const userEmail = (googleUser) ? googleUser?.result.email : regularUser?.result.email;
  const storedLists = useSelector((state) => state.listsReducer);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    if (!regularUser && !googleUser) {
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    if (!storedLists.listsData && userEmail) {
      dispatch(getUserLists(userEmail));
    }
  }, [storedLists]);

  async function handleSubmit (e) {
    e.preventDefault();

    let createListRequest = await dispatch(createList(newListTitle, userEmail));

    switchListPrompt();

    // Check if there is an error or success code & parse the value accordingly
    if (createListRequest.response) {
        setResponseMessages({ ...responseMessages, createList: createListRequest.response.data.message });
    } else {
      setResponseMessages({ ...responseMessages, createList: createListRequest.message });
    }
  }

  function handleChange (e) {
    e.persist();

    setNewListTitle(e.target.value);
  }

  function switchListPrompt () {
    setCreateListPrompt(!createListPrompt);
    setResponseMessages({ ...responseMessages, createList: "" });
    setNewListTitle("");
  }

  function displayUserLists (list) {
    let myArr = [];

    if (!list || list.length === 0) {
      let text = <p id="no-lists-found-p"> No lists to be found. Create one to get started. </p>;
      myArr.push(text);
      return myArr;
    }

    let panelHandlers = {
      toggleEditing: toggleEditing,
      toggleViewing: toggleViewing,
      handleSubmit: listEditSubmitHandler,
      handleChange: listEditChangeHandler,
      deleteList: deleteListHandler,
      deleteWord: deleteWordHandler
     };

    for (let i = 0; i < list.length; i++) {
      let myPanel = <ListPanel
        list={list[i]}
        editingPayload={editingPayload}
        viewingPayload={viewingPayload}
        handlers={panelHandlers}
        key={list[i]._id}
        />;
        myArr.push(myPanel);
    }
    return myArr;
  }

  async function toggleEditing (e) {
    setEditingPayload({
      beingEdited: !editingPayload.beingEdited,
      id: e.target.attributes.listid.value
    });
  }

  async function toggleViewing (e) {
    setViewingPayload({
      beingViewed: !viewingPayload.beingViewed,
      id: e.target.attributes.listid.value
    });
  }

  async function listEditSubmitHandler (e) {
    e.preventDefault();
    toggleEditing(e);
    await dispatch(changeListName(updatedListName, e.target.attributes.listid.value));
  }

  async function listEditChangeHandler (e) {
    e.preventDefault();

    setUpdatedListName(e.target.value);
  }

  async function deleteListHandler (e) {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete the list?") === true) {
      let deleteRequest = await dispatch(deleteList(e.target.attributes.listid.value));
      setResponseMessages({ ...responseMessages, deleteList: deleteRequest.message });
      toggleEditing(e);
    }
  }

  async function deleteWordHandler (e) {
    e.preventDefault();

    let word = e.target.attributes.word.value;
    let listId = e.target.attributes.listid.value;

    await dispatch(deleteWord(word, listId));
  }

    return (
      <div className="lists-page-container">
        <div className="lists-header-container">
          <h1 className="welcome-h1"> Welcome to your lists! </h1>
        </div>
        <ListCreation
          handleSubmit={handleSubmit}
          createListPrompt={createListPrompt}
          handleChange={handleChange}
          switchListPrompt={switchListPrompt}
          responseMessage={responseMessages.createList}
        />
        <div id="lists-display-container-wrapper">
          {!storedLists.listsData || storedLists?.listsData.length === 0 ?
            <div id="no-lists-container">
              <p id="no-lists-found-p"> No lists to be found. Create one to get started. </p>
            </div>
            :
            <div id="existing-lists-display-container">
              {displayUserLists(storedLists.listsData)}
            </div>
          }
        </div>
      </div>
    );
}
