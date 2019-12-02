import axios from 'axios';

export const getUsers = () => {
	return axios.get('http://localhost:3001/users/')
    .then(res => {
    	return res
    }).catch((error) => {
    	console.log(error)
    })
}

export const signup = (signupData) => {
	const request = {
    	method: 'post',
        url: 'http://localhost:3001/users/', 
        data: signupData,
        headers: {
        	'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }

     return axios(request)
    .then(function(res) {
    	return res
    }).catch((error) => {
    	console.log(error)
    })  
}

export const login = (loginData) => {
	const request = {
    	method: 'post',
        url: 'http://localhost:3001/users/login', 
        data: loginData,
        headers: {
        	'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }

     return axios(request)
    .then(function(res) {
    	return res
    }).catch((error) => {
        return error.response
    })  
}

export const changeName = (id, newName) => {
 	const request = {
    	method: 'patch',
        url: `http://localhost:3001/users/${id}/change-username`, 
        data: newName,
        headers: {
        	'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }

     return axios(request)
    .then(function(res) {
    	return res
    }).catch((error) => {
        return error.response
    })  
}

export const changePassword = (id, newPassword) => {
 	const request = {
    	method: 'patch',
        url: `http://localhost:3001/users/${id}/change-password`, 
        data: newPassword,
        headers: {
        	'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }

     return axios(request)
    .then(function(res) {
    	return res
    }).catch((error) => {
    	console.log(error)
    })  
}

export const deleteAccount = (id) => {
	return axios.delete(`http://localhost:3001/users/${id}`)
	.then(function(res) {
		return res
	}).catch((error) => {
		console.log(error)
	})  
}