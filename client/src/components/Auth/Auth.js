import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signIn, signUp } from "../../actions/auth.actions.js";
import Form from "./Form.js";

const initialState = { username: "", email: "", password: "", confirmPassword: "" };
const initialErrors = { loginEmail: "", loginPassword: "", username: "", email: "", password: "", confirmPassword: "" };

export default function Auth () {
  const [signedUp, setSignedUp] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const signupPassword = useRef(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  async function handleSubmit (e) {
    e.preventDefault();

    if (signedUp) {
      let loginCheck = await dispatch(signIn(formData, navigate));
      let loginError = loginCheck?.response.data.message;

      if (loginError === undefined) return;

      if (loginError.includes("email")) {
        setErrors({
          ...errors,
          loginEmail: loginError,
          loginPassword: ""
        });
      }

      if (loginError.includes("credentials")) {
        setErrors({
          ...errors,
          loginPassword: loginError,
          loginEmail: ""
        });
      }
    } else {
      let registerCheck = await dispatch(signUp(formData, navigate));
      let registerError = registerCheck?.response.data.message;

      if (registerError === undefined) {
        return;
      }

      if (registerError.includes("email")) {
        setErrors({
          ...errors,
          email: registerError
        });
      }

      if (registerError.includes("username")) {
        setErrors({
          ...errors,
          username: registerError
        });
      }
    }
  }

  function validate (name, value) {
    switch (name) {
      case "username":
        if (value.length <= 3) {
          if (value.length === 0) {          // Clear error when field is empty
            setErrors({
              ...errors,
              username: ""
            });
          } else {
              setErrors({
                ...errors,
                username: "Username must be at least 4 characters long."
              });
          }
        } else {
            setErrors({
              ...errors,
              username: ""
            });
        }
        break;

      case "email":
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
          setErrors({
            ...errors,
            email: ""
          });
        } else {
            if (value.length === 0) {       // Clear error when field is empty
              setErrors({
                ...errors,
                email: ""
              });
            } else {
              setErrors({
                ...errors,
                email: "Invalid e-mail address."
              });
            }
        }
        break;

      case "password":
        if (value.length < 8) {
          if (value.length === 0) {         // Clear message if they delete the password
            setErrors({
              ...errors,
              password: ""
            });
          } else {
            setErrors({
              ...errors,
              password: "The password must be 8 characters or longer."
            });
          }
        } else {
          setErrors({
            ...errors,
            password: ""
          });
        }
        break;

      case "confirmPassword": {
        let formPassword = signupPassword.current.value;

        if (formPassword) {
          if (value === formPassword) {
            setErrors({
              ...errors,
              confirmPassword: ""
            });
          } else {
            setErrors({
              ...errors,
              confirmPassword: "The two passwords are not equal."
            });
          }
        }
        break;
      }

        case "loginEmail":
          if (value.length === 0) {
            setErrors({
              ...errors,
              loginEmail: ""
            });
          }
          break;

        case "loginPassword":
          if (value.length === 0) {
            setErrors({
              ...errors,
              loginPassword: ""
            });
          }
          break;

      default:
        break;
    }
  }

  function handleChange (e) {
    e.persist();
    validate(e.target.name, e.target.value);

    if (e.target.name === "loginEmail") {
      setFormData({ ...formData, "email": e.target.value });
      return;
    }
    if (e.target.name === "loginPassword") {
      setFormData({ ...formData, "password": e.target.value });
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function switchFormType () {
    setSignedUp(!signedUp);
    setFormData(initialState);
    setErrors(initialErrors);
  }

  async function googleSuccess (res) {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  function googleFailure (error) {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try again later.");
  }

  return (
    <Form
      signedUp={signedUp}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      errors={errors}
      googleSuccess={googleSuccess}
      googleFailure={googleFailure}
      switchFormType={switchFormType}
      signupPassword={signupPassword}
    />
  );
}
