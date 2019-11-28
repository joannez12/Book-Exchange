import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './LoginPopup.css';
import users from '../../users';


class Input extends React.Component {
	state = {
		users: users,
		name: "",
		password: "",
		nameMsg: "",
		passwordMsg: ""
	}

	handleInputChange = (event) => {
		const target = event.target
		const name = target.name
		const value = target.value

		if (name === "name") {
			this.setState({ [name]: value }, () => { this.checkName() })
		} else if (name === "password") {
			this.setState({ [name]: value }, () => { this.checkPassword() })
		}
	}


	checkName = () => {
		if (this.state.name === "") {
			this.setState({ nameMsg: "username required" })
		} else {
			this.setState({ nameMsg: "" })
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
			/*  get users from server, requires server call */
		const request = new Request('http://localhost:3001/users/login', {
			method: 'post',
			body: JSON.stringify({username: this.state.name, password: this.state.password}),
			headers: {
				'Accept': 'application/json, text/plain, */*',
            	'Content-Type': 'application/json'
			}
		})

		fetch(request)
		.then(function(res) {
			return res.json()
		}).then((json) => {
			if (json.usernameMsg) {
				this.setState({nameMsg: json.usernameMsg})
			} else if (json.passwordMsg) {
				this.setState({passwordMsg: json.passwordMsg})
			} else if (json.currentUser) {
				this.setState({
					users: users,
					name: "",
					nameMsg: "",
					password: "",
					passwordMsg: ""
				})
				this.props.handleSignin(json.currentUser)
				this.props.onHide()
			}
		}).catch((error) => {
			console.log(error)
		})	
	}

	render() {
		return (
			<>
			<label>Username:</label>
				<input className="input" type="text"
					value={this.state.name}
					onChange={this.handleInputChange}
					name="name"
					placeholder="Enter username" />
				<p id="nameMsg"> {this.state.nameMsg} </p>

			<label>Password:</label>
				<input className="input" type="password"
					value={this.state.password}
					onChange={this.handleInputChange}
					name="password"
					placeholder="Enter password" />
				<p id="passwordMsg"> {this.state.passwordMsg} </p>
			</>
		)
	}
}

class LoginPopup extends React.Component {
	submitChange = () => {
		this.refs.child.submitChange();
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
						<Input ref="child" onHide={this.props.onHide} handleSignin={this.props.handleSignin} />
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