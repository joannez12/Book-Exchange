import axios from 'axios';

export const postTextbook = (textbook) => {
	const request = {
    	method: 'post',
        url: 'http://localhost:3001/textbooks', 
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
    	console.log(error)
    })  

}

export const getTextbooks = () => {
    console.log("getting textbooks from server!")
        axios.get('http://localhost:3001/textbooks/')
        .then(response => {
          if (response.data.length > 0) {
              console.log(response.data)
              return response.data
          }
        })
        .catch((error) => {
          console.log(error);
        })
}