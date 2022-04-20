import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

import UploadImage from '../actions/uploadImage.action.js';
import { generateProfile } from '../actions/profile.actions.js'

const initialState = { username: '', email: '', image: '' };

export default function Profile () {
  const[user, setUser] = useState(JSON.parse(localStorage.getItem('account')));
  const[profile, setProfile] = useState(initialState);
  const[showIcons, setShowIcons] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let defaultAvatar = "./icons/human-blob.png";

  async function openSelection() {
    setShowIcons(true);
  }

  function closeSelection() {
    setShowIcons(false);
  }

  // Google accounts don't have a username property, so we have to make one
  function createGoogleUsername() {
    let strippedEmail = user.result.email.split('@');
    let strippedId = user.result.googleId;
    strippedId = strippedId.substr(0, 5);

    return (strippedEmail[0] + strippedId);
  }

  // Can probably expand this to use for the regular accounts as well
  async function createProfile() {
    let generatedUsername = createGoogleUsername();
    let googleEmail = user.result.email;
    let googleImage = user.result.imageUrl;

    setProfile({ ...profile,
      "username": generatedUsername,
      "email": googleEmail,
      "image": googleImage
    });
  }

  useEffect(() => {
    if (!user){
      navigate("/");
      return;
    }
  });

  useEffect(() => {
    if(!profile.email){
      if(user.result.googleId){
        createProfile();
      }
    }
    else {
      // Profile exists
    }
  }, []);

  useEffect(() => {
    if(profile.email){
      dispatch(generateProfile(profile));
    }
  }, [profile]);

    return (
      <div>
        <p> Welcome to your profile {user?.result.email}!</p>
        <div>
          <button type="button" onClick={openSelection}> Change Image </button>
          <img src={defaultAvatar} alt="0" width="25" height="25"/>
          <Modal show={showIcons}>
              <Modal.Title> Select your new icon </Modal.Title>
              <UploadImage />
            <Modal.Footer>
              <button type="button" onClick={closeSelection}> Close </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
}
