import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './SignupPopup.css';
import users from '../../users';

class Input extends React.Component {
	state = {
		name: "",
		nameMsg: "",
		email: "",
		password: "",
		confirmPassword: "",
		emailMsg: "",
		passwordMsg: "",
		success: ""
	}

	handleInputChange = (event) => {
		const target = event.target
		const name = target.name
		const value = target.value
		
		this.setState({[name]: value}, () => { this.checkInput(value, name) })
		this.setState({success: ""})
	}

	checkInput = (input, type) => {
		if (input === "") {
	 			this.setState({[type.concat("Msg")]: type.concat(" required")})
	 			return
		}
		if (type === "email") {
			 /* Gets users from server and compares it to user email to see if email exist already, requires server call */
			users.filter((user) => user.email === input).length >= 1 ? this.setState({emailMsg: "email exists"}) : this.setState({emailMsg: ""})
			return
		}
		if (type  === "password" || type === "confirmPassword") {
			this.setState({passwordMsg: ""})
			return
		}
		this.setState({[type.concat("Msg")]: ""})
	}

	submitChange = (event) => {
		if (this.state.name === "") {
			this.setState({nameMsg: "name required"})
		} 
		if (this.state.email === "") {
			this.setState({emailMsg: "email required"})
		}
		if (this.state.password === "") {
			this.setState({passwordMsg: "password required"})
		}

		if (this.state.password !== this.state.confirmPassword) {
			this.setState({passwordMsg: "passwords don't match"})
		}

		if (this.state.name !== "" && this.state.nameMsg === "" && this.state.email !== "" && this.state.emailMsg=== "" && this.state.password !== "" && 
			this.state.passwordMsg === "" && this.state.password === this.state.confirmPassword) {
			this.setState({success: "account created"})

			/* Gets users from server, requires server call */
			const user = {"id": users.length+1, "name": this.state.name, "email": this.state.email, "password": this.state.password}
			users.push(user)

			this.setState({
				users: users,
				name: "",
				nameMsg: "",
				email: "",
				password: "",
				confirmPassword: "",
				emailMsg: "",
				passwordMsg: ""
			})
		} 
	}

	render() {
		return (
			<>
			<label>Name:</label>
					<input className="input" type="text" 
						value = { this.state.name }
						onChange = { this.handleInputChange }
						name = "name"
						placeholder = "Enter Name" />
					<p id="nameMsg"> { this.state.nameMsg } </p>

					<label>Email:</label>
					<input className="input" type="text" 
						value = { this.state.email }
						onChange = { this.handleInputChange }
						name = "email"
						placeholder = "Enter Email" />
					<p id="emailMsg"> { this.state.emailMsg } </p>
						
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