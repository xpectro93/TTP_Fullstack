import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Portfolio from "./components/portfolio/Portfolio";
import Transactions from './components/transactions/Transactions.js'
import Login from "./components/Auth/Login.js";
import SignUp from "./components/Auth/SignUp.js";
import {Navbar} from './Navbar.js'
import { AuthProvider } from "./components/Auth/Auth.js";
import PrivateRoute from "./components/Auth/PrivateRoute.js";

const App = () => {

  return (
    <AuthProvider>
      <Router>
      <div className='app'>
          <PrivateRoute path="/" component={Navbar} />
          <PrivateRoute exact path="/transactions" component={Transactions} />
          <PrivateRoute exact path="/portfolio" component={Portfolio} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
      </div>
      </Router>
    </AuthProvider>
  );
};

export default App;