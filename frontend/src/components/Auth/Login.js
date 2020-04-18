import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from 'react-router-dom';
import firebase from "./firebase.js";
import { AuthContext } from "./Auth.js";
import '../../CSS/Auth.css'

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
        alert(error);
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
            <input name="email" type="email" placeholder="Email" autoComplete='off' />
            <input name="password" type="password" placeholder="Password" />
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