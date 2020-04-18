import React, {useCallback} from 'react';
import {withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import firebase from './firebase.js';
import axios from 'axios';
const checkValues = (input1, input2) => input1.value === input2.value ? true : false
const SignUp = ({history}) => {
  
  const handleSignUp = useCallback (
    async event => {
      event.preventDefault ();
      const {email, password, confirmPassword, username } = event.target.elements;
      try {
       
        if(checkValues(password,confirmPassword)){
          let res = await firebase
          .auth ()
          .createUserWithEmailAndPassword (email.value, password.value);
          await axios.post('/api/users/new',{
            uid:res.user.uid,
            email:email.value,
            username:username.value,

          })
          history.push ('/portfolio');
        }else{
          alert('Passwords did not match')
        }

      } catch (error) {
        alert (error);
      }
    },
    [history]
  );

  
  return (
    <div className={"formDiv"}>
      
      <form onSubmit={handleSignUp}>
          <h1 className={`logo`}>STONKS</h1>
          <h1>Sign up</h1>
          <input name="username" type='text' placeholder="Username"/>
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" />
        <button name='subBtn' type="submit">Sign Up</button>
          <h1>Already a member?</h1>
         <Link to='/login'>Log In</Link>
  

      </form>
    </div>
  );
};

export default withRouter (SignUp);