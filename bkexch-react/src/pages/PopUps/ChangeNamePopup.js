import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import users from '../../users';

import './ChangeNamePopup.css';

import {changeName} from '../../actions/user';

class ChangeNamePopup extends React.Component {
    state = {
        user: this.props.user,
        users: users,
        name: "",
        confirmName: "",
        error: "",
        success: ""
    }

    handleInputChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value

        this.setState({[name]: value})
    }


    submitChange = (event) => {
        if (this.state.name !== this.state.confirmName) {
            this.setState({error: "names don't match"})
        } else {
            changeName(this)
        }
    }

    render() {
        const { ...other } = this.props;
        return (
            <Modal {...other} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Change Username
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <label>New Username:</label>
                    <input className="input" type="text"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        name="name"
                        placeholder = "Enter New Username" />
                    <p></p>

                    <label>Confirm Username:</label>
                    <input className="input" type="text"
                        value={this.state.confirmName}
                        onChange={this.handleInputChange}
                        name="confirmName"
                        placeholder = "Confirm New Username" />

                    <p id="error">{this.state.error}</p>

                </Modal.Body>
                <Modal.Footer>
                    <p id="success">{this.state.success}</p>
                    <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                    <Button variant="primary" onClick={this.submitChange}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ChangeNamePopup;
