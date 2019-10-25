import React from 'react';
import SignupPopup from '../SignupPopup';
import PostPopUp from "../pages/PostPopUp/PostPopUp";
class MainHeader extends React.Component {
	state = {
		signup: false,
        addPost: false
	}

	handleSignup = () => {
		this.setState({signup: !this.state.signup})
	}
    handlePostPopUp = () => {
        this.setState({addPost: !this.state.addPost, signup: false},
        )
    }

    render(){
        return(
        	<>
            <div className='mainheader'>
                <h3><a href="/">Home</a></h3>
                <h3><a onClick = { () => this.handleSignup() }>Sign Up</a></h3>
                <h3><a onClick = { () => this.handlePostPopUp() } >Post</a></h3>
                <h3><a href="/history">History</a></h3>
            </div>
             { this.state.signup ? <SignupPopup close = { () => this.handleSignup() } /> : null }
                {
                    this.state.addPost ? <PostPopUp close = { () => this.handlePostPopUp() }/> : null
                }
           	</>
        )
    }
}

export default MainHeader;
