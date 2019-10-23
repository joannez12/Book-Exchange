import React from 'react';
import SearchBrowse from './pages/SearchBrowse/SearchBrowse';
import SignupPopup from './SignupPopup';
import HistoryBrowse from "./pages/HistoryBrowse/HistoryBrowse";
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SearchBrowse}/>
          <Route exact path="/signup" component={SignupPopup}/>
          <Route exact path="/history" component={HistoryBrowse}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
