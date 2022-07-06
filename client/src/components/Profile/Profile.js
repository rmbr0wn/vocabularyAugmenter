import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { changeUsername } from "../../actions/profile.actions.js";
import EditProfile from "./EditProfile";

const initialState = { username: "" };

export default function ProfilePage () {
  const regularUser = JSON.parse(localStorage.getItem("account"));
  const googleUser = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const initialUsername = (googleUser) ? googleUser?.result.username : regularUser?.result.username;
  const [displayedUsername, setDisplayedUsername] = useState(initialUsername);
  const [allowUsernameChange, setAllowUsernameChange] = useState(false);
  const [newUsername, setNewUsername] = useState(initialState);
  const [responseMessage, setResponseMessage] = useState("");
  let navigate = useNavigate();

  async function handleSubmit (e) {
    e.preventDefault();
    let userType = (googleUser) ? "Google" : "Regular";
    let userEmail = (googleUser) ? googleUser.result.email : regularUser.result.email;

    let nameChange = await dispatch(changeUsername(newUsername, userType, userEmail));
    let nameChangeSuccess = nameChange.message;

    // nameChange.response means that there is an error message instead of success
    if (nameChange.response) {
      setResponseMessage(nameChange.response.data.message);
    } else {
      setResponseMessage(nameChangeSuccess);
    }

    setAllowUsernameChange(false);
    navigate("/profile");
  }

  function handleChange (e) {
    e.persist();
    validate(e.target.value);

    setNewUsername({ username: e.target.value });
  }

  function showInputField () {
    setResponseMessage("");
    setAllowUsernameChange(!allowUsernameChange);
  }

  function validate (username) {
    if (username.length < 4) {
      setResponseMessage("The new username must be 4 characters or longer.");
    } else {
      setResponseMessage("");
    }
  }

  async function updateDisplayedUsername () {
    let storageType = (googleUser) ? "profile" : "account";
    let currentUser = JSON.parse(localStorage.getItem(storageType));
    setDisplayedUsername(currentUser?.result.username);
  }

  useEffect(() => {
    if (!regularUser && !googleUser) {
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    updateDisplayedUsername();
  }, [googleUser?.result.username, regularUser?.result.username]);

    return (
      <EditProfile
        handleSubmit={handleSubmit}
        displayedUsername={displayedUsername}
        showInputField={showInputField}
        allowUsernameChange={allowUsernameChange}
        handleChange={handleChange}
        responseMessage={responseMessage}
      />
    );
}
