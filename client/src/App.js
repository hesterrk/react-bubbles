import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">

        <Link to='/'>Log In: public </Link>
        <Link to='/bubblepage'> Bubble Page: protected </Link>
        
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
       
        <PrivateRoute exact path='/bubblepage' component={BubblePage}/>

      </div>
    </Router>
  );
}

export default App;
