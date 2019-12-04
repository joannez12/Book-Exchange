import React from 'react';
import {withRouter} from 'react-router-dom';
import './ViewTextbook.css';
import {Button} from "react-bootstrap";
import {getTextbook, deleteTextbook} from '../../actions/textbook';

class ViewTextbook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textbook: null
        }
    }
    
    componentDidMount() {
        getTextbook(this.props.match.params.id).then(response => this.setState({textbook: response.data}))
            .catch(() => this.setState({textbook: null}))

        console.log("this.state: ", this.state)
        console.log("this.props: ", this.props)
        console.log("user_id", this.props.match.params["id"])
    }

    render() {
        const {user} = this.props
        let isAdmin = false
        if (user !== null) {
            isAdmin = user.isAdmin
        }
        const {textbook} = this.state
        if (textbook !== null) {
            return(
                <div className="page">
                    <h1>{textbook.title}</h1>
                    <h3>{textbook.author}</h3>
                    <div className="bookdisplay">
                        <div className="imgcontainer">
                            <img className="textbookimage" src={textbook.imgUrl} alt="Book"/>
                        </div>
                        <div className="infocontainer">
                            <h5>Price: <span className="red">${textbook.price}</span></h5>
                            <h5>Seller: <em>{textbook.seller}</em></h5>
                            <div className="description">{textbook.description}</div>
                        </div>
                    </div>
                    <div className="buttonMenu">
                        <Button onClick={()=>{this.props.handleSendMessage(textbook, user)}}>Contact</Button>
                        {isAdmin ? <Button variant="danger" size="sm" onClick={(e) => {
                                e.stopPropagation();
                                deleteTextbook(this.props.match.params.id).then(() => this.props.history.push("/"))
                                    .catch(() => console.log("Couldn't delete textbook"))
                                }}>Delete Listing</Button> : null}
                    </div>
                </div>
            )
        } else {
            return(
                <div className="page">
                    <h1 className="error">Sorry</h1>
                    <h2>The listing you are looking for doesn't exist.</h2>
                </div>
            )
        }
    }
}

export default withRouter(ViewTextbook);
