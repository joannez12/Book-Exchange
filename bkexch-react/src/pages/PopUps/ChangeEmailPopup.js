import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import users from '../../users';

import './ChangeEmailPopup.css';


class ChangeEmailPopup extends React.Component {
    state = {
        user: this.props.user,
        users: users,
        email: "",
        confirmEmail: "",
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

        if (this.state.email === "" || this.state.confirmEmail === "") {
            this.setState({ error: "email required" })
        } else if (this.state.email !== this.state.confirmEmail) {
            this.setState({error: "emails don't match"})
        } else {
             {/* gets users from server, requires server call */}
            if (users.filter((user) => this.state.email === user.email).length >=1) {

                this.setState({error: "email exist"})
            } else {
                 {/* gets users from server, requires server call */}
                users[this.state.user.id - 1].email = this.state.email
                this.setState({success: "success"})

                this.setState({
                    user: this.props.user,
                    users: users,
                    email: "",
                    confirmEmail: "",
                    error: "",
                })
            }
        }
    }

    render() {
        const { ...other } = this.props;
        return (
            <Modal {...other} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Change Email
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <label>New Email:</label>
                    <input className="input" type="text"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        name="email"
                        placeholder = "Enter New Email" />
                    <p></p>

                    <label>Confirm Email:</label>
                    <input className="input" type="text"
                        value={this.state.confirmEmail}
                        onChange={this.handleInputChange}
                        name="confirmEmail"
                        placeholder = "Confirm New Email" />

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

export default ChangeEmailPopup;
