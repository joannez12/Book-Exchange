import React from 'react';
import {Table} from "react-bootstrap";

class InboxMessage extends React.Component {
    render(){
        const {message} = this.props;
        return(
            <tr key={message.id} >
                <td>{message.from}</td>
                <td>{message.email}</td>
                <td>{message.text}</td>
                <td>{message.date}</td>
                <td>Option</td>
            </tr>
        )
    }
}

class Inbox extends React.Component {

    render(){
        const {inboxMessages} = this.props;
        return(
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr key={0}>
                        <th>From</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Option</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            inboxMessages.map((message) => <InboxMessage key={message.id} message = {message} />)
                        }
                    </tbody>


                </Table>
            </div>
        )
    }
}

export default Inbox;
