import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "../firebase.js";
import { AuthContext } from "../Auth.js";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        let res = await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
          //res can be obtained by => res.user.uid
          let token = await firebase.auth().currentUser.getIdToken(false);
          console.log('this is token, ',token)
          token = {token:token}
         //this token can b stored and sent to the backend to allow user to use route/ query that is protected by middleware;token is a obj
         console.log('this is my uid =>', res.user.uid)
        history.push("/");
      } catch (error) {
        alert(error);
      }
    }
    ,[history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }else if(currentUser === null) {
    return (
      <div>
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
          
            <input name="email" type="email" placeholder="Email" autoComplete='off' />
          
        
            <input name="password" type="password" placeholder="Password" />
          
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  } else {
    return <h1> Loading</h1>
  }
 
};

export default withRouter(Login);