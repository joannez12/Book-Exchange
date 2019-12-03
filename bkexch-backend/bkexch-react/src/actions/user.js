import axios from 'axios';

export const getUsers = () => {
	return axios.get('/users')
    .then(res => {
    	return res
    }).catch((error) => {
    	return error.response
    })
}

export const currentUser = () => {
    return axios.get('/users/current')
}

export const getUser = (id) => {
	return axios(`/users/${id}`)
    .then((res) => {
      console.log(res.data)
      return res
    }).catch((error) => {return error.response})
}

export const signup = (signupData) => {
	const request = {
    	method: 'post',
        url: '/users/', 
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
    	return error.response
    })  
}

export const login = (loginData) => {
	const request = {
    	method: 'post',
        url: '/users/login', 
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
        url: `/users/${id}/change-username`, 
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
        url: `/users/${id}/change-password`, 
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
    	return error.response
    })  
}

export const deleteAccount = (id) => {
	return axios.delete(`/users/${id}`)
	.then(function(res) {
		return res
	}).catch((error) => {
		return error.response
	})  
}