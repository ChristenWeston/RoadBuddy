import React, { useEffect, useState, Component } from "react";
import firebase from "firebase/compat";
import { useHistory } from "react-router-dom";
import { isLoaded, isEmpty } from 'react-redux-firebase'

function Signin() {
  const [signedIn, setSignedIn] = useState(false);
  const history = useHistory();

  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
      console.log("successfully signed up!");
    }).catch(function (error) {
      console.log(error.message);
    });
  }

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
      console.log("Signed in user: ");
      history.push("/");
    }).catch(function (error) {
      console.log(error.message);
    });
  }

  function doSignOut() {
    firebase.auth().signOut().then(function () {
      console.log("Successfully signed out!");
    }).catch(function (error) {
      console.log(error.message);
    });
  }

  return (
    <React.Fragment>
      <div class="container">
        <div className="text-center">
          <h1>Sign up</h1>
          <form onSubmit={doSignUp}>
            <input
              type='text'
              className='form-control-plaintext'
              name='email'
              placeholder='email' />

            <input
              type='password'
              className='form-control-plaintext'
              name='password'
              placeholder='Password' />
            <button type='submit' className="btn btn-primary">Sign up</button>
          </form>
        </div>
        <div className="text-center">
          <h1>Sign In</h1>
          <form onSubmit={doSignIn}>
            <input
              type='text'
              className='form-control-plaintext'
              name='signinEmail'
              placeholder='email' />
            <input
              type='password'
              className='form-control-plaintext'
              name='signinPassword'
              placeholder='Password' />
            <button type='submit' className="btn btn-primary">Sign in</button>
          </form>
        </div>
        <div className="text-center">
          <h1>Sign Out</h1>
          <button onClick={doSignOut} className="btn btn-warning">Sign out</button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Signin