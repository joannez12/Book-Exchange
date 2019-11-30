export const getMessages = (messages) => {
	fetch('http://localhost:3001/messages')
	.then(function(res) {
		return res.json()
	}).then((json) => {
		messages.setState({messages: json})
		messages.getSentMessage()
		messages.getInboxMessage()
		
	}).catch((error) => {
		console.log(error)
	})
}

export const sendMessage = (message, instance) => {
	const request = new Request('http://localhost:3001/messages', {
		method: 'post',
		body: JSON.stringify({from: message.from, to: message.to, text: message.text}),
		headers: {
			'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
		}
	})

	fetch(request)
	.then(function(res) {
		instance.setState(prevState => ({message: message, replyMessage: false, sendMessage: false}))
	}).catch((error) => {
		console.log(error)
	})
}

export const deleteMessage = (message, instance) => {
	const request = new Request(`http://localhost:3001/messages/${message._id}`, {method: 'DELETE'})

	fetch(request)
	.then(function(res) {
		instance.setState({deletedMessage: message})
	}).catch((error) => {
		console.log(error)
	})
}