import axios from 'axios';

export const getUsers = () => {
	return axios.get('/users')
}

export const currentUser = () => {
    return axios.get('/users/current')
}

export const getUser = (id) => {
	return axios(`/users/${id}`)
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
}

export const logout = () => {
    return axios.post('/users/logout')
}

export const changePassword = (newPassword) => {
 	const request = {
    	method: 'patch',
        url: `/users/change-password`, 
        data: newPassword,
        headers: {
        	'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }
     return axios(request)
}

export const deleteAccount = () => {
	return axios.delete(`/users`)
}