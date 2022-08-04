import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { generateGoogleProfile, generateGoogleUsername, getGoogleProfile } from "../../actions/home.actions.js";
import "./homepage.css";

export default function HomePage () {
  const [profileChecked, setProfileChecked] = useState(false);
  const user = JSON.parse(localStorage.getItem("account"));
  const googleProfile = JSON.parse(localStorage?.getItem("profile"));
  const dispatch = useDispatch();

  useEffect(() => {
    var checkForProfile;

    if (user) {
      if (user.result.googleId) {
          checkForProfile = async function checkForProfile () {
            await dispatch(getGoogleProfile(user.result.googleId));
            setProfileChecked(true);
          };
          checkForProfile();
      }
    }
  }, []);

  useEffect(() => {
    if (profileChecked && user) {
      if (!googleProfile && user.result.googleId) {
        const newUsername = generateGoogleUsername(user);
        const newProfile = {
          username: newUsername,
          email: user.result.email,
          googleId: user.result.googleId
        };
        dispatch(generateGoogleProfile(newProfile));
      } else {
        return;
      }
    }
  }, [profileChecked]);

    return (
      <div className="home-container">
        <div className="home-headers-container">
          <h1 className="welcome-header"> Welcome to the Vocabulary Augmenter! </h1>
          { user ?
            <h2 className="information-header"> Click on &ldquo;Word Lists&rdquo; to get started. </h2>
            :
            <h2 className="information-header"> Click on &ldquo;Login/Signup&rdquo; in the top right to create an account. </h2>
          }
        </div>
      </div>
    );
}
