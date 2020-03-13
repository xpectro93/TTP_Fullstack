import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Portfolio from "./components/portfolio/Portfolio";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import { AuthProvider } from "./components/Auth/Auth";
import PrivateRoute from "./components/Auth/PrivateRoute";


const App = () => {
  return (
    <AuthProvider>
      <Router>
      <div className='test'>
          <PrivateRoute exact path="/portfolio" component={Portfolio} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
      
    </AuthProvider>
  );
};

export default App;