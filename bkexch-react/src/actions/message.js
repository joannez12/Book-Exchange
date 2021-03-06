import axios from 'axios';

export const getMessages = () => {
	console.log("getting messages")

	return axios('/messages')
	.then(function(res) {
		return res
	}).catch((error) => {
		return error.response
	})
}

export const sendMessage = (message) => {
	const request = {
    	method: 'post',
        url: '/messages/', 
        data: message,
        headers: {
        	'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
       }
    }
	console.log("sending message: ", message)
	return axios(request)
	.then(function(res) {
		return res
	}).catch((error) => {
		return error.response
	})
}

export const deleteMessage = (message) => {
	console.log("deleting message: ", message)

	return axios.delete(`/messages/${message._id}`)
	.then(function(res) {
		return res
	}).catch((error) => {
		return error.response
	})
}