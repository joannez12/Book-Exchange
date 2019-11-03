import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class SendMessage extends React.Component{
    state = {
        user: this.props.user,
        subject: "",
        text: "",
        category: "",
    }
    handleClose = () => {
        this.props.closeSendMessagePopUp();
    }

    onSendButton = () => {
        const d = new Date();
        const message = {
            id: d.getTime(),
            from: this.props.user.name,
            to: this.props.selectedBook.seller,
            email: this.props.user.email,
            text: this.state.text,
            date: d.toLocaleTimeString(),
        }
        this.props.handleMessage(message);
    }

    render(){

        const { user, selectedBook, closeSendMessagePopUp, handleMessage, ...other} = this.props;
        return (
            <>
                <Modal {...other} >
                    <Modal.Header closeButton>
                        <Modal.Title>New Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    From
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={user.name} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    To
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={selectedBook.seller} />
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Subject</Form.Label>
                                <Form.Control
                                    type="subject"
                                    value={this.state.subject}
                                    onChange={e => this.setState({subject:e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select">
                                    <option>Buy</option>
                                    <option>Negotiation</option>
                                    <option>Exchange</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    type="text"
                                    value={this.state.text}
                                    onChange={e => this.setState({text:e.target.value})}

                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.onSendButton()}>
                            Send
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default SendMessage;
