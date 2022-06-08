import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ListPanel from './listPanel.component.js'
import { createList, getUserLists, changeListName, deleteList, deleteWord } from '../actions/lists.actions.js'

const initialListState = {
  email: '',
  name: '',
  private: '',
  tags: '',
  words: ''
}

const initialResponseState = {
  word: '',
  deleteList: '',
  createList: ''
}

/* Need some major refactoring in this file, it's quite messy. Everything from
 * names, to the way the logic is implemented for updates, etc.
*/

export default function ListsPage () {
  const[listTitlePrompt, setListTitlePrompt] = useState(false);
  const[newListTitle, setNewListTitle] = useState('');
  const[userLists, setUserLists] = useState(initialListState);
  const[editPayload, setEditPayload] = useState({ beingEdited: false, id: '' });
  const[updatedListName, setUpdatedListName] = useState('');
  const[responseMessages, setResponseMessages] = useState(initialResponseState);
  const regularUser = JSON.parse(localStorage.getItem('account'));
  const googleUser = JSON.parse(localStorage.getItem('profile'));
  const userEmail = (googleUser) ? googleUser?.result.email : regularUser?.result.email;
  const storedLists = useSelector((state) => state.listsReducer);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(storedLists.listsData);
  // }, [storedLists]);

  useEffect(() => {
    if(!regularUser && !googleUser){
      navigate('/');
      return;
    }
  }, []);

  // The unmounted stuff is to fix a memory leak warning. Will see if it works.
  useEffect(() => {
    let unmounted = false;

    async function queryUserLists(){
      let fetchUserLists = await dispatch(getUserLists(userEmail));
      const getData = await fetchUserLists;

      if(!unmounted) setUserLists(getData);
    }
    queryUserLists();

    return () => { unmounted = true };
  }, [])

  async function handleSubmit(e){
    e.preventDefault();

    let createListRequest = await dispatch(createList(newListTitle, userEmail));

    switchListPrompt();
    setResponseMessages({ ...responseMessages, createList: createListRequest.message });
  }

  function handleChange(e){
    e.persist();

    setNewListTitle(e.target.value);
  }

  function switchListPrompt(){
    setListTitlePrompt(!listTitlePrompt);
    setResponseMessages({ ...responseMessages, createList: ''});
  }

  function dynamicListDisplay(list) {
    let myArr = [];

    if(!list || list.length === 0){
      myArr.push("No lists to be found.");
      return myArr;
    }

    let panelHandlers = {
      toggleEditing: toggleEditing,
      handleSubmit: listEditSubmitHandler,
      handleChange: listEditChangeHandler,
      deleteList: deleteListHandler,
      deleteWord: deleteWordHandler
     }

    for(let i = 0; i < list.length; i++){
      let myPanel = <ListPanel
        list={list[i]}
        editingPayload={editPayload}
        handlers={panelHandlers}
        key={list[i]._id}
        />
        myArr.push(myPanel);
    }
    return myArr;
  }

  async function toggleEditing(e) {
    setEditPayload({
      beingEdited: !editPayload.beingEdited,
      id: e.target.attributes.listid.value,
    })
  }

  async function listEditSubmitHandler(e){
    e.preventDefault();

    toggleEditing(e);

    let updateListNameRequest = await dispatch(changeListName(updatedListName, e.target.attributes.listid.value));

  }

  async function listEditChangeHandler(e){
    e.preventDefault();

    setUpdatedListName(e.target.value);
  }

  async function deleteListHandler(e){
    e.preventDefault();

    if(window.confirm("Are you sure you want to delete the list?") == true) {
      let deleteRequest = await dispatch(deleteList(e.target.attributes.listid.value));
      setResponseMessages({ ...responseMessages, deleteList: deleteRequest.message });
      toggleEditing(e);
    }
  }

  async function deleteWordHandler(e){
    e.preventDefault();

    let word = e.target.attributes.word.value;
    let listId = e.target.attributes.listid.value;
    let deleteWordRequest = await dispatch(deleteWord(word, listId));
  }

    return (
      <div>
        <h1> Welcome to the Lists page! </h1>
        <form onSubmit={handleSubmit}>
        {listTitlePrompt ?
          <div id="create-list-controls">
            <input type="text" onChange={handleChange} placeholder="Enter list list..."/>
            <button type="button" onClick={switchListPrompt}> X </button>
            <input type="submit" value="Add list"/>
            {
              responseMessages.createList && <h5 className="return-messages">{responseMessages.createList}</h5>
            }
          </div>
          :
          <div id="create-new-list">
            <button type="button" onClick={switchListPrompt}> + Create New List </button>
            {
              responseMessages.createList && <h5 className="return-messages">{responseMessages.createList}</h5>
            }
          </div>
        }
        </form>
        <div id="lists-display-container">
          {dynamicListDisplay(storedLists.listsData)}
        </div>
      </div>
    );
}
