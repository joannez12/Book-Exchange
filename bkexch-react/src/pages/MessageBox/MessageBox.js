import React from 'react';
import './MessageBox.css';
import Inbox from "../../components/MessageBox/Inbox";
import MessageNavigation from "../../components/MessageBox/MessageNavigation";
import SentBox from "../../components/MessageBox/SentBox";
import messages from "../../messages";
class MessageBox extends React.Component{
    state = {
        user: this.props.user,
        showInbox: true,
        showSentBox: false,
        sentMessages: [],
        inboxMessages: [],
    }

    getSentMessage = (messages) => {
        /* gets messages from server, requires server call */
        const sentMessages = messages.filter(message=> message.from === this.props.user.name);
        this.setState({sentMessages: sentMessages});
    }

    getInboxMessage = (messages) => {
        /* gets messages from server, requires server call */
        const inboxMessages = messages.filter(message=> message.to === this.props.user.name);
        this.setState({inboxMessages: inboxMessages});
    }

    componentDidMount() {
        this.getInboxMessage(messages);
        this.getSentMessage(messages);
    }


    handleShowHelper = (whatToShow) =>{
        switch(whatToShow) {
            case 'Inbox':
                this.setState({...this.state, showInbox: true, showSentBox: false});
                break;
            case 'SentBox':
                this.setState({...this.state, showInbox: false, showSentBox: true});
                break;
            default:
                break;
        }
    }

    handleShow = () => {
        if(this.state.showInbox){
            return <Inbox user={this.props.user} inboxMessages={this.state.inboxMessages} handleReplyMessage={this.props.handleReplyMessage} handleDeletedMessage={this.props.handleDeletedMessage} />
        }else if(this.state.showSentBox){
            return <SentBox sentMessages={this.state.sentMessages} />
        }
    }

    render(){
        return(
            <div className='Messagebox'>
                <MessageNavigation handleShowHelper={this.handleShowHelper.bind(this)} />
                {this.handleShow()}
            </div>
        )
    }
}


export default MessageBox;
