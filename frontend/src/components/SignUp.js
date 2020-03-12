import React, {useCallback} from 'react';
import {withRouter} from 'react-router';
import firebase from '../firebase.js';
import axios from 'axios';
const checkValues = (input1, input2) => input1.value === input2.value ? true : false
const SignUp = ({history}) => {
  
  const handleSignUp = useCallback (
    async event => {
      event.preventDefault ();
      const {email, password, confirmPassword, subBtn, username } = event.target.elements;
      try {

        console.log('new user details', email.value, password.value, username.value);
       
        if(checkValues(password,confirmPassword)){
          let res = await firebase
          .auth ()
          .createUserWithEmailAndPassword (email.value, password.value);
          let createUser = await axios.post('http://localhost:3001/api/users/',{
            uid:res.user.uid,
            email:email.value,
            username:username.value,

          })
          history.push ('/');
        }

      } catch (error) {
        alert (error);
      }
    },
    [history]
  );

  
  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
       
          <input name="username" type='text' placeholder="Username"/>
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" />

        
        <button name='subBtn' type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter (SignUp);