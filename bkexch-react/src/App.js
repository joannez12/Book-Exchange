import React from 'react';
import SearchBrowse from './pages/SearchBrowse/SearchBrowse';
import HistoryBrowse from "./pages/HistoryBrowse/HistoryBrowse";
import MainHeader from './components/Navbar/MainHeader';
import ViewTextbook from './pages/ViewTextbook/ViewTextbook';
import MessageBox from "./pages/MessageBox/MessageBox";
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SendMessage from "./pages/MessageBox/SendMessage";
import ReplyMessage from "./pages/MessageBox/ReplyMessage";
import messages from "./messages";
class App extends React.Component {
  state =  {
    user: null,
    sendMessage: false,
    selectedBook: null,
    message: null,
    replyMessage: false,
  }

  handleSignin = (user) => {
    user === -1 ? this.setState({user: null}) : this.setState({user: user})
  }

  handleSendMessage = (selectedBook, user) => {
    if(user){
      this.setState(prevState => ({sendMessage: !prevState.sendMessage, selectedBook: selectedBook}))

    }else{
      alert('You must log in first.');
    }
  }

  handleReplyMessage = (user, message) => {
    if(user){
      this.setState(prevState => ({replyMessage: !prevState.replyMessage, message: message}))

    }else{
      alert('You must log in first.');
    }
  }

  closeReplyMessagePopUp = () => {
    this.setState(prevState => ({replyMessage: !prevState.replyMessage}))
  }

  closeSendMessagePopUp = () => {
    this.setState(prevState => ({sendMessage: !prevState.sendMessage}))
  }

  handleMessage = (message) => {
    messages.unshift(message);
    this.setState(prevState => ({message: message, replyMessage: false, sendMessage: false}))
  }

  render() {
    return (
      <div className="App">
        <Router>
          <MainHeader user={this.state.user} handleSignin={this.handleSignin} deleted={()=>this.setState({user: null})} />
          <Switch>
            <Route exact path="/" component={SearchBrowse} />
            {this.state.user ?
                <Route exact path="/messagebox"
                       component={ () =>
                           <MessageBox
                               user={this.state.user}
                               handleReplyMessage={this.handleReplyMessage.bind(this)} />} /> : null }
            <Route exact path="/history" component={ () => <HistoryBrowse user={this.state.user} />} />
            <Route path="/textbooks/:id" children={<ViewTextbook user={this.state.user} handleSendMessage={this.handleSendMessage.bind(this)} />} />
          </Switch>
        </Router>
        {this.state.user && this.state.selectedBook?
            (<SendMessage
                user={this.state.user}
                handleMessage={this.handleMessage.bind(this)}
                closeSendMessagePopUp={this.closeSendMessagePopUp.bind(this)}
                selectedBook={this.state.selectedBook} show={this.state.sendMessage}
                onHide={() => this.setState({ sendMessage: false })} />)
            : null }
        {
          (this.state.replyMessage && this.state.message) ?
              (<ReplyMessage
                  user={this.state.user}
                  show={this.state.replyMessage}
                  message={this.state.message}
                  closeReplyMessagePopUp={this.closeReplyMessagePopUp.bind(this)}
                  handleMessage={this.handleMessage.bind(this)}
              />) : null
        }

      </div>
    )
  }

}

export default App;
