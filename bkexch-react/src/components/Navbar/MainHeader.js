import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import SignupPopup from '../../SignupPopup';
import PostPopUp from "../../pages/PostPopUp/PostPopUp";
import LoginPopup from '../../LoginPopup';
import "./MainHeader.css";

class MainHeader extends React.Component {
    state = {
        signup: false,
        addpost: false,
        signin: false
    }

    handleSignup = () => {
        this.setState(prevState => ({ signup: !prevState.signup, signin: false, addpost: false }), console.log(this.state))

    }

    handlePostPopUp = () => {
        this.setState(prevState => ({ addpost: !prevState.addpost, signup: false, signin: false }), console.log(this.state))
    }

    handleSigninButton = () => {
        if (this.props.user) {
            this.props.handleSignin(-1)
            this.props.history.push('/')
        } else {
            this.setState({ signin: true })
        }
    }

    render() {
        return (
            <>
                <div className="navigationbar">
                    <Navbar sticky="top" bg="dark" variant="dark">
                        <Link to="/"><Navbar.Brand>Toronto Book Exchange</Navbar.Brand></Link>
                        <Nav className="ml-auto mr-auto">
                            <Link to="/history" className="navLink">History</Link>
                        </Nav>
                        <ButtonToolbar>
                            {this.props.user ? <Button variant="secondary" onClick={this.handlePostPopUp}>Post</Button>
                                : <Button variant="primary" onClick={this.handleSignup}>Register</Button>}
                            <Button variant="primary" onClick={this.handleSigninButton}>{this.props.user ? "Sign Out" : "Sign In"}</Button>
                        </ButtonToolbar>
                    </Navbar>
                </div>
                {this.state.signup ? <SignupPopup close={this.handleSignup} /> : null}
                {this.state.addpost ? <PostPopUp close={this.handlePostPopUp} /> : null}
                <LoginPopup show={this.state.signin} onHide={() => this.setState({ signin: false })} handleSignin={this.props.handleSignin} />
                <SignupPopup show={this.state.signup} onHide={() => this.setState({ signup: false })} handleSignup={this.props.handleSignup} />
            </>
        )
    }
}

export default withRouter(MainHeader);