import React, {useState, useEffect} from "react";
import firebase from "../firebase";

const Home = () => {
  const fakeComponent = ()=> (
    <div id='post-body'>
      <img className="user-pic"></img>
      <div id='post'></div>
    </div>
  )

  return (

    <>
    
      <div id='main'>
      <div id='posts'>
        
        <div id='post-container'>
          <span className='user-pic'></span>
          <div id='make-post'>
            <ul>
              <li>Text</li>
              <li>Photo</li>
              <li>Link</li>
              <li>Video</li>
              <li>
              <button onClick={() => firebase.auth().signOut()}>Sign out</button>
              </li>
            </ul>
          </div>    
        </div>
        {fakeComponent()}
        {fakeComponent()}
        {fakeComponent()}
        {fakeComponent()}
      </div>
      <div id='side-dashboard'>
        <div id="recommendations">

        </div>
        <div id='radar'>

        </div>
      </div>
      
      </div>
    </>

      
      
      
  )};




export default Home;