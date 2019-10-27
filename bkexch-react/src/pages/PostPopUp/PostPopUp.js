import React from 'react';
import '../../SignupPopup.css';
import './PostPopUp.css';

class PostPopUp extends React.Component {
    state = {

    }

    render() {
        return (
            <form className="popupContent">

                <h3> NEW POST<button type='button' className='close' onClick = { this.props.close }>X</button> </h3>
                <div className="label"> Title:</div>
                <input className="input" type="text"
                       placeholder = "Enter title" />
                <div className="label"> Author:</div>
                <input className="input" type="text"
                       placeholder = "Enter Author" />
                <div className="label"> Price:</div>
                <input className="input" type="text"
                       placeholder = "Enter price" />
                <div className="label"> Description:</div>
                <textarea className="descInput" type="text"
                       placeholder = "Description" />
                <div align="right">
                    <button
                        type="button"
                        id="signup"
                        >Publish
                    </button>
                </div>
            </form>
        )
    }
}

export default PostPopUp;
