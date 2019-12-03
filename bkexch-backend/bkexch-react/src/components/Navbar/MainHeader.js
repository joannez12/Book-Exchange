import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import Navbar from 'react-bootstrap/Navbar';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import SignupPopup from "../../pages/PopUps/SignupPopup";
import PostPopUp from "../../pages/PopUps/PostPopUp";
import LoginPopup from "../../pages/PopUps/LoginPopup";
import ProfilePopup from "../../pages/PopUps/ProfilePopup";
import {logout} from '../../actions/user';
import "./MainHeader.css";

class MainHeader extends React.Component {
    state = {
        signup: false,
        addpost: false,
        signin: false,
        user: null
    }

    componentDidMount() {
        this.props.updateUser()
    }

    handleSignup = () => {
        this.setState(prevState => ({ signup: !prevState.signup}))
    }

    handlePostPopUp = () => {
        this.setState(prevState => ({ addpost: !prevState.addpost}))
    }

    handleProfilePopup = () => {
        this.setState(prevState => ({ profile: !prevState.profile}))
    }

    handleSigninButton = () => {
        if (this.props.user) {
            logout()
            this.props.handleSignIn({})
            this.props.history.push('/')
        } else {
            this.setState({ signin: true })
        }
    }

    render() {
        console.log('header', this.props)
        return (
            <>
                <div className="navigationbar">
                    <Navbar sticky="top" bg="dark" variant="dark">
                        <Link to="/"><Navbar.Brand>Toronto Book Exchange</Navbar.Brand></Link>
                        <ButtonToolbar className="ml-auto">
                            {this.props.user ?
                                <> <Button variant="secondary" onClick={this.handlePostPopUp}>Post</Button>,
                                    <DropdownButton title={this.props.user.username}>
                                        <Dropdown.Item onClick={this.handleProfilePopup}>Profile</Dropdown.Item>
                                        <Dropdown.Item as={ Link } to='/history'>History</Dropdown.Item>
                                        <Dropdown.Item as={ Link } to='/messagebox'>Message</Dropdown.Item></DropdownButton>
                                </>
                                : <Button variant="primary" onClick={this.handleSignup}>Register</Button>}
                            <Button variant="primary" onClick={this.handleSigninButton}>{this.props.user ? "Sign Out" : "Sign In"}</Button>
                        </ButtonToolbar>
                    </Navbar>
                </div>
                <LoginPopup show={this.state.signin} onHide={() => this.setState({ signin: false })} handleSignin={this.props.handleSignIn}/>
                <SignupPopup show={this.state.signup} onHide={() => this.setState({ signup: false })} handleSignin={this.props.handleSignIn}/>
                <PostPopUp show={this.state.addpost} onHide={() => this.setState({ addpost: false })} user={this.props.user}/>
                {this.props.user ? <ProfilePopup show={this.state.profile} onHide={() => this.setState({ profile: false })} user={this.props.user} deleted={this.props.deleted} updateUser={this.props.updateUser} /> : null }
            </>
        )
    }
}

export default withRouter(MainHeader);
