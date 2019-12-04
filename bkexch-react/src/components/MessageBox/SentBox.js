import React from 'react';
import {ButtonGroup, Dropdown, DropdownButton, Table} from "react-bootstrap";

class SentMessage extends React.Component {
    render(){
        const {message} = this.props;
        const date = new Date(message.createdAt).toLocaleString()
        return(
            <tr key={message.id} >
                <td>{message.to}</td>
                <td>{message.text}</td>
                <td>{date}</td>
            </tr>
        )
    }
}


class SentBox extends React.Component {

    render(){
        const {sentMessages} = this.props;
        return(
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr key={0}>
                        <th>To</th>
                        <th>Message</th>
                        <th>Date</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        sentMessages.map(message => <SentMessage key={message.id} message={message} />)
                    }
                    </tbody>


                </Table>
            </div>
        )
    }
}

export default SentBox;
