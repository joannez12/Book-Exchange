import React from 'react';
import './MessageBox.css';
import Inbox from "../../components/MessageBox/Inbox";
import MessageNavigation from "../../components/MessageBox/MessageNavigation";
import SentBox from "../../components/MessageBox/SentBox";
class MessageBox extends React.Component{
    state = {
        showInbox: false,
        showSentBox: true,
        showTrash: false,
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
            return <Inbox />
        }else if(this.state.showSentBox){
            return <SentBox />
        }else if(this.state.showTrash){
            return (<Inbox />
            )
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
