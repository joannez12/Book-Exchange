export const postTextbook = (textbook, postTextbook) => {
	const request = new Request('http://localhost:3001/textbooks', {
    	method: 'post',
        body: JSON.stringify(textbook),
        headers: {
        	'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    fetch(request)
    .then(function(res) {
    	if (res.status === 200) {
    		postTextbook.setState({
                title: "",
                author: "",
                price: "",
                imgUrl: "",
                description: "",
                titleMsg: "",
                authorMsg: "",
                priceMsg: "",
                descriptionMsg: "",
        		imgUrlMsg: ""
            })

            postTextbook.props.addPost();
            postTextbook.props.onHide();
    	}
    }).catch((error) => {
    	console.log(error)
    })  

}