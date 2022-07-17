import React, { useEffect, useState, Component } from "react";
import firebase from "firebase/compat";
import { useHistory } from "react-router-dom";
import { isLoaded, isEmpty } from 'react-redux-firebase'

function Signin(){  
  const [signedIn, setSignedIn] = useState(false);
  const history = useHistory();

  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
      console.log("successfully signed up!");
    }).catch(function(error) {
      console.log(error.message);
    });
  }

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      console.log("Signed in!");
      history.push("/");
     }).catch(function(error) {
      console.log(error.message);
    });
  }

  function doSignOut() {
    firebase.auth().signOut().then(function() {
      console.log("Successfully signed out!");
    }).catch(function(error) {
      console.log(error.message);
    });
  }

  return (
    <React.Fragment>
      <h1>Sign up</h1>
      <form onSubmit={doSignUp}>
      <fieldset>
      <div class="form-group row">
      
        <input
          type='text'
          class='form-control-plaintext'
          name='email'
          placeholder='email' />
        <input
          type='password'
          class='form-control-plaintext'
          name='password'
          placeholder='Password' />
        <button type='submit'>Sign up</button>
        
        </div>
        </fieldset>
      </form>

      <h1>Sign In</h1>
      <form onSubmit={doSignIn}>
        <input
          type='text'
          class='form-control-plaintext'
          name='signinEmail'
          placeholder='email' />
        <input
          type='password'
          class='form-control-plaintext'
          name='signinPassword'
          placeholder='Password' />
        <button type='submit'>Sign in</button>
      </form>

      <h1>Sign Out</h1>
      <button onClick={doSignOut}>Sign out</button>
    </React.Fragment>
  );
}

export default Signin