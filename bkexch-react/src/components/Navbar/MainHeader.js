import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import SignupPopup from '../../SignupPopup';
import PostPopUp from "../../pages/PostPopUp/PostPopUp";
import LoginPopup from '../../LoginPopup';

class MainHeader extends React.Component {
	state = {
        signup: false,
        addpost: false,
        signin: false
	}

	handleSignup = () => {
        this.setState(prevState => ({signup: !prevState.signup, signin: false, addpost: false}), console.log(this.state))
        
    }
    
    handlePostPopUp = () => {
       this.setState(prevState => ({addpost: !prevState.addpost, signup: false, signin: false}), console.log(this.state))
    }

    handleSignin = () => {
        this.props.user ? this.props.handleSignin(-1) : this.setState({signin: true})
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
                    <ButtonToolbar>
                        {this.props.user ? <Button variant="secondary" onClick={this.handlePostPopUp}>Post</Button> : null}
                        <Button variant="primary" onClick={this.handleSignup}>Register</Button>
                        <Button variant="primary" onClick={this.handleSignin}>{this.props.user ? "Sign Out" : "Sign In"}</Button>
                    </ButtonToolbar>
                </Navbar>
            </div>
            { this.state.signup ? <SignupPopup close ={this.handleSignup} /> : null }
            { this.state.addpost ? <PostPopUp close={this.handlePostPopUp} /> : null }
            <LoginPopup show={this.state.signin} onHide={() => this.setState({signin: false})} handleSignin={this.props.handleSignin}/>
            <SignupPopup show={this.state.signup} onHide={() => this.setState({signup: false})} handleSignup={this.props.handleSignup}/>
            </>
        )
    }
}

export default MainHeader;