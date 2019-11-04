import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class ReplyMessage extends React.Component{
    state = {
        user: this.props.user,
        text: "",
        category: "",
    }
    handleClose = () => {
        this.props.closeReplyMessagePopUp();
    }

    onSendButton = () => {
        const d = new Date();
        const message = {
            id: d.getTime(),
            from: this.props.message.to,
            to: this.props.message.from,
            email: this.props.user.name,
            text: this.state.text,
            textbook: this.props.message.textbook,
            date: d.toLocaleTimeString(),
        }
        this.props.handleMessage(message);
    }

    render(){
        const {user, message, closeReplyMessagePopUp, handleMessage, ...other} = this.props;
        return (
            <>
                <Modal {...other} >
                    <Modal.Header closeButton>
                        <Modal.Title>Reply</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    From
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={message.to} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    To
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={message.from} />
                                </Col>
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

export default ReplyMessage;
