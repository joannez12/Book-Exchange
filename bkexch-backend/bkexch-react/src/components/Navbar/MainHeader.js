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
import {getUsers} from '../../actions/user';
import "./MainHeader.css";
import users from '../../users';
class MainHeader extends React.Component {
    state = {
        signup: false,
        addpost: false,
        signin: false,
        profile: false,
        user: null
    }

    componentDidMount() {
        this.updateUser()
    }

    updateUser = () => {
        getUsers().then((res) => {
            if (res.status === 200) {
                this.setState({user: res.data})
            } else {
                this.setState({user: null})
            }
        }).catch((err) => console.log('Request error for retrieving user'))
    }

    handleSignIn = (user) => {
        if (user.username) {
            this.setState({user: user})
        }
    }

    handleSignup = () => {
        this.setState(prevState => ({ signup: !prevState.signup}))
    }

    handlePostPopUp = () => {
        this.setState(prevState => ({ addpost: !prevState.addpost}))
    }

    handleSigninButton = () => {
        if (this.state.user) {
            this.setState({user: null})
            this.props.history.push('/')
        } else {
            this.setState({ signin: true })
        }
    }

    handleProfilePopup = () => {
        this.setState(prevState => ({ profile: !prevState.profile}))
    }

    render() {
        return (
            <>
                <div className="navigationbar">
                    <Navbar sticky="top" bg="dark" variant="dark">
                        <Link to="/"><Navbar.Brand>Toronto Book Exchange</Navbar.Brand></Link>
                        <ButtonToolbar className="ml-auto">
                            {this.state.user ?
                                <> <Button variant="secondary" onClick={this.handlePostPopUp}>Post</Button>,
                                    <DropdownButton title={this.state.user.username}>
                                        <Dropdown.Item onClick={this.handleProfilePopup}>Profile</Dropdown.Item>
                                        <Dropdown.Item as={ Link } to='/history'>History</Dropdown.Item>
                                        <Dropdown.Item as={ Link } to='/messagebox'>Message</Dropdown.Item></DropdownButton>
                                </>
                                : <Button variant="primary" onClick={this.handleSignup}>Register</Button>}
                            <Button variant="primary" onClick={this.handleSigninButton}>{this.state.user ? "Sign Out" : "Sign In"}</Button>
                        </ButtonToolbar>
                    </Navbar>
                </div>
                <LoginPopup show={this.state.signin} onHide={() => this.setState({ signin: false })} handleSignin={this.handleSignIn}/>
                <SignupPopup show={this.state.signup} onHide={() => this.setState({ signup: false })}  />
                <PostPopUp show={this.state.addpost} onHide={() => this.setState({ addpost: false })} addPost={this.props.addPost} user={this.state.user}/>
                {this.state.user ? <ProfilePopup show={this.state.profile} onHide={() => this.setState({ profile: false })} user={this.state.user} deleted={this.props.deleted} updateUser={this.props.updateUser} /> : null }
            </>
        )
    }
}

export default withRouter(MainHeader);
