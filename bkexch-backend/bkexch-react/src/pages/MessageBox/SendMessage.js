import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {sendMessage} from "../../actions/message"
class SendMessage extends React.Component{
    state = {
        user: this.props.user,
        text: "",
        message: null,
    }
    handleClose = () => {
        this.props.closeSendMessagePopUp();
    }

    onSendButton = () => {
        const message = {
            from: this.props.user.username,
            to: this.props.selectedBook.seller,
            text: this.state.text,
        }
        sendMessage(message).then(res=>{
            if(res.status === 200){
                console.log("message sent well: ")
            }else{
                console.log("error while sending message")
            }
        })
        // this.props.handleMessage(message);
    }

    render(){
        console.log("SendMessage component, this.props: ", this.props)
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
                                    <Form.Control plaintext readOnly defaultValue={user.username} />
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
