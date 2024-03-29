import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import QuizOptions from "./QuizOptions";
import QuizCreation from "./QuizCreation";
import QuizGame from "./QuizGame";
import { getUserLists } from "../../actions/lists.actions.js";
import "./quizhome.css";

const initialSettings = { lists: [], questionTotal: 5, mode: "Word2Def" };

export default function QuizHome () {
  const storedLists = useSelector((state) => state.listsReducer);
  const [leftLists, setLeftLists] = useState(null);
  const [rightLists, setRightLists] = useState(initialSettings.lists);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(initialSettings.questionTotal);
  const [quizSettings, setQuizSettings] = useState(initialSettings);
  const [quizMode, setQuizMode] = useState(initialSettings.mode);
  const [quizScore, setQuizScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const user = JSON.parse(localStorage.getItem("account"));
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (storedLists.listsData) {
      let nonEmptyLists = removeEmptyLists(storedLists.listsData);
      setLeftLists(nonEmptyLists);
    }
  }, [storedLists.listsData]);

  useEffect(() => {
    setErrorMessages("");

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

  function removeEmptyLists (listsArray) {
    let nonEmpty = [];

    for (let i = 0; i < listsArray.length; i++) {
      if (listsArray[i].words.length !== 0) {
        nonEmpty.push(listsArray[i]);
      }
    }
    return nonEmpty;
  }

  // This function also removes the added list from the leftLists.
  function addToRightList (list) {
    for (let i = 0; i < storedLists.listsData.length; i++) {
      if (storedLists.listsData[i]._id === list.target.id) {
        const removeLeftList = leftLists.filter((leftList) => {
          return leftList._id !== storedLists.listsData[i]._id;
        });

        setLeftLists(removeLeftList);
        setRightLists(previousList => [...previousList, storedLists.listsData[i]]);
        return;
      }
    }
  }

  // This function also adds the removed right list back to the leftLists.
  function removeFromRightList (list) {
    const rightIndex = rightLists.findIndex(target => target._id === list.target.id);

    if (rightIndex > -1) {
      const newArray = rightLists.filter(element => (element._id !== list.target.id));

      setRightLists(newArray);

      for (let i = 0; i < storedLists.listsData.length; i++) {
        if (storedLists.listsData[i]._id === list.target.id) {
          setLeftLists(previousList => [...previousList, storedLists.listsData[i]]);
          return;
        }
      }
      return;
    }
  }

  function toggleOptionsDisplay () {
    setOptionsVisible(!optionsVisible);
  }

  function saveChanges () {
    setQuizSettings({ lists: rightLists, questionTotal: numberOfQuestions, mode: quizMode });
    setOptionsVisible(!optionsVisible);
  }

    return (
      <div className="quiz-page-container">
      { quizStarted ?
        <QuizGame
          navigate={navigate}
          quizQuestions={quizQuestions}
          quizMode={quizMode}
          quizScore={quizScore}
          setQuizScore={setQuizScore}
          setErrorMessages={setErrorMessages}
        />
        :
        <div className="quiz-home">
          { optionsVisible ?
            <h1 className="quiz-home-h1"> Customize the quiz by selecting the mode, length, and lists below! </h1>
            :
            <div className="quiz-home-header-container">
              <h1 className="quiz-home-h1"> Click on &quot;Options&quot; to add lists for the Quiz Game! </h1>
              <h2 className="quiz-home-h2"> Or click on &quot;Start&quot; if you&apos;re ready to begin. </h2>
            </div>
          }
          <QuizCreation
            quizSettings={quizSettings}
            setQuizQuestions={setQuizQuestions}
            setQuizStarted={setQuizStarted}
            setErrorMessages={setErrorMessages}
            optionsVisible={optionsVisible}
          />
          <QuizOptions
            rightLists={rightLists}
            possibleWords={[]}
            toggleOptions={toggleOptionsDisplay}
            optionsVisible={optionsVisible}
            addToRightList={addToRightList}
            removeFromRightList={removeFromRightList}
            setNumberOfQuestions={setNumberOfQuestions}
            saveChanges={saveChanges}
            setQuizMode={setQuizMode}
            leftLists={leftLists}
          />
          { optionsVisible ?
              null
            :
            errorMessages && <h3 className="quiz-error-message"> {errorMessages} </h3>}
        </div>
      }
      </div>
    );
}
