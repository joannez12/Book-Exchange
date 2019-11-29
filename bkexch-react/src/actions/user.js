export const signup = (signup) => {
	const request = new Request('http://localhost:3001/users/', {
		method: 'post',
		body: JSON.stringify({username: signup.state.username, password: signup.state.password}),
		headers: {
			'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
		}
	})

	fetch(request)
	.then(function(res) {
		return res.json()
	}).then((json) => {
		if (json.success === true) {
			signup.setState({success: json.message})
			signup.setState({
				username: "",
				usernameMsg: "",
				password: "",
				confirmPassword: "",
				passwordMsg: ""
			})
		} else if (json.success === false) {
			signup.setState({usernameMsg: json.message[0]})
			signup.setState({passwordMsg: json.message[1]})
		} 
	}).catch((error) => {
		console.log(error)
	})
}

export const login = (login) => {
	const request = new Request('http://localhost:3001/users/login', {
		method: 'post',
		body: JSON.stringify({username: login.state.name, password: login.state.password}),
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
			login.setState({nameMsg: json.usernameMsg})
		} else if (json.passwordMsg) {
			login.setState({passwordMsg: json.passwordMsg})
		} else if (json.currentUser) {
			login.setState({
				name: "",
				nameMsg: "",
				password: "",
				passwordMsg: ""
			})
			login.props.handleSignin(json.currentUser)
			login.props.onHide()
		}
	}).catch((error) => {
		console.log(error)
	})	
}

export const changeName = (changeName) => {
	const request = new Request(`http://localhost:3001/users/${changeName.state.user._id}/change-username`, {
    	method: 'PATCH',
        body: JSON.stringify({username: changeName.state.name}),
        headers: {
        	'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    fetch(request)
    .then(function(res) {
    	return res.json()
    }).then((json) => {
    	if (json.error) {
       		changeName.setState({error: json.error})
        } else if (json.success) {
        	changeName.setState({success: json.success})
            changeName.setState({
            	user: changeName.props.user,
                name: "",
                confirmName: "",
                error: "",
            })
        } 
    }).catch((error) => {
    	console.log(error)
    })  
}

export const changePassword = (changePassword) => {
	const request = new Request(`http://localhost:3001/users/${changePassword.state.user._id}/change-password`, {
	    method: 'PATCH',
	    body: JSON.stringify({password: changePassword.state.password}),
	    headers: {
	        'Accept': 'application/json, text/plain, */*',
	        'Content-Type': 'application/json',
	    }
	})

	fetch(request)
	.then(function(res) {
	    return res.json()
	}).then((json) => {
	    if (json.error) {
	        changePassword.setState({error: json.error})
	    } else if (json.success) {
	        changePassword.setState({success: json.success})
	        changePassword.setState({
	            user: changePassword.props.user,
	            password: "",
	            confirmPassword: "",
	            error: ""
	        })
	    } 
	}).catch((error) => {
	    console.log(error)
	}) 
}

export const deleteAccount = (deleteAccount) => {
	const request = new Request(`http://localhost:3001/users/${deleteAccount.state.user._id}`, {
		method: 'DELETE'
	})

	fetch(request)
	.then(function(res) {
		console.log(res)
	}).catch((error) => {
		console.log(error)
	})  

	deleteAccount.props.hideProfile();
	deleteAccount.props.deleted();
}