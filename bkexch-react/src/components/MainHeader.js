import React from 'react';

class MainHeader extends React.Component {
    render(){
        return(
            <div className='mainheader'>
                <h3><a href="/">Home</a></h3>
                <h3><a href="/signup">Sign Up</a></h3>
                <h3><a href="/history">History</a></h3>
            </div>
        )
    }
}

export default MainHeader;
