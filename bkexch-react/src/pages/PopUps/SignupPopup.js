import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './SignupPopup.css';
import users from '../../users';

import {signup} from '../../actions/user';

class Input extends React.Component {
	state = {
		username: "",
		usernameMsg: "",
		password: "",
		confirmPassword: "",
		passwordMsg: "",
		success: ""
	}

	handleInputChange = (event) => {
		const target = event.target
		const name = target.name
		const value = target.value
		
		this.setState({[name]: value}, () => { this.requiredInput(value, name) })
		this.setState({success: ""})
	}

	requiredInput = (input, type) => {
		if (input === "") {
	 			this.setState({[type.concat("Msg")]: type.concat(" required")})
	 			return
		}
		this.setState({[type.concat("Msg")]: ""})
	}

	submitChange = (event) => {
		if (this.state.password !== this.state.confirmPassword) {
			this.setState({passwordMsg: "passwords don't match"})
		} else {
		 	signup(this)
		}
	}

	render() {
		return (
			<>
			<label>Username:</label>
					<input className="input" type="text" 
						value = { this.state.username }
						onChange = { this.handleInputChange }
						name = "username"
						placeholder = "Enter username" />
					<p id="usernameMsg"> { this.state.usernameMsg } </p>
						
				 	<label>Password:</label>
				 	<input className="input" type="password" 
				 		value = { this.state.password }
				 		onChange = { this.handleInputChange }
				 		name = "password"
				 		placeholder = "Password" /> 
				 	<p></p>

				 	<label>Confirm Password:</label>
				 	<input className="input" type="password" 
				 		value = { this.state.confirmPassword }
				 		onChange = { this.handleInputChange }
				 		name = "confirmPassword"
				 		placeholder = "Confirm Password" /> 
				 	<p id="passwordMsg"> { this.state.passwordMsg } </p>
				 	<p id="success"> { this.state.success } </p>
			</>
		)
	}
}

class SignupPopup extends React.Component {
	submitChange = () => {
		this.refs.child.submitChange();
	}

	render() {
		const { ...other } = this.props;
		return (
			<Modal {...other} animation={false} >
				<Modal.Header closeButton>
					<Modal.Title>
						Sign Up
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Input ref="child" />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={this.props.onHide}>Close</Button>
					<Button variant="primary" onClick={this.submitChange}>Sign Up</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

export default SignupPopup;