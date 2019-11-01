import React from 'react';
import SearchBrowse from './pages/SearchBrowse/SearchBrowse';
import HistoryBrowse from "./pages/HistoryBrowse/HistoryBrowse";
import MainHeader from './components/Navbar/MainHeader';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  state =  {
    user: null
  }

  handleSignin = (user) => {
    user === -1 ? this.setState({user: null}) : this.setState({user: user})
  }

  render() {
    return (
      <div className="App">
        <Router>
          <MainHeader user={this.state.user} handleSignin={this.handleSignin}/>
          <Switch>
            <Route exact path="/" component={SearchBrowse} />
            <Route exact path="/history" component={HistoryBrowse} />
          </Switch>
        </Router>
      </div>
    )
  }

}

export default App;
