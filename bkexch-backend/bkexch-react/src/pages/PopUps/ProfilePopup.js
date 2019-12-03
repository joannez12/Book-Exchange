import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ChangePasswordPopup from "../../pages/PopUps/ChangePasswordPopup";
import DeleteAccountPopup from "../../pages/PopUps/DeleteAccountPopup";

import './ProfilePopup.css';


class ProfilePopup extends React.Component {
    state = {
        account: this.props.user,
        changePassword: false,
        deleteAccount: false
    }

    handleChangePasswordPopup = () => {
        this.setState(prevState => ({ changePassword: !prevState.changePassword}))
    }

    handleDeleteAccountPopup = () => {
        this.setState(prevState => ({ deleteAccount: !prevState.deleteAccount}))
    }

    render() {
        const { updateUser, deleted, ...other } = this.props;
        return (
        	<>
            <Modal {...other} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {this.props.user.username}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                	<img className="profilePic" src="/profile_img.png" alt="Profile"/>

                    <label>Username: {this.props.user.username}</label>
                    <div className="profileButtons">
                    	<Button variant="secondary" onClick={this.handleChangePasswordPopup}>Change Password</Button>
                    	<Button variant="danger" onClick={this.handleDeleteAccountPopup}>Delete Account</Button>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
            {this.state.changePassword ? <ChangePasswordPopup show={this.state.changePassword} onHide={() => this.setState({ changePassword: false })} user={this.props.user} /> : null }
            {this.state.deleteAccount ? <DeleteAccountPopup show={this.state.deleteAccount} hideProfile={this.props.onHide} onHide={()=>this.setState({deleteAccount: false})} user={this.props.user} deleted={this.props.deleted}/> : null }
            </>
        )
    }
}

export default ProfilePopup;
