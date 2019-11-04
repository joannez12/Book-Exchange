import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import users from '../../users';

import './ChangePasswordPopup.css';


class ChangePasswordPopup extends React.Component {
    state = {
        user: this.props.user,
        users: users,
        password: "",
        confirmPassword: "",
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

        if (this.state.password === "" || this.state.confirmPassword === "") {
            this.setState({ error: "password required" })
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({error: "passwords don't match"})
        } else {
            /* gets users from server, requires server call */
            users[this.state.user.id - 1].password = this.state.password
            this.setState({success: "password changed"})

            this.setState({
                user: this.props.user,
                users: users,
                password: "",
                confirmPassword: "",
                error: ""
            })
        } 
    }

    render() {
        const { ...other } = this.props;
        return (
            <Modal {...other} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Change Password
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <label>New Password:</label>
                    <input className="input" type="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        name="password"
                        placeholder = "Enter New Password" />
                    <p></p>

                    <label>Confirm Password:</label>
                    <input className="input" type="password"
                        value={this.state.confirmPassword}
                        onChange={this.handleInputChange}
                        name="confirmPassword"
                        placeholder = "Confirm New Password" />

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

export default ChangePasswordPopup;
