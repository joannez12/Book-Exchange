import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './LoginPopup.css';

const users = [{ id: 1, email: "123@gmail.com", password: "123", name: "Mike Smith" }]

class LoginPopup extends React.Component {
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
			this.setState({ [name]: value }, () => { this.checkEmail() })
		} else if (name === "password") {
			this.setState({ [name]: value }, () => { this.checkPassword() })
		}
	}


	checkEmail = () => {
		if (this.state.email === "") {
			this.setState({ emailMsg: "email required" })
		} else {
			this.setState({ emailMsg: "" })
		}
	}

	checkPassword = () => {
		if (this.state.password === "") {
			this.setState({ passwordMsg: "password required" })
		} else {
			this.setState({ passwordMsg: "" })
		}
	}

	submitChange = (event) => {
		if (this.state.email === "") {
			this.setState({ emailMsg: "email required" })
		}
		if (this.state.password === "") {
			this.setState({ passwordMsg: "password required" })
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
					this.props.handleSignin(users[i]);
					this.props.onHide();
				} else {
					this.setState({ passwordMsg: "incorrect password" })
				}
			} else {
				this.setState({ emailMsg: "email does not exist" })
			}
		}
	}

	render() {
		const { handleSignin, ...other } = this.props;
		return (
			<Modal {...other} animation={false}>
					<Modal.Header closeButton>
						<Modal.Title>
							Sign In
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<label>Email:</label>
						<input className="input" type="text"
							value={this.state.email}
							onChange={this.handleInputChange}
							name="email"
							placeholder="Enter Email" />
						<p id="emailMsg"> {this.state.emailMsg} </p>

						<label>Password:</label>
						<input className="input" type="password"
							value={this.state.password}
							onChange={this.handleInputChange}
							name="password"
							placeholder="Password" />
						<p id="passwordMsg"> {this.state.passwordMsg} </p>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.props.onHide}>Close</Button>
						<Button variant="primary" onClick={this.submitChange}>Log In</Button>
					</Modal.Footer>
			</Modal>
		)
	}
}

export default LoginPopup;