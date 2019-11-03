import React from 'react';
import SearchBrowse from './pages/SearchBrowse/SearchBrowse';
import HistoryBrowse from "./pages/HistoryBrowse/HistoryBrowse";
import MainHeader from './components/Navbar/MainHeader';
import ViewTextbook from './pages/ViewTextbook/ViewTextbook';
import MessageBox from "./pages/MessageBox/MessageBox";
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SendMessage from "./pages/PopUps/SendMessage";

class App extends React.Component {
  state =  {
    user: null,
    sendMessage: false,
    selectedBook: null,

  }

  handleSignin = (user) => {
    user === -1 ? this.setState({user: null}) : this.setState({user: user})
  }

  handleSendMessage = (selectedBook) => {
    this.setState(prevState => ({sendMessage: !prevState.sendMessage, selectedBook: selectedBook}))
  }

  closeSendMessagePopUp = () => {
    this.setState(prevState => ({sendMessage: !prevState.sendMessage}))
  }

  render() {
    return (
      <div className="App">
        <Router>
          <MainHeader user={this.state.user} handleSignin={this.handleSignin} deleted={()=>this.setState({user: null})} />
          <Switch>
            <Route exact path="/" component={SearchBrowse} />
            {this.state.user ? <Route exact path="/messagebox" component={ () => <MessageBox user={this.state.user} />} /> : null }
            <Route exact path="/history" component={ () => <HistoryBrowse user={this.state.user} />} />
            <Route path="/textbooks/:id" children={<ViewTextbook handleSendMessage={this.handleSendMessage.bind(this)} />} />
          </Switch>
        </Router>
        <SendMessage closeSendMessagePopUp={this.closeSendMessagePopUp.bind(this)} selectedBook={this.state.selectedBook} show={this.state.sendMessage} onHide={() => this.setState({ sendMessage: false })} />

      </div>
    )
  }

}

export default App;
