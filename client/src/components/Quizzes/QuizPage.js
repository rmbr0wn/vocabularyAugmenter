import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";

import QuizOptions from "./QuizOptions";
import QuizGame from "./QuizGame";
import { getUserLists } from "../../actions/lists.actions.js";

const initialSettings = { lists: [], questionTotal: 5, mode: "Def2Word" };

export default function QuizPage () {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [rightLists, setRightLists] = useState(initialSettings.lists);
  const [numberOfQuestions, setNumberOfQuestions] = useState(initialSettings.questionTotal);
  const [quizSettings, setQuizSettings] = useState(initialSettings);
  const [quizMode, setQuizMode] = useState(initialSettings.mode);
  const [wordBank, setWordBank] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const user = JSON.parse(localStorage.getItem("account"));
  const storedLists = useSelector((state) => state.listsReducer);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  // useEffect(() => {
  //   console.log(quizQuestions);
  // }, [quizQuestions])
  // useEffect(() => {
  //   console.log(wordBank);
  // }, [wordBank])


  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    if (!storedLists.listsData && user?.result.email) {
      dispatch(getUserLists(user.result.email));
    }
  }, [storedLists]);

  function addToRightList (list) {
    for(let i = 0; i < storedLists.listsData.length; i++){
      if (storedLists.listsData[i]._id === list.target.id){
        setRightLists(previousList => [...previousList, storedLists.listsData[i]]);
        return;
      }
    }
  }

  function removeFromRightList (list) {
    const rightIndex = rightLists.findIndex(target => target._id === list.target.id);

    if (rightIndex > -1) {
      const newArray = rightLists.filter(element => (element._id !== list.target.id));

      setRightLists(newArray);
      return;
    }
  }

  function toggleOptionsDisplay () {
    setOptionsVisible(!optionsVisible);
  }

  function saveChanges () {
    setQuizSettings({ lists: rightLists, questionTotal: numberOfQuestions, mode: quizMode });
    toggleOptionsDisplay();
  }

  // useEffect(() => {
  //   console.log("Mode, settings: ");
  //   console.log(quizMode);
  //   console.log(quizSettings);
  // }, [quizSettings, quizMode]);

    return (
      <div>
        <p> You are on the quizzes page!</p>
        <QuizGame quizSettings={quizSettings} setWordBank={setWordBank} wordBank={wordBank} setQuizQuestions={setQuizQuestions}/>
        <QuizOptions
          leftLists={storedLists.listsData}
          rightLists={rightLists}
          possibleWords={[]}
          toggleOptions={toggleOptionsDisplay}
          optionsVisible={optionsVisible}
          addToRight={addToRightList}
          removeFromRight={removeFromRightList}
          setNumberOfQuestions={setNumberOfQuestions}
          saveChanges={saveChanges}
          setQuizMode={setQuizMode}
        />
      </div>
    );
}
