import React from 'react';
import SignupPopup from '../SignupPopup';

class MainHeader extends React.Component {
	state = {
		signup: false
	}

	handleSignup = () => {
		this.setState({signup: !this.state.signup})
	}

    render(){
        return(
        	<>
            <div className='mainheader'>
                <h3><a href="/">Home</a></h3>
                <h3><a onClick = { () => this.handleSignup() }>Sign Up</a></h3>
                
                <h3><a href="/history">History</a></h3>
             
             
            </div>
             { this.state.signup ? <SignupPopup close = { () => this.handleSignup() } /> : null }
           	</>
        )
    }
}

export default MainHeader;
