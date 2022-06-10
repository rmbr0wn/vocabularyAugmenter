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
  const [updateSuccessful, setUpdateSuccessful] = useState("");
  const [error, setError] = useState(initialState);
  let navigate = useNavigate();

  async function handleSubmit (e) {
    e.preventDefault();
    let userType = (googleUser) ? "Google" : "Regular";
    let userEmail = (googleUser) ? googleUser.result.email : regularUser.result.email;
    let storageType = (googleUser) ? "profile" : "account";

    let changeUsernameRequest = await dispatch(
      changeUsername(newUsername, userType, userEmail)
    );
    let changeUsernameError = changeUsernameRequest?.response.data.message;

    if (changeUsernameError) {
      setError({ username: changeUsernameError });
      setUpdateSuccessful("");
    }

    if (!changeUsernameError) {
      setError({ username: "" });
      let fetchedMessage = JSON.parse(localStorage.getItem(storageType)).message;
      setUpdateSuccessful(fetchedMessage);
    }
    navigate("/profile");
  }

  function handleChange (e) {
    e.persist();
    validate(e.target.value);

    setNewUsername({ username: e.target.value });
  }

  function showInputField () {
    setUpdateSuccessful("");
    setError("");
    setAllowUsernameChange(!allowUsernameChange);
  }

  function validate (username) {
    if (username.length < 4) {
      setError({ username: "The new username must be 4 characters or longer." });
    } else {
      setError({ username: "" });
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
        onSubmit={handleSubmit}
        user={googleUser}
        name={displayedUsername}
        onClick={showInputField}
        allowChange={allowUsernameChange}
        error={error}
        onChange={handleChange}
        success={updateSuccessful}
      />
    );
}
