import React from 'react';
import './SignupPopup.css';

const users = []

class SignupPopup extends React.Component {
	state = {
		name: "",
		nameMsg: "",
		email: "",
		password: "",
		confirmPassword: "",
		emailMsg: "",
		passwordMsg: "",
		loggedIn: false
	}

	handleInputChange = (event) => {
		const target = event.target
		const name = target.name
		const value = target.value
		
		this.setState({[name]: value}, () => { this.checkInput(value, name) })
		
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
			
			/* Sends a user to the server, requires server call */
			const user = {"name": this.state.name, "email": this.state.email, "password": this.state.password, "loggedIn": true}
			users.push(user)

			this.setState({
				name: "",
				nameMsg: "",
				email: "",
				password: "",
				confirmPassword: "",
				emailMsg: "",
				passwordMsg: "",
				loggedIn: false	
			})

			this.props.close() 
		} 
	}

	render() {
		return (
			<form className="popupContent">
				<h3>Sign Up <button type="button" className="close" onClick = { () => this.props.close() }>X</button></h3>
					<div className="label"> Name:</div>
						<input className="input" type="text" 
							value = { this.state.name }
							onChange = { this.handleInputChange }
							name = "name"
							placeholder = "Enter Name" />
						<div id="nameMsg"> { this.state.nameMsg } </div>

					<div className="label">Email:</div>
						<input className="input" type="text" 
							value = { this.state.email }
							onChange = { this.handleInputChange }
							name = "email"
							placeholder = "Enter Email" />
						<div id="emailMsg"> { this.state.emailMsg } </div>
						
				 	<div className="label">Password:</div>
				 		<input className="input" type="password" 
				 			value = { this.state.password }
				 			onChange = { this.handleInputChange }
				 			name = "password"
				 			placeholder = "Password" /> 

				 	<div className="label">Confirm Password:</div>
				 		<input className="input" type="password" 
				 			value = { this.state.confirmPassword }
				 			onChange = { this.handleInputChange }
				 			name = "confirmPassword"
				 			placeholder = "Password" /> 
				 		<div id="passwordMsg"> { this.state.passwordMsg } </div>
				 		
				 	<div align="right"><button type="button" id="signup" onClick={this.submitChange}>Sign Up</button></div>
			</form>
		)
	}
}

export default SignupPopup;