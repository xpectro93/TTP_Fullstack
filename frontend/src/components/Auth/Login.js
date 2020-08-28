import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from 'react-router-dom';
import firebase from "./firebase.js";
import { AuthContext } from "./Auth.js";
import '../../CSS/Auth.css'


import { TextField } from '@material-ui/core';


const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/portfolio");
      } catch (error) {
        console.log(error);
      }
    }
    ,[history]
  );
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/portfolio" />;
  }else if(currentUser === null) {
    return (
      <div className={'formDiv'}>
        
        <form onSubmit={handleLogin}>
            <h1 className={`logo`}>STONKS</h1>
            <h1>Log in</h1>
            <TextField name="email" type="email" placeholder="Email" autoComplete='off' id="outlined-basic" label="Email" variant="filled" />
            <TextField name="password" type="password" placeholder="Password" id="outlined-basic" label="Password" variant="filled" />
          <button type="submit">Log in</button>
          <h1>Not a member?</h1>
          <Link to='/signup'>Register Here</Link>
        </form>
      </div>
    );
  } else {
    return <h1> Loading</h1>
  }
 
};

export default withRouter(Login);