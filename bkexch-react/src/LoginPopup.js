import React from 'react';
import './LoginPopup.css';

const users = [ {email: "123@gmail.com", password: "123"} ]

class LoginpPopup extends React.Component {
	state = {
		email: "",
		password: "",
		emailMsg: "",
		passwordMsg: ""
	}

	handleInputChange = (event) => {
		const target = event.target
		const name = target.name
		const value = target.value
		
		if (name === "email") {
			this.setState({[name]: value}, () => { this.checkEmail() })
		} else if (name === "password") {
			this.setState({[name]: value}, () => { this.checkPassword() })
		}
	}


	checkEmail = () => {
		if (this.state.email === "") {
	 		this.setState({emailMsg: "email required"})
	 	} else {
	 		this.setState({emailMsg: ""})
	 	}
	}

	checkPassword = () => {
		if (this.state.password === "") {
	 		this.setState({passwordMsg: "password required"})
	 	} else {
	 		this.setState({passwordMsg: ""})
	 	}
	}

	submitChange = (event) => {
		if (this.state.email === "") {
			this.setState({emailMsg: "email required"})
		}
		if (this.state.password === "") {
			this.setState({passwordMsg: "password required"})
		}
	 	
		for (let i = 0; i < users.length; i++) {
			{ /* Gets users from server and compares it to user email, password, requires server call */ }
			if (users[i].email === this.state.email) {
				if (users[i].password === this.state.password) {
					this.setState({
						email: "",
						password: "",
						emailMsg: "",
						passwordMsg: ""
					})
					users[i].loggedIn = true;
				} else {
					this.setState({passwordMsg: "incorrect password"})
				}
			} else {
				this.setState({emailMsg: "email does not exist"})
			}
		}
	}

	render() {
		return (
			<div className="popup">
				<form className="popupContent">
					<h3>Log In <button type="button" className="close">X</button></h3>
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
				 			<div id="passwordMsg"> { this.state.passwordMsg } </div>
				 		
				 		<div align="right"><button type="button" id="login" onClick={this.submitChange}>Log In</button></div>
				</form>
			</div>
		)
	}
}

export default LoginpPopup;