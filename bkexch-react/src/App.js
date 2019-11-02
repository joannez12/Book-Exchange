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

  addPost = () => {
    this.setState({})
  }

  render() {
    return (
      <div className="App">
        <Router>
          <MainHeader user={this.state.user} handleSignin={this.handleSignin} addPost={this.addPost}/>
          <Switch>
            <Route exact path="/" component={SearchBrowse} />
            {this.state.user ? <Route exact path="/history" component={ () => <HistoryBrowse user={this.state.user} />} /> : null }
          </Switch>
        </Router>
      </div>
    )
  }

}

export default App;
