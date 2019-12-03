import axios from 'axios';

export const postTextbook = (textbook) => {
	const request = {
    	method: 'post',
        url: '/textbooks', 
        data: textbook,
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

export const getTextbooks = () => {
    console.log("getting textbooks from server!")
    return axios.get('/textbooks/')
            .then(response => {
                return response
            })
            .catch((error) => {
                console.log(error);
                return error.response
            })
}

export const getTextbook = (id) => {
    return axios.get(`/textbooks/${id}`)
}

export const deleteTextbook = (id) => {
    return axios.delete(`/textbooks/${id}`)
}

export const updateTextbook = (textbook) => {
    console.log("updating textbook!", textbook)
    const request = {
    	method: 'post',
        url: `/textbooks/update/${textbook._id}`, 
        data: textbook,
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
