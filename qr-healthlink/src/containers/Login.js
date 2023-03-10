import React, { useState } from "react";
import { useAppContext } from "../lib/contextLib";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./Login.css";

export default function Login() {
  const nav = useNavigate();

  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { userHasAuthenticated } = useAppContext();

  // User Login info
  const database = [
    {
      username: "user",
      password: "pass",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        userHasAuthenticated(true);
        nav("/ensf-609-group-8/home");
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" defaultValue={"user"} required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" defaultValue={"pass"} required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Login</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}
