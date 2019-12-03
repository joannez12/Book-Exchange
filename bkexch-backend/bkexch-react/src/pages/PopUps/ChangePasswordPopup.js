import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import users from '../../users';

import './ChangePasswordPopup.css';

import {changePassword} from '../../actions/user';


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
        if (this.state.password === "" && this.state.confirmPassword === "") {
            this.setState({error: "password required"})
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({error: "passwords don't match"})
        } else if (this.state.confirmPassword.length < 3) {
            this.setState({error: "password needs to be min 3 characters"})
        } else {
            const newPassword = {password: this.state.password}
            changePassword(this.props.user._id, newPassword).then((res) => {
                if (res.status === 200) {
                    this.setState({success: res.data})

                    this.setState({
                        user: this.props.user,
                        password: "",
                        confirmPassword: "",
                        error: ""
                    })
                }
            }).catch((error) => console.log(error))
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
