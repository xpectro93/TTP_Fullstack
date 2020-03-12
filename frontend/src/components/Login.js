import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "../firebase.js";
import { AuthContext } from "../Auth.js";
import axios from 'axios';

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
          token = {token:token}
          let testResp = await axios.post('http://localhost:3001/api/users/test',token )
          console.log('This is tesResp => ', testResp)
         //this token can b stored and sent to the backend to allow user to use route/ query that is protected by middleware;token is a obj

         firebase.auth().onAuthStateChanged(user => {
           console.log('this is user at onAuthStateChanged => ', user)
         })
         console.log('this is my uid =>', res.user.uid)
         let call = await axios.get(`http://localhost:3001/api/users/info/${res.user.uid}`);
         console.log('This is call => ', call);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    }
    //if it ever breaks, => , [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    
    return <Redirect to="/" />;
  }
  // if(currentUser !== null && history.location.pathname === "/login"){
  //   return (<h1>SADAJDHAJKDHLKAJHDJAHDKASHDKJAHDKJASHDAKJDHAKJSHDAKJDHSJK</h1>)
  // }
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
};

export default withRouter(Login);