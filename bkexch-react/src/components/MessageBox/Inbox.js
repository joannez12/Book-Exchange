import React from 'react';
import {ButtonGroup, Dropdown, DropdownButton, Table} from "react-bootstrap";

class InboxMessage extends React.Component {
    render(){
        const {user, message,handleReplyMessage, handleDeletedMessage} = this.props;
        return(
            <tr key={message.id} >
                <td>{message.from}</td>
                <td>{message.text}</td>
                <td>{message.date}</td>
                <td>
                    <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-vertical-dropdown-1">
                        <Dropdown.Item eventKey="1" onClick={()=>handleReplyMessage(user, message)} >Reply</Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={()=>handleDeletedMessage(message)} >Delete</Dropdown.Item>
                    </DropdownButton>
                </td>
            </tr>
        )
    }
}

class Inbox extends React.Component {
    render(){
        const {user, inboxMessages, handleReplyMessage, handleDeletedMessage} = this.props;
        return(
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr key={0}>
                        <th>From</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Option</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            inboxMessages.map((message) => <InboxMessage key={message.id} message = {message} handleReplyMessage={handleReplyMessage} user={user} handleDeletedMessage={handleDeletedMessage} />)
                        }
                    </tbody>


                </Table>
            </div>
        )
    }
}

export default Inbox;
