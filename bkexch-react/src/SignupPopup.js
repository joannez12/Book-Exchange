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
		passwordMsg: ""
	}

	handleInputChange = (event) => {
		const target = event.target
		const name = target.name
		const value = target.value
		
		if (name === "name"){
			this.setState({[name]: value}, () => { this.checkName() })
		} else if (name === "email") {
			this.setState({[name]: value}, () => { this.checkEmail() })
		} else if (name === "password" || name === "confirmPassword") {
			this.setState({[name]: value}, () => { this.checkPassword() })
		}
		
	}

	checkName = () => {
		if ((this.state.name === "")) {
	 		this.setState({nameMsg: "name required"})
	 	} else {
	 		this.setState({nameMsg: ""})
	 	}
	}

	checkEmail = () => {
	 	if (this.state.email === "") {
	 		this.setState({emailMsg: "email required"})
	 		return
	 	} 

		if (users.length >= 1) {
			for (let i = 0; i < users.length; i++) {
				if (users[i].email === this.state.email) {
					this.setState({emailMsg: "email exist"})
					return
				} else {
					this.setState({emailMsg: ""})
				}
			}
		}
		this.setState({emailMsg: ""})
		
	}

	checkPassword = () => {
		if ((this.state.password === "")) {
	 		this.setState({passwordMsg: "password required"})
	 		return
	 	}

		if (this.state.password === this.state.confirmPassword) {
			this.setState({passwordMsg: ""})
		} else {
			this.setState({passwordMsg: "passwords dont match"})
		}
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

		if (!(this.state.name === "") && (this.state.emailMsg === "") && !(this.state.password === "") 
									&& (this.state.password === this.state.confirmPassword)) {
			
			{ /* Sends a user to the server, requires server call */ }
			const user = {"name": this.state.name, "email": this.state.email, "password": this.state.password}
			users.push(user)

			this.setState({
				name: "",
				nameMsg: "",
				email: "",
				password: "",
				confirmPassword: "",
				emailMsg: "",
				passwordMsg: ""
			})
			
		} 
		console.log(users)
	}

	render() {
		return (
			<div className="popup">
				<div id="signup">SIGN UP</div>
					{ /* <button type="button" id="close" onClick={}>X</button> */}
					<div className="form">
						<div className="label">Name:</div>
							<input type="text" 
								value = { this.state.name }
								onChange = { this.handleInputChange }
								name = "name"
								placeholder = "Enter Name" />
							<div id="nameMsg"> { this.state.nameMsg } </div>
					</div>

					<div className="form">
						<div className="label">Email:</div>
							<input type="text" 
								value = { this.state.email }
								onChange = { this.handleInputChange }
								name = "email"
								placeholder = "Enter Email" />
							<div id="emailMsg"> { this.state.emailMsg } </div>
					</div>
								
					<div className="form">
				 		<div className="label">Password:</div>
				 			<input type="password" 
				 				value = { this.state.password }
				 				onChange = { this.handleInputChange }
				 				name = "password"
				 				placeholder = "Password" /> 
				 	</div>
				 	<div className="form">
				 		<div className="label">Confirm Password:</div>
				 			<input type="password" 
				 				value = { this.state.confirmPassword }
				 				onChange = { this.handleInputChange }
				 				name = "confirmPassword"
				 				placeholder = "Password" /> 
				 			<div id="passwordMsg"> { this.state.passwordMsg } </div>

				 	</div>
				 	<button type="button" id="submit" onClick={this.submitChange}>Sign Up</button>
			</div>
		)
	}
}

export default SignupPopup;