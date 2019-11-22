import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './SignupPopup.css';
import users from '../../users';

class Input extends React.Component {
	state = {
		name: "",
		nameMsg: "",
		password: "",
		confirmPassword: "",
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
		if (type === "name") {
    		fetch('/users')
    		.then((res) => { 
        		if (res.status === 200) {
           			return res.json() 
       			} else {
            		alert('Could not get users')
       			}                
    		})
    		.then((json) => {  
        		json.users.filter((u) => u.username === input).length >= 1 ? this.setState({nameMsg: "username exists"}) : this.setState({nameMsg: ""})
    		}).catch((error) => {
        		console.log(error)
    		})
			 /* Gets users from server and compares it to user email to see if email exist already, requires server call */
			//users.filter((user) => user.name === input).length >= 1 ? this.setState({nameMsg: "username exists"}) : this.setState({nameMsg: ""})
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
			this.setState({nameMsg: "username required"})
		} 
		if (this.state.password === "") {
			this.setState({passwordMsg: "password required"})
		}

		if (this.state.password !== this.state.confirmPassword) {
			this.setState({passwordMsg: "passwords don't match"})
		}

		if (this.state.name !== "" && this.state.nameMsg === "" && this.state.password !== "" && 
			this.state.passwordMsg === "" && this.state.password === this.state.confirmPassword) {
			//this.setState({success: "account created"})
	    	const request = new Request('/signup', {
        		method: 'post', 
        		body: JSON.stringify({username: this.state.name, password: this.state.password}),
        		headers: {
            		'Accept': 'application/json, text/plain, */*',
            		'Content-Type': 'application/json'
        		},
    		});

			fetch(request)
			.then(function(res) {
				if (res.status === 200) {
					this.setState({success: "account created"})

					this.setState({
						users: users,
						name: "",
						nameMsg: "",
						password: "",
						confirmPassword: "",
						passwordMsg: ""
					})
				} else {
					this.setState({success: "username needs to be min 1 character, password needs to be min 3"})
				}
			}.bind(this)).catch((error) => {
				console.log(error)
			})
			/* Gets users from server, requires server call */
			//const user = {"id": users.length+1, "name": this.state.name, "password": this.state.password, "isAdmin": false}
			//users.push(user)

		} 
	}

	render() {
		return (
			<>
			<label>Username:</label>
					<input className="input" type="text" 
						value = { this.state.name }
						onChange = { this.handleInputChange }
						name = "name"
						placeholder = "Enter username" />
					<p id="nameMsg"> { this.state.nameMsg } </p>
						
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
				    {this.state.success !== "account created" ? <p id="success" style={{color: 'red'}}> { this.state.success } </p> :  <p id="success"> { this.state.success } </p> }
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