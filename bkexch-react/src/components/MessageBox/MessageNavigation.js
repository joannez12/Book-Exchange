import React from "react";
import {Nav} from "react-bootstrap";

class MessageNavigation extends React.Component{

    render() {
        const {handleShowHelper} = this.props;
        return(
            <Nav variant="pills" defaultActiveKey="link-2">
                <Nav.Item >
                    <Nav.Link eventKey="link-2" onSelect={() => handleShowHelper('Inbox')} >Inbox</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3" onSelect={() => handleShowHelper('SentBox')} >Sent</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }
}

export default MessageNavigation;
