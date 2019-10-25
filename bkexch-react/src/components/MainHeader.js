import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import SignupPopup from '../SignupPopup';
import PostPopUp from "../pages/PostPopUp/PostPopUp";

class MainHeader extends React.Component {
	state = {
		signup: false
	}

	handleSignup = () => {
		this.setState({signup: !this.state.signup})
    }
    
    handlePostPopUp = () => {
       this.setState({addPost: !this.state.addPost, signup: false})
    }

    render(){
        return(
            <>
            <div className="navigationbar">
                <Navbar sticky="top" bg="dark" variant="dark">
                    <Navbar.Brand href="/">Toronto Book Exchange</Navbar.Brand>
                    <Nav className="ml-auto mr-auto">
                        <Nav.Link href="/history">History</Nav.Link>
                    </Nav>
                    <Button variant="primary" onClick={this.handleSignup}>Register</Button>
                    <Button variant="secondary" onClick={this.handlePostPopUp}>Post</Button>
                </Navbar>
            </div>
            { this.state.signup ? <SignupPopup close = { this.handleSignup } /> : null }
            { this.state.addPost ? <PostPopUp close={this.handlePostPopUp} /> : null }
            </>
        )
    }
}

export default MainHeader;