import axios from 'axios';

export const postExchange = (exchange) => {
	const request = {
    	method: 'post',
        url: '/exchanges', 
        data: exchange,
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

export const getExchanges = () => {
    console.log("getting exchanges from server!")
    return axios.get('/exchanges/')
            .then(response => {
                return response
            })
            .catch((error) => {
                console.log(error);
                return error.response
            })
}

export const deleteExchange = (exchange) => {
    console.log("deleting exchange!")
    return axios.delete(`/exchanges/${exchange._id}`)
            .then(response => {
                return response
            })
            .catch((error) => {
                return error.response
            })
}

export const updateExchange = (exchange) => {
    console.log("updating exchange!", exchange)
    const request = {
    	method: 'post',
        url: `/exchanges/update/${exchange._id}`, 
        data: exchange,
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
