import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { generateGoogleProfile, createGoogleUsername, getGoogleProfile } from '../actions/home.actions.js';

// Could maybe get rid of profileChcked and just actually check if the profile exists
export default function HomePage () {
  const user = JSON.parse(localStorage.getItem('account'));
  const profile = JSON.parse(localStorage?.getItem('profile'));
  const[profileChecked, setProfileChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(user){
      if(user.result.googleId){
          async function checkForProfile() {
            await dispatch(getGoogleProfile(user.result.googleId));
            setProfileChecked(true);
          }
          checkForProfile();
      }
    }
  }, []);

  useEffect(() => {
    if(profileChecked && user){
      if(!profile){
        const newUsername = createGoogleUsername(user);
        const newProfile = {
          username: newUsername,
          email: user.result.email,
          googleId: user.result.googleId
        };
        dispatch(generateGoogleProfile(newProfile));
      }
      else{
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
