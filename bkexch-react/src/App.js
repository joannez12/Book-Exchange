import React from 'react';
import SearchBrowse from './pages/SearchBrowse/SearchBrowse';
import HistoryBrowse from "./pages/HistoryBrowse/HistoryBrowse";
import MainHeader from "./components/MainHeader";
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <MainHeader/>
      <Router>
        <Switch>
          <Route exact path="/" component={SearchBrowse}/>
          <Route exact path="/history" component={HistoryBrowse}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
