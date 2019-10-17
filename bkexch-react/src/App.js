import React from 'react';
import SearchBrowse from './pages/SearchBrowse/SearchBrowse';
import SignupPopup from './SignupPopup';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SearchBrowse}/>
          <Route exact path="/signup" component={SignupPopup}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
