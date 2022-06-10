import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { generateGoogleProfile, generateGoogleUsername, getGoogleProfile } from "../actions/home.actions.js";

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
      if (!googleProfile) {
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
      <div>
        <p> You are on the home page!</p>
      </div>
    );
}
